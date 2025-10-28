import { NextRequest, NextResponse } from "next/server";
import { GoogleSheetsService } from "../../../../lib/google-sheets";
import { LicenseService } from "../../../../lib/license-service.js";

export async function POST(request: NextRequest) {
  try {
    console.log("🎯 페이액션 웹훅 수신됨");
    
    // 요청 헤더 로깅
    const headers = Object.fromEntries(request.headers.entries());
    console.log("📋 웹훅 헤더:", headers);
    
    // 요청 본문 파싱
    const webhookData = await request.json();
    console.log("📦 웹훅 데이터:", JSON.stringify(webhookData, null, 2));
    
    // 페이액션 웹훅 검증 (보안)
    const signature = request.headers.get('x-payaction-signature');
    if (!signature) {
      console.error("❌ 웹훅 서명이 없습니다");
      return NextResponse.json(
        { error: "웹훅 서명이 필요합니다" },
        { status: 401 }
      );
    }
    
    // TODO: 실제 서명 검증 로직 구현
    // const isValidSignature = verifyWebhookSignature(webhookData, signature);
    // if (!isValidSignature) {
    //   return NextResponse.json({ error: "잘못된 서명" }, { status: 401 });
    // }
    
    // 입금 확인 데이터 추출
    const {
      orderId,
      amount,
      depositorName,
      depositTime,
      bankName,
      accountNumber,
      status
    } = webhookData;
    
    // 필수 필드 검증
    if (!orderId || !amount || !depositorName) {
      console.error("❌ 필수 웹훅 데이터 누락:", {
        orderId: !!orderId,
        amount: !!amount, 
        depositorName: !!depositorName
      });
      return NextResponse.json(
        { error: "필수 웹훅 데이터가 누락되었습니다" },
        { status: 400 }
      );
    }
    
    console.log("✅ 웹훅 데이터 검증 통과");
    console.log(`💰 입금 확인: ${depositorName}님이 ${amount}원 입금 (주문번호: ${orderId})`);
    
    // Google Sheets에서 주문 정보 찾기
    const googleSheetsService = new GoogleSheetsService();
    
    // 주문번호로 고객 정보 조회 (Google Sheets에서)
    // TODO: Google Sheets에서 주문 조회 기능 구현 필요
    
    // 라이선스 발급 서비스 실행
    const licenseService = new LicenseService();
    
    // 입금 확인된 주문에 대해 라이선스 발급
    const customerInfo = {
      orderId: orderId,
      depositorName: depositorName,
      amount: amount,
      paymentStatus: "completed",
      paymentMethod: "bank_transfer",
      paymentTime: depositTime || new Date().toISOString(),
      bankName: bankName || "케이뱅크",
      accountNumber: accountNumber || "100232962872"
    };
    
    console.log("🚀 라이선스 발급 프로세스 시작...");
    
    // 라이선스 발급 (기존 로직 활용)
    const licenseResult = await licenseService.issueLicenseFromPayment(customerInfo);
    
    if (licenseResult.success) {
      console.log("🎉 라이선스 발급 및 이메일 발송 완료");
      console.log(`📧 라이선스 키: ${licenseResult.licenseKey}`);
      
      // Google Sheets 상태 업데이트
      await googleSheetsService.updateLicenseStatus(
        orderId,
        "발급완료",
        licenseResult.licenseKey
      );
      
      return NextResponse.json({
        success: true,
        message: "입금 확인 및 라이선스 발급 완료",
        orderId: orderId,
        licenseKey: licenseResult.licenseKey,
        emailSent: licenseResult.emailSent
      });
    } else {
      console.error("❌ 라이선스 발급 실패:", licenseResult.error);
      return NextResponse.json(
        {
          error: "라이선스 발급 실패",
          details: licenseResult.error,
          orderId: orderId
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