import { GoogleAuth } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export class GoogleSheetsService {
  private auth: GoogleAuth;
  private spreadsheetId: string;

  constructor() {
    // 환경변수에서 Google Sheets 설정 가져오기
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
    
    // Google 인증 설정
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      // JSON 파일을 통한 인증
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      this.auth = new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    } else {
      // 개별 환경변수를 통한 인증
      const credentials = {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID || 'default',
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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
        결제일시: customerData.결제일시 || new Date().toISOString(),
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
        결제일시: purchaseData.결제일시 || new Date().toISOString(),
        결제금액: purchaseData.결제금액,
        상품유형: purchaseData.상품유형,
        아이디수: purchaseData.아이디수,
        글수: purchaseData.글수,
        개월수: purchaseData.개월수,
        라이센스키: licenseKey,
        발급일시: new Date().toISOString(),
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
          targetRow.set('발급일시', new Date().toISOString());
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
}