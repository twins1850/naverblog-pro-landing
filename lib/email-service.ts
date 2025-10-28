export class EmailService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.BREVO_API_KEY || '';
  }

  async sendOrderConfirmationEmail(orderData: {
    email: string;
    name: string;
    orderId: string;
    productName: string;
    amount: number;
    accountIds: number;
    postsPerAccount: number;
    months: number;
    phone: string;
  }): Promise<void> {
    try {
      const emailPayload = {
        sender: {
          name: process.env.BREVO_SENDER_NAME || 'Blog Pro Support',
          email: process.env.BREVO_SENDER_EMAIL || 'jireh202503@gmail.com'
        },
        to: [{ 
          email: orderData.email, 
          name: orderData.name 
        }],
        subject: `[Blog Pro] 주문 접수 완료 - ${orderData.orderId}`,
        htmlContent: this.generateOrderConfirmationHTML(orderData),
        textContent: this.generateOrderConfirmationText(orderData)
      };

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': this.apiKey
        },
        body: JSON.stringify(emailPayload)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }

      const result = await response.json();
      console.log('✅ 주문 확인 이메일 발송 성공:', result.messageId);
    } catch (error) {
      console.error('❌ 이메일 발송 실패:', error);
      throw error;
    }
  }

  private generateOrderConfirmationHTML(orderData: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Blog Pro 주문 접수 완료</title>
        <style>
          body { font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
          .order-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .bank-info { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196f3; }
          .highlight { color: #2196f3; font-weight: bold; }
          .warning { background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0; }
          .contact-info { background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 주문이 접수되었습니다!</h1>
            <p>Blog Pro 블로그 자동화 서비스</p>
          </div>
          
          <div class="content">
            <p><strong>${orderData.name}</strong>님, 안녕하세요!</p>
            <p>Blog Pro 주문이 성공적으로 접수되었습니다. 아래 내용을 확인해주세요.</p>
            
            <div class="order-info">
              <h3>📋 주문 정보</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>주문번호:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${orderData.orderId}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>상품명:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${orderData.productName}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>결제금액:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;" class="highlight">₩${orderData.amount.toLocaleString()}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>아이디 수:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${orderData.accountIds}개</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>일일 글 수:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${orderData.postsPerAccount}개</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>이용 기간:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${orderData.months}개월</td></tr>
                <tr><td style="padding: 8px 0;"><strong>연락처:</strong></td><td style="padding: 8px 0;">${orderData.phone}</td></tr>
              </table>
            </div>

            <div class="bank-info">
              <h3>🏦 입금 계좌 정보</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>은행명:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">케이뱅크</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>계좌번호:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;" class="highlight">100-232-962872</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>예금주:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">김형원</td></tr>
                <tr><td style="padding: 8px 0;"><strong>입금금액:</strong></td><td style="padding: 8px 0;" class="highlight">₩${orderData.amount.toLocaleString()}</td></tr>
              </table>
              <p style="color: #ff0000; font-weight: bold; margin-top: 10px;">
                ⚠️ 반드시 주문 시 입력한 이름과 동일한 입금자명으로 입금해주세요!
              </p>
            </div>

            <div class="warning">
              <h4>⚠️ 중요 안내사항</h4>
              <ul>
                <li><strong>입금 기한:</strong> 주문 후 <strong style="color: #ff0000;">72시간(3일) 이내</strong></li>
                <li><strong>정확한 금액</strong> ₩${orderData.amount.toLocaleString()}을 입금해주세요</li>
                <li><strong>입금자명</strong>을 주문시 입력한 이름과 동일하게 해주세요</li>
                <li><strong style="color: #2196f3;">페이액션 자동 확인:</strong> 입금 후 <strong>1-3초 이내</strong> 자동 라이선스 발급!</li>
                <li>라이선스는 이 이메일 주소로 즉시 발송됩니다</li>
              </ul>
            </div>

            <div class="contact-info">
              <h4>📞 문의 및 입금 확인</h4>
              <p>
                📧 <strong>이메일:</strong> jireh202503@gmail.com<br>
                📞 <strong>전화:</strong> 010-4248-1850<br>
                💬 <strong>카카오톡:</strong> @blogpro
              </p>
            </div>

            <p style="margin-top: 30px;">
              입금이 완료되면 자동으로 확인되며, 라이선스 발급까지 최대 24시간이 소요됩니다.<br>
              궁금한 사항이 있으시면 언제든지 문의해주세요.
            </p>

            <p style="margin-top: 20px; color: #666;">
              감사합니다.<br>
              <strong>Blog Pro 팀</strong>
            </p>
          </div>
          
          <div class="footer">
            <p>이 이메일은 Blog Pro 주문 시스템에서 자동으로 발송되었습니다.</p>
            <p>© 2025 Blog Pro. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateOrderConfirmationText(orderData: any): string {
    return `
Blog Pro 주문 접수 완료

${orderData.name}님, 안녕하세요!

Blog Pro 주문이 성공적으로 접수되었습니다.

📋 주문 정보
- 주문번호: ${orderData.orderId}
- 상품명: ${orderData.productName}
- 결제금액: ₩${orderData.amount.toLocaleString()}
- 아이디 수: ${orderData.accountIds}개
- 일일 글 수: ${orderData.postsPerAccount}개
- 이용 기간: ${orderData.months}개월
- 연락처: ${orderData.phone}

🏦 입금 계좌 정보
- 은행명: 케이뱅크
- 계좌번호: 100-232-962872
- 예금주: 김형원
- 입금금액: ₩${orderData.amount.toLocaleString()}

⚠️ 중요 안내사항
- 정확한 금액 ₩${orderData.amount.toLocaleString()}을 입금해주세요
- 입금자명을 주문시 입력한 이름과 동일하게 해주세요
- 입금 확인 후 24시간 이내에 라이선스가 발급됩니다
- 라이선스는 이 이메일 주소로 발송됩니다

📞 문의 및 입금 확인
- 이메일: jireh202503@gmail.com
- 전화: 010-4248-1850
- 카카오톡: @blogpro

감사합니다.
Blog Pro 팀
    `;
  }
}