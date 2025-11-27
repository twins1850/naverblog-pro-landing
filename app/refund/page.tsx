import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "환불정책 | Blog Pro - 블로그자동화 서비스 환불규정",
  description: "Blog Pro 블로그자동화 서비스의 환불정책입니다. 네이버블로그자동화 프로그램 구매 후 환불 조건 및 절차를 확인하세요.",
};

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">환불정책</h1>
          
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mb-6">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                Blog Pro는 고객 만족을 최우선으로 하며, 공정하고 투명한 환불정책을 제공합니다.
              </p>
            </div>

            <h2>1. 환불 가능 조건</h2>
            
            <h3>1.1 무조건 환불 가능한 경우</h3>
            <ul>
              <li><strong>3일 무료체험 기간 내</strong>: 체험 기간 중 언제든지 전액 환불 가능</li>
              <li><strong>기술적 결함</strong>: 소프트웨어의 심각한 기술적 결함으로 사용이 불가능한 경우</li>
              <li><strong>서비스 중단</strong>: 당사의 사정으로 서비스가 중단되는 경우</li>
              <li><strong>허위광고</strong>: 광고 내용과 실제 서비스가 현저히 다른 경우</li>
            </ul>

            <h3>1.2 조건부 환불 가능한 경우</h3>
            <ul>
              <li><strong>7일 내 미사용</strong>: 결제 후 7일 이내, 소프트웨어를 실질적으로 사용하지 않은 경우</li>
              <li><strong>호환성 문제</strong>: 시스템 요구사항을 충족했음에도 정상 작동하지 않는 경우</li>
              <li><strong>기능 누락</strong>: 광고된 핵심 기능이 작동하지 않는 경우</li>
            </ul>

            <h2>2. 환불 불가 조건</h2>
            
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
              <h3 className="text-red-700 dark:text-red-300 mt-0">다음의 경우 환불이 불가능합니다:</h3>
              <ul className="text-red-700 dark:text-red-300">
                <li>정상적으로 7일 이상 사용한 후의 단순 변심</li>
                <li>사용자의 부주의로 인한 계정 제재나 손실</li>
                <li>네이버 정책 변경으로 인한 서비스 제약</li>
                <li>사용법을 숙지하지 않아 발생한 문제</li>
                <li>시스템 요구사항을 충족하지 못하는 환경에서의 사용</li>
                <li>라이선스 위반 후 서비스 이용 중단</li>
              </ul>
            </div>

            <h2>3. 환불 절차</h2>
            
            <div className="grid md:grid-cols-4 gap-4 my-6">
              <div className="border border-border rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">1</div>
                <h4 className="font-bold text-sm">신청</h4>
                <p className="text-xs text-muted-foreground mt-1">이메일로 환불 신청</p>
              </div>
              <div className="border border-border rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">2</div>
                <h4 className="font-bold text-sm">검토</h4>
                <p className="text-xs text-muted-foreground mt-1">환불 조건 확인</p>
              </div>
              <div className="border border-border rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">3</div>
                <h4 className="font-bold text-sm">승인</h4>
                <p className="text-xs text-muted-foreground mt-1">환불 승인 통보</p>
              </div>
              <div className="border border-border rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">4</div>
                <h4 className="font-bold text-sm">처리</h4>
                <p className="text-xs text-muted-foreground mt-1">환불금 지급</p>
              </div>
            </div>

            <h3>3.1 환불 신청 방법</h3>
            <p>환불을 원하시는 경우 다음 정보를 포함하여 이메일로 신청해 주세요:</p>
            <ul>
              <li><strong>이메일</strong>: jireh202503@gmail.com</li>
              <li><strong>제목</strong>: [환불신청] 주문번호 + 이름</li>
              <li><strong>필수 정보</strong>:
                <ul>
                  <li>주문번호 또는 결제 확인 정보</li>
                  <li>환불 사유 (구체적으로 기재)</li>
                  <li>결제자명 및 연락처</li>
                  <li>환불받을 계좌정보 (예금주명 반드시 기재)</li>
                </ul>
              </li>
            </ul>

            <h3>3.2 처리 기간</h3>
            <ul>
              <li><strong>검토 기간</strong>: 신청 접수 후 1-3 영업일</li>
              <li><strong>환불 처리</strong>: 승인 후 3-7 영업일</li>
              <li><strong>카드 결제</strong>: 카드사별 정책에 따라 1-2주 소요 가능</li>
            </ul>

            <h2>4. 환불 금액</h2>
            
            <table className="w-full border-collapse border border-border mt-4">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">환불 시점</th>
                  <th className="border border-border p-3 text-left">환불 비율</th>
                  <th className="border border-border p-3 text-left">비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">3일 무료체험 내</td>
                  <td className="border border-border p-3">100%</td>
                  <td className="border border-border p-3">전액 환불</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">결제 후 7일 이내 미사용</td>
                  <td className="border border-border p-3">100%</td>
                  <td className="border border-border p-3">사용 흔적 없는 경우</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">기술적 결함</td>
                  <td className="border border-border p-3">100%</td>
                  <td className="border border-border p-3">당사 귀책사유</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">부분 사용 후</td>
                  <td className="border border-border p-3">일할계산</td>
                  <td className="border border-border p-3">사용일수 차감</td>
                </tr>
              </tbody>
            </table>

            <h2>5. 특별 약관</h2>

            <h3>5.1 무료체험 정책</h3>
            <ul>
              <li>모든 신규 사용자에게 <strong>3일 무료체험</strong> 제공</li>
              <li>체험 기간 중 모든 기능 이용 가능</li>
              <li>체험 기간 내 해지 시 일체 비용 청구하지 않음</li>
            </ul>

            <h3>5.2 부분 환불 계산</h3>
            <p>월간 구독 서비스의 부분 환불은 다음과 같이 계산됩니다:</p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono">
              환불금액 = (월 이용료 ÷ 30일) × (30일 - 사용일수)
            </div>

            <h2>6. 환불 후 조치사항</h2>
            <ul>
              <li>환불 처리 시 즉시 소프트웨어 사용권한 종료</li>
              <li>다운로드된 프로그램 삭제 의무</li>
              <li>계정 정보 및 설정 데이터 삭제</li>
              <li>재구매 시 신규 고객으로 취급</li>
            </ul>

            <h2>7. 문의 및 상담</h2>
            
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="mt-0 mb-4">환불 관련 문의</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">📧 이메일 상담</h4>
                  <p className="text-sm">jireh202503@gmail.com</p>
                  <p className="text-xs text-muted-foreground">24시간 접수, 1-3일 내 답변</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">📞 전화 상담</h4>
                  <p className="text-sm">010-4248-1850</p>
                  <p className="text-xs text-muted-foreground">평일 9:00-18:00</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                ℹ️ <strong>참고사항:</strong> 본 환불정책은 전자상거래법 및 소비자보호법에 따라 작성되었으며, 
                관련 법령이 개정될 경우 법령에 따릅니다.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="mr-4">
                <Link href="/contact">환불 문의하기</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">홈으로 돌아가기</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}