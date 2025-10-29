// Test script to verify license encoding fix
const { LicenseService } = require('./lib/license-service.js');

async function testLicenseEncoding() {
  console.log("🧪 라이선스 인코딩 테스트 시작...\n");
  
  const licenseService = new LicenseService();
  
  // 테스트 케이스들
  const testCases = [
    {
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
    {
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
    {
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
  ];
  
  for (const testCase of testCases) {
    console.log(`\n📋 테스트: ${testCase.name}`);
    console.log(`   예상 인코딩: ${testCase.expected}`);
    
    try {
      const result = await licenseService.generateRealLicense(testCase.customerInfo);
      const actualEncoding = result.licenseKey.split('-')[0];
      
      console.log(`   생성된 라이선스: ${result.licenseKey}`);
      console.log(`   실제 인코딩: ${actualEncoding}`);
      console.log(`   서버 응답 인코딩: ${result.encodedFeature}`);
      
      if (actualEncoding === testCase.expected) {
        console.log(`   ✅ 성공: 예상 인코딩과 일치`);
      } else {
        console.log(`   ❌ 실패: 예상 ${testCase.expected}, 실제 ${actualEncoding}`);
      }
      
    } catch (error) {
      console.log(`   💥 오류: ${error.message}`);
    }
  }
  
  console.log("\n🏁 테스트 완료");
}

// Node.js 직접 실행시에만 테스트 실행
if (require.main === module) {
  testLicenseEncoding().catch(console.error);
}

module.exports = { testLicenseEncoding };