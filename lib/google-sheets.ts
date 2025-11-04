import { GoogleAuth } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

// JSON 제어 문자 필터링 함수
function sanitizeJsonString(str: string): string {
  // 제어 문자(ASCII 0-31, 127) 제거, 단 탭(\t), 줄바꿈(\n), 캐리지리턴(\r)은 유지
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

// 안전한 private key 포맷팅 함수
function formatPrivateKey(privateKey: string): string {
  if (!privateKey) return privateKey;
  
  console.log('🔧 Private key 포맷팅 시작...', {
    length: privateKey.length,
    hasBeginMarker: privateKey.includes('BEGIN PRIVATE KEY'),
    firstChars: privateKey.substring(0, 50)
  });
  
  // 1. 모든 종류의 줄바꿈을 실제 줄바꿈으로 변환
  let formatted = privateKey
    .replace(/\\n/g, '\n')  // \\n -> \n
    .replace(/\\\n/g, '\n') // \\\n -> \n
    .replace(/\\\\n/g, '\n') // \\\\n -> \n
    .replace(/\\r\\n/g, '\n') // \r\n -> \n
    .replace(/\\r/g, '\n'); // \r -> \n
  
  // 2. 연속된 줄바꿈 정리
  formatted = formatted.replace(/\n+/g, '\n');
  
  // 3. private key 형식 검증 및 정규화
  if (formatted.includes('-----BEGIN PRIVATE KEY-----')) {
    // PEM 형식 검증 및 정규화
    const beginMarker = '-----BEGIN PRIVATE KEY-----';
    const endMarker = '-----END PRIVATE KEY-----';
    
    // 키 내용 추출
    const keyStart = formatted.indexOf(beginMarker) + beginMarker.length;
    const keyEnd = formatted.indexOf(endMarker);
    
    if (keyEnd === -1) {
      console.log('⚠️ END PRIVATE KEY 마커 없음 - 원본 반환');
      return formatted;
    }
    
    const keyContent = formatted.substring(keyStart, keyEnd)
      .replace(/\s/g, '') // 모든 공백 제거
      .replace(/\n/g, ''); // 모든 줄바꿈 제거
    
    // 64문자마다 줄바꿈 추가 (PEM 표준)
    const keyLines = [];
    for (let i = 0; i < keyContent.length; i += 64) {
      keyLines.push(keyContent.substring(i, i + 64));
    }
    
    const result = `${beginMarker}\n${keyLines.join('\n')}\n${endMarker}`;
    console.log('✅ Private key 포맷팅 완료 (PEM 표준 적용)', {
      keyContentLength: keyContent.length,
      linesCount: keyLines.length
    });
    return result;
  } else if (formatted.includes('BEGIN PRIVATE KEY')) {
    // header/footer가 없는 경우 추가
    const keyContent = formatted
      .replace(/-----BEGIN PRIVATE KEY-----/g, '')
      .replace(/-----END PRIVATE KEY-----/g, '')
      .replace(/\s/g, '');
    
    const result = `-----BEGIN PRIVATE KEY-----\n${keyContent}\n-----END PRIVATE KEY-----`;
    console.log('✅ Private key 포맷팅 완료 (헤더/푸터 추가)');
    return result;
  } else {
    // Base64 형식의 키인 경우 헤더/푸터 추가
    const cleanKey = formatted.replace(/\s/g, ''); // 모든 공백 제거
    if (cleanKey.length > 100) { // Base64 키로 추정
      // 64문자마다 줄바꿈 추가 (PEM 표준)
      const keyLines = [];
      for (let i = 0; i < cleanKey.length; i += 64) {
        keyLines.push(cleanKey.substring(i, i + 64));
      }
      const result = `-----BEGIN PRIVATE KEY-----\n${keyLines.join('\n')}\n-----END PRIVATE KEY-----`;
      console.log('✅ Private key 포맷팅 완료 (Base64에서 PEM 변환)');
      return result;
    }
  }
  
  console.log('⚠️ Private key 포맷팅 실패 - 원본 반환');
  return formatted;
}

// 안전한 JSON 파싱 함수
function safeJsonParse(jsonString: string): any {
  try {
    // 1차: 제어 문자 필터링
    const sanitized = sanitizeJsonString(jsonString);
    
    // 2차: JSON 파싱 시도
    const parsed = JSON.parse(sanitized);
    
    // 3차: private key 포맷팅 (파싱 성공 후)
    if (parsed.private_key) {
      parsed.private_key = formatPrivateKey(parsed.private_key);
    }
    
    return parsed;
  } catch (error) {
    console.error('❌ JSON 파싱 실패 - 원본 문자열:', {
      length: jsonString.length,
      firstChars: jsonString.substring(0, 100),
      error: error instanceof Error ? error.message : String(error)
    });
    
    // 4차: 더 강력한 정화 시도 (모든 제어 문자 제거)
    try {
      const strongSanitized = jsonString.replace(/[\x00-\x1F\x7F]/g, '');
      const parsed = JSON.parse(strongSanitized);
      
      // private key 포맷팅
      if (parsed.private_key) {
        parsed.private_key = formatPrivateKey(parsed.private_key);
      }
      
      return parsed;
    } catch (secondError) {
      console.error('❌ 강력한 JSON 파싱도 실패:', secondError);
      throw new Error(`JSON 파싱 불가능: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

// 한국 시간대 헬퍼 함수
function getKoreanTime(): string {
  return new Date().toLocaleString('sv-SE', { 
    timeZone: 'Asia/Seoul' 
  }).replace(' ', 'T') + '.000Z';
}

export class GoogleSheetsService {
  private auth: GoogleAuth;
  private spreadsheetId: string;

  constructor() {
    // 환경변수에서 Google Sheets 설정 가져오기
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
    
    // Google 인증 설정
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountJson) {
      try {
        // 🛡️ 안전한 JSON 파싱을 통한 인증
        console.log('🔧 Google Service Account JSON 파싱 시작...');
        const credentials = safeJsonParse(serviceAccountJson);
        console.log('✅ Google Service Account JSON 파싱 성공', {
          type: credentials.type,
          project_id: credentials.project_id,
          client_email: credentials.client_email,
          private_key_id: credentials.private_key_id,
          hasPrivateKey: !!credentials.private_key,
          privateKeyLength: credentials.private_key?.length || 0
        });
        
        this.auth = new GoogleAuth({
          credentials,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        console.log('🔑 Google Auth 객체 생성 완료');
      } catch (jsonError) {
        console.error('❌ Google Service Account JSON 파싱 실패, 개별 환경변수 사용:', jsonError);
        
        // JSON 파싱 실패 시 개별 환경변수로 대체
        const credentials = {
          type: 'service_account',
          project_id: process.env.GOOGLE_PROJECT_ID || 'default',
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY || ''),
          private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
          client_id: process.env.GOOGLE_CLIENT_ID,
        };

        this.auth = new GoogleAuth({
          credentials,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
      }
    } else {
      // 개별 환경변수를 통한 인증
      const credentials = {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID || 'default',
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY || ''),
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        client_id: process.env.GOOGLE_CLIENT_ID,
      };

      this.auth = new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    }
  }

  async addCustomerData(customerData: any): Promise<void> {
    try {
      const doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
      await doc.loadInfo();

      // 첫 번째 시트 가져오기
      const sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        throw new Error('스프레드시트를 찾을 수 없습니다.');
      }

      // 데이터 추가
      await sheet.addRow({
        이름: customerData.이름,
        이메일: customerData.이메일,
        연락처: customerData.연락처,
        결제일시: customerData.결제일시 || getKoreanTime(),
        결제금액: customerData.결제금액,
        상품유형: customerData.상품유형,
        아이디수: customerData.아이디수,
        글수: customerData.글수,
        개월수: customerData.개월수,
        라이센스키: customerData.라이센스키 || '',
        발급일시: customerData.발급일시 || '',
        만료일시: customerData.만료일시 || '',
        상태: customerData.상태 || '결제완료',
        하드웨어ID: customerData.하드웨어ID || '',
        결제상태: customerData.결제상태 || '결제완료',
        주문번호: customerData.주문번호,
        결제ID: customerData.결제ID || '',
        입금자명: customerData.입금자명 || '',
        결제방식: customerData.결제방식 || 'manual',
      });

      console.log('✅ Google Sheets에 고객 데이터 추가 성공');
    } catch (error) {
      console.error('❌ Google Sheets 데이터 추가 실패:', error);
      throw error;
    }
  }

  async addPurchaseData(purchaseData: any, licenseKey: string): Promise<void> {
    try {
      const doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
      await doc.loadInfo();

      // 첫 번째 시트 가져오기
      const sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        throw new Error('스프레드시트를 찾을 수 없습니다.');
      }

      // 데이터 추가
      await sheet.addRow({
        이름: purchaseData.이름,
        이메일: purchaseData.이메일,
        연락처: purchaseData.연락처,
        결제일시: purchaseData.결제일시 || getKoreanTime(),
        결제금액: purchaseData.결제금액,
        상품유형: purchaseData.상품유형,
        아이디수: purchaseData.아이디수,
        글수: purchaseData.글수,
        개월수: purchaseData.개월수,
        라이센스키: licenseKey,
        발급일시: getKoreanTime(),
        만료일시: '',
        상태: '발급완료',
        하드웨어ID: '',
        결제상태: purchaseData.결제상태,
        주문번호: purchaseData.주문번호,
        결제ID: purchaseData.결제ID,
      });

      console.log('✅ Google Sheets에 구매 데이터 추가 성공');
    } catch (error) {
      console.error('❌ Google Sheets 구매 데이터 추가 실패:', error);
      throw error;
    }
  }

  async updateLicenseStatus(orderId: string, status: string, licenseKey?: string): Promise<void> {
    try {
      const doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        throw new Error('스프레드시트를 찾을 수 없습니다.');
      }

      await sheet.loadCells();
      const rows = await sheet.getRows();

      // 주문번호로 행 찾기
      const targetRow = rows.find(row => row.get('주문번호') === orderId);
      if (targetRow) {
        targetRow.set('상태', status);
        if (licenseKey) {
          targetRow.set('라이센스키', licenseKey);
          targetRow.set('발급일시', getKoreanTime());
        }
        await targetRow.save();
        console.log(`✅ 주문번호 ${orderId} 상태 업데이트: ${status}`);
      } else {
        console.warn(`⚠️ 주문번호 ${orderId}를 찾을 수 없습니다.`);
      }
    } catch (error) {
      console.error('❌ Google Sheets 상태 업데이트 실패:', error);
      throw error;
    }
  }

  // 웹훅에서 사용할 메소드들 추가
  async findCustomerByOrderId(orderId: string): Promise<any> {
    try {
      console.log(`🔍 주문번호 조회 시작: ${orderId} (타입: ${typeof orderId})`);
      
      const doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        throw new Error('스프레드시트를 찾을 수 없습니다.');
      }

      const rows = await sheet.getRows();
      console.log(`📊 총 ${rows.length}개 행 검색 중...`);
      
      // 주문번호 비교 시 문자열과 숫자 모두 고려
      const targetRow = rows.find(row => {
        const sheetOrderId = row.get('주문번호');
        const match1 = sheetOrderId === orderId; // 문자열 비교
        const match2 = sheetOrderId === parseInt(orderId); // 숫자 비교
        const match3 = String(sheetOrderId) === orderId; // 문자열 변환 비교
        
        if (match1 || match2 || match3) {
          console.log(`✅ 주문번호 매칭 성공: ${sheetOrderId} (시트) === ${orderId} (검색)`);
        }
        
        return match1 || match2 || match3;
      });
      
      // 매칭되지 않은 경우 디버깅 정보 출력
      if (!targetRow) {
        console.log('❌ 매칭된 주문번호 없음. 모든 주문번호들:');
        rows.forEach((row, index) => {
          const sheetOrderId = row.get('주문번호');
          if (sheetOrderId && sheetOrderId.toString().includes('1025151850')) {
            console.log(`  ✅ 발견! [${index}] ${sheetOrderId} (타입: ${typeof sheetOrderId})`);
          }
          if (index < 5 || index > rows.length - 5) {
            console.log(`  [${index}] ${sheetOrderId} (타입: ${typeof sheetOrderId})`);
          }
        });
      }
      
      if (targetRow) {
        return {
          이름: targetRow.get('이름'),
          이메일: targetRow.get('이메일'),
          연락처: targetRow.get('연락처'),
          결제금액: targetRow.get('결제금액'),
          상품유형: targetRow.get('상품유형'),
          아이디수: targetRow.get('아이디수'),
          글수: targetRow.get('글수'),
          개월수: targetRow.get('개월수'),
          상태: targetRow.get('상태'),
          주문번호: targetRow.get('주문번호'),
          결제방식: targetRow.get('결제방식')
        };
      }
      
      return null;
    } catch (error) {
      console.error('❌ Google Sheets 고객 조회 실패:', error);
      throw error;
    }
  }

  async updatePaymentStatus(orderId: string, updateData: any): Promise<void> {
    try {
      const doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        throw new Error('스프레드시트를 찾을 수 없습니다.');
      }

      const rows = await sheet.getRows();
      const targetRow = rows.find(row => row.get('주문번호') === orderId);
      
      if (targetRow) {
        // 업데이트할 데이터 설정
        Object.keys(updateData).forEach(key => {
          targetRow.set(key, updateData[key]);
        });
        
        await targetRow.save();
        console.log(`✅ 주문번호 ${orderId} 결제 상태 업데이트 완료`);
      } else {
        console.warn(`⚠️ 주문번호 ${orderId}를 찾을 수 없습니다.`);
        throw new Error(`주문번호 ${orderId}를 찾을 수 없습니다.`);
      }
    } catch (error) {
      console.error('❌ Google Sheets 결제 상태 업데이트 실패:', error);
      throw error;
    }
  }

  async updateLicenseInfo(orderId: string, licenseData: any): Promise<void> {
    try {
      console.log(`🔄 라이선스 정보 업데이트 시작: 주문번호 ${orderId}`);
      console.log(`📝 업데이트할 데이터:`, licenseData);
      
      const doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        throw new Error('스프레드시트를 찾을 수 없습니다.');
      }

      await sheet.loadHeaderRow();
      console.log(`📊 스프레드시트 헤더:`, sheet.headerValues);

      const rows = await sheet.getRows();
      console.log(`📋 총 ${rows.length}개 행 검색 중...`);
      
      // 주문번호로 행 찾기 (디버깅 추가)
      const targetRow = rows.find(row => {
        const rowOrderId = row.get('주문번호');
        console.log(`🔍 비교: "${rowOrderId}" === "${orderId}" ? ${rowOrderId === orderId}`);
        return rowOrderId === orderId;
      });
      
      if (targetRow) {
        console.log(`✅ 대상 행 발견: 주문번호 ${orderId}`);
        console.log(`📝 업데이트 전 행 데이터:`, targetRow._rawData);
        
        // 라이선스 정보 업데이트
        Object.keys(licenseData).forEach(key => {
          console.log(`🔧 ${key} = ${licenseData[key]}`);
          targetRow.set(key, licenseData[key]);
        });
        
        await targetRow.save();
        console.log(`✅ 주문번호 ${orderId} 라이선스 정보 업데이트 완료`);
        console.log(`📝 업데이트 후 행 데이터:`, targetRow._rawData);
      } else {
        console.warn(`⚠️ 주문번호 ${orderId}를 찾을 수 없습니다.`);
        console.log(`📋 기존 주문번호들:`, rows.map(row => row.get('주문번호')).slice(0, 10));
        throw new Error(`주문번호 ${orderId}를 찾을 수 없습니다.`);
      }
    } catch (error) {
      console.error('❌ Google Sheets 라이선스 정보 업데이트 실패:', error);
      throw error;
    }
  }

  // 🆕 스마트 매칭 메서드들
  
  async findCustomerByDepositorAndAmount(depositorName: string, amount: number): Promise<any> {
    try {
      console.log(`🔍 입금자명 + 금액으로 매칭 시도: ${depositorName}, ${amount}`);
      
      const doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        throw new Error('스프레드시트를 찾을 수 없습니다.');
      }

      const rows = await sheet.getRows();
      console.log(`📊 총 ${rows.length}개 행에서 매칭 검색 중...`);
      
      // 입금자명과 금액이 모두 일치하는 주문 찾기
      const targetRow = rows.find(row => {
        const rowAmount = parseInt(row.get('결제금액')?.replace(/[^0-9]/g, '') || '0');
        const rowDepositor = row.get('입금자명');
        const rowStatus = row.get('상태');
        
        // 입금대기 상태이고, 입금자명과 금액이 일치하는 경우
        const amountMatch = rowAmount === amount;
        const depositorMatch = rowDepositor === depositorName;
        const isWaitingPayment = rowStatus === '입금대기';
        
        console.log(`📋 행 검사:`, {
          rowAmount,
          rowDepositor,
          rowStatus,
          amountMatch,
          depositorMatch,
          isWaitingPayment
        });
        
        return amountMatch && depositorMatch && isWaitingPayment;
      });
      
      if (targetRow) {
        console.log("✅ 입금자명 + 금액 매칭 성공");
        return {
          이름: targetRow.get('이름'),
          이메일: targetRow.get('이메일'),
          연락처: targetRow.get('연락처'),
          결제금액: targetRow.get('결제금액'),
          상품유형: targetRow.get('상품유형'),
          아이디수: targetRow.get('아이디수'),
          글수: targetRow.get('글수'),
          개월수: targetRow.get('개월수'),
          상태: targetRow.get('상태'),
          주문번호: targetRow.get('주문번호'),
          결제방식: targetRow.get('결제방식')
        };
      }
      
      return null;
    } catch (error) {
      console.error('❌ 입금자명 + 금액 매칭 실패:', error);
      throw error;
    }
  }

  async findRecentCustomerByAmount(amount: number): Promise<any> {
    try {
      console.log(`💰 금액으로만 최근 주문 매칭 시도: ${amount}`);
      
      const doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        throw new Error('스프레드시트를 찾을 수 없습니다.');
      }

      const rows = await sheet.getRows();
      
      // 24시간 이내의 주문만 검색
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      // 금액이 일치하고 24시간 이내의 최근 주문 찾기
      const candidateRows = rows.filter(row => {
        const rowAmount = parseInt(row.get('결제금액')?.replace(/[^0-9]/g, '') || '0');
        const rowStatus = row.get('상태');
        const orderTime = new Date(row.get('결제일시') || '');
        
        const amountMatch = rowAmount === amount;
        const isWaitingPayment = rowStatus === '입금대기';
        const isRecent = orderTime > twentyFourHoursAgo;
        
        return amountMatch && isWaitingPayment && isRecent;
      });
      
      if (candidateRows.length > 0) {
        // 가장 최근 주문 선택 (최근주문 매칭 설정에 따라)
        const targetRow = candidateRows.sort((a, b) => {
          const timeA = new Date(a.get('결제일시') || '').getTime();
          const timeB = new Date(b.get('결제일시') || '').getTime();
          return timeB - timeA; // 최근 순 정렬
        })[0];
        
        console.log("✅ 금액 기반 최근 주문 매칭 성공");
        return {
          이름: targetRow.get('이름'),
          이메일: targetRow.get('이메일'),
          연락처: targetRow.get('연락처'),
          결제금액: targetRow.get('결제금액'),
          상품유형: targetRow.get('상품유형'),
          아이디수: targetRow.get('아이디수'),
          글수: targetRow.get('글수'),
          개월수: targetRow.get('개월수'),
          상태: targetRow.get('상태'),
          주문번호: targetRow.get('주문번호'),
          결제방식: targetRow.get('결제방식')
        };
      }
      
      return null;
    } catch (error) {
      console.error('❌ 금액 기반 매칭 실패:', error);
      throw error;
    }
  }
}