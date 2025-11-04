import { NextRequest, NextResponse } from "next/server";
import { GoogleSheetsService } from "@/lib/google-sheets";
import { LicenseService } from "@/lib/license-service.js";

// 수동 라이선스 발급 API (웹훅 검증 없이)
export async function POST(request: NextRequest) {
  try {
    console.log("🔧 수동 라이선스 발급 API 호출됨");
    
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "주문번호가 필요합니다" },
        { status: 400 }
      );
    }

    console.log("🔍 주문번호로 Google Sheets 조회:", orderId);
    
    // Google Sheets에서 주문 정보 조회
    const googleSheetsService = new GoogleSheetsService();
    
    let customerInfo = await googleSheetsService.findCustomerByOrderId(orderId);
    
    if (!customerInfo) {
      console.error("❌ 주문을 찾을 수 없음:", orderId);
      return NextResponse.json(
        { error: "주문을 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    console.log("✅ 주문 정보 발견:", {
      이름: customerInfo.이름,
      이메일: customerInfo.이메일,
      상품유형: customerInfo.상품유형
    });

    // 라이선스 서비스 초기화
    const licenseService = new LicenseService();

    // Google Sheets에서 실제 결제금액 추출
    const rawAmount = customerInfo.결제금액 || "50000";
    const actualAmount = parseInt(String(rawAmount).replace(/[^0-9]/g, '')) || 50000;
    
    console.log("💰 수동 라이선스 - 결제금액 처리:", {
      원본_결제금액: customerInfo.결제금액,
      숫자_변환후: actualAmount
    });

    // 라이선스 발급을 위한 고객 정보 구성
    const licenseCustomerInfo = {
      name: customerInfo.이름,
      email: customerInfo.이메일, // 고객 입력 이메일 사용
      phone: customerInfo.연락처,
      orderId: orderId,
      depositorName: customerInfo.이름,
      amount: actualAmount, // 실제 결제금액 사용
      accountCount: customerInfo.아이디수 || 1,
      postsPerAccount: customerInfo.글수 || 1,
      months: customerInfo.개월수 || 1,
      productName: customerInfo.상품유형 || "댓글자동화",
      productType: customerInfo.상품유형 || "standard",
      paymentMethod: "bank_transfer",
      paymentKey: `manual-${orderId}`,
      hardwareId: "PENDING-ACTIVATION"
    };

    console.log("📄 라이선스 발급 정보:", {
      고객명: licenseCustomerInfo.name,
      이메일: licenseCustomerInfo.email,
      상품: licenseCustomerInfo.productName
    });

    // 라이선스 발급 (이메일 발송 포함)
    const licenseResult = await licenseService.issueLicenseFromPayment(licenseCustomerInfo);

    if (licenseResult.success) {
      console.log("🎉 수동 라이선스 발급 성공:", {
        라이선스키: licenseResult.licenseKey,
        이메일발송: licenseResult.emailSent
      });

      // Google Sheets 상태 업데이트
      await googleSheetsService.updateLicenseInfo(orderId, {
        라이센스키: licenseResult.licenseKey,
        발급일시: new Date().toISOString(),
        만료일시: licenseResult.expiryDate,
        상태: "발급완료"
      });

      await googleSheetsService.updatePaymentStatus(orderId, {
        상태: "입금완료",
        결제상태: "결제완료", // O열 결제상태 추가
        입금자명: customerInfo.이름,
        입금금액: `₩${actualAmount.toLocaleString()}`,
        입금시간: new Date().toISOString(),
        결제방식: "계좌이체"
      });

      return NextResponse.json({
        success: true,
        message: "라이선스 발급 완료",
        licenseKey: licenseResult.licenseKey,
        emailSent: licenseResult.emailSent,
        customerEmail: licenseCustomerInfo.email
      });
    } else {
      console.error("❌ 라이선스 발급 실패:", licenseResult.error);
      return NextResponse.json(
        { error: "라이선스 발급 실패", details: licenseResult.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("💥 수동 라이선스 발급 중 오류:", error);
    return NextResponse.json(
      {
        error: "라이선스 발급 중 오류 발생",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}