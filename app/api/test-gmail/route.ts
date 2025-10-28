import { NextRequest, NextResponse } from "next/server";
import { GmailEmailService } from "@/lib/email-service-gmail";

export async function POST(request: NextRequest) {
  try {
    console.log("🧪 Gmail 이메일 서비스 테스트 시작");
    
    // API 키 확인
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD === "your_gmail_app_password_here") {
      return NextResponse.json({
        success: false,
        error: "Gmail 설정이 완료되지 않았습니다.",
        message: "Gmail 계정과 앱 비밀번호를 설정해주세요.",
        setup_guide: {
          step1: "Gmail 2단계 인증 활성화",
          step2: "앱 비밀번호 생성 (Google 계정 > 보안 > 앱 비밀번호)",
          step3: ".env.local에 GMAIL_USER와 GMAIL_APP_PASSWORD 설정"
        }
      }, { status: 400 });
    }

    const body = await request.json();
    const testEmail = body.email || "test@example.com";
    
    const emailService = new GmailEmailService();
    
    // 테스트 주문 데이터
    const testOrderData = {
      email: testEmail,
      name: "Gmail 테스트 사용자",
      orderId: `GMAIL-TEST-${Date.now()}`,
      productName: "blog-pro-2계정-3글-1개월 (Gmail 테스트)",
      amount: 50000,
      accountIds: 2,
      postsPerAccount: 3,
      months: 1,
      phone: "010-1234-5678"
    };

    await emailService.sendOrderConfirmationEmail(testOrderData);
    
    console.log("✅ Gmail 테스트 이메일 발송 성공:", testEmail);
    
    return NextResponse.json({
      success: true,
      message: "Gmail 테스트 이메일이 성공적으로 발송되었습니다.",
      testData: testOrderData
    });
    
  } catch (error) {
    console.error("❌ Gmail 테스트 이메일 발송 실패:", error);
    
    return NextResponse.json({
      success: false,
      error: "Gmail 테스트 이메일 발송 중 오류가 발생했습니다.",
      details: error instanceof Error ? error.message : String(error),
      tip: "Gmail 앱 비밀번호가 올바르게 설정되었는지 확인해주세요."
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      service: "Gmail SMTP Email Service",
      gmailConfigured: !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && process.env.GMAIL_APP_PASSWORD !== "your_gmail_app_password_here"),
      gmailUser: process.env.GMAIL_USER,
      setup_guide: {
        step1: "Gmail에서 2단계 인증 활성화",
        step2: "Google 계정 > 보안 > 앱 비밀번호에서 앱 비밀번호 생성",
        step3: ".env.local에 GMAIL_USER와 GMAIL_APP_PASSWORD 설정",
        note: "Gmail 앱 비밀번호는 일반 비밀번호와 다릅니다"
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: "Gmail 환경변수 확인 중 오류가 발생했습니다.",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}