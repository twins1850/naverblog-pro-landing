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
    
    // 환경변수 유효성 검증
    if (this.apiKey.length < 10 || this.mallId.length < 5) {
      console.warn('⚠️ PayAction 환경변수가 유효하지 않을 수 있습니다:', {
        apiKeyLength: this.apiKey.length,
        mallIdLength: this.mallId.length
      });
    }
    
    console.log('🔑 PayAction 서비스 초기화:', {
      baseUrl: this.baseUrl,
      apiKeySet: !!this.apiKey,
      mallIdSet: !!this.mallId,
      apiKeyLength: this.apiKey.length,
      mallIdLength: this.mallId.length
    });
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

      // 응답 상태 및 내용 상세 로깅
      console.log('📡 PayAction API 응답 상태:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url
      });

      let result;
      try {
        result = await response.json();
        console.log('📄 PayAction API 응답 내용:', result);
      } catch (parseError) {
        console.error('❌ PayAction API 응답 파싱 실패:', parseError);
        throw new Error(`PayAction API 응답을 JSON으로 파싱할 수 없습니다: ${parseError}`);
      }

      if (!response.ok) {
        const errorDetails = {
          status: response.status,
          statusText: response.statusText,
          body: result,
          url: response.url,
          orderId: orderData.orderId
        };
        console.error('❌ PayAction API HTTP 오류:', errorDetails);
        
        // HTTP 오류의 경우 에러 객체 반환 (예외 던지지 않음)
        return {
          success: false,
          error: `HTTP ${response.status}: ${result?.response?.message || response.statusText}`,
          details: errorDetails,
          orderId: orderData.orderId
        };
      }

      // API 레벨에서의 성공/실패 확인
      if (result.status === 'error') {
        const apiError = {
          success: false,
          error: result.response?.message || 'PayAction API에서 오류 응답',
          apiResponse: result,
          orderId: orderData.orderId
        };
        console.error('❌ PayAction API 논리적 오류:', apiError);
        return apiError;
      }

      console.log('✅ PayAction 주문 제출 성공:', {
        orderId: orderData.orderId,
        response: result
      });

      return result;

    } catch (error) {
      const errorInfo = {
        orderId: orderData.orderId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        type: error instanceof Error ? error.constructor.name : typeof error,
        apiUrl: `${this.baseUrl}/order`,
        requestBody: body
      };
      
      console.error('💥 PayAction 주문 제출 예외 발생:', errorInfo);
      
      // 네트워크 오류나 기타 예외의 경우 에러 객체 반환
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        errorType: 'exception',
        orderId: orderData.orderId,
        details: errorInfo
      };
    }
  }

  /**
   * PayAction API 연결 및 인증 상태를 테스트합니다.
   */
  async validateCredentials(): Promise<{valid: boolean, error?: string}> {
    try {
      console.log('🔍 PayAction API 인증 테스트 시작...');
      
      // 더미 주문으로 API 연결 테스트 (실제 등록되지 않는 테스트용)
      const testResponse = await fetch(`${this.baseUrl}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'x-mall-id': this.mallId,
        },
        body: JSON.stringify({
          order_number: `TEST-${Date.now()}`,
          order_amount: 1000,
          order_date: new Date().toISOString().replace('Z', '+09:00'),
          billing_name: '테스트',
          orderer_name: '테스트'
        })
      });

      const result = await testResponse.json();
      
      // 401 Unauthorized: API 키 문제
      if (testResponse.status === 401) {
        console.error('❌ PayAction API 인증 실패: 유효하지 않은 API 키');
        return {valid: false, error: 'API 키가 유효하지 않습니다.'};
      }
      
      // 403 Forbidden: 권한 문제 (mall-id 등)
      if (testResponse.status === 403) {
        console.error('❌ PayAction API 권한 실패: 잘못된 상점 ID');
        return {valid: false, error: '상점 ID가 유효하지 않습니다.'};
      }
      
      // 200 OK or 400 Bad Request (필드 오류): API 연결은 정상
      if (testResponse.status === 200 || testResponse.status === 400) {
        console.log('✅ PayAction API 인증 성공');
        return {valid: true};
      }
      
      // 기타 오류
      console.warn('⚠️ PayAction API 테스트 응답:', {
        status: testResponse.status,
        result
      });
      return {valid: false, error: `예상치 못한 응답: ${testResponse.status}`};
      
    } catch (error) {
      console.error('💥 PayAction API 인증 테스트 실패:', error);
      return {
        valid: false, 
        error: error instanceof Error ? error.message : String(error)
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