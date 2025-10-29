import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productName, accountCount = 5, months = 3 } = await request.json();
    
    // 기능 코드 추출 로직
    const codes = [];
    if (productName.includes('글쓰기') || productName.includes('블로그')) {
      codes.push('A');
    }
    if (productName.includes('댓글')) {
      codes.push('B'); 
    }
    if (productName.includes('서로이웃')) {
      codes.push('C');
    }
    if (productName.includes('대댓글')) {
      codes.push('D');
    }
    
    const featureCodes = codes.length > 0 ? codes : ['A', 'B', 'C', 'D'];
    
    // 인코딩 매핑
    const sortedCodes = [...featureCodes].sort();
    const combination = sortedCodes.join('');
    
    const encodingMap = {
      'A': 'F2', 'B': 'G4', 'C': 'H6', 'D': 'J8',
      'AB': 'K3', 'AC': 'L5', 'AD': 'M7', 'BC': 'N9', 'BD': 'P1', 'CD': 'Q3',
      'ABC': 'R5', 'ABD': 'S7', 'ACD': 'T9', 'BCD': 'U1',
      'ABCD': 'V3'
    };
    
    const expectedEncoding = encodingMap[combination] || 'V3';
    
    // 렌더 API 호출
    const requestBody = {
      feature_codes: featureCodes,
      version: "v1",
      restrictions: parseFloat(`${accountCount}.0`),
      duration_days: months * 30,
      usage_limit: months * 30
    };
    
    const response = await fetch('https://naver-auto-blog.onrender.com/licenses/modular', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    const actualEncoding = data.license_key.split('-')[0];
    
    return NextResponse.json({
      success: true,
      productName,
      featureCodes,
      combination,
      expectedEncoding,
      actualEncoding,
      licenseKey: data.license_key,
      match: actualEncoding === expectedEncoding,
      apiRequest: requestBody,
      apiResponse: data
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Simple License Test API",
    usage: "POST with { productName: '댓글자동화' | '글쓰기자동화 + 대댓글자동화' }"
  });
}