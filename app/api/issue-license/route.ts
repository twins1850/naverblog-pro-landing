import { NextRequest, NextResponse } from "next/server";
import { LicenseService } from "../../../lib/license-service.js";

export async function POST(request: NextRequest) {
  try {
    console.log("🎯 라이선스 발급 API 호출됨");
    const customerInfo = await request.json();
    console.log("📋 수신된 고객 정보:", JSON.stringify(customerInfo, null, 2));

    // 필수 필드 검증
    if (!customerInfo.name || !customerInfo.email || !customerInfo.orderId) {
      console.error("❌ 필수 필드 누락:", {
        name: !!customerInfo.name,
        email: !!customerInfo.email,
        orderId: !!customerInfo.orderId,
      });
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다. (이름, 이메일, 주문번호)" },
        { status: 400 }
      );
    }

    console.log("✅ 필수 필드 검증 통과");
    
    // 🆕 1단계: 백엔드 DB에 구매 데이터 저장
    const backendUrl = process.env.BACKEND_URL || 
      (process.env.NODE_ENV === "production" 
        ? "https://naver-auto-blog.onrender.com" 
        : "https://naver-auto-blog.onrender.com");  // 항상 실제 서버 사용
    
    console.log("🗄️ 백엔드 DB에 구매 데이터 저장 중...", backendUrl);
    try {
      // 버전 계산 (accountCount.postCount 형식)
      const accountCount = customerInfo.accountCount || 1;
      const postCount = customerInfo.postCount || 1;
      const version = `${accountCount}.${postCount}`;
      
      // 🔧 올바른 엔드포인트 사용 (중복 경로 제거)
      const backendResponse = await fetch(`${backendUrl}/purchases/create-from-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: customerInfo.orderId,
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone || "000-0000-0000",
          version: version,
          account_count: accountCount,
          post_count: postCount,
          months: customerInfo.months || 1,
          amount: customerInfo.amount || 0,
          payment_status: "completed",
          payment_id: customerInfo.paymentKey || `payment-${customerInfo.orderId}`,
          user_email: customerInfo.email,
          product_name: `BlogPro ${version}`
        })
      });

      if (backendResponse.ok) {
        const backendData = await backendResponse.json();
        console.log("✅ 백엔드 DB 저장 성공:", backendData.temporary_license);
        customerInfo.temporaryLicense = backendData.temporary_license;
        
        // VL21 임시 라이선스만 발급 (GUI에서 활성화 대기)
        console.log("📧 VL21 임시 라이선스 발급 완료, GUI 활성화 대기 상태");
      } else {
        const errorData = await backendResponse.text();
        console.warn("⚠️ 백엔드 DB 저장 실패:", errorData);
        // 백엔드 저장 실패해도 계속 진행 (기존 로직 유지)
      }
    } catch (backendError) {
      console.warn("⚠️ 백엔드 연결 실패:", backendError);
      // 백엔드 연결 실패해도 계속 진행 (기존 로직 유지)
    }

    console.log("🚀 라이선스 발급 서비스 시작...");

    // 2단계: 라이선스 발급 서비스 실행 (구글시트 저장)
    const licenseService = new LicenseService();
    const result: any = await licenseService.issueLicense(customerInfo);

    console.log("📊 라이선스 발급 결과:", {
      success: result.success,
      licenseKey: result.licenseKey ? "생성됨" : "없음",
      temporaryLicense: result.temporaryLicense ? "생성됨" : "없음",
      finalLicense: customerInfo.finalLicense ? "생성됨" : "없음",
      stepResults: result.stepResults,
      errorMessage: result.error,
    });

    if (result.success) {
      console.log("🎉 VL21 임시 라이선스 발급 API 성공 완료");
      return NextResponse.json({
        success: true,
        message: "VL21 임시 라이선스가 발급되었습니다. GUI에서 활성화해주세요.",
        licenseKey: customerInfo.temporaryLicense || result.temporaryLicense, // VL21 임시 라이선스 반환
        temporaryLicense: customerInfo.temporaryLicense || result.temporaryLicense,
        finalLicense: null, // 최종 라이선스는 GUI에서 활성화 시 생성
        emailMessageId: result.emailMessageId,
        stepResults: result.stepResults,
        licenseType: "VL21_TEMPORARY"
      });
    } else {
      console.error("❌ 라이선스 발급 실패:", result.message);
      return NextResponse.json(
        {
          error: result.message,
          details: result.error,
          stepResults: result.stepResults,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("💥 라이선스 발급 API 치명적 오류:", error);
    console.error("📍 오류 스택:", error.stack);

    return NextResponse.json(
      {
        error: "서버 내부 오류가 발생했습니다.",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// 라이선스 재발송 API
export async function PUT(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "이메일이 필요합니다." },
        { status: 400 }
      );
    }

    console.log("라이선스 재발송 요청:", email);

    const licenseService = new LicenseService();
    const result: any = await licenseService.resendLicense(email);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        emailMessageId: result.emailMessageId,
      });
    } else {
      return NextResponse.json(
        {
          error: result.message,
          details: result.error,
        },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("라이선스 재발송 API 오류:", error);
    return NextResponse.json(
      { error: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
