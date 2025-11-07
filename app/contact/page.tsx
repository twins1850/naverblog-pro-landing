import { Metadata } from "next"
import Link from "next/link"
import { MessageCircle, Mail, Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "문의하기 | Blog Pro",
  description: "Blog Pro 관련 문의사항이 있으시면 언제든지 연락해주세요. 카카오톡 채널, 이메일, 전화로 문의 가능합니다.",
  openGraph: {
    title: "문의하기 | Blog Pro",
    description: "Blog Pro 관련 문의사항이 있으시면 언제든지 연락해주세요.",
  },
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "카카오톡 채널",
      description: "가장 빠른 응답을 받을 수 있습니다",
      value: "Blog Pro 카카오채널",
      action: "채팅하기",
      href: "http://pf.kakao.com/_ShwJn",
      primary: true,
    },
    {
      icon: Mail,
      title: "이메일 문의",
      description: "자세한 내용은 이메일로 문의해주세요",
      value: "jireh202503@gmail.com",
      action: "이메일 보내기",
      href: "mailto:jireh202503@gmail.com",
    },
    {
      icon: Phone,
      title: "전화 문의",
      description: "급한 사항은 전화로 연락주세요",
      value: "010-4248-1850",
      action: "전화하기",
      href: "tel:010-4248-1850",
    },
  ]

  const faqItems = [
    {
      question: "라이선스는 어떻게 구매하나요?",
      answer: "홈페이지에서 '라이선스 구매' 버튼을 클릭하여 결제하시거나 무통장입금으로 구매 가능합니다.",
    },
    {
      question: "설치 방법을 알려주세요",
      answer: "결제 완료 후 이메일로 설치 파일과 설치 가이드를 전송해드립니다.",
    },
    {
      question: "환불 정책이 어떻게 되나요?",
      answer: "구매 후 7일 이내 100% 환불 가능합니다. 자세한 내용은 환불 정책 페이지를 참고해주세요.",
    },
    {
      question: "기업용 라이선스가 있나요?",
      answer: "네, 다중 계정 관리가 필요한 기업용 솔루션을 제공합니다. 카카오채널로 문의해주세요.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header Spacing */}
      <div className="h-16" />

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            문의하기
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Blog Pro에 대한 궁금한 점이 있으시면 언제든지 연락해주세요.
            <br />
            빠르고 정확한 답변을 드리겠습니다.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden ${
                  method.primary 
                    ? 'border-brand-primary bg-gradient-to-br from-brand-primary/5 to-transparent' 
                    : ''
                }`}
              >
                {method.primary && (
                  <div className="absolute top-0 right-0 bg-brand-primary text-white text-xs px-2 py-1 rounded-bl-lg">
                    추천
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-3 ${
                    method.primary 
                      ? 'bg-brand-primary text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium mb-4">{method.value}</p>
                  <Button 
                    variant={method.primary ? "brand" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <Link href={method.href} target="_blank" rel="noopener noreferrer">
                      {method.action}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              자주 묻는 질문
            </h2>
            <p className="text-muted-foreground">
              자주 묻는 질문들을 확인해보세요. 더 많은 질문은 FAQ 페이지에서 확인할 수 있습니다.
            </p>
          </div>

          <div className="grid gap-4 mb-8">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-brand-primary">
                    Q. {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A. {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/faq">
                더 많은 FAQ 보기
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-brand-primary to-brand-accent p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              지금 바로 시작해보세요
            </h3>
            <p className="text-white/90 mb-6 max-w-md mx-auto">
              ChatGPT 기반 AI로 24시간 자동 블로그 운영을 시작하세요.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              asChild
            >
              <Link href="/#pricing">
                라이선스 구매하기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}