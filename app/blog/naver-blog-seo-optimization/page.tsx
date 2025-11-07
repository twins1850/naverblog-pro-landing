import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/ui/animated-section"
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft,
  ArrowRight,
  Share2,
  BookOpen,
  CheckCircle,
  MessageCircle,
  Target,
  TrendingUp,
  BarChart3,
  Heart,
  Users,
  Eye
} from "lucide-react"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autotoolshub.com'

export const metadata: Metadata = {
  title: "네이버 블로그 댓글 자동화의 현실 - Gemini 기반 맞춤형 댓글 시스템 | Blog Pro",
  description: "Blog Pro의 Gemini 기반 댓글 자동화가 기존 복붙 댓글과 어떻게 다른지, 실제 답방률 300% 향상 사례와 함께 상세히 설명합니다.",
  keywords: [
    "네이버 블로그 댓글 자동화",
    "Gemini 댓글 시스템",
    "맞춤형 댓글 생성",
    "답방률 향상",
    "블로그 소통 자동화",
    "AI 댓글 분석",
    "개인화 댓글",
    "블로그 네트워킹"
  ],
  openGraph: {
    title: "네이버 블로그 댓글 자동화의 현실 - Gemini 기반 맞춤형 댓글 시스템",
    description: "Blog Pro의 Gemini 기반 댓글 자동화가 기존 복붙 댓글과 어떻게 다른지, 실제 답방률 300% 향상 사례와 함께 설명합니다.",
    url: `${siteUrl}/blog/naver-blog-seo-optimization`,
    siteName: "Blog Pro",
    images: [
      {
        url: "/images/blog/thumbnails/comment-automation.svg",
        width: 1200,
        height: 630,
        alt: "네이버 블로그 댓글 자동화 가이드"
      }
    ],
    locale: "ko_KR",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "네이버 블로그 댓글 자동화의 현실 - Gemini 기반 맞춤형 댓글 시스템",
    description: "Blog Pro의 Gemini 기반 댓글 자동화가 기존 복붙 댓글과 어떻게 다른지 알아보세요.",
    images: ["/images/blog/thumbnails/comment-automation.svg"]
  },
  alternates: {
    canonical: `${siteUrl}/blog/naver-blog-seo-optimization`
  }
}

export default function NaverBlogSEOOptimization() {
  const publishDate = "2025-01-06"
  const author = "Blog Pro 팀"
  const readTime = "10분"
  const category = "AI 자동화"

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "네이버 블로그 댓글 자동화의 현실 - Gemini 기반 맞춤형 댓글 시스템",
    "description": "Blog Pro의 Gemini 기반 댓글 자동화가 기존 복붙 댓글과 어떻게 다른지, 실제 답방률 300% 향상 사례와 함께 설명합니다.",
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Blog Pro",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/icon-512.png`
      }
    },
    "datePublished": publishDate,
    "dateModified": publishDate,
    "url": `${siteUrl}/blog/naver-blog-seo-optimization`,
    "image": `${siteUrl}/images/blog/thumbnails/comment-automation.svg`,
    "articleSection": category,
    "keywords": "네이버 블로그 댓글 자동화, Gemini 댓글 시스템, 맞춤형 댓글 생성, 답방률 향상",
    "wordCount": 1900,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/naver-blog-seo-optimization`
    }
  }

  const tableOfContents = [
    { id: "comment-problem", title: "기존 댓글 자동화의 문제점" },
    { id: "gemini-system", title: "Gemini 기반 맞춤형 댓글 시스템" },
    { id: "content-analysis", title: "글 내용 실시간 분석 과정" },
    { id: "personalization", title: "개인화된 정성스러운 댓글 생성" },
    { id: "success-cases", title: "답방률 300% 향상 실제 사례" },
    { id: "setup-guide", title: "실제 설정 및 활용법" }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground">홈</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground">블로그</Link>
            <span>/</span>
            <span className="text-foreground">네이버 블로그 댓글 자동화</span>
          </nav>

          {/* Back Button */}
          <div className="mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                블로그로 돌아가기
              </Button>
            </Link>
          </div>

          {/* Header */}
          <AnimatedSection animation="fade-up">
            <header className="mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-medium mb-4">
                {category}
              </div>
              
              <h1 className="text-headline font-bold mb-6 leading-tight">
                네이버 블로그 댓글 자동화의 <span className="text-gradient">현실</span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(publishDate).toLocaleDateString('ko-KR')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{readTime} 읽기</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{author}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  공유하기
                </Button>
              </div>
              
              <p className="text-body-large text-muted-foreground leading-relaxed">
                기존의 블로그 댓글 자동화는 똑같은 복붙 댓글로 인해 무시당하는 것이 현실입니다. 
                Blog Pro의 Gemini 기반 댓글 시스템이 어떻게 이 문제를 해결하고 
                실제 답방률 300% 향상을 달성하는지 자세히 알아보세요.
              </p>
            </header>
          </AnimatedSection>

          {/* Success Metrics */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-success mb-1">300%</div>
                <div className="text-sm text-muted-foreground">답방률 향상</div>
              </div>
              <div className="bg-gradient-to-br from-brand-accent/10 to-brand-accent/5 border border-brand-accent/20 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-brand-accent mb-1">개인화</div>
                <div className="text-sm text-muted-foreground">맞춤형 댓글 생성</div>
              </div>
              <div className="bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 border border-brand-primary/20 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-brand-primary mb-1">실시간</div>
                <div className="text-sm text-muted-foreground">글 내용 분석</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Table of Contents */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="bg-card rounded-xl border border-border p-6 mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-5 h-5 text-brand-accent" />
                <h2 className="font-semibold">목차</h2>
              </div>
              <nav className="grid md:grid-cols-2 gap-2">
                {tableOfContents.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {index + 1}. {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </AnimatedSection>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <AnimatedSection animation="fade-up" delay={300}>
              <section id="comment-problem" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-destructive rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</div>
                  기존 댓글 자동화의 문제점
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  대부분의 블로그 자동화 프로그램들은 복붙식 고정 멘트를 사용하여 
                  댓글을 남기기 때문에 성의없어 보이고 결국 무시당하는 것이 현실입니다.
                </p>

                <h3 className="text-lg font-semibold mb-4">기존 프로그램들의 치명적 한계</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-800 mb-2">❌ 복붙 고정 멘트</h4>
                        <p className="text-red-700 text-sm leading-relaxed mb-3">
                          "좋은 정보 감사합니다", "잘 보고 갑니다" 같은 천편일률적인 댓글로 인해 
                          블로거들이 바로 스팸으로 인식하고 무시하게 됩니다.
                        </p>
                        <div className="bg-red-100 rounded-lg p-3">
                          <p className="text-sm text-red-800">
                            <strong>실제 예시:</strong> "포스팅 잘 보고 갑니다^^" - 동일한 댓글이 수백 번 반복
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-800 mb-2">⚠️ 글 내용 무시</h4>
                        <p className="text-orange-700 text-sm leading-relaxed">
                          글의 내용을 전혀 읽지 않고 댓글을 달기 때문에 
                          상황에 맞지 않는 부적절한 댓글이 달리는 경우가 많습니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">📉 100% 무시당하는 결과</h4>
                        <p className="text-yellow-700 text-sm leading-relaxed">
                          답방률이 거의 0%에 가까우며, 오히려 스팸으로 신고당하거나 
                          차단당하는 경우가 빈번하게 발생합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                  <h4 className="font-semibold text-destructive mb-3">💔 현실적인 문제</h4>
                  <p className="text-sm">
                    기존 자동화 프로그램으로는 <strong>진정한 소통이 불가능</strong>하며, 
                    단순히 댓글 개수만 늘어날 뿐 실제 네트워킹 효과는 전혀 없습니다.
                  </p>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <section id="gemini-system" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</div>
                  Gemini 기반 맞춤형 댓글 시스템
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Blog Pro는 Google의 Gemini AI를 활용해 각 블로그 글의 내용을 실시간으로 분석하고, 
                  글의 맥락에 맞는 개인화된 댓글을 자동 생성합니다.
                </p>

                <h3 className="text-lg font-semibold mb-4">Blog Pro만의 혁신적 댓글 시스템</h3>

                <div className="space-y-4 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-green-800 mb-3">🧠 실시간 글 내용 분석</h4>
                    <p className="text-green-700 text-sm mb-3">
                      Gemini가 방문한 블로그 글의 제목, 본문, 이미지, 태그까지 종합적으로 분석하여 
                      글의 핵심 주제와 감정을 파악합니다.
                    </p>
                    <div className="bg-green-100 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        <strong>분석 요소:</strong> 글의 주제, 감정 톤, 질문 유형, 정보 종류, 작성 의도
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-800 mb-3">💬 맞춤형 댓글 생성</h4>
                    <p className="text-blue-700 text-sm mb-3">
                      분석된 내용을 바탕으로 글에 어울리는 구체적이고 정성스러운 댓글을 자동으로 작성합니다.
                    </p>
                    <div className="bg-blue-100 rounded-lg p-3 space-y-2">
                      <p className="text-sm text-blue-800">
                        <strong>요리 글:</strong> "불고기 양념 비법 정말 유용하네요! 간장 대신 굴소스 넣는 팁은 처음 알았어요 👍"
                      </p>
                      <p className="text-sm text-blue-800">
                        <strong>여행 글:</strong> "제주도 숨은 맛집 정보 감사해요. 특히 흑돼지 맛집은 꼭 가보고 싶네요!"
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={500}>
              <section id="content-analysis" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</div>
                  글 내용 실시간 분석 과정
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-medium">페이지 방문 및 콘텐츠 수집</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        대상 블로그에 방문하여 제목, 본문, 이미지, 태그 등 모든 콘텐츠 정보를 수집
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-medium">Gemini AI 자연어 처리</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        수집된 텍스트를 Gemini가 분석하여 주제, 감정, 의도, 핵심 키워드를 추출
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-medium">댓글 패턴 선택</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        글의 성격에 맞는 댓글 유형 결정 (질문형, 공감형, 정보 추가형, 경험 공유형)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-medium">개인화된 댓글 작성</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        계정별 톤앤매너를 반영하여 자연스럽고 진정성 있는 댓글 완성
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={600}>
              <section id="success-cases" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">★</div>
                  답방률 300% 향상 실제 사례
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-success/10 to-brand-accent/10 border border-success/20 rounded-lg p-6">
                    <h3 className="font-semibold text-success mb-4">📈 김○○님 - 육아 블로거</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">기존 복붙 댓글 방식</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• 일일 댓글 수: 50개</li>
                          <li>• 답방률: 2% (1명)</li>
                          <li>• 서로이웃 수락률: 5%</li>
                          <li>• 소통 품질: 매우 낮음</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Blog Pro 적용 후 (1개월)</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4 text-success" />
                            <span><strong>일일 댓글 수: 40개</strong> (품질 중심)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Heart className="w-4 h-4 text-brand-accent" />
                            <span><strong>답방률: 60%</strong> (300% 향상)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-brand-primary" />
                            <span><strong>서로이웃 수락률: 35%</strong></span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-success" />
                            <span><strong>소통 품질: 대폭 향상</strong></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-success/20">
                      <h4 className="font-medium text-success mb-2">🔑 성공 비결</h4>
                      <p className="text-sm">
                        "아이 이유식 만들 때 이런 재료 조합은 생각 못했네요! 우리 아이도 시도해볼게요" 
                        같은 구체적이고 진심어린 댓글로 다른 육아맘들의 높은 호응을 얻었습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={700}>
              <section id="setup-guide" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">4</div>
                  실제 설정 및 활용법
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold mb-4">📝 댓글 자동화 설정 단계</h3>
                    <ol className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-brand-accent text-white rounded-full text-sm flex items-center justify-center">1</span>
                        <div>
                          <strong>Gemini API 연동</strong>
                          <p className="text-muted-foreground text-sm mt-1">Google AI Studio에서 Gemini API 키 발급 후 Blog Pro에 등록</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-brand-accent text-white rounded-full text-sm flex items-center justify-center">2</span>
                        <div>
                          <strong>댓글 스타일 설정</strong>
                          <p className="text-muted-foreground text-sm mt-1">계정별 톤앤매너, 관심사, 전문 분야를 설정하여 개성 있는 댓글 생성</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-brand-accent text-white rounded-full text-sm flex items-center justify-center">3</span>
                        <div>
                          <strong>대상 블로그 선별</strong>
                          <p className="text-muted-foreground text-sm mt-1">관련 분야 블로그를 타겟팅하여 의미있는 소통이 가능한 대상 선정</p>
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="font-semibold text-green-800 mb-3">💡 효과적인 활용 팁</h3>
                      <ul className="text-sm text-green-700 space-y-2">
                        <li>• 댓글 빈도 조절로 스팸 방지</li>
                        <li>• 계정별 다른 관심사 설정</li>
                        <li>• 정기적인 댓글 품질 모니터링</li>
                        <li>• 수동 댓글과 적절한 조화</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h3 className="font-semibold text-yellow-800 mb-3">⚠️ 주의사항</h3>
                      <ul className="text-sm text-yellow-700 space-y-2">
                        <li>• 과도한 댓글 자동화 지양</li>
                        <li>• 부적절한 글에 댓글 방지</li>
                        <li>• 계정 간 댓글 패턴 차별화</li>
                        <li>• 네이버 정책 준수 필수</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>
          </article>

          {/* CTA Section */}
          <AnimatedSection animation="fade-up" delay={800}>
            <div className="bg-gradient-to-r from-success to-brand-accent rounded-xl p-8 text-white text-center mt-12">
              <h3 className="text-title font-bold mb-4">
                진정한 블로그 소통을 경험해보세요
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                복붙 댓글은 이제 그만! Blog Pro의 Gemini 기반 맞춤형 댓글 시스템으로 
                답방률 300% 향상과 진정한 블로그 네트워킹을 경험해보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#pricing">
                  <Button variant="secondary" size="xl" className="bg-white text-brand-primary hover:bg-white/90">
                    Gemini 댓글 시스템 체험하기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                    다른 자동화 가이드 보기
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  )
}