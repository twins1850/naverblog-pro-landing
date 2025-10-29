import { NextRequest, NextResponse } from "next/server";
import { LicenseService } from "@/lib/license-service.js";

export async function POST(request: NextRequest) {
  try {
    console.log("🧪 라이선스 인코딩 테스트 API 호출됨");
    
    const { testCase } = await request.json();
    const licenseService = new LicenseService();
    
    // 테스트 케이스별 고객 정보 구성
    const testCases: Record<string, any> = {
      "comment_only": {
        name: "댓글자동화만 (B → G4 예상)",
        customerInfo: {
          orderId: "TEST-G4-001",
          productName: "댓글자동화",
          accountCount: 5,
          postCount: 1,
          months: 3,
          depositorName: "테스트고객",
          customerEmail: "test@example.com"
        },
        expected: "G4"
      },
      "blog_only": {
        name: "글쓰기자동화만 (A → F2 예상)",
        customerInfo: {
          orderId: "TEST-F2-001", 
          productName: "글쓰기자동화",
          accountCount: 3,
          postCount: 3,
          months: 1,
          depositorName: "테스트고객2",
          customerEmail: "test2@example.com"
        },
        expected: "F2"
      },
      "blog_comment": {
        name: "글쓰기+댓글 (AB → K3 예상)",
        customerInfo: {
          orderId: "TEST-K3-001",
          productName: "글쓰기자동화 + 댓글자동화",
          accountCount: 5,
          postCount: 3,
          months: 3,
          depositorName: "테스트고객3",
          customerEmail: "test3@example.com"
        },
        expected: "K3"
      }
    };
    
    const currentTest = testCases[testCase];
    if (!currentTest) {
      return NextResponse.json({
        error: "유효하지 않은 테스트 케이스",
        availableTests: Object.keys(testCases)
      }, { status: 400 });
    }
    
    console.log(`📋 테스트 실행: ${currentTest.name}`);
    console.log(`   예상 인코딩: ${currentTest.expected}`);
    
    // 라이선스 생성 테스트
    const result = await licenseService.generateRealLicense(currentTest.customerInfo);
    const actualEncoding = result.licenseKey.split('-')[0];
    
    const testResult = {
      testName: currentTest.name,
      expected: currentTest.expected,
      actual: actualEncoding,
      licenseKey: result.licenseKey,
      encodedFeature: result.encodedFeature,
      success: actualEncoding === currentTest.expected,
      customerInfo: currentTest.customerInfo
    };
    
    console.log(`   생성된 라이선스: ${result.licenseKey}`);
    console.log(`   실제 인코딩: ${actualEncoding}`);
    console.log(`   서버 응답 인코딩: ${result.encodedFeature}`);
    console.log(`   결과: ${testResult.success ? '✅ 성공' : '❌ 실패'}`);
    
    return NextResponse.json({
      success: true,
      message: "라이선스 인코딩 테스트 완료",
      testResult: testResult
    });
    
  } catch (error) {
    console.error("❌ 라이선스 인코딩 테스트 실패:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "라이선스 인코딩 테스트 API",
    usage: "POST with { testCase: 'comment_only' | 'blog_only' | 'blog_comment' }",
    available_tests: [
      "comment_only - 댓글자동화만 (G4 예상)",
      "blog_only - 글쓰기자동화만 (F2 예상)", 
      "blog_comment - 글쓰기+댓글 (K3 예상)"
    ]
  });
}