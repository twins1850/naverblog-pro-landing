import { NextRequest, NextResponse } from "next/server";
import { EmailService } from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    console.log("🧪 Brevo 이메일 서비스 테스트 시작");
    
    // API 키 확인
    if (!process.env.BREVO_API_KEY || process.env.BREVO_API_KEY === "your_brevo_api_key_here") {
      return NextResponse.json({
        success: false,
        error: "Brevo API 키가 설정되지 않았습니다.",
        message: "BREVO_API_KEY 환경변수를 실제 API 키로 설정해주세요.",
        currentKey: process.env.BREVO_API_KEY ? "설정됨 (placeholder)" : "설정안됨",
        instruction: "https://app.brevo.com → Profile → SMTP & API → API Keys에서 키를 복사하여 .env.local 파일에 설정하세요."
      }, { status: 400 });
    }

    const body = await request.json();
    const testEmail = body.email || "test@example.com";
    
    const emailService = new EmailService();
    
    // 테스트 주문 데이터
    const testOrderData = {
      email: testEmail,
      name: "테스트 사용자",
      orderId: `TEST-${Date.now()}`,
      productName: "blog-pro-2계정-3글-1개월 (테스트)",
      amount: 50000,
      accountIds: 2,
      postsPerAccount: 3,
      months: 1,
      phone: "010-1234-5678"
    };

    await emailService.sendOrderConfirmationEmail(testOrderData);
    
    console.log("✅ 테스트 이메일 발송 성공:", testEmail);
    
    return NextResponse.json({
      success: true,
      message: "테스트 이메일이 성공적으로 발송되었습니다.",
      testData: testOrderData
    });
    
  } catch (error) {
    console.error("❌ 테스트 이메일 발송 실패:", error);
    
    return NextResponse.json({
      success: false,
      error: "테스트 이메일 발송 중 오류가 발생했습니다.",
      details: error instanceof Error ? error.message : String(error),
      apiKeyStatus: process.env.BREVO_API_KEY ? "설정됨" : "설정안됨"
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      service: "Brevo Email Service",
      apiKeyConfigured: !!(process.env.BREVO_API_KEY && process.env.BREVO_API_KEY !== "your_brevo_api_key_here"),
      senderEmail: process.env.BREVO_SENDER_EMAIL,
      senderName: process.env.BREVO_SENDER_NAME,
      currentApiKey: process.env.BREVO_API_KEY ? 
        (process.env.BREVO_API_KEY === "your_brevo_api_key_here" ? "placeholder" : "configured") 
        : "not_set",
      instructions: "https://app.brevo.com → Profile → SMTP & API → API Keys에서 API 키를 가져와서 .env.local 파일에 설정하세요."
    });
  } catch (error) {
    return NextResponse.json({
      error: "환경변수 확인 중 오류가 발생했습니다.",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
