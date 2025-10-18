import { NextRequest, NextResponse } from "next/server";
import { GoogleSheetsService } from "@/lib/google-sheets";

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 구글시트 연동 테스트 시작...");
    
    // 환경변수 확인
    console.log("🔍 환경변수 확인 중...");
    console.log("GOOGLE_SHEETS_SPREADSHEET_ID:", !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
    console.log("GOOGLE_SERVICE_ACCOUNT_JSON:", !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    console.log("GOOGLE_SERVICE_ACCOUNT_EMAIL:", !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log("GOOGLE_PRIVATE_KEY:", !!process.env.GOOGLE_PRIVATE_KEY);
    
    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      return NextResponse.json({
        success: false,
        error: "Missing GOOGLE_SHEETS_SPREADSHEET_ID"
      }, { status: 500 });
    }
    
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON && (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY)) {
      return NextResponse.json({
        success: false,
        error: "Missing Google credentials: need either GOOGLE_SERVICE_ACCOUNT_JSON or both GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY"
      }, { status: 500 });
    }

    console.log("✅ 환경변수 모두 존재");
    console.log(`📋 스프레드시트 ID: ${process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.substring(0, 10)}...`);
    console.log(`📧 서비스 계정: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);

    // GoogleSheetsService 초기화 테스트
    const sheetsService = new GoogleSheetsService();
    
    // 테스트 데이터 추가 시도
    const testData = {
      이름: "구글시트 연동 테스트",
      이메일: "test@sheets.com",
      연락처: "010-0000-0000",
      결제일시: new Date().toISOString(),
      결제금액: "0",
      상품유형: "blog-pro 1.1",
      아이디수: 1,
      글수: 1,
      개월수: 1,
      결제상태: "테스트",
      주문번호: "TEST-SHEETS-CONNECTION",
      결제ID: "TEST-PAYMENT-ID"
    };

    const testLicenseKey = "TEST-LICENSE-KEY-" + Date.now();
    await sheetsService.addPurchaseData(testData, testLicenseKey);
    console.log("✅ 구글시트 데이터 추가 성공");

    return NextResponse.json({
      success: true,
      message: "구글시트 연동 성공!",
      testData,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("❌ 구글시트 연동 실패:", error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        name: error.name,
        stack: error.stack?.split("\n").slice(0, 5),
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}
