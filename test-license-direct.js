// 수정된 라이선스 서비스 직접 테스트
const { LicenseService } = require('./lib/license-service.js');

async function testDirectLicense() {
  console.log("🧪 수정된 라이선스 서비스 직접 테스트 시작...\n");
  
  const licenseService = new LicenseService();
  
  // AD 조합 테스트 (글쓰기 + 대댓글)
  const testInfo = {
    orderId: "DIRECT-M7-TEST-001",
    productName: "글쓰기자동화 + 대댓글자동화",
    accountCount: 5,
    postCount: 3,
    months: 3,
    depositorName: "김테스트M7",
    customerEmail: "twins1850@naver.com",
    amount: 80000
  };
  
  console.log("📋 테스트 고객 정보:", testInfo);
  console.log("   예상 인코딩: M7 (A+D 조합)");
  
  try {
    const result = await licenseService.generateRealLicense(testInfo);
    const actualEncoding = result.licenseKey.split('-')[0];
    
    console.log(`\n✅ 라이선스 발급 성공:`);
    console.log(`   생성된 라이선스: ${result.licenseKey}`);
    console.log(`   실제 인코딩: ${actualEncoding}`);
    console.log(`   서버 응답 인코딩: ${result.encodedFeature}`);
    console.log(`   기능 코드: ${result.featureCodes}`);
    
    if (actualEncoding === 'M7') {
      console.log(`   🎉 성공: AD 조합이 정확히 M7 인코딩으로 생성됨!`);
    } else {
      console.log(`   ❌ 실패: 예상 M7, 실제 ${actualEncoding}`);
    }
    
  } catch (error) {
    console.log(`   💥 오류: ${error.message}`);
  }
}

testDirectLicense().catch(console.error);