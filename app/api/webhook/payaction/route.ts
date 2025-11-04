import { NextRequest, NextResponse } from "next/server";
import { GoogleSheetsService } from "../../../../lib/google-sheets";
import { LicenseService } from "../../../../lib/license-service.js";

// 숫자 추출 헬퍼 함수
function extractNumber(value: any): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const match = value.match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
  }
  return 1;
}


export async function POST(request: NextRequest) {
  try {
    console.log("🎯 페이액션 웹훅 수신됨");
    
    // 요청 헤더 로깅
    const headers = Object.fromEntries(request.headers.entries());
    console.log("📋 웹훅 헤더:", headers);
    
    // 요청 본문 파싱
    const webhookData = await request.json();
    console.log("📦 웹훅 데이터:", JSON.stringify(webhookData, null, 2));
    
    // 실제 PayAction 웹훅 데이터 구조 처리
    const {
      order_number,
      order_status,
      processing_date
    } = webhookData;
    
    // PayAction 매칭완료 상태 확인
    if (order_status !== "매칭완료") {
      console.log("⏭️ 입금 확인이 아닌 알림, 건너뜀:", order_status);
      return NextResponse.json({ success: true, message: "처리 건너뜀" });
    }
    
    // 필수 필드 검증
    if (!order_number) {
      console.error("❌ 필수 웹훅 데이터 누락:", {
        order_number: !!order_number,
        order_status: !!order_status
      });
      return NextResponse.json(
        { error: "필수 웹훅 데이터가 누락되었습니다" },
        { status: 400 }
      );
    }
    
    console.log("✅ PayAction 웹훅 데이터 검증 통과");
    console.log(`💰 매칭 완료: 주문번호 ${order_number}, 상태: ${order_status}`);
    
    // Google Sheets에서 주문 정보 찾기
    const googleSheetsService = new GoogleSheetsService();
    
    console.log("🔍 Google Sheets에서 주문 정보 조회 중...");
    let originalCustomerData = null;
    
    try {
      // 주문번호로 고객 정보 조회 (Google Sheets에서)
      originalCustomerData = await googleSheetsService.findCustomerByOrderId(order_number);
      console.log("✅ Google Sheets 조회 성공:", originalCustomerData ? "데이터 발견" : "데이터 없음");
      
      if (!originalCustomerData) {
        console.log("❌ 주문번호로 고객 정보를 찾을 수 없습니다:", order_number);
        return NextResponse.json(
          { error: "주문 정보를 찾을 수 없습니다", orderId: order_number },
          { status: 404 }
        );
      }
    } catch (sheetsError) {
      console.error("⚠️ Google Sheets 조회 실패:", sheetsError);
      return NextResponse.json(
        { error: "고객 정보 조회 실패", orderId: order_number },
        { status: 500 }
      );
    }
    
    // 라이선스 발급 서비스 실행
    const licenseService = new LicenseService();
    
    // Google Sheets E열에서 실제 결제 금액 직접 사용
    const actualAmount = originalCustomerData?.결제금액 || originalCustomerData?.금액 || 50000;
    console.log("💰 Google Sheets에서 실제 결제금액 사용:", {
      E열_결제금액: originalCustomerData?.결제금액,
      대체_금액: originalCustomerData?.금액,
      최종사용금액: actualAmount,
      조회된데이터: originalCustomerData
    });
    
    // 입금 확인된 주문에 대해 라이선스 발급 (Google Sheets에서 조회한 정보 병합)
    const customerInfo = {
      orderId: order_number,
      depositorName: originalCustomerData?.이름 || "고객",
      amount: actualAmount, // 실제 상품 가격 사용
      paymentStatus: "completed",
      paymentMethod: "bank_transfer",
      paymentTime: processing_date || new Date().toISOString(),
      bankName: "케이뱅크",
      accountNumber: "100232962872",
      // Google Sheets에서 조회한 실제 고객 정보 추가
      name: originalCustomerData?.이름 || "고객",
      email: originalCustomerData?.이메일 || "twins1850@gmail.com", // 실제 고객 이메일
      customerEmail: originalCustomerData?.이메일 || "twins1850@gmail.com",
      phone: originalCustomerData?.연락처 || "010-0000-0000",
      productName: originalCustomerData?.상품유형 || "블로그 자동화",
      productType: originalCustomerData?.상품유형 || "블로그 자동화",
      accountCount: extractNumber(originalCustomerData?.아이디수) || 1,
      accountIds: extractNumber(originalCustomerData?.아이디수) || 1,
      postCount: extractNumber(originalCustomerData?.글수) || 1,
      postsPerAccount: extractNumber(originalCustomerData?.글수) || 1,
      months: extractNumber(originalCustomerData?.개월수) || 1,
      depositTime: processing_date
    };
    
    console.log("🚀 라이선스 발급 프로세스 시작...");
    console.log("📋 최종 customerInfo 전달 데이터:", {
      orderId: customerInfo.orderId,
      amount: customerInfo.amount,
      amountType: typeof customerInfo.amount,
      name: customerInfo.name,
      email: customerInfo.email,
      productName: customerInfo.productName
    });
    
    // 라이선스 발급 (기존 로직 활용)
    const licenseResult = await licenseService.issueLicenseFromPayment(customerInfo);
    
    if (licenseResult.success) {
      console.log("🎉 라이선스 발급 및 이메일 발송 완료");
      console.log(`📧 라이선스 키: ${licenseResult.licenseKey}`);
      
      // Google Sheets 상태 업데이트
      await googleSheetsService.updateLicenseStatus(
        order_number,
        "발급완료",
        licenseResult.licenseKey
      );
      
      return NextResponse.json({
        success: true,
        message: "입금 확인 및 라이선스 발급 완료",
        orderId: order_number,
        licenseKey: licenseResult.licenseKey,
        emailSent: licenseResult.emailSent
      });
    } else {
      console.error("❌ 라이선스 발급 실패:", licenseResult.error);
      return NextResponse.json(
        {
          error: "라이선스 발급 실패",
          details: licenseResult.error,
          orderId: order_number
        },
        { status: 500 }
      );
    }
    
  } catch (error: any) {
    console.error("💥 페이액션 웹훅 처리 중 오류:", error);
    console.error("📍 오류 스택:", error.stack);
    
    return NextResponse.json(
      {
        error: "웹훅 처리 중 서버 오류가 발생했습니다",
        details: error.message
      },
      { status: 500 }
    );
  }
}

// GET 요청 처리 (웹훅 엔드포인트 테스트용)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "페이액션 웹훅 엔드포인트가 정상 작동 중입니다",
    endpoint: "/api/webhook/payaction",
    methods: ["POST"],
    timestamp: new Date().toISOString()
  });
}