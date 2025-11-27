import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  ArrowLeft,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Settings,
  Download,
  BookOpen,
  Video,
  Zap
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "고객지원 | BlogPro - 24시간 전문 기술 지원",
  description: "BlogPro 사용 중 궁금한 점이나 문제가 있으시면 언제든 문의하세요. 전문 기술진이 24시간 신속하게 도움을 드립니다.",
  keywords: [
    "BlogPro 고객지원",
    "블로그 자동화 문의",
    "기술 지원",
    "설치 도움",
    "사용법 문의"
  ]
};

interface SupportCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  items: string[];
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

const supportCategories: SupportCategory[] = [
  {
    id: "installation",
    title: "설치 및 설정",
    description: "BlogPro 설치, 네이버 블로그 연동, 초기 설정 관련",
    icon: <Settings className="w-6 h-6" />,
    color: "bg-blue-500",
    items: [
      "프로그램 설치 오류",
      "네이버 블로그 연동 실패",
      "라이선스 인증 문제",
      "방화벽 및 보안 설정",
      "계정 설정 오류"
    ]
  },
  {
    id: "features",
    title: "기능 사용법",
    description: "4모듈 자동화 시스템 사용방법 및 최적화",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-green-500",
    items: [
      "글쓰기 자동화 설정",
      "댓글 자동화 사용법",
      "서로이웃 자동화 설정",
      "대댓글 자동화 활용",
      "멀티계정 관리"
    ]
  },
  {
    id: "technical",
    title: "기술적 문제",
    description: "오류 해결, 성능 최적화, 호환성 문제",
    icon: <AlertCircle className="w-6 h-6" />,
    color: "bg-red-500",
    items: [
      "프로그램 크래시 문제",
      "속도 저하 현상",
      "네트워크 연결 오류",
      "메모리 사용량 과다",
      "ChatGPT API 오류"
    ]
  },
  {
    id: "billing",
    title: "결제 및 라이선스",
    description: "구독, 결제, 라이선스 갱신 관련",
    icon: <CheckCircle className="w-6 h-6" />,
    color: "bg-purple-500",
    items: [
      "결제 방법 변경",
      "라이선스 갱신",
      "환불 문의",
      "구독 플랜 변경",
      "결제 오류 해결"
    ]
  }
];

const faqs: FAQ[] = [
  {
    id: "1",
    question: "BlogPro 설치 후 네이버 블로그에 로그인이 안 돼요.",
    answer: "네이버 2단계 인증을 해제하신 후 다시 시도해보세요. BlogPro는 보안상의 이유로 2단계 인증이 활성화된 계정은 지원하지 않습니다. 네이버 내정보 > 보안설정에서 2단계 인증을 해제하시면 정상적으로 연동됩니다.",
    category: "installation",
    helpful: 127
  },
  {
    id: "2", 
    question: "글쓰기 자동화에서 생성되는 글이 너무 짧아요.",
    answer: "ChatGPT 설정에서 글자 수를 조정할 수 있습니다. 기본 설정 > 글쓰기 설정에서 '최소 글자 수'를 2000자 이상으로 설정하시면 더 긴 글이 생성됩니다. 또한 '상세 모드'를 활성화하시면 더욱 풍부한 내용의 글을 작성할 수 있습니다.",
    category: "features",
    helpful: 89
  },
  {
    id: "3",
    question: "프로그램이 자꾸 멈추거나 느려져요.",
    answer: "메모리 부족이 원인일 가능성이 높습니다. 작업 관리자에서 다른 프로그램을 종료하거나, BlogPro 설정에서 '경량 모드'를 활성화해보세요. 또한 윈도우 업데이트와 네트워크 상태도 확인해주시기 바랍니다.",
    category: "technical",
    helpful: 156
  },
  {
    id: "4",
    question: "라이선스 기간이 만료됐는데 어떻게 갱신하나요?",
    answer: "라이선스는 자동 갱신되지 않으며, 매월 수동으로 결제하셔야 합니다. 만료 전 이메일로 안내드리며, 웹사이트에서 동일한 방법으로 재결제하시면 즉시 연장됩니다. 계좌이체 또는 카카오톡을 통해 문의주시면 빠른 처리가 가능합니다.",
    category: "billing", 
    helpful: 203
  },
  {
    id: "5",
    question: "여러 네이버 계정을 동시에 사용할 수 있나요?",
    answer: "네, BlogPro의 멀티계정 기능을 이용하시면 최대 10개 계정까지 동시 관리가 가능합니다. 설정 > 계정 관리에서 추가 계정을 등록하시면 됩니다. 각 계정별로 개별 설정도 가능하여 계정마다 다른 전략을 적용할 수 있습니다.",
    category: "features",
    helpful: 178
  },
  {
    id: "6",
    question: "대댓글 자동화가 작동하지 않아요.",
    answer: "대댓글 자동화는 Pro 버전 전용 기능입니다. 라이선스가 활성화되어 있는지 확인하시고, 대댓글 설정에서 '자동 응답 모드'가 켜져있는지 확인해주세요. 또한 원본 댓글이 작성된 후 최소 10분 후에 대댓글이 자동으로 작성됩니다.",
    category: "features",
    helpful: 94
  }
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <Link 
            href="/community" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            커뮤니티로 돌아가기
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              🛟 BlogPro 고객지원
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              전문 기술진이 24시간 신속하고 정확한 지원을 제공합니다
            </p>
          </div>
        </div>

        {/* 긴급 연락처 */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-green-700">카카오톡 문의</h3>
                <p className="text-sm text-green-600 mb-2">가장 빠른 응답 (평균 3분)</p>
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  <a href="http://pf.kakao.com/_ShwJn/chat" target="_blank" rel="noopener noreferrer">
                    즉시 문의하기
                  </a>
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-blue-700">전화 문의</h3>
                <p className="text-sm text-blue-600 mb-2">평일 09:00~18:00</p>
                <div className="text-lg font-bold text-blue-600">
                  010-4248-1850
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-purple-700">이메일 문의</h3>
                <p className="text-sm text-purple-600 mb-2">24시간 접수 (12시간 내 응답)</p>
                <div className="text-sm font-bold text-purple-600">
                  jireh202503@gmail.com
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 왼쪽: 지원 카테고리 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  📋 지원 카테고리
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportCategories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className={`${category.color} text-white p-2 rounded-lg`}>
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{category.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                        <div className="space-y-1">
                          {category.items.map((item, index) => (
                            <div key={index} className="text-xs text-muted-foreground flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2"></div>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 추가 리소스 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  📚 추가 도움 자료
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Video className="w-4 h-4 mr-2" />
                  <Link href="/tutorials">동영상 튜토리얼 보기</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  사용자 매뉴얼 다운로드
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <Link href="/community">커뮤니티에서 답변 찾기</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: FAQ */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  ❓ 자주 묻는 질문
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm leading-relaxed">{faq.question}</h4>
                        <Badge variant="outline" className="text-xs">
                          도움됨 {faq.helpful}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 문의하기 폼 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  💌 직접 문의하기
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" placeholder="이름을 입력하세요" />
                  </div>
                  <div>
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category">문의 유형</Label>
                  <select className="w-full p-2 border rounded-md bg-background">
                    <option>설치 및 설정</option>
                    <option>기능 사용법</option>
                    <option>기술적 문제</option>
                    <option>결제 및 라이선스</option>
                    <option>기타 문의</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="subject">제목</Label>
                  <Input id="subject" placeholder="문의 제목을 입력하세요" />
                </div>
                
                <div>
                  <Label htmlFor="message">문의 내용</Label>
                  <Textarea 
                    id="message" 
                    placeholder="자세한 문의 내용을 작성해주세요. 오류 메시지가 있다면 함께 적어주세요." 
                    rows={5}
                  />
                </div>
                
                <Button className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  문의 보내기
                </Button>
                
                <div className="text-xs text-muted-foreground text-center">
                  문의 사항은 12시간 이내에 응답드립니다.<br/>
                  긴급한 경우 카카오톡으로 문의해주세요.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 지원 시간 및 정책 */}
        <Card className="mt-8 bg-gray-50">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  ⏰ 지원 시간
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>카카오톡 문의</span>
                    <span className="font-medium text-green-600">24시간 (평균 3분 응답)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>전화 문의</span>
                    <span className="font-medium">평일 09:00~18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>이메일 문의</span>
                    <span className="font-medium">12시간 이내 응답</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-3">🔒 지원 정책</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>• 라이선스 보유 고객 우선 지원</div>
                  <div>• 원격 지원 가능 (TeamViewer)</div>
                  <div>• 설정 파일 백업 및 복구 지원</div>
                  <div>• 1:1 화상 통화 설정 도움</div>
                  <div>• 무료 재설치 및 마이그레이션</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}