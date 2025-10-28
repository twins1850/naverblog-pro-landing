import { NextRequest, NextResponse } from "next/server";
import { GoogleSheetsService } from "@/lib/google-sheets";
import { EmailService } from "@/lib/email-service";
import { GmailEmailService } from "@/lib/email-service-gmail";

// 통합 구조로 변경: 구매 정보는 issue-license에서 함께 처리됩니다.
// 이 API는 하위 호환성을 위해 유지하지만 실제로는 사용하지 않는 것을 권장합니다.
export async function POST(request: NextRequest) {
  try {
    console.log("구매 정보 저장 및 Google Sheets 연동 시작");
    
    const body = await request.json();

    const {
      name,
      email,
      phone,
      amount,
      accountCount,
      postCount,
      months,
      orderId,
      paymentKey,
      status = "결제완료",
    } = body;

    // 입력 데이터 검증
    if (
      !name ||
      !email ||
      !phone ||
      !amount ||
      !accountCount ||
      !postCount ||
      !months ||
      !orderId
    ) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 🆕 Google Sheets 자동 연동 재활성화
    try {
      // 환경변수 확인
      if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
        console.warn('⚠️ Google Sheets 환경변수가 설정되지 않았습니다. 로컬 저장만 수행합니다.');
        
        // 로컬 로그만 저장
        console.log('📋 주문 정보 (로컬 저장):', {
          이름: name,
          이메일: email,
          연락처: phone,
          결제금액: `₩${amount.toLocaleString()}`,
          주문번호: orderId,
          입금자명: body.depositName || "",
          결제방식: body.paymentMethod || "manual",
        });

        return NextResponse.json({
          success: true,
          message: "구매 정보가 접수되었습니다. (로컬 환경)",
          orderId: orderId,
          googleSheetsUpdated: false,
          note: "Google Sheets 연동이 설정되지 않았습니다.",
        });
      }

      const googleSheetsService = new GoogleSheetsService();
      
      const customerData = {
        이름: name,
        이메일: email,
        연락처: phone,
        결제일시: new Date().toISOString(),
        결제금액: `₩${amount.toLocaleString()}`,
        상품유형: `blog-pro-${accountCount}계정-${postCount}글-${months}개월`,
        아이디수: accountCount,
        글수: postCount,
        개월수: months,
        라이센스키: "", // 추후 발급
        발급일시: "",
        만료일시: "",
        상태: "입금대기",
        하드웨어ID: "",
        결제상태: status,
        주문번호: orderId,
        결제ID: paymentKey || "",
        입금자명: body.depositName || "",
        결제방식: body.paymentMethod || "manual",
      };

      await googleSheetsService.addCustomerData(customerData);
      console.log("✅ Google Sheets 자동 연동 성공:", orderId);

      // 이메일 발송 (Brevo 우선, Gmail 대체)
      let emailSent = false;
      try {
        // Brevo 이메일 서비스 시도
        if (process.env.BREVO_API_KEY && process.env.BREVO_API_KEY !== "your_brevo_api_key_here") {
          const emailService = new EmailService();
          await emailService.sendOrderConfirmationEmail({
            email,
            name,
            orderId,
            productName: body.productName || `blog-pro-${accountCount}계정-${postCount}글-${months}개월`,
            amount,
            accountIds: accountCount,
            postsPerAccount: postCount,
            months,
            phone
          });
          console.log("✅ Brevo 주문 확인 이메일 발송 성공:", email);
          emailSent = true;
        } else {
          throw new Error("Brevo API 키가 설정되지 않았습니다.");
        }
      } catch (brevoError) {
        console.warn("⚠️ Brevo 이메일 발송 실패, Gmail로 재시도:", brevoError);
        
        // Gmail 이메일 서비스로 대체
        try {
          if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && process.env.GMAIL_APP_PASSWORD !== "your_gmail_app_password_here") {
            const gmailService = new GmailEmailService();
            await gmailService.sendOrderConfirmationEmail({
              email,
              name,
              orderId,
              productName: body.productName || `blog-pro-${accountCount}계정-${postCount}글-${months}개월`,
              amount,
              accountIds: accountCount,
              postsPerAccount: postCount,
              months,
              phone
            });
            console.log("✅ Gmail 주문 확인 이메일 발송 성공:", email);
            emailSent = true;
          } else {
            console.error("❌ Gmail 설정도 완료되지 않았습니다.");
          }
        } catch (gmailError) {
          console.error("❌ Gmail 이메일 발송 실패:", gmailError);
          // 이메일 발송 실패는 전체 프로세스를 중단시키지 않음
        }
      }

      return NextResponse.json({
        success: true,
        message: "구매 정보가 성공적으로 저장되었습니다.",
        orderId: orderId,
        googleSheetsUpdated: true,
        emailSent: emailSent,
      });
      
    } catch (sheetsError) {
      console.error("❌ Google Sheets 연동 실패:", sheetsError);
      
      // Google Sheets 실패해도 구매는 성공으로 처리
      return NextResponse.json({
        success: true,
        message: "구매 정보는 저장되었지만 Google Sheets 연동에 실패했습니다.",
        orderId: orderId,
        googleSheetsUpdated: false,
        warning: "관리자에게 문의하세요.",
      });
    }
    
  } catch (error) {
    console.error("구매 정보 저장 중 오류:", error);
    return NextResponse.json(
      { 
        error: "구매 정보 저장 중 오류가 발생했습니다.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
