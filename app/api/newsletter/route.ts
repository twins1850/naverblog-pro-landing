import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // 이메일 유효성 검사
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 여기서는 간단히 콘솔에 로깅하고 성공 응답을 반환합니다.
    // 실제 구현에서는 이메일 서비스 (예: Mailchimp, ConvertKit, SendGrid) API를 호출하거나
    // 데이터베이스에 저장하는 로직을 추가해야 합니다.
    console.log('Newsletter subscription:', email)

    // 예시: 간단한 파일 저장 (실제로는 데이터베이스나 이메일 서비스 사용 권장)
    try {
      const fs = await import('fs')
      const path = await import('path')
      
      const subscribersFile = path.default.join(process.cwd(), 'data', 'subscribers.txt')
      
      // data 디렉터리가 없으면 생성
      try {
        await fs.promises.mkdir(path.default.join(process.cwd(), 'data'), { recursive: true })
      } catch {
        // 디렉터리가 이미 존재하는 경우 무시
      }
      
      // 이메일을 파일에 추가 (중복 체크는 실제 구현에서 필요)
      const timestamp = new Date().toISOString()
      const entry = `${timestamp} - ${email}\n`
      
      await fs.promises.appendFile(subscribersFile, entry)
      
    } catch (fileError) {
      console.error('File writing error:', fileError)
      // 파일 저장 실패해도 사용자에게는 성공 메시지 반환
    }

    return NextResponse.json({
      message: '뉴스레터 구독이 완료되었습니다! 새로운 소식을 이메일로 받아보세요.',
      success: true
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    return NextResponse.json(
      { error: '구독 처리 중 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}