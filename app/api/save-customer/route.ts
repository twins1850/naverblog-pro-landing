import { NextRequest, NextResponse } from "next/server";
import { GoogleSheetsService } from "@/lib/google-sheets";
import { GmailEmailService } from "@/lib/email-service-gmail";
import { PayActionService } from "@/lib/payaction-service";

// 한국 시간대 헬퍼 함수
function getKoreanTime(): string {
  return new Date().toLocaleString('sv-SE', { 
    timeZone: 'Asia/Seoul' 
  }).replace(' ', 'T') + '.000Z';
}

// 상품명을 코드로 변환하는 함수 (다중 상품 지원)
function getProductCodes(productNames: string | string[]): string {
  const productMap: Record<string, string> = {
    '글쓰기자동화': 'A',
    '댓글자동화': 'B', 
    '서로이웃자동화': 'C',
    '대댓글자동화': 'D'
  };
  
  // 문자열 처리 - "댓글자동화" 또는 "댓글자동화+서로이웃자동화" 형식 처리
  if (typeof productNames === 'string') {
    // "글쓰기자동화 1.1" 형식에서 상품명만 추출
    const cleanProductName = productNames.split(' ')[0]; // "글쓰기자동화 1.1" -> "글쓰기자동화"
    
    // + 기호로 분리된 다중 상품 처리
    if (cleanProductName.includes('+')) {
      const modules = cleanProductName.split('+').map(name => name.trim());
      const codes = modules
        .map(name => productMap[name])
        .filter(code => code)
        .sort();
      return codes.length > 0 ? codes.join('') : '';
    }
    
    // 단일 상품
    return productMap[cleanProductName] || '';
  }
  
  // 배열 형식 처리 (향후 확장 대비)
  if (Array.isArray(productNames)) {
    const codes = productNames
      .map(name => productMap[name.split(' ')[0]]) // 각 상품명에서도 버전 제거
      .filter(code => code)
      .sort();
    
    return codes.length > 0 ? codes.join('') : '';
  }
  
  return '';
}

// 통합 구조로 변경: 구매 정보는 issue-license에서 함께 처리됩니다.
// 이 API는 하위 호환성을 위해 유지하지만 실제로는 사용하지 않는 것을 권장합니다.
export async function POST(request: NextRequest) {
  try {
    console.log("구매 정보 저장 및 Google Sheets 연동 시작");
    
    const body = await request.json();

    const {
      name,
      email,
      phone,
      amount,
      accountCount,
      postCount,
      months,
      orderId,
      paymentKey,
      status = "결제완료",
      productName,
      selectedModules, // 선택된 모듈 ID들 받기
    } = body;

    // 입력 데이터 검증
    if (
      !name ||
      !email ||
      !phone ||
      !amount ||
      !accountCount ||
      !postCount ||
      !months ||
      !orderId
    ) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 🛡️ 서비스별 독립 실행 결과 저장
    let googleSheetsSuccess = false;
    let googleSheetsError = null;
    let payActionSuccess = false;
    let payActionError = null;
    let emailSent = false;

    // 🆕 Google Sheets 자동 연동 (독립 실행)
    try {
      // 환경변수 확인
      if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
        console.warn('⚠️ Google Sheets 환경변수가 설정되지 않았습니다. Google Sheets 연동 건너뜀');
        googleSheetsError = "환경변수 설정되지 않음";
      } else {
        console.log('🔧 Google Sheets 서비스 초기화 시작...');
        const googleSheetsService = new GoogleSheetsService();
        
        // 선택된 모듈로부터 정확한 상품 코드 생성
        let productCodes = '';
        if (selectedModules) {
          const moduleIdMap: Record<string, string> = {
            'writing': 'A',
            'comment': 'B',
            'neighbor': 'C',
            'reply': 'D'
          };
          
          const modules = selectedModules.split(',').filter(id => id);
          const codes = modules.map(id => moduleIdMap[id]).filter(code => code).sort();
          productCodes = codes.join('');
        }
        
        // productCodes가 없으면 productName으로부터 파싱 시도
        if (!productCodes) {
          productCodes = getProductCodes(productName || '');
        }
        
        const customerData = {
          이름: name,
          이메일: email,
          연락처: phone,
          결제일시: getKoreanTime(),
          결제금액: `₩${amount.toLocaleString()}`,
          상품유형: `${productCodes} ${accountCount}계정-${postCount}글-${months}개월`,
          아이디수: accountCount,
          글수: postCount,
          개월수: months,
          라이센스키: "", // 추후 발급
          발급일시: "",
          만료일시: "",
          상태: "입금대기",
          하드웨어ID: "",
          결제상태: status,
          주문번호: orderId,
          결제ID: paymentKey || "",
          입금자명: body.depositName || "",
          결제방식: body.paymentMethod || "manual",
        };

        await googleSheetsService.addCustomerData(customerData);
        console.log("✅ Google Sheets 자동 연동 성공:", orderId);
        googleSheetsSuccess = true;
      }
    } catch (sheetsError) {
      console.error("❌ Google Sheets 연동 실패:", sheetsError);
      googleSheetsError = sheetsError instanceof Error ? sheetsError.message : String(sheetsError);
      // Google Sheets 실패해도 다른 서비스는 계속 진행
    }

    // 🆕 PayAction에 주문 정보 제출 (독립 실행)
    try {
      console.log("📤 PayAction 주문 제출 시도:", orderId);
      const payActionService = new PayActionService();
      
      // PayAction API 인증 상태 확인
      console.log("🔍 PayAction API 인증 상태 확인...");
      const credentialCheck = await payActionService.validateCredentials();
      if (!credentialCheck.valid) {
        console.error("❌ PayAction API 인증 실패:", credentialCheck.error);
        payActionError = `인증 실패: ${credentialCheck.error}`;
      } else {
        console.log("✅ PayAction API 인증 확인됨");
        
        // 상품 코드 재생성 (Google Sheets 실패 시에도 PayAction은 실행되어야 함)
        let productCodes = '';
        if (selectedModules) {
          const moduleIdMap: Record<string, string> = {
            'writing': 'A',
            'comment': 'B',
            'neighbor': 'C',
            'reply': 'D'
          };
          
          const modules = selectedModules.split(',').filter(id => id);
          const codes = modules.map(id => moduleIdMap[id]).filter(code => code).sort();
          productCodes = codes.join('');
        }
        
        if (!productCodes) {
          productCodes = getProductCodes(productName || '');
        }
        
        const payActionResult = await payActionService.submitOrder({
          orderId: orderId,
          amount: amount,
          customerName: name,
          expectedDepositor: body.depositName || name,
          productName: `${productCodes} ${accountCount}계정-${postCount}글-${months}개월`,
          customerEmail: email,
          customerPhone: phone
        });

        // PayAction API 응답 형식 확인
        if (payActionResult.status === 'success' || (payActionResult.success !== false && !payActionResult.error)) {
          console.log("✅ PayAction 주문 제출 성공:", {
            orderId: orderId,
            response: payActionResult
          });
          payActionSuccess = true;
        } else {
          console.warn("⚠️ PayAction 주문 제출 실패:", {
            orderId: orderId,
            error: payActionResult.error || payActionResult,
            response: payActionResult
          });
          payActionError = payActionResult.error || "알 수 없는 오류";
        }
      }
    } catch (payActionError_) {
      console.error("❌ PayAction 주문 제출 중 예외:", {
        orderId: orderId,
        error: payActionError_ instanceof Error ? payActionError_.message : String(payActionError_)
      });
      payActionError = payActionError_ instanceof Error ? payActionError_.message : String(payActionError_);
    }

    // 🆕 이메일 발송 (Gmail만 사용)
    let emailSent = false;
    
    // 상품 코드 생성 (이메일 발송용)
    let productCodes = '';
    if (selectedModules) {
      const moduleIdMap: Record<string, string> = {
        'writing': 'A',
        'comment': 'B',
        'neighbor': 'C',
        'reply': 'D'
      };
      
      const modules = selectedModules.split(',').filter(id => id);
      const codes = modules.map(id => moduleIdMap[id]).filter(code => code).sort();
      productCodes = codes.join('');
    }
    
    // productCodes가 없으면 productName으로부터 파싱 시도
    if (!productCodes) {
      productCodes = getProductCodes(productName || '');
    }

    try {
      // Gmail 이메일 서비스만 사용
      const hasGmailConfig = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD;
      console.log("📧 Gmail 설정 상태:", hasGmailConfig ? "활성화" : "비활성화");
      
      if (hasGmailConfig && process.env.GMAIL_APP_PASSWORD !== "your_gmail_app_password_here") {
        console.log("🚀 Gmail 발송 시도 시작...");
        const gmailService = new GmailEmailService();
        await gmailService.sendOrderConfirmationEmail({
          email,
          name,
          orderId,
          productName: `${productCodes} ${accountCount}계정-${postCount}글-${months}개월`,
          amount,
          accountIds: accountCount,
          postsPerAccount: postCount,
          months,
          phone
        });
        console.log("✅ Gmail 주문 확인 이메일 발송 성공:", email);
        emailSent = true;
      } else {
        console.log("❌ Gmail 설정 누락 - 환경변수를 확인하세요");
        throw new Error("Gmail 설정이 완료되지 않았습니다.");
      }
    } catch (gmailError) {
      console.error("❌ Gmail 이메일 발송 실패:", {
        error: gmailError instanceof Error ? gmailError.message : String(gmailError),
        stack: gmailError instanceof Error ? gmailError.stack : undefined,
      });
      // 이메일 발송 실패는 전체 프로세스를 중단시키지 않음
      emailSent = false;
    }

    // 📊 최종 응답 생성 (모든 서비스 결과 종합)
    const overallSuccess = true; // 주문 자체는 항상 성공
    let statusMessage = "구매 정보가 접수되었습니다.";
    let warnings = [];

    // 각 서비스 상태에 따른 메시지 구성
    if (googleSheetsSuccess && payActionSuccess) {
      statusMessage = "구매 정보가 성공적으로 저장되고 PayAction에 등록되었습니다.";
    } else if (googleSheetsSuccess && !payActionSuccess) {
      statusMessage = "구매 정보는 저장되었지만 PayAction 등록에 문제가 있습니다.";
      warnings.push(`PayAction 오류: ${payActionError}`);
    } else if (!googleSheetsSuccess && payActionSuccess) {
      statusMessage = "PayAction에는 등록되었지만 Google Sheets 연동에 문제가 있습니다.";
      warnings.push(`Google Sheets 오류: ${googleSheetsError}`);
    } else {
      statusMessage = "구매 정보는 접수되었지만 일부 시스템 연동에 문제가 있습니다.";
      warnings.push(`Google Sheets 오류: ${googleSheetsError}`);
      warnings.push(`PayAction 오류: ${payActionError}`);
    }

    console.log("📊 최종 처리 결과:", {
      orderId,
      googleSheetsSuccess,
      payActionSuccess,
      emailSent,
      warnings: warnings.length > 0 ? warnings : "없음"
    });

    return NextResponse.json({
      success: overallSuccess,
      message: statusMessage,
      orderId: orderId,
      results: {
        googleSheetsUpdated: googleSheetsSuccess,
        payActionSubmitted: payActionSuccess,
        emailSent: emailSent
      },
      warnings: warnings.length > 0 ? warnings : undefined,
      // 하위 호환성을 위한 기존 필드들
      googleSheetsUpdated: googleSheetsSuccess,
    });
    
  } catch (error) {
    console.error("구매 정보 저장 중 오류:", error);
    return NextResponse.json(
      { 
        error: "구매 정보 저장 중 오류가 발생했습니다.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
