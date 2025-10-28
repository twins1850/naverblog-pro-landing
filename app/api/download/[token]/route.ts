import { NextRequest, NextResponse } from "next/server";

// 토큰 검증 함수
async function validateDownloadToken(token: string) {
  try {
    // Base64 디코딩
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const tokenData = JSON.parse(decoded);
    
    // 만료 시간 체크
    const expires = new Date(tokenData.expires);
    if (expires < new Date()) {
      return { valid: false, reason: 'Token expired' };
    }
    
    // 라이선스 키 존재 확인
    if (!tokenData.licenseKey || !tokenData.os) {
      return { valid: false, reason: 'Invalid token data' };
    }
    
    return {
      valid: true,
      licenseKey: tokenData.licenseKey,
      os: tokenData.os,
      expires: tokenData.expires
    };
  } catch (error) {
    console.error('Token validation error:', error);
    return { valid: false, reason: 'Invalid token format' };
  }
}

// Google Cloud Storage URL 얻기
function getCloudStorageUrl(os: string): string {
  const bucketName = 'blog-pro-downloads-2025';
  
  if (os === 'windows') {
    return `https://storage.cloud.google.com/${bucketName}/BlogPro-Windows-v3.0.zip`;
  } else if (os === 'macos') {
    return `https://storage.cloud.google.com/${bucketName}/BlogPro-macOS-v3.0.zip`;
  }
  
  throw new Error('Invalid OS specified');
}

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;

    console.log("🔍 다운로드 요청 토큰:", token.substring(0, 20) + "...");

    if (!token) {
      return NextResponse.json(
        { error: "토큰이 필요합니다." },
        { status: 400 }
      );
    }

    // 토큰 검증
    const validation = await validateDownloadToken(token);
    if (!validation.valid) {
      console.error("❌ 토큰 검증 실패:", validation.reason);
      
      // 토큰 실패 시 다운로드 페이지로 리다이렉트
      return NextResponse.redirect(
        process.env.FALLBACK_DOWNLOAD_URL ||
          "https://autotoolshub.com/download"
      );
    }
    
    console.log(`✅ 토큰 검증 성공 - 라이선스: ${validation.licenseKey}, OS: ${validation.os}`);

    try {
      // Google Cloud Storage URL 가져오기
      const cloudStorageUrl = getCloudStorageUrl(validation.os);
      
      console.log(`🔗 Google Cloud Storage로 리다이렉트: ${cloudStorageUrl}`);

      // Google Cloud Storage URL로 리다이렉트
      return NextResponse.redirect(cloudStorageUrl);
      
    } catch (urlError) {
      console.error("❌ Cloud Storage URL 생성 실패:", urlError);

      // URL 생성 실패 시 대체 다운로드 링크로 리다이렉트
      return NextResponse.redirect(
        process.env.FALLBACK_DOWNLOAD_URL ||
          "https://autotoolshub.com/download"
      );
    }
  } catch (error: any) {
    console.error("💥 다운로드 API 오류:", error);

    return NextResponse.json(
      {
        error: "다운로드 중 오류가 발생했습니다.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
