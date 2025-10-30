// PayAction API 서비스 클래스
export class PayActionService {
  private apiKey: string;
  private mallId: string;
  private baseUrl = 'https://api.payaction.app';

  constructor() {
    this.apiKey = process.env.PAYACTION_API_KEY!;
    this.mallId = process.env.PAYACTION_MALL_ID!;
    
    if (!this.apiKey || !this.mallId) {
      throw new Error('PayAction API 환경변수가 설정되지 않았습니다.');
    }
  }

  /**
   * PayAction에 주문 정보를 제출합니다.
   */
  async submitOrder(orderData: {
    orderId: string;
    amount: number;
    customerName: string;
    expectedDepositor?: string;
    productName: string;
    customerEmail: string;
    customerPhone: string;
  }): Promise<any> {
    try {
      console.log('🔄 PayAction 주문 제출 시작:', orderData.orderId);

      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'x-mall-id': this.mallId,
      };

      // PayAction API 공식 필드명 사용 (개발자 센터 문서 기준)
      const body = {
        // 필수 필드 (공식 문서에서 확인한 정확한 필드명)
        order_number: orderData.orderId,                                    // 주문번호 (필수)
        order_amount: orderData.amount,                                     // 주문금액 (필수)
        order_date: new Date().toISOString().replace('Z', '+09:00'),       // 주문일시 (필수) - 한국 시간
        billing_name: orderData.expectedDepositor || orderData.customerName, // 입금자명 (필수) - 자동매칭 기준
        orderer_name: orderData.customerName,                              // 주문자명 (필수)
        
        // 선택 필드 (알림 발송 및 현금영수증용)
        orderer_phone_number: orderData.customerPhone.replace(/-/g, ''),   // 전화번호 (하이픈 제거)
        orderer_email: orderData.customerEmail                             // 이메일
      };

      console.log('📤 PayAction API 요청:', {
        url: `${this.baseUrl}/order`,
        headers: { ...headers, 'x-api-key': '[HIDDEN]' },
        body
      });

      const response = await fetch(`${this.baseUrl}/order`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('❌ PayAction API 오류:', {
          status: response.status,
          statusText: response.statusText,
          body: result
        });
        throw new Error(`PayAction API 오류: ${response.status} - ${JSON.stringify(result)}`);
      }

      console.log('✅ PayAction 주문 제출 성공:', {
        orderId: orderData.orderId,
        response: result
      });

      return result;

    } catch (error) {
      console.error('💥 PayAction 주문 제출 실패:', {
        orderId: orderData.orderId,
        error: error instanceof Error ? error.message : String(error)
      });
      
      // PayAction 오류가 전체 주문 프로세스를 중단시키지 않도록 합니다
      // 오류를 기록하되 예외를 다시 던지지 않습니다
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        orderId: orderData.orderId
      };
    }
  }

  /**
   * PayAction 주문 상태를 조회합니다.
   */
  async getOrderStatus(orderId: string): Promise<any> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'x-mall-id': this.mallId,
      };

      const response = await fetch(`${this.baseUrl}/order/${orderId}`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`PayAction 주문 조회 오류: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error('PayAction 주문 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 웹훅 키를 사용하여 요청의 진위를 검증합니다.
   */
  validateWebhookKey(receivedKey: string): boolean {
    const expectedKey = process.env.PAYACTION_WEBHOOK_KEY;
    
    if (!expectedKey) {
      console.error('PayAction Webhook Key가 설정되지 않았습니다.');
      return false;
    }

    const isValid = receivedKey === expectedKey;
    
    console.log('🔐 PayAction 웹훅 키 검증:', {
      valid: isValid,
      receivedKeyLength: receivedKey?.length || 0,
      expectedKeyLength: expectedKey.length
    });

    return isValid;
  }
}