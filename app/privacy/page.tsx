import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | Blog Pro - 블로그자동화 개인정보보호",
  description: "Blog Pro 블로그자동화 서비스의 개인정보처리방침입니다. 네이버블로그자동화 이용 시 개인정보 수집, 이용, 보관에 관한 정책을 확인하세요.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">개인정보처리방침</h1>
          
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <p className="text-lg text-muted-foreground mb-6">
              Blog Pro(이하 "회사")는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 
              적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다.
            </p>

            <h2>1. 개인정보의 처리목적</h2>
            <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
            <ul>
              <li>블로그자동화 서비스 제공</li>
              <li>회원 가입의사 확인 및 회원제 서비스 제공</li>
              <li>고지사항 전달, 불만처리 등을 위한 의사소통 경로 확보</li>
              <li>마케팅 및 광고에의 활용</li>
              <li>서비스 개선 및 신규 서비스 개발</li>
            </ul>

            <h2>2. 개인정보의 처리 및 보유기간</h2>
            <ol>
              <li>회사는 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</li>
              <li>구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다:
                <ul>
                  <li>회원가입 및 관리: 서비스 이용계약 또는 회원가입 해지시까지</li>
                  <li>재화 또는 서비스 제공: 재화·서비스 공급완료 및 요금결제·정산 완료시까지</li>
                  <li>불만처리: 불만 제기일로부터 3년</li>
                </ul>
              </li>
            </ol>

            <h2>3. 개인정보의 제3자 제공</h2>
            <ol>
              <li>회사는 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</li>
              <li>회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다:
                <ul>
                  <li>결제대행업체: 결제 처리를 위한 최소한의 정보</li>
                  <li>이메일 서비스 제공업체: 서비스 관련 안내를 위한 이메일 주소</li>
                </ul>
              </li>
            </ol>

            <h2>4. 개인정보처리의 위탁</h2>
            <ol>
              <li>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
                <ul>
                  <li>결제처리: PayAction, 토스페이먼츠</li>
                  <li>이메일 발송: Gmail API</li>
                  <li>클라우드 서비스: Google Sheets, Vercel</li>
                </ul>
              </li>
              <li>위탁계약 체결시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</li>
            </ol>

            <h2>5. 정보주체의 권리·의무 및 행사방법</h2>
            <ol>
              <li>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
                <ul>
                  <li>개인정보 처리현황 통지요구</li>
                  <li>개인정보 열람요구</li>
                  <li>개인정보 정정·삭제요구</li>
                  <li>개인정보 처리정지요구</li>
                </ul>
              </li>
              <li>제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.</li>
            </ol>

            <h2>6. 처리하는 개인정보 항목</h2>
            <p>회사는 다음의 개인정보 항목을 처리하고 있습니다:</p>
            <ul>
              <li>필수항목: 이메일주소, 휴대전화번호, 서비스 이용기록</li>
              <li>선택항목: 이름, 회사명</li>
              <li>자동 수집 항목: IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록</li>
            </ul>

            <h2>7. 개인정보의 파기</h2>
            <ol>
              <li>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</li>
              <li>파기의 절차 및 방법:
                <ul>
                  <li>전자적 형태: 기술적 방법을 사용하여 기록을 재생할 수 없도록 영구삭제</li>
                  <li>기타 기록물: 분쇄 또는 소각</li>
                </ul>
              </li>
            </ol>

            <h2>8. 개인정보의 안전성 확보조치</h2>
            <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
            <ul>
              <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
              <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치</li>
              <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ul>

            <h2>9. 개인정보보호책임자</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p><strong>개인정보보호책임자:</strong> 김형원</p>
              <p><strong>연락처:</strong> 010-4248-1850</p>
              <p><strong>이메일:</strong> jireh202503@gmail.com</p>
            </div>

            <h2>10. 개인정보 처리방침 변경</h2>
            <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                본 방침은 2024년 1월 1일부터 시행됩니다.<br />
                개인정보 관련 문의사항은 <strong>jireh202503@gmail.com</strong>으로 연락주세요.
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