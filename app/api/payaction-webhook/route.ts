import { NextRequest, NextResponse } from "next/server";
import { GoogleSheetsService } from "@/lib/google-sheets";
import { PayActionService } from "@/lib/payaction-service";
import { LicenseService } from "@/lib/license-service.js";

// 한국 시간대 헬퍼 함수
function getKoreanTime(): string {
  return new Date().toLocaleString('sv-SE', { 
    timeZone: 'Asia/Seoul' 
  }).replace(' ', 'T') + '.000Z';
}

// 상품별 가격 계산 함수
function calculateExpectedAmount(productName: string): number {
  // 가격표 (https://www.autotoolshub.com/payment-info 기준)
  const prices = {
    // 단일 모듈
    '글쓰기자동화': 110000,          // A = ₩110,000
    '댓글자동화': 50000,            // B = ₩50,000  
    '서로이웃자동화': 50000,         // C = ₩50,000
    '대댓글자동화': 40000,          // D = ₩40,000
    
    // 조합 모듈 (할인 적용)
    '글쓰기자동화 + 댓글자동화': 140000,      // AB = ₩140,000
    '글쓰기자동화 + 서로이웃자동화': 140000,   // AC = ₩140,000  
    '글쓰기자동화 + 대댓글자동화': 150000,     // AD = ₩150,000
    '댓글자동화 + 서로이웃자동화': 80000,      // BC = ₩80,000
    '댓글자동화 + 대댓글자동화': 70000,        // BD = ₩70,000
    '서로이웃자동화 + 대댓글자동화': 70000,     // CD = ₩70,000
    
    // 3개 조합
    '글쓰기자동화 + 댓글자동화 + 서로이웃자동화': 170000,        // ABC = ₩170,000
    '글쓰기자동화 + 댓글자동화 + 대댓글자동화': 180000,         // ABD = ₩180,000
    '글쓰기자동화 + 서로이웃자동화 + 대댓글자동화': 180000,      // ACD = ₩180,000
    '댓글자동화 + 서로이웃자동화 + 대댓글자동화': 100000,       // BCD = ₩100,000
    
    // 전체 패키지
    '블로그 자동화 풀패키지': 200000,  // ABCD = ₩200,000
    '글쓰기자동화 + 댓글자동화 + 서로이웃자동화 + 대댓글자동화': 200000
  };

  // 상품명 정규화 및 매칭
  const normalizedName = productName?.trim();
  
  // 직접 매칭 시도
  if (prices[normalizedName]) {
    return prices[normalizedName];
  }
  
  // 부분 매칭으로 개별 모듈 가격 계산
  let totalPrice = 0;
  let moduleCount = 0;
  
  if (normalizedName.includes('글쓰기')) {
    totalPrice += 110000;
    moduleCount++;
  }
  if (normalizedName.includes('댓글') && !normalizedName.includes('대댓글')) {
    totalPrice += 50000;
    moduleCount++;
  }
  if (normalizedName.includes('서로이웃')) {
    totalPrice += 50000;
    moduleCount++;
  }
  if (normalizedName.includes('대댓글')) {
    totalPrice += 40000;
    moduleCount++;
  }
  
  // 다중 모듈 할인 적용
  if (moduleCount >= 2) {
    // 실제 웹사이트 가격표의 할인 적용 로직에 따라 조정
    // 현재는 개별 모듈 합계를 기본값으로 사용
  }
  
  // 기본값: 50,000원 (댓글자동화)
  return totalPrice > 0 ? totalPrice : 50000;
}

export async function POST(request: NextRequest) {
  try {
    console.log("🔔 페이액션 입금 알림 웹훅 수신됨");

    // 🆕 웹훅 보안 검증
    const payActionService = new PayActionService();
    const webhookKey = request.headers.get('x-webhook-key');
    const traceId = request.headers.get('x-trace-id');
    const mallId = request.headers.get('x-mall-id');

    console.log("🔐 웹훅 헤더 검증:", {
      webhookKey: webhookKey ? '[RECEIVED]' : '[MISSING]',
      traceId: traceId || '[MISSING]',
      mallId: mallId || '[MISSING]'
    });

    // 웹훅 키 검증
    if (!webhookKey || !payActionService.validateWebhookKey(webhookKey)) {
      console.error("❌ 웹훅 키 검증 실패");
      return NextResponse.json(
        { error: "Unauthorized webhook request" },
        { status: 401 }
      );
    }

    console.log("✅ 웹훅 보안 검증 통과");
    
    const body = await request.json();
    console.log("📋 페이액션 웹훅 데이터:", JSON.stringify(body, null, 2));

    // 페이액션 웹훅 데이터 구조 확인
    // 실제 데이터: { order_number: "...", order_status: "매칭완료", processing_date: "..." }
    const { order_status, order_number } = body;

    if (order_status !== "매칭완료") {
      console.log("⏭️ 입금 확인이 아닌 알림, 건너뜀:", order_status);
      return NextResponse.json({ success: true, message: "처리 건너뜀" });
    }

    console.log("💰 입금 확인 알림 처리 시작:", order_number);

    // 필수 정보 검증 (PayAction 웹훅에서는 order_number만 제공)
    if (!order_number) {
      console.error("❌ 페이액션 웹훅 필수 정보 누락:", {
        order_number: !!order_number
      });
      return NextResponse.json(
        { error: "주문번호가 누락되었습니다" },
        { status: 400 }
      );
    }

    console.log("✅ 페이액션 웹훅 검증 통과");

    // 1단계: Google Sheets에서 해당 주문 정보 조회 및 업데이트
    console.log("📊 Google Sheets에서 주문 정보 조회 중...");
    const googleSheetsService = new GoogleSheetsService();
    
    try {
      // 🆕 스마트 매칭 로직
      let customerInfo = null;
      
      // 1차 시도: 주문번호로 직접 매칭 (PayAction이 order_number를 제공하는 경우)
      if (order_number) {
        console.log("🎯 주문번호로 직접 매칭 시도:", order_number);
        customerInfo = await googleSheetsService.findCustomerByOrderId(order_number);
      }
      
      // PayAction 웹훅에는 주문번호만 포함되므로, 추가 매칭 로직은 생략
      
      if (!customerInfo) {
        console.error("❌ 매칭되는 주문을 찾을 수 없음:", {
          order_number: order_number || '[없음]'
        });
        return NextResponse.json(
          { error: "매칭되는 주문을 찾을 수 없습니다" },
          { status: 404 }
        );
      }

      console.log("✅ 매칭된 주문 정보:", {
        이름: customerInfo.이름,
        주문번호: customerInfo.주문번호,
        상품유형: customerInfo.상품유형,
        매칭방법: '주문번호 직접매칭'
      });

      // 실제 주문번호 사용 (PayAction이 제공한 order_number 사용)
      const actualOrderId = order_number;
      
      // PayAction 웹훅은 매칭완료 상태로만 알림이 오므로 이미 결제가 완료된 상태
      console.log("✅ PayAction 매칭완료 알림 - 라이선스 발급 진행");

      // 2단계: Google Sheets 상태 업데이트 (입금완료)
      console.log("📝 Google Sheets 입금 상태 업데이트 중...");
      await googleSheetsService.updatePaymentStatus(actualOrderId, {
        상태: "입금완료",
        입금자명: customerInfo.이름,
        입금금액: "페이액션 결제완료",
        입금시간: getKoreanTime(),
        은행명: "페이액션",
        계좌번호: "",
        결제방식: "페이액션"
      });

      console.log("✅ Google Sheets 상태 업데이트 완료");

      // 3단계: 라이선스 자동 발급
      console.log("🎯 자동 라이선스 발급 시작...");
      const licenseService = new LicenseService();

      // 실제 상품 가격 계산
      const actualAmount = calculateExpectedAmount(customerInfo.상품유형 || "댓글자동화");

      // 라이선스 발급을 위한 고객 정보 구성
      const licenseCustomerInfo = {
        name: customerInfo.이름,
        email: customerInfo.이메일, // 고객 입력 이메일을 email 필드로 설정
        phone: customerInfo.연락처,
        orderId: actualOrderId,
        depositorName: customerInfo.이름,
        amount: actualAmount, // 실제 상품 가격 적용
        accountCount: customerInfo.아이디수 || 1,
        postsPerAccount: customerInfo.글수 || 1,
        months: customerInfo.개월수 || 1,
        productName: customerInfo.상품유형 || "글쓰기자동화",
        productType: customerInfo.상품유형 || "standard",
        paymentMethod: "payaction",
        paymentKey: `payaction-${actualOrderId}`,
        hardwareId: "PENDING-ACTIVATION"
      };

      console.log("📄 라이선스 발급 정보:", {
        고객명: licenseCustomerInfo.name,
        이메일: licenseCustomerInfo.email,
        상품: licenseCustomerInfo.productName,
        금액: licenseCustomerInfo.amount
      });

      // 페이액션 웹훅용 라이선스 발급 (이메일 발송 포함)
      const licenseResult = await licenseService.issueLicenseFromPayment(licenseCustomerInfo);

      if (licenseResult.success) {
        // 🧪 라이선스 인코딩 테스트 로그 추가
        const licenseEncoding = licenseResult.licenseKey.split('-')[0];
        console.log("🎉 라이선스 자동 발급 성공:", {
          라이선스키: licenseResult.licenseKey,
          실제인코딩: licenseEncoding,
          상품명: licenseCustomerInfo.productName,
          이메일발송: licenseResult.emailSent,
          만료일: licenseResult.expiryDate
        });
        
        // G4 인코딩 테스트 결과 확인
        if (licenseCustomerInfo.productName.includes('댓글')) {
          if (licenseEncoding === 'G4') {
            console.log("✅ 댓글자동화 G4 인코딩 성공!");
          } else {
            console.log(`❌ 댓글자동화 인코딩 오류: 예상 G4, 실제 ${licenseEncoding}`);
          }
        }

        // 4단계: Google Sheets에 라이선스 정보 업데이트
        await googleSheetsService.updateLicenseInfo(actualOrderId, {
          라이센스키: licenseResult.licenseKey,
          발급일시: getKoreanTime(),
          만료일시: licenseResult.expiryDate,
          상태: "발급완료"
        });

        console.log("✅ 전체 프로세스 완료 - 입금 확인부터 라이선스 발급까지");

        // PayAction이 기대하는 성공 응답 형식
        return NextResponse.json({
          status: "success"
        });
      } else {
        console.error("❌ 라이선스 발급 실패:", licenseResult.error);
        
        // 라이선스 발급 실패해도 PayAction에는 성공 응답 (입금 확인됨)
        return NextResponse.json({
          status: "success"
        });
      }

    } catch (sheetsError) {
      console.error("❌ Google Sheets 처리 실패:", sheetsError);
      return NextResponse.json(
        { 
          error: "데이터베이스 처리 중 오류가 발생했습니다",
          details: sheetsError instanceof Error ? sheetsError.message : String(sheetsError)
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("💥 페이액션 웹훅 처리 중 치명적 오류:", error);
    return NextResponse.json(
      {
        error: "웹훅 처리 중 오류가 발생했습니다",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// GET 요청 처리 (웹훅 URL 확인용)
export async function GET() {
  return NextResponse.json({
    message: "페이액션 웹훅 API 정상 작동 중",
    endpoint: "/api/payaction-webhook",
    method: "POST",
    status: "active",
    lastChecked: getKoreanTime()
  });
}