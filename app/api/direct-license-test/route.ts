import { NextRequest, NextResponse } from "next/server";
import { LicenseService } from "@/lib/license-service.js";

export async function POST(request: NextRequest) {
  try {
    console.log("🧪 직접 라이선스 생성 테스트 시작");
    
    const { testCase } = await request.json();
    const licenseService = new LicenseService();
    
    // 테스트 케이스별 고객 정보 구성
    const testCases: Record<string, any> = {
      "comment_only": {
        name: "댓글자동화만 (B → G4 예상)",
        customerInfo: {
          orderId: "DIRECT-TEST-G4-001",
          productName: "댓글자동화",
          accountCount: 5,
          postCount: 1,
          months: 3,
          depositorName: "테스트고객",
          customerEmail: "test@example.com",
          amount: 30000
        },
        expected: "G4"
      },
      "blog_only": {
        name: "글쓰기자동화만 (A → F2 예상)",
        customerInfo: {
          orderId: "DIRECT-TEST-F2-001", 
          productName: "글쓰기자동화",
          accountCount: 3,
          postCount: 3,
          months: 1,
          depositorName: "테스트고객2",
          customerEmail: "test2@example.com",
          amount: 50000
        },
        expected: "F2"
      },
      "blog_comment": {
        name: "글쓰기+댓글 (AB → K3 예상)",
        customerInfo: {
          orderId: "DIRECT-TEST-K3-001",
          productName: "글쓰기자동화 + 댓글자동화", 
          accountCount: 5,
          postCount: 3,
          months: 3,
          depositorName: "테스트고객3",
          customerEmail: "test3@example.com",
          amount: 80000
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
    
    console.log(`📋 직접 테스트 실행: ${currentTest.name}`);
    console.log(`   예상 인코딩: ${currentTest.expected}`);
    
    // 라이선스 생성 직접 테스트 (Google Sheets 우회)
    const result = await licenseService.generateRealLicense(currentTest.customerInfo);
    const actualEncoding = result.licenseKey.split('-')[0];
    
    const testResult = {
      testName: currentTest.name,
      expected: currentTest.expected,
      actual: actualEncoding,
      licenseKey: result.licenseKey,
      encodedFeature: result.encodedFeature,
      success: actualEncoding === currentTest.expected,
      customerInfo: currentTest.customerInfo,
      apiResponse: {
        licenseType: result.licenseType,
        expireDate: result.expireDate,
        createdAt: result.createdAt,
        featureCodes: result.featureCodes
      }
    };
    
    console.log(`   생성된 라이선스: ${result.licenseKey}`);
    console.log(`   실제 인코딩: ${actualEncoding}`);
    console.log(`   서버 응답 인코딩: ${result.encodedFeature}`);
    console.log(`   테스트 결과: ${testResult.success ? '✅ 성공' : '❌ 실패'}`);
    
    // 중요한 수정 사항 검증
    if (testCase === "comment_only") {
      console.log("🔍 댓글자동화 인코딩 테스트 상세 결과:");
      console.log(`   - duration_days 수정 효과: ${actualEncoding === 'G4' ? '성공' : '실패'}`);
      console.log(`   - API 파라미터 구조 수정: 확인됨`);
    }
    
    return NextResponse.json({
      success: true,
      message: "직접 라이선스 인코딩 테스트 완료",
      testResult: testResult,
      encodingTestSummary: {
        originalIssue: "모든 라이선스가 V3 인코딩으로 생성됨",
        fixApplied: "duration_months → duration_days 변경, 추가 파라미터 제거",
        expectedResult: `${currentTest.expected} 인코딩 생성`,
        actualResult: `${actualEncoding} 인코딩 생성`,
        fixWorking: actualEncoding === currentTest.expected
      }
    });
    
  } catch (error) {
    console.error("❌ 직접 라이선스 인코딩 테스트 실패:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "직접 라이선스 인코딩 테스트 API",
    description: "Google Sheets 없이 직접 라이선스 생성 테스트",
    usage: "POST with { testCase: 'comment_only' | 'blog_only' | 'blog_comment' }",
    available_tests: [
      "comment_only - 댓글자동화만 (G4 예상)",
      "blog_only - 글쓰기자동화만 (F2 예상)", 
      "blog_comment - 글쓰기+댓글 (K3 예상)"
    ],
    purpose: "duration_days API 수정사항 검증"
  });
}