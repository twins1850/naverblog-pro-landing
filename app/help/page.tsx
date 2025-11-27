import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Download, 
  Settings, 
  PlayCircle,
  HelpCircle,
  Bug,
  Shield
} from "lucide-react";

export const metadata: Metadata = {
  title: "도움말 | Blog Pro - 블로그자동화 사용법 및 지원",
  description: "Blog Pro 블로그자동화 프로그램 사용법, 설치 가이드, 자주 묻는 질문을 확인하세요. 네이버블로그자동화 기술지원을 제공합니다.",
};

export default function HelpPage() {
  const helpCategories = [
    {
      icon: <Download className="w-6 h-6" />,
      title: "설치 및 시작하기",
      description: "프로그램 다운로드부터 초기 설정까지",
      items: [
        "시스템 요구사항 확인",
        "프로그램 다운로드 및 설치",
        "라이선스 등록하기",
        "첫 계정 연동하기"
      ]
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "기본 설정",
      description: "블로그자동화 기본 설정 방법",
      items: [
        "네이버 계정 연동",
        "글쓰기 설정 조정",
        "댓글 자동화 설정",
        "서로이웃 설정"
      ]
    },
    {
      icon: <PlayCircle className="w-6 h-6" />,
      title: "기능 사용법",
      description: "4가지 핵심 모듈 사용 가이드",
      items: [
        "블로그AI자동화 사용법",
        "AI댓글자동화 활용법",
        "AI서로이웃자동화 설정",
        "AI대댓글자동화 관리"
      ]
    },
    {
      icon: <Bug className="w-6 h-6" />,
      title: "문제해결",
      description: "자주 발생하는 문제 및 해결방법",
      items: [
        "로그인 오류 해결",
        "자동화 중단 문제",
        "속도 저하 해결",
        "오류 메시지 대응"
      ]
    }
  ];

  const faqs = [
    {
      question: "프로그램 설치가 안 되는데 어떻게 해야 하나요?",
      answer: "Windows Defender나 백신 프로그램에서 차단할 수 있습니다. 프로그램을 예외 목록에 추가하거나 잠시 실시간 보호를 해제한 후 설치해 주세요. 설치 후에는 다시 보안 프로그램을 활성화하시면 됩니다."
    },
    {
      question: "네이버 계정 로그인이 안 되는 경우",
      answer: "1) 네이버 계정 2단계 인증이 설정되어 있는지 확인 2) 계정 보안 설정에서 '외부 앱 로그인 허용' 설정 확인 3) 네이버 계정이 일시적으로 제한되었는지 확인해 주세요."
    },
    {
      question: "자동 글쓰기가 중단되는 이유는?",
      answer: "네이버 블로그의 일일 포스팅 제한, 네트워크 연결 문제, 또는 계정 보안 정책으로 인해 중단될 수 있습니다. 프로그램의 '설정' 메뉴에서 글쓰기 간격을 늘려보시거나 다시 시작해 주세요."
    },
    {
      question: "댓글 자동화가 작동하지 않아요",
      answer: "댓글 대상 블로그가 댓글 허용 설정되어 있는지, 스팸 필터링에 걸리지 않는 자연스러운 댓글인지 확인해 주세요. AI 댓글 품질 설정을 '높음'으로 조정하면 더 자연스러운 댓글이 생성됩니다."
    },
    {
      question: "여러 계정을 동시에 사용할 수 있나요?",
      answer: "라이선스 유형에 따라 동시 사용 가능한 계정 수가 제한됩니다. 베이직(1개), 프로(2개), 프리미엄(3개)까지 가능하며, 더 많은 계정이 필요하시면 업그레이드하시거나 별도 문의해 주세요."
    },
    {
      question: "프로그램이 느리게 작동해요",
      answer: "1) 컴퓨터의 메모리와 CPU 사용률 확인 2) 다른 프로그램들 종료 3) 자동화 속도 설정을 '안전 모드'로 변경 4) Windows 업데이트 및 재시작을 시도해 보세요."
    }
  ];

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">도움말</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Blog Pro 블로그자동화 사용법과 문제해결 방법을 확인하세요
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <Download className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-sm">프로그램 다운로드</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild variant="outline" size="sm">
                  <Link href="/payment-info">다운로드</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <PlayCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-sm">동영상 튜토리얼</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild variant="outline" size="sm">
                  <Link href="/tutorials">보기</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-sm">실시간 상담</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact">문의하기</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-sm">환불 정책</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild variant="outline" size="sm">
                  <Link href="/refund">확인</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {helpCategories.map((category, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">자주 묻는 질문</h2>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start space-x-2">
                        <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-7 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              문제가 해결되지 않으셨나요?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              위의 방법으로 해결되지 않는 문제가 있으시면 언제든지 연락해 주세요. 
              전문 기술지원팀이 신속하게 도움을 드리겠습니다.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-sm">jireh202503@gmail.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="text-sm">010-4248-1850</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                <span className="text-sm">카카오톡 상담</span>
              </div>
            </div>

            <div className="space-x-4">
              <Button asChild>
                <Link href="/contact">지원팀에 문의하기</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/community">커뮤니티 방문</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}