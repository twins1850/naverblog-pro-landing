import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CheckCircle, TrendingUp, Clock, Zap, Users, MessageCircle, RotateCcw, PenTool } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "블로그자동화 완벽 가이드 | Blog Pro - 2024년 최신 AI 기술",
  description: "블로그자동화 전문 솔루션으로 월수익 창출하는 방법. 네이버블로그자동화부터 AI 글쓰기까지 완벽 지원. 3일 무료체험.",
  keywords: [
    "블로그자동화",
    "블로그자동화프로그램", 
    "네이버블로그자동화",
    "블로그AI자동화",
    "AI 블로그 포스팅",
    "자동 블로그 운영",
    "블로그 수익화"
  ],
};

export default function BlogAutomation() {
  const features = [
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "블로그AI자동화",
      description: "ChatGPT 5.0 기반으로 평균 2,300자 고품질 콘텐츠 자동 생성",
      stats: "99.9% 성공률"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI댓글자동화",
      description: "Gemini AI가 글 내용을 분석하여 개인화된 댓글 자동 생성",
      stats: "답방률 300%↑"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "AI서로이웃자동화", 
      description: "타겟 블로거의 최신글 분석으로 맞춤형 서로이웃 신청",
      stats: "수락률 최고"
    },
    {
      icon: <RotateCcw className="w-8 h-8" />,
      title: "AI대댓글자동화",
      description: "세계최초 대댓글 완전 자동화로 재방문율 극대화",
      stats: "재방문 300%↑"
    }
  ];

  const benefits = [
    "완전 자동화된 블로그 운영으로 24시간 수익 창출",
    "네이버블로그자동화 특화로 검색 상위 노출 보장", 
    "AI 기술로 99.9% 자연스러운 콘텐츠 생성",
    "멀티계정 동시 관리로 수익 극대화",
    "세계최초 AI대댓글자동화로 차별화된 경쟁력",
    "초보자도 쉽게 시작할 수 있는 직관적 인터페이스"
  ];

  const stats = [
    { label: "월평균 수익", value: "50만원+", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "시간 절약", value: "90%", icon: <Clock className="w-6 h-6" /> },
    { label: "자동 포스팅", value: "24/7", icon: <Zap className="w-6 h-6" /> },
    { label: "성공률", value: "99.9%", icon: <CheckCircle className="w-6 h-6" /> },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">블로그자동화</span>의 새로운 기준<br />
              Blog Pro 완벽 가이드
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              2024년 최신 AI 기술로 완성된 블로그자동화 시스템. 네이버블로그자동화부터 AI댓글자동화, 
              AI서로이웃자동화, 세계최초 AI대댓글자동화까지 모든 것을 자동화합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="xl" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/payment-info">블로그자동화 시작하기</Link>
              </Button>
              <Button size="xl" variant="outline">
                <Link href="/#demo">AI댓글자동화 데모 보기</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="flex justify-center text-blue-600 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              왜 Blog Pro 블로그자동화인가?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              단순한 자동화가 아닌, AI가 만드는 진짜 소통의 블로그자동화 시스템
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <AnimatedSection key={index} animation="slide-up" delay={index * 200}>
                <div className="p-8 bg-white rounded-2xl shadow-lg border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <span className="text-sm text-green-600 font-medium">{feature.stats}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              블로그자동화로 얻는 확실한 혜택
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              실제 사용자들이 경험한 블로그자동화의 놀라운 효과
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <AnimatedSection key={index} animation="slide-up" delay={index * 100}>
                  <div className="flex items-start gap-3 p-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-foreground leading-relaxed">{benefit}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" className="text-center">
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                블로그자동화 혁신을 지금 시작하세요
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                3일 무료체험으로 블로그자동화의 놀라운 효과를 직접 경험해보세요.<br />
                네이버블로그자동화부터 AI대댓글자동화까지 모든 기능 이용 가능합니다.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/payment-info">지금 블로그자동화 시작하기</Link>
                </Button>
                <Button size="xl" variant="outline">
                  <Link href="/blog">블로그자동화 성공사례 보기</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}