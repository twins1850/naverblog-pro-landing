import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const testEmail = body.email || 'twins1850@gmail.com';
    
    // 환경변수 체크
    const envCheck = {
      GMAIL_USER: !!process.env.GMAIL_USER,
      GMAIL_USER_VALUE: process.env.GMAIL_USER || 'MISSING',
      GMAIL_APP_PASSWORD: !!process.env.GMAIL_APP_PASSWORD,
      PASSWORD_LENGTH: process.env.GMAIL_APP_PASSWORD?.length || 0,
    };

    console.log('🔍 Test Email - 환경변수 체크:', envCheck);

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json({
        success: false,
        error: 'Gmail 환경변수가 설정되지 않았습니다',
        envCheck,
        message: 'GMAIL_USER 또는 GMAIL_APP_PASSWORD가 누락됨'
      }, { status: 500 });
    }

    // Gmail transporter 생성
    let transporter;
    try {
      transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });

      console.log('✅ Gmail transporter 생성 성공');
    } catch (error) {
      console.error('❌ Gmail transporter 생성 실패:', error);
      return NextResponse.json({
        success: false,
        error: 'Gmail transporter 생성 실패',
        details: error instanceof Error ? error.message : String(error),
        envCheck
      }, { status: 500 });
    }

    // transporter 검증
    try {
      await transporter.verify();
      console.log('✅ Gmail 연결 검증 성공');
    } catch (verifyError) {
      console.error('❌ Gmail 연결 검증 실패:', verifyError);
      return NextResponse.json({
        success: false,
        error: 'Gmail 인증 실패',
        details: verifyError instanceof Error ? verifyError.message : String(verifyError),
        envCheck,
        hint: '앱 비밀번호가 올바른지 확인하세요'
      }, { status: 500 });
    }

    // 테스트 이메일 발송
    const testMessage = {
      from: {
        name: 'Blog Pro Test',
        address: process.env.GMAIL_USER
      },
      to: testEmail,
      subject: `[테스트] Gmail 연결 확인 - ${new Date().toLocaleString('ko-KR')}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>🔧 Gmail 테스트 이메일</h2>
          <p>이 이메일은 Blog Pro의 Gmail 연결을 테스트하기 위해 발송되었습니다.</p>
          <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>테스트 정보:</h3>
            <ul>
              <li>발송 시각: ${new Date().toLocaleString('ko-KR')}</li>
              <li>발신자: ${process.env.GMAIL_USER}</li>
              <li>수신자: ${testEmail}</li>
              <li>서버: Vercel Production</li>
            </ul>
          </div>
          <p style="color: green; font-weight: bold;">✅ Gmail 연결이 정상적으로 작동하고 있습니다!</p>
        </div>
      `,
      text: `Gmail 테스트 이메일\n\n이메일이 정상적으로 발송되었습니다.\n발송시각: ${new Date().toLocaleString('ko-KR')}`
    };

    try {
      const result = await transporter.sendMail(testMessage);
      console.log('✅ 테스트 이메일 발송 성공:', result);
      
      return NextResponse.json({
        success: true,
        message: '테스트 이메일이 성공적으로 발송되었습니다',
        result: {
          messageId: result.messageId,
          response: result.response,
          accepted: result.accepted,
          rejected: result.rejected
        },
        sentTo: testEmail,
        timestamp: new Date().toISOString()
      });
    } catch (sendError) {
      console.error('❌ 테스트 이메일 발송 실패:', sendError);
      return NextResponse.json({
        success: false,
        error: '이메일 발송 실패',
        details: sendError instanceof Error ? sendError.message : String(sendError),
        code: (sendError as any)?.code,
        command: (sendError as any)?.command,
        envCheck
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ 테스트 API 오류:', error);
    return NextResponse.json({
      success: false,
      error: '테스트 중 오류 발생',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}