import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 간단한 구글시트 연결 테스트 시작...");
    
    // 환경변수 확인
    console.log("GOOGLE_SHEETS_SPREADSHEET_ID:", !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
    console.log("GOOGLE_SERVICE_ACCOUNT_JSON:", !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    
    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      return NextResponse.json({
        success: false,
        error: "Missing GOOGLE_SHEETS_SPREADSHEET_ID"
      }, { status: 500 });
    }
    
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      return NextResponse.json({
        success: false,
        error: "Missing GOOGLE_SERVICE_ACCOUNT_JSON"
      }, { status: 500 });
    }

    // JSON 파싱
    let credentials;
    try {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      console.log("✅ JSON 파싱 성공");
      console.log("📧 Client Email:", credentials.client_email);
    } catch (e) {
      const error = e as Error;
      console.error("❌ JSON 파싱 실패:", error);
      return NextResponse.json({
        success: false,
        error: "JSON parsing failed",
        details: error.message
      }, { status: 500 });
    }

    // Google Auth 설정
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    console.log("📋 스프레드시트 접근 시도...");
    
    // 간단한 읽기 테스트 (A1:A1 셀만 읽기)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "A1:A1",
    });

    console.log("✅ 구글시트 접근 성공!");
    console.log("📊 응답 데이터:", response.data);

    return NextResponse.json({
      success: true,
      message: "구글시트 연결 성공!",
      data: response.data,
      spreadsheetId: spreadsheetId,
      serviceAccount: credentials.client_email,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("❌ 구글시트 연결 실패:", error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        name: error.name,
        code: error.code,
        status: error.status,
        stack: error.stack?.split("\n").slice(0, 3),
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
} 