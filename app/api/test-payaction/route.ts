import { NextRequest, NextResponse } from "next/server";

/**
 * PayAction 웹훅 테스트 API
 * 실제 PayAction 웹훅 데이터 구조를 시뮬레이션하여 전체 플로우를 테스트합니다.
 */
export async function POST(request: NextRequest) {
  try {
    console.log("🧪 PayAction 웹훅 테스트 시작");
    
    const body = await request.json();
    const testOrderId = body.testOrderId || "BLOG202510296709";
    
    // 테스트용 PayAction 웹훅 데이터 생성
    const testPayload = {
      type: "deposit_confirmed",
      data: {
        orderId: testOrderId,
        depositorName: "김테스트",
        amount: 110000,
        bankName: "국민은행",
        accountNumber: "123-456-789",
        depositTime: new Date().toISOString(),
        customerEmail: "twins1850@naver.com",
        customerName: "김테스트",
        customerPhone: "010-1234-5678",
        productName: "글쓰기자동화",
        accountIds: 1,
        postsPerAccount: 1,
        months: 1
      }
    };

    console.log("📤 테스트 페이로드:", testPayload);

    // PayAction 웹훅 API 호출
    const webhookUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/payaction-webhook`;
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload)
    });

    const result = await response.json();
    
    console.log("📨 웹훅 응답:", result);

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "PayAction 웹훅 테스트 성공",
        webhookResponse: result,
        testPayload: testPayload
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "PayAction 웹훅 테스트 실패",
        error: result,
        testPayload: testPayload
      }, { status: 500 });
    }

  } catch (error) {
    console.error("❌ PayAction 웹훅 테스트 오류:", error);
    return NextResponse.json({
      error: "테스트 중 오류가 발생했습니다",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// GET 요청으로 테스트 정보 확인
export async function GET() {
  return NextResponse.json({
    message: "PayAction 웹훅 테스트 API",
    description: "POST 요청으로 PayAction 웹훅을 시뮬레이션합니다",
    endpoint: "/api/test-payaction",
    method: "POST",
    note: "실제 주문번호로 orderId를 변경 후 테스트하세요"
  });
}