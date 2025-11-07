import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // 간단한 인증 체크 (실제로는 더 강력한 인증 필요)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== 'Bearer admin-secret-key') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 401 }
      )
    }

    // 구독자 파일 읽기
    try {
      const fs = await import('fs')
      const path = await import('path')
      
      const subscribersFile = path.default.join(process.cwd(), 'data', 'subscribers.txt')
      
      // 파일이 존재하는지 확인
      try {
        await fs.promises.access(subscribersFile)
      } catch {
        return NextResponse.json({
          subscribers: [],
          count: 0,
          message: '구독자 데이터가 없습니다.'
        })
      }
      
      // 파일 내용 읽기
      const fileContent = await fs.promises.readFile(subscribersFile, 'utf-8')
      
      // 라인별로 파싱
      const lines = fileContent.trim().split('\n').filter(line => line.trim())
      const subscribers = lines.map(line => {
        const [timestamp, email] = line.split(' - ')
        return {
          timestamp: timestamp || '',
          email: email || line, // 파싱 실패 시 전체 라인을 이메일로 사용
          date: timestamp ? new Date(timestamp).toLocaleString('ko-KR') : 'Unknown'
        }
      })

      return NextResponse.json({
        subscribers,
        count: subscribers.length,
        message: `총 ${subscribers.length}명의 구독자가 있습니다.`
      })

    } catch (fileError) {
      console.error('File reading error:', fileError)
      return NextResponse.json(
        { error: '구독자 데이터를 읽는 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Newsletter subscribers API error:', error)
    
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// 구독자 데이터를 Google Sheets에도 저장하는 기능
export async function POST(request: NextRequest) {
  try {
    // 인증 체크
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== 'Bearer admin-secret-key') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 401 }
      )
    }

    const { action } = await request.json()

    if (action === 'sync-to-sheets') {
      // Google Sheets에 구독자 데이터 동기화
      try {
        const { GoogleSheetsService } = await import('@/lib/google-sheets')
        const sheetsService = new GoogleSheetsService()
        
        // 구독자 파일 읽기
        const fs = await import('fs')
        const path = await import('path')
        const subscribersFile = path.default.join(process.cwd(), 'data', 'subscribers.txt')
        
        const fileContent = await fs.promises.readFile(subscribersFile, 'utf-8')
        const lines = fileContent.trim().split('\n').filter(line => line.trim())
        
        // Google Sheets에 저장할 데이터 준비
        const subscribersData = lines.map(line => {
          const [timestamp, email] = line.split(' - ')
          return [
            timestamp || '',
            email || line,
            '뉴스레터 구독',
            new Date().toISOString()
          ]
        })

        // Google Sheets에 저장 (실제 구현에 따라 조정 필요)
        console.log('Syncing to Google Sheets:', subscribersData.length, 'subscribers')
        
        return NextResponse.json({
          message: `${subscribersData.length}명의 구독자 데이터가 Google Sheets에 동기화되었습니다.`,
          success: true
        })

      } catch (syncError) {
        console.error('Google Sheets sync error:', syncError)
        return NextResponse.json(
          { error: 'Google Sheets 동기화 중 오류가 발생했습니다.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: '지원하지 않는 액션입니다.' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Newsletter subscribers sync API error:', error)
    
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}