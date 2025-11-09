import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 뉴스레터 시트 테스트 시작')
    
    // 환경 변수 확인
    const envCheck = {
      NEWSLETTER_SPREADSHEET_ID: process.env.NEWSLETTER_SPREADSHEET_ID ? '✅ 설정됨' : '❌ 없음',
      GOOGLE_SERVICE_ACCOUNT_JSON: process.env.GOOGLE_SERVICE_ACCOUNT_JSON ? '✅ 설정됨' : '❌ 없음',
      actualNewsletterSheetId: process.env.NEWSLETTER_SPREADSHEET_ID || 'undefined'
    }
    
    console.log('📋 환경 변수 상태:', envCheck)
    
    // NewsletterSheetsService 초기화 테스트
    const { NewsletterSheetsService } = await import('@/lib/newsletter-sheets')
    let service: any
    
    try {
      service = new NewsletterSheetsService()
      console.log('✅ NewsletterSheetsService 초기화 성공')
    } catch (initError) {
      console.error('❌ NewsletterSheetsService 초기화 실패:', initError)
      return NextResponse.json({
        success: false,
        error: '서비스 초기화 실패',
        details: initError instanceof Error ? initError.message : String(initError),
        envCheck
      }, { status: 500 })
    }
    
    // Google Sheets 연결 테스트
    try {
      // 테스트 이메일 추가
      const testEmail = `test-${Date.now()}@example.com`
      await service.addNewsletterSubscriber(testEmail)
      console.log('✅ 테스트 구독자 추가 성공:', testEmail)
      
      // 구독자 목록 조회
      const subscribers = await service.getNewsletterSubscribers()
      console.log(`📊 전체 구독자 수: ${subscribers.length}`)
      
      return NextResponse.json({
        success: true,
        message: '뉴스레터 시트 연결 성공',
        testEmail,
        totalSubscribers: subscribers.length,
        envCheck,
        spreadsheetId: process.env.NEWSLETTER_SPREADSHEET_ID
      })
      
    } catch (sheetError) {
      console.error('❌ Google Sheets 작업 실패:', sheetError)
      
      // 상세 오류 정보 수집
      const errorDetails = {
        message: sheetError instanceof Error ? sheetError.message : String(sheetError),
        name: sheetError instanceof Error ? sheetError.name : 'Unknown',
        stack: sheetError instanceof Error ? sheetError.stack?.split('\n').slice(0, 5) : undefined
      }
      
      return NextResponse.json({
        success: false,
        error: 'Google Sheets 작업 실패',
        details: errorDetails,
        envCheck,
        spreadsheetId: process.env.NEWSLETTER_SPREADSHEET_ID
      }, { status: 500 })
    }
    
  } catch (error) {
    console.error('❌ 테스트 중 예기치 않은 오류:', error)
    return NextResponse.json({
      success: false,
      error: '예기치 않은 오류',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}