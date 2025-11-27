import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관 | Blog Pro - 블로그자동화 서비스 약관",
  description: "Blog Pro 블로그자동화 서비스 이용약관입니다. 네이버블로그자동화, AI댓글자동화 등 서비스 이용 시 적용되는 약관을 확인하세요.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">서비스 이용약관</h1>
          
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <h2>제1조 (목적)</h2>
            <p>본 약관은 Blog Pro(이하 "회사")가 제공하는 블로그자동화 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>

            <h2>제2조 (정의)</h2>
            <ol>
              <li>"서비스"라 함은 회사가 제공하는 블로그자동화, AI댓글자동화, AI서로이웃자동화, AI대댓글자동화 등의 블로그 관리 자동화 서비스를 의미합니다.</li>
              <li>"이용자"라 함은 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 의미합니다.</li>
              <li>"회원"이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서, 계속적으로 회사의 정보를 제공받으며 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.</li>
            </ol>

            <h2>제3조 (약관의 효력 및 변경)</h2>
            <ol>
              <li>본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.</li>
              <li>회사는 필요하다고 인정되는 경우 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지합니다.</li>
            </ol>

            <h2>제4조 (서비스의 제공)</h2>
            <ol>
              <li>회사는 다음과 같은 서비스를 제공합니다:
                <ul>
                  <li>블로그AI자동화: ChatGPT 기반 자동 글쓰기</li>
                  <li>AI댓글자동화: 개인화된 댓글 자동 생성</li>
                  <li>AI서로이웃자동화: 맞춤형 서로이웃 신청</li>
                  <li>AI대댓글자동화: 자동 대댓글 관리</li>
                </ul>
              </li>
              <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
            </ol>

            <h2>제5조 (서비스 이용의 제한)</h2>
            <ol>
              <li>이용자는 본 서비스를 네이버 블로그 이용정책에 위배되지 않는 범위 내에서 사용해야 합니다.</li>
              <li>다음 각 호에 해당하는 행위는 금지됩니다:
                <ul>
                  <li>타인의 개인정보를 도용하는 행위</li>
                  <li>서비스를 이용하여 불법적인 활동을 하는 행위</li>
                  <li>회사의 서버에 부하를 주는 과도한 이용</li>
                  <li>기타 관련 법령에 위배되는 행위</li>
                </ul>
              </li>
            </ol>

            <h2>제6조 (개인정보보호)</h2>
            <p>회사는 이용자의 개인정보를 보호하기 위하여 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령을 준수하며, 개인정보처리방침을 별도로 정하여 적용합니다.</p>

            <h2>제7조 (면책조항)</h2>
            <ol>
              <li>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
              <li>회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
              <li>본 서비스는 네이버 공식 서비스가 아니며, 네이버의 이용약관을 준수하여 사용해야 합니다.</li>
              <li>자동화 사용으로 인한 계정 제재는 사용자 책임입니다.</li>
            </ol>

            <h2>제8조 (분쟁해결)</h2>
            <p>서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.</p>

            <h2>제9조 (기타)</h2>
            <p>본 약관에서 정하지 아니한 사항과 본 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자보호지침 및 관계법령 또는 상관례에 따릅니다.</p>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                본 약관은 2024년 1월 1일부터 적용됩니다.<br />
                문의사항이 있으시면 <strong>jireh202503@gmail.com</strong>으로 연락주세요.
              </p>
            </div>

            <div className="mt-8 text-center">
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