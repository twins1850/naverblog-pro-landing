import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 보안을 위해 실제 값은 숨기고 존재 여부와 길이만 표시
  const envStatus = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    emailConfig: {
      GMAIL_USER: {
        exists: !!process.env.GMAIL_USER,
        value: process.env.GMAIL_USER ? process.env.GMAIL_USER.substring(0, 5) + '***' : 'NOT SET',
        length: process.env.GMAIL_USER?.length || 0
      },
      GMAIL_APP_PASSWORD: {
        exists: !!process.env.GMAIL_APP_PASSWORD,
        length: process.env.GMAIL_APP_PASSWORD?.length || 0,
        isPlaceholder: process.env.GMAIL_APP_PASSWORD === "your_gmail_app_password_here"
      },
      BREVO_API_KEY: {
        exists: !!process.env.BREVO_API_KEY,
        length: process.env.BREVO_API_KEY?.length || 0,
        isPlaceholder: process.env.BREVO_API_KEY === "your_brevo_api_key_here"
      },
      BREVO_SENDER_EMAIL: {
        exists: !!process.env.BREVO_SENDER_EMAIL,
        value: process.env.BREVO_SENDER_EMAIL || 'NOT SET'
      }
    },
    googleSheets: {
      SPREADSHEET_ID: {
        exists: !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
        value: process.env.GOOGLE_SHEETS_SPREADSHEET_ID ? 
          process.env.GOOGLE_SHEETS_SPREADSHEET_ID.substring(0, 10) + '***' : 'NOT SET'
      },
      SERVICE_ACCOUNT: {
        exists: !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
        length: process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.length || 0
      }
    }
  };

  return NextResponse.json(envStatus);
}