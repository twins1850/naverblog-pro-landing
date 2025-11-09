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
    return result;
  } else if (formatted.includes('BEGIN PRIVATE KEY')) {
    // header/footer가 없는 경우 추가
    const keyContent = formatted
      .replace(/-----BEGIN PRIVATE KEY-----/g, '')
      .replace(/-----END PRIVATE KEY-----/g, '')
      .replace(/\s/g, '');
    
    const result = `-----BEGIN PRIVATE KEY-----\n${keyContent}\n-----END PRIVATE KEY-----`;
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
      return result;
    }
  }
  
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
    console.error('❌ Newsletter JSON 파싱 실패 - 원본 문자열:', {
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
      console.error('❌ Newsletter 강력한 JSON 파싱도 실패:', secondError);
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

export class NewsletterSheetsService {
  private spreadsheetId: string;
  private auth: GoogleAuth;

  constructor() {
    // 뉴스레터 전용 스프레드시트 ID (환경변수에서 가져옴)
    this.spreadsheetId = process.env.NEWSLETTER_SPREADSHEET_ID || '';
    
    console.log('🔍 NewsletterSheetsService 환경변수 확인:', {
      NEWSLETTER_SPREADSHEET_ID: process.env.NEWSLETTER_SPREADSHEET_ID,
      GOOGLE_SHEETS_SPREADSHEET_ID: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      actualSpreadsheetId: this.spreadsheetId
    });
    
    if (!this.spreadsheetId) {
      throw new Error('NEWSLETTER_SPREADSHEET_ID 환경변수가 설정되지 않았습니다.');
    }

    // 기존 Google Sheets 서비스와 동일한 인증 방식 사용
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (serviceAccountJson) {
      try {
        console.log('🔧 Newsletter Google Service Account JSON 파싱 시작...');
        const credentials = safeJsonParse(serviceAccountJson);
        console.log('✅ Newsletter Google Service Account JSON 파싱 성공');
        
        this.auth = new GoogleAuth({
          credentials,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        console.log('🔑 Newsletter Google Auth 객체 생성 완료');
      } catch (jsonError) {
        console.error('❌ Newsletter Google Service Account JSON 파싱 실패:', jsonError);
        throw new Error('Google Sheets 인증 정보가 설정되지 않았습니다.');
      }
    } else {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON 환경변수가 설정되지 않았습니다.');
    }
  }

  /**
   * 뉴스레터 시트의 헤더를 확인하고 설정
   */
  private async ensureSheetHeaders(sheet: any): Promise<void> {
    const expectedHeaders = [
      '구독일시', 
      '이메일', 
      '구독상태', 
      '구독ID',
      '수신동의',
      '마케팅동의',
      '구독경로'
    ];

    try {
      // 첫 번째 행을 로드하여 헤더 확인
      await sheet.loadHeaderRow();
      const existingHeaders = sheet.headerValues;
      
      console.log('🔍 기존 헤더:', existingHeaders);
      
      // 헤더가 없거나 불완전한 경우 설정
      if (!existingHeaders || existingHeaders.length === 0 || 
          !expectedHeaders.every(header => existingHeaders.includes(header))) {
        
        console.log('📝 뉴스레터 시트 헤더 설정 중...');
        
        // 첫 번째 행에 헤더 설정
        await sheet.setHeaderRow(expectedHeaders);
        
        console.log('✅ 뉴스레터 시트 헤더 설정 완료');
      } else {
        console.log('✅ 뉴스레터 시트 헤더가 이미 올바르게 설정되어 있습니다');
      }
      
    } catch (error) {
      console.log('⚠️ 헤더 확인 중 오류, 헤더 재설정:', error);
      
      // 오류가 발생한 경우 헤더를 강제로 설정
      await sheet.setHeaderRow(expectedHeaders);
      console.log('✅ 뉴스레터 시트 헤더 강제 설정 완료');
    }
  }

  /**
   * 뉴스레터 구독자 추가
   */
  async addNewsletterSubscriber(email: string): Promise<void> {
    try {
      console.log('📧 뉴스레터 전용 시트에 구독자 저장 시작:', email);
      
      const doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
      await doc.loadInfo();
      
      console.log(`📋 뉴스레터 스프레드시트: ${doc.title}`);

      // 첫 번째 시트 가져오기 (없으면 생성)
      let sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        console.log('📝 뉴스레터 시트 생성 중...');
        sheet = await doc.addSheet({ 
          title: '뉴스레터 구독자',
          headerValues: [
            '구독일시', 
            '이메일', 
            '구독상태', 
            '구독ID',
            '수신동의',
            '마케팅동의',
            '구독경로'
          ]
        });
      } else {
        // 기존 시트가 있는 경우 헤더 확인 및 설정
        await this.ensureSheetHeaders(sheet);
      }

      // 구독자 데이터 추가
      const subscriberId = `NL-${Date.now()}`;
      await sheet.addRow({
        구독일시: getKoreanTime(),
        이메일: email,
        구독상태: '활성',
        구독ID: subscriberId,
        수신동의: 'Y',
        마케팅동의: 'Y',
        구독경로: '웹사이트'
      });

      console.log('✅ 뉴스레터 전용 시트에 구독자 저장 완료:', email);
      
    } catch (error) {
      console.error('❌ 뉴스레터 시트 저장 실패:', error);
      throw error;
    }
  }

  /**
   * 뉴스레터 구독자 목록 조회
   */
  async getNewsletterSubscribers(): Promise<any[]> {
    try {
      console.log('📋 뉴스레터 구독자 목록 조회 시작');
      
      const doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        console.log('📄 뉴스레터 시트가 없습니다.');
        return [];
      }

      const rows = await sheet.getRows();
      
      const subscribers = rows.map(row => ({
        구독일시: row.get('구독일시'),
        이메일: row.get('이메일'),
        구독상태: row.get('구독상태'),
        구독ID: row.get('구독ID'),
        수신동의: row.get('수신동의'),
        마케팅동의: row.get('마케팅동의'),
        구독경로: row.get('구독경로')
      }));

      console.log(`✅ 뉴스레터 구독자 ${subscribers.length}명 조회 완료`);
      return subscribers;
      
    } catch (error) {
      console.error('❌ 뉴스레터 구독자 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 뉴스레터 구독 취소
   */
  async unsubscribeNewsletter(email: string): Promise<boolean> {
    try {
      console.log('📧 뉴스레터 구독 취소 처리:', email);
      
      const doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        console.log('📄 뉴스레터 시트가 없습니다.');
        return false;
      }

      const rows = await sheet.getRows();
      const targetRow = rows.find(row => row.get('이메일') === email);
      
      if (targetRow) {
        targetRow.set('구독상태', '비활성');
        targetRow.set('수신동의', 'N');
        await targetRow.save();
        
        console.log('✅ 뉴스레터 구독 취소 완료:', email);
        return true;
      } else {
        console.log('⚠️ 구독자를 찾을 수 없습니다:', email);
        return false;
      }
      
    } catch (error) {
      console.error('❌ 뉴스레터 구독 취소 실패:', error);
      throw error;
    }
  }

  /**
   * 활성 구독자 수 조회
   */
  async getActiveSubscriberCount(): Promise<number> {
    try {
      const subscribers = await this.getNewsletterSubscribers();
      const activeCount = subscribers.filter(sub => sub.구독상태 === '활성').length;
      
      console.log(`📊 활성 뉴스레터 구독자: ${activeCount}명`);
      return activeCount;
      
    } catch (error) {
      console.error('❌ 활성 구독자 수 조회 실패:', error);
      return 0;
    }
  }
}