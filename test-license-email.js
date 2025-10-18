import dotenv from "dotenv";
import nodemailer from "nodemailer";

// 환경변수 로드
dotenv.config();

// 다운로드 링크 설정 (예시)
const DOWNLOAD_LINKS = {
  APPLE_SILICON: process.env.DOWNLOAD_LINK_APPLE_SILICON || "https://github.com/your-repo/releases/download/v1.0.0/BlogPro-macOS.dmg",
  WINDOWS: process.env.DOWNLOAD_LINK_WINDOWS || "https://github.com/your-repo/releases/download/v1.0.0/BlogPro-Windows.exe"
};

// Gmail SMTP 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 라이선스 이메일 템플릿 생성
function createLicenseEmailTemplate(licenseInfo) {
  const subject = "🎉 블로그 자동화 프로그램 라이선스 발급 완료!";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .license-box { background: #fff; padding: 20px; border: 2px solid #667eea; border-radius: 8px; margin: 20px 0; text-align: center; }
        .license-key { font-family: monospace; font-size: 18px; font-weight: bold; color: #667eea; letter-spacing: 2px; }
        .download-btn { background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .info-table th, .info-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        .info-table th { background: #f5f5f5; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 구매해주셔서 감사합니다!</h1>
          <p>블로그 자동화 프로그램 라이선스가 발급되었습니다.</p>
        </div>
        
        <div class="content">
          <h2>라이선스 정보</h2>
          <div class="license-box">
            <h3>라이선스 키</h3>
            <div class="license-key">${licenseInfo.licenseKey}</div>
            <p><strong>⚠️ 이 라이선스 키를 안전하게 보관해주세요!</strong></p>
          </div>
          
          <table class="info-table">
            <tr>
              <th>구매자명</th>
              <td>${licenseInfo.customerName}</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>${licenseInfo.customerEmail}</td>
            </tr>
            <tr>
              <th>상품 유형</th>
              <td>${licenseInfo.productType === "standard" ? "스탠다드" : "프리미엄"}</td>
            </tr>
            <tr>
              <th>발급일</th>
              <td>${new Date(licenseInfo.createdAt).toLocaleDateString("ko-KR")}</td>
            </tr>
            <tr>
              <th>만료일</th>
              <td>${new Date(licenseInfo.expiryDate).toLocaleDateString("ko-KR")}</td>
            </tr>
          </table>
          
                    <div style="text-align: center;">
            <h3>💻 운영체제별 다운로드</h3>
            <p>본인의 운영체제에 맞는 버전을 다운로드하세요:</p>
            
            <div style="margin: 20px 0;">
              <a href="${DOWNLOAD_LINKS.APPLE_SILICON}" class="download-btn" style="margin: 10px;">
                🍎 macOS (Apple Silicon M1/M2/M3)
              </a>
              <br>
              <a href="${process.env.DOWNLOAD_LINK_WINDOWS || "https://github.com/your-repo/releases/download/v1.0.0/BlogPro-Windows.exe"}" class="download-btn" style="margin: 10px; background: #0078d4;">
                🪟 Windows (64bit)
              </a>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left; border-left: 4px solid #ffc107;">
              <h4>⚠️ 시스템 요구사항</h4>
              <ul style="margin: 10px 0;">
                <li><strong>macOS</strong>: Apple Silicon Mac (M1/M2/M3) + macOS 11.0 이상</li>
                <li><strong>Windows</strong>: Windows 10/11 (64bit)</li>
              </ul>
              <p style="margin: 10px 0; color: #856404;"><strong>참고:</strong> Intel Mac은 현재 지원하지 않습니다.</p>
            </div>
            
            <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left;">
              <h4>🤔 내 Mac이 Apple Silicon인지 확인하는 방법</h4>
              <ol style="margin: 10px 0;">
                <li>화면 왼쪽 상단 🍎 메뉴 클릭</li>
                <li>"이 Mac에 관하여" 선택</li>
                <li><strong>칩</strong> 항목에서 "Apple M1/M2/M3" 확인</li>
                <li>Intel이 표시되면 현재 지원하지 않습니다</li>
              </ol>
            </div>
          </div>
          
          <h3>사용 방법</h3>
          <ol>
            <li>위 다운로드 링크에서 프로그램을 다운로드하세요.</li>
            <li>프로그램을 실행하고 라이선스 키를 입력하세요.</li>
            <li>블로그 자동화를 시작하세요!</li>
          </ol>
          
          <h3>고객 지원</h3>
          <p>궁금한 점이 있으시면 언제든지 연락해주세요:</p>
          <ul>
            <li>📧 이메일: ${process.env.SUPPORT_EMAIL || "yegreen2010@gmail.com"}</li>
            <li>💬 카카오톡: ${process.env.KAKAO_ID || "@blogpro"}</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>© 2024 블로그 자동화 프로그램. All rights reserved.</p>
          <p>이 이메일은 자동으로 발송되었습니다.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    from: process.env.EMAIL_USER,
    to: licenseInfo.customerEmail,
    subject: subject,
    html: html,
  };
}

async function testLicenseEmail() {
  console.log("🎯 라이선스 이메일 발송 테스트");

  try {
    // 테스트 라이선스 정보
    const testLicenseInfo = {
      licenseKey: "BLOG-TEST-1234-ABCD-5678",
      customerName: "김철수",
      customerEmail: "yegreen2010@gmail.com",
      productType: "standard",
      createdAt: new Date().toISOString(),
      expiryDate: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
    };

    // 이메일 옵션 생성
    const emailOptions = createLicenseEmailTemplate(testLicenseInfo);

    console.log("📧 라이선스 이메일 발송 중...");
    const result = await transporter.sendMail(emailOptions);

    console.log("✅ 라이선스 이메일 발송 성공!");
    console.log("📨 Message ID:", result.messageId);
    console.log("📬 받는 사람:", testLicenseInfo.customerEmail);
    console.log("🎫 라이선스 키:", testLicenseInfo.licenseKey);

    console.log("\n🎉 Gmail 이메일 시스템이 완벽하게 작동합니다!");
    console.log("💼 이제 실제 결제→라이선스 발급→이메일 발송이 가능합니다.");
  } catch (error) {
    console.error("❌ 라이선스 이메일 발송 실패:", error.message);
  }
}

testLicenseEmail();
