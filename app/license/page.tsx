import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "라이선스 정보 | Blog Pro - 블로그자동화 소프트웨어 라이선스",
  description: "Blog Pro 블로그자동화 소프트웨어의 라이선스 정보입니다. 네이버블로그자동화 프로그램 사용권한 및 제한사항을 확인하세요.",
};

export default function LicensePage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">소프트웨어 라이선스</h1>
          
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <h2>Blog Pro 라이선스 계약서</h2>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mb-6">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                본 라이선스는 Blog Pro 블로그자동화 소프트웨어의 사용권한과 제한사항을 정의합니다.
              </p>
            </div>

            <h3>1. 라이선스 부여</h3>
            <p>Blog Pro(이하 "라이선서")는 본 계약의 조건에 따라 사용자에게 다음과 같은 권리를 부여합니다:</p>
            <ul>
              <li>개인적, 비상업적 목적으로 소프트웨어를 설치하고 사용할 권리</li>
              <li>구매한 라이선스 유형에 따른 계정 수 제한 내에서 사용할 권리</li>
              <li>소프트웨어 업데이트 및 기술지원을 받을 권리</li>
            </ul>

            <h3>2. 라이선스 유형</h3>
            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-bold text-lg mb-2">베이직</h4>
                <ul className="text-sm">
                  <li>계정 1개</li>
                  <li>일일 포스팅 1개</li>
                  <li>기본 기능 이용</li>
                </ul>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-bold text-lg mb-2">프로</h4>
                <ul className="text-sm">
                  <li>계정 2개</li>
                  <li>일일 포스팅 2개</li>
                  <li>고급 기능 이용</li>
                </ul>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-bold text-lg mb-2">프리미엄</h4>
                <ul className="text-sm">
                  <li>계정 3개</li>
                  <li>일일 포스팅 3개</li>
                  <li>모든 기능 이용</li>
                </ul>
              </div>
            </div>

            <h3>3. 사용 제한사항</h3>
            <p>사용자는 다음과 같은 행위를 하실 수 없습니다:</p>
            <ul>
              <li>소프트웨어를 복제, 배포, 판매하거나 제3자에게 양도하는 행위</li>
              <li>소프트웨어를 리버스 엔지니어링, 디컴파일, 디스어셈블하는 행위</li>
              <li>라이선스에서 허용된 계정 수를 초과하여 사용하는 행위</li>
              <li>불법적인 목적이나 네이버 이용정책에 위반되는 방식으로 사용하는 행위</li>
              <li>소프트웨어의 보안 기능을 우회하거나 무력화하는 행위</li>
            </ul>

            <h3>4. 지적재산권</h3>
            <p>소프트웨어와 관련된 모든 지적재산권은 라이선서에게 귀속되며, 본 라이선스는 소유권이 아닌 사용권만을 부여합니다.</p>

            <h3>5. 라이선스 기간 및 종료</h3>
            <ul>
              <li>월간 라이선스: 결제일로부터 30일간 유효</li>
              <li>라이선스 위반 시 즉시 종료될 수 있습니다</li>
              <li>라이선스 종료 시 소프트웨어 사용을 중단해야 합니다</li>
            </ul>

            <h3>6. 기술지원</h3>
            <p>라이선서는 유효한 라이선스 보유자에게 다음과 같은 지원을 제공합니다:</p>
            <ul>
              <li>이메일을 통한 기술지원</li>
              <li>소프트웨어 업데이트 및 버그 수정</li>
              <li>사용 가이드 및 문서 제공</li>
            </ul>

            <h3>7. 면책조항</h3>
            <ul>
              <li>소프트웨어는 "있는 그대로" 제공되며, 명시적 또는 묵시적 보증을 제공하지 않습니다</li>
              <li>네이버 계정 제재나 기타 외부 서비스의 정책 변경으로 인한 손해에 대해 책임지지 않습니다</li>
              <li>사용자의 부적절한 사용으로 인한 결과에 대해 책임지지 않습니다</li>
            </ul>

            <h3>8. 개인정보보호</h3>
            <p>라이선서는 사용자의 개인정보를 보호하며, 별도의 개인정보처리방침에 따라 처리합니다.</p>

            <h3>9. 법적 고지사항</h3>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
              <p className="text-yellow-700 dark:text-yellow-300 font-medium mb-2">⚠️ 중요 고지사항</p>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm">
                <li>본 소프트웨어는 네이버 공식 서비스가 아닙니다</li>
                <li>네이버의 이용약관을 준수하여 사용해야 합니다</li>
                <li>자동화 사용으로 인한 계정 제재는 사용자 책임입니다</li>
                <li>서비스 이용 전 네이버 블로그 정책을 반드시 확인하시기 바랍니다</li>
              </ul>
            </div>

            <h3>10. 준거법 및 분쟁해결</h3>
            <p>본 라이선스는 대한민국 법률에 따라 해석되며, 분쟁 발생 시 서울중앙지방법원을 전속관할법원으로 합니다.</p>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h4 className="font-bold mb-2">연락처</h4>
              <p className="text-sm text-muted-foreground">
                라이선스 관련 문의: <strong>jireh202503@gmail.com</strong><br />
                전화: <strong>010-4248-1850</strong>
              </p>
            </div>

            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="mr-4">
                <Link href="/payment-info">라이선스 구매</Link>
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