import nodemailer from "nodemailer";
import { GoogleSheetsService } from "./google-sheets";

export class LicenseService {
  constructor() {
    this.googleSheetsService = new GoogleSheetsService();
    
    // Gmail SMTP 설정
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  
  // 고유 라이선스 키 생성 (목업 - 백업용)
  generateMockLicenseKey(customerInfo) {
    const now = new Date();
    const year = now.getFullYear();
    const randomPart1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart3 = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    return `BLOG-${year}-${randomPart1}-${randomPart2}-${randomPart3}`;
  }
  
  // 실제 V3 라이선스 발급 (Render 백엔드)
  async generateRealLicense(customerInfo) {
    try {
      console.log("🚀 Render 백엔드 V3 라이선스 발급 시작:", customerInfo.orderId);
      
      // 기능 코드 결정
      const featureCodes = this.getFeatureCodes(customerInfo);
      
      // 아이디수와 글수 결정
      const accountCount = customerInfo.accountCount || customerInfo.accountIds || 1;
      const postCount = customerInfo.postCount || customerInfo.postsPerAccount || 1;
      const restrictions = `${accountCount}.${postCount}`; // 예: "3.3"
      
      // 사용 개월수
      const months = customerInfo.months || 1;
      const usageLimit = 30 * months; // 월별 30회
      
      const requestBody = {
        feature_codes: featureCodes,
        version: "v1",
        restrictions: restrictions,
        duration_months: months,
        usage_limit: usageLimit,
        user_id: 1, // 임시 사용자 ID
        hardware_id: customerInfo.hardwareId || "PENDING-ACTIVATION"
      };
      
      console.log("📤 Render API 요청 데이터:", requestBody);
      
      const response = await fetch('https://naver-auto-blog.onrender.com/licenses/modular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`Render API 오류: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ V3 라이선스 발급 성공:", data.license_key);
      
      return {
        licenseKey: data.license_key,
        licenseType: data.license_type,
        expireDate: data.expire_date,
        createdAt: data.created_at,
        featureCodes: data.feature_codes
      };
      
    } catch (error) {
      console.error("❌ V3 라이선스 발급 실패:", error);
      // 실패 시 목업 라이선스 반환
      return {
        licenseKey: this.generateMockLicenseKey(customerInfo),
        licenseType: "mock",
        expireDate: this.calculateExpiryDate(customerInfo.months || 12),
        createdAt: new Date().toISOString(),
        featureCodes: ["A", "B", "C", "D"]
      };
    }
  }
  
  // 기능 코드 매핑
  getFeatureCodes(customerInfo) {
    const codes = [];
    const productName = customerInfo.productName || customerInfo.productType || "";
    
    // 상품명에서 기능 추출
    if (productName.includes('글쓰기') || productName.includes('블로그')) codes.push('A');
    if (productName.includes('댓글')) codes.push('B');
    if (productName.includes('서로이웃')) codes.push('C');
    if (productName.includes('대댓글')) codes.push('D');
    
    // 기능이 하나도 없으면 전체 기능 제공
    return codes.length > 0 ? codes : ['A', 'B', 'C', 'D'];
  }
  
  // 라이선스 만료일 계산
  calculateExpiryDate(months = 12) {
    const now = new Date();
    const expiryDate = new Date(now);
    expiryDate.setMonth(expiryDate.getMonth() + months);
    return expiryDate.toISOString();
  }
  
  // 라이선스 이메일 템플릿 생성
  createLicenseEmailTemplate(licenseInfo) {
    // 은행 이체 고객과 일반 고객을 구분하여 제목 설정
    const isBankTransfer = licenseInfo.paymentMethod === "bank_transfer";
    const subject = isBankTransfer 
      ? "✅ 입금 확인 완료 및 라이선스 발급 안내" 
      : "🎉 블로그 자동화 프로그램 라이선스 발급 완료!";
    
    // 은행 이체 고객을 위한 추가 정보
    const paymentConfirmationSection = isBankTransfer ? `
      <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
        <h3 style="color: #28a745; margin-top: 0;">💰 입금 확인 완료</h3>
        <p><strong>입금자명:</strong> ${licenseInfo.depositorName || licenseInfo.customerName}</p>
        <p><strong>입금금액:</strong> ${licenseInfo.amount?.toLocaleString()}원</p>
        <p><strong>입금시간:</strong> ${licenseInfo.depositTime ? new Date(licenseInfo.depositTime).toLocaleDateString("ko-KR") + ' ' + new Date(licenseInfo.depositTime).toLocaleTimeString("ko-KR") : '방금 전'}</p>
        <p style="color: #28a745; font-weight: bold;">✅ 입금이 정상적으로 확인되어 라이선스를 자동 발급해드렸습니다.</p>
      </div>
    ` : '';
    
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
            <h1>${isBankTransfer ? '✅ 입금 확인 및 라이선스 발급 완료!' : '🎉 구매해주셔서 감사합니다!'}</h1>
            <p>${isBankTransfer ? '입금이 확인되어 라이선스가 자동 발급되었습니다.' : '블로그 자동화 프로그램 라이선스가 발급되었습니다.'}</p>
          </div>
          
          <div class="content">
            ${paymentConfirmationSection}
            
            <h2>라이선스 정보</h2>
            <div class="license-box">
              <h3>라이선스 키</h3>
              <div class="license-key" style="background: #f0f4ff; padding: 15px; border-radius: 8px; font-size: 20px; word-break: break-all;">${licenseInfo.licenseKey}</div>
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
                <td>${licenseInfo.productType}</td>
              </tr>
              <tr>
                <th>발급일</th>
                <td>${new Date(licenseInfo.createdAt).toLocaleDateString("ko-KR")}</td>
              </tr>
              <tr>
                <th>만료일</th>
                <td>${new Date(licenseInfo.expiryDate).toLocaleDateString("ko-KR")}</td>
              </tr>
              <tr>
                <th>결제금액</th>
                <td>${licenseInfo.amount?.toLocaleString()}원</td>
              </tr>
            </table>
            
            <div style="text-align: center;">
              <h3>💻 프로그램 다운로드</h3>
              <p>본인의 운영체제에 맞는 버전을 다운로드하세요:</p>
              
              <div style="margin: 20px 0;">
                <a href="${this.generateDownloadLink(licenseInfo.licenseKey, 'macos')}" class="download-btn" style="margin: 10px;">
                  🍎 macOS 다운로드 (Apple Silicon M1/M2/M3)
                </a>
                <br>
                <a href="${this.generateDownloadLink(licenseInfo.licenseKey, 'windows')}" class="download-btn" style="margin: 10px; background: #0078d4;">
                  🪟 Windows 다운로드 (64bit)
                </a>
              </div>
              <p style="font-size: 12px; color: #666;">다운로드 링크는 7일간 유효합니다</p>
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
              <li>📧 이메일: twins1850@gmail.com</li>
              <li>💬 카카오채널: <a href="http://pf.kakao.com/_ShwJn/chat" style="color: #667eea;">http://pf.kakao.com/_ShwJn/chat</a></li>
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
      from: process.env.GMAIL_USER,
      to: licenseInfo.customerEmail,
      subject: subject,
      html: html,
    };
  }
  
  // 라이선스 이메일 발송
  async sendLicenseEmail(licenseInfo) {
    try {
      const emailOptions = this.createLicenseEmailTemplate(licenseInfo);
      const result = await this.transporter.sendMail(emailOptions);
      
      console.log("✅ 라이선스 이메일 발송 성공:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("❌ 라이선스 이메일 발송 실패:", error);
      return { success: false, error: error.message };
    }
  }
  
  // 웹훅에서 호출할 라이선스 발급 메서드
  async issueLicenseFromPayment(paymentInfo) {
    try {
      console.log("🎯 웹훅 기반 라이선스 발급 시작:", paymentInfo);
      
      // 실제 V3 라이선스 발급
      const licenseResult = await this.generateRealLicense(paymentInfo);
      console.log("📄 V3 라이선스 발급 결과:", licenseResult);
      
      const licenseInfo = {
        licenseKey: licenseResult.licenseKey,
        customerName: paymentInfo.depositorName || paymentInfo.name,
        customerEmail: paymentInfo.customerEmail || paymentInfo.email,
        productType: paymentInfo.productType || "V3 모듈식",
        createdAt: licenseResult.createdAt || new Date().toISOString(),
        expiryDate: licenseResult.expireDate,
        amount: paymentInfo.amount,
        orderId: paymentInfo.orderId,
        paymentMethod: paymentInfo.paymentMethod || "bank_transfer",
        featureCodes: licenseResult.featureCodes,
        accountCount: paymentInfo.accountCount || paymentInfo.accountIds || 1,
        postCount: paymentInfo.postCount || paymentInfo.postsPerAccount || 1,
        months: paymentInfo.months || 1,
        depositorName: paymentInfo.depositorName,
        depositTime: paymentInfo.depositTime
      };
      
      console.log("📄 최종 라이선스 정보:", licenseInfo);
      
      // Google Sheets에 라이선스 정보 저장
      await this.googleSheetsService.addPurchaseData({
        ...paymentInfo,
        라이센스키: licenseResult.licenseKey,
        발급일시: licenseResult.createdAt,
        만료일시: licenseResult.expireDate,
        상태: "발급완료"
      });
      
      // 라이선스 이메일 발송
      const emailResult = await this.sendLicenseEmail(licenseInfo);
      
      return {
        success: true,
        licenseKey: licenseResult.licenseKey,
        licenseType: licenseResult.licenseType,
        emailSent: emailResult.success,
        emailMessageId: emailResult.messageId,
        expiryDate: licenseResult.expireDate
      };
      
    } catch (error) {
      console.error("❌ 웹훅 기반 라이선스 발급 실패:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  // 기존 주문 정보 기반 라이선스 발급 (기존 API와 호환)
  async issueLicense(customerInfo) {
    try {
      console.log("🎯 기존 방식 라이선스 발급 시작:", customerInfo);
      
      const licenseKey = this.generateLicenseKey(customerInfo);
      const expiryDate = this.calculateExpiryDate(customerInfo.months || 12);
      
      const licenseInfo = {
        licenseKey: licenseKey,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        productType: customerInfo.productType || "standard",
        createdAt: new Date().toISOString(),
        expiryDate: expiryDate,
        amount: customerInfo.amount,
        orderId: customerInfo.orderId
      };
      
      // Google Sheets에 데이터 저장
      await this.googleSheetsService.addCustomerData({
        ...customerInfo,
        라이센스키: licenseKey,
        발급일시: new Date().toISOString(),
        만료일시: expiryDate,
        상태: "발급완료"
      });
      
      // VL21 임시 라이선스만 발급 (실제 라이선스는 GUI에서 활성화)
      console.log("📧 VL21 임시 라이선스 발급 완료, GUI 활성화 대기 상태");
      
      return {
        success: true,
        licenseKey: licenseKey,
        temporaryLicense: licenseKey,
        stepResults: ["라이선스 생성", "Google Sheets 저장"],
        emailMessageId: null // VL21은 이메일 발송하지 않음
      };
      
    } catch (error) {
      console.error("❌ 기존 방식 라이선스 발급 실패:", error);
      return {
        success: false,
        error: error.message,
        message: "라이선스 발급 중 오류가 발생했습니다"
      };
    }
  }
  
  // 보안 다운로드 링크 생성
  generateDownloadLink(licenseKey, os) {
    // 기본 토큰 생성 (실제로는 JWT 등 사용 권장)
    const token = Buffer.from(JSON.stringify({
      licenseKey: licenseKey,
      os: os,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7일
    })).toString('base64');
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autotoolshub.com';
    return `${baseUrl}/api/download/${token}`;
  }
  
  // 라이선스 재발송
  async resendLicense(email) {
    try {
      // Google Sheets에서 이메일로 라이선스 정보 조회
      // TODO: 실제 구현 필요
      
      return {
        success: false,
        message: "라이선스 재발송 기능은 아직 구현되지 않았습니다",
        error: "Not implemented"
      };
    } catch (error) {
      return {
        success: false,
        message: "라이선스 재발송 중 오류가 발생했습니다",
        error: error.message
      };
    }
  }
}