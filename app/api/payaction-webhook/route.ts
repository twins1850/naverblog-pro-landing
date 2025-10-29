import { NextRequest, NextResponse } from "next/server";
import { GoogleSheetsService } from "@/lib/google-sheets";
import { LicenseService } from "@/lib/license-service.js";

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
    
    const body = await request.json();
    console.log("📋 페이액션 웹훅 데이터:", JSON.stringify(body, null, 2));

    // 페이액션 웹훅 데이터 구조 확인
    // 예상 데이터: { type: "deposit_confirmed", data: { ... } }
    const { type, data } = body;

    if (type !== "deposit_confirmed") {
      console.log("⏭️ 입금 확인이 아닌 알림, 건너뜀:", type);
      return NextResponse.json({ success: true, message: "처리 건너뜀" });
    }

    console.log("💰 입금 확인 알림 처리 시작:", data);

    // 페이액션 데이터에서 주문 정보 추출
    const {
      orderId,           // 주문번호
      depositorName,     // 입금자명  
      amount,            // 입금금액
      bankName,          // 은행명
      accountNumber,     // 계좌번호
      depositTime,       // 입금시간
      customerEmail,     // 고객 이메일 (사전 저장된 정보)
      customerName,      // 고객명
      customerPhone,     // 고객 연락처
      productName,       // 상품명
      accountIds,        // 아이디 수
      postsPerAccount,   // 글 수
      months            // 개월 수
    } = data;

    // 필수 정보 검증
    if (!orderId || !depositorName || !amount) {
      console.error("❌ 페이액션 웹훅 필수 정보 누락:", {
        orderId: !!orderId,
        depositorName: !!depositorName,
        amount: !!amount
      });
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다" },
        { status: 400 }
      );
    }

    console.log("✅ 페이액션 웹훅 검증 통과");

    // 1단계: Google Sheets에서 해당 주문 정보 조회 및 업데이트
    console.log("📊 Google Sheets에서 주문 정보 조회 중...");
    const googleSheetsService = new GoogleSheetsService();
    
    try {
      // Google Sheets에서 주문번호로 고객 정보 조회
      const customerInfo = await googleSheetsService.findCustomerByOrderId(orderId);
      
      if (!customerInfo) {
        console.error("❌ 주문번호를 찾을 수 없음:", orderId);
        return NextResponse.json(
          { error: "주문번호를 찾을 수 없습니다" },
          { status: 404 }
        );
      }

      console.log("✅ 기존 주문 정보 발견:", customerInfo.이름);

      // 입금자명 검증 (선택적 - 이름이 다를 수 있음)
      if (customerInfo.이름 && depositorName && customerInfo.이름 !== depositorName) {
        console.warn("⚠️ 입금자명과 주문자명이 다름:", {
          주문자명: customerInfo.이름,
          입금자명: depositorName
        });
        // 경고만 출력하고 계속 진행
      }

      // 💰 금액 검증 로직 추가
      const expectedAmount = calculateExpectedAmount(customerInfo.상품유형 || productName);
      const depositedAmount = parseInt(amount.toString().replace(/[^\d]/g, ''));
      
      console.log("💰 금액 검증:", {
        상품유형: customerInfo.상품유형 || productName,
        예상금액: expectedAmount,
        입금금액: depositedAmount,
        일치여부: depositedAmount >= expectedAmount
      });

      if (depositedAmount < expectedAmount) {
        console.error("❌ 입금 금액 부족:", {
          필요금액: expectedAmount,
          입금금액: depositedAmount,
          부족금액: expectedAmount - depositedAmount
        });
        
        // 입금 상태는 "입금부족"으로 업데이트
        await googleSheetsService.updatePaymentStatus(orderId, {
          상태: "입금부족",
          입금자명: depositorName,
          입금금액: `₩${depositedAmount.toLocaleString()}`,
          필요금액: `₩${expectedAmount.toLocaleString()}`,
          부족금액: `₩${(expectedAmount - depositedAmount).toLocaleString()}`,
          입금시간: depositTime || new Date().toISOString(),
          결제방식: "계좌이체"
        });

        return NextResponse.json({
          success: false,
          message: "입금 금액이 부족합니다",
          orderId: orderId,
          expectedAmount: expectedAmount,
          depositedAmount: depositedAmount,
          shortfall: expectedAmount - depositedAmount,
          status: "insufficient_payment"
        }, { status: 402 }); // 402 Payment Required
      }

      console.log("✅ 금액 검증 통과 - 라이선스 발급 진행");

      // 2단계: Google Sheets 상태 업데이트 (입금완료)
      console.log("📝 Google Sheets 입금 상태 업데이트 중...");
      await googleSheetsService.updatePaymentStatus(orderId, {
        상태: "입금완료",
        입금자명: depositorName,
        입금금액: `₩${amount.toLocaleString()}`,
        입금시간: depositTime || new Date().toISOString(),
        은행명: bankName || "페이액션",
        계좌번호: accountNumber || "",
        결제방식: "계좌이체"
      });

      console.log("✅ Google Sheets 상태 업데이트 완료");

      // 3단계: 라이선스 자동 발급
      console.log("🎯 자동 라이선스 발급 시작...");
      const licenseService = new LicenseService();

      // 라이선스 발급을 위한 고객 정보 구성
      const licenseCustomerInfo = {
        name: customerInfo.이름,
        email: customerInfo.이메일,
        phone: customerInfo.연락처,
        orderId: orderId,
        depositorName: depositorName,
        amount: parseInt(amount.toString().replace(/[^\d]/g, '')), // 숫자만 추출
        accountCount: customerInfo.아이디수 || accountIds || 1,
        postsPerAccount: customerInfo.글수 || postsPerAccount || 1,
        months: customerInfo.개월수 || months || 1,
        productName: customerInfo.상품유형 || productName || "글쓰기자동화",
        productType: customerInfo.상품유형 || productName || "standard",
        paymentMethod: "bank_transfer",
        customerEmail: customerInfo.이메일,
        paymentKey: `payaction-${orderId}`,
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
        await googleSheetsService.updateLicenseInfo(orderId, {
          라이센스키: licenseResult.licenseKey,
          발급일시: new Date().toISOString(),
          만료일시: licenseResult.expiryDate,
          상태: "발급완료"
        });

        console.log("✅ 전체 프로세스 완료 - 입금 확인부터 라이선스 발급까지");

        return NextResponse.json({
          success: true,
          message: "입금 확인 및 라이선스 발급 완료",
          orderId: orderId,
          licenseKey: licenseResult.licenseKey,
          emailSent: licenseResult.emailSent,
          depositorName: depositorName,
          amount: amount,
          processedAt: new Date().toISOString()
        });
      } else {
        console.error("❌ 라이선스 발급 실패:", licenseResult.error);
        
        // 라이선스 발급 실패해도 입금은 확인된 상태로 유지
        return NextResponse.json({
          success: false,
          message: "입금은 확인되었으나 라이선스 발급에 실패했습니다",
          orderId: orderId,
          depositorName: depositorName,
          amount: amount,
          error: licenseResult.error,
          manualActionRequired: true
        }, { status: 500 });
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
    lastChecked: new Date().toISOString()
  });
}