import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/ui/animated-section"
import { ShareButton } from "@/components/blog/share-button"
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lightbulb,
  ExternalLink
} from "lucide-react"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autotoolshub.com'

export const metadata: Metadata = {
  title: "ChatGPT 블로그 글쓰기 완벽 가이드 2025 | 네이버 블로그 자동화 프로그램 | AutoToolsHub",
  description: "ChatGPT로 블로그 포스팅 자동화하는 법을 실제 화면과 함께 단계별로 설명합니다. 네이버 블로그 자동 업로드, 평균 2,300자 고품질 콘텐츠 생성 방법 완전 공개.",
  keywords: [
    "ChatGPT 블로그 글쓰기",
    "네이버 블로그 자동화",
    "블로그 자동 포스팅 프로그램",
    "AI 글쓰기 프로그램",
    "ChatGPT로 블로그 포스팅 자동화하는 법",
    "블로그 글쓰기 자동화",
    "네이버 블로그 업로드 프로그램",
    "AI 블로그 작성 도구",
    "블로그 마케팅 자동화",
    "Blog Pro",
    "블로그 프로"
  ],
  openGraph: {
    title: "ChatGPT 블로그 글쓰기 완벽 가이드 2025 | 네이버 블로그 자동화 프로그램",
    description: "ChatGPT로 블로그 포스팅 자동화하는 법을 실제 화면과 함께 단계별로 설명합니다. 네이버 블로그 자동 업로드, 평균 2,300자 고품질 콘텐츠 생성 방법 완전 공개.",
    url: `${siteUrl}/blog/chatgpt-blog-automation-guide`,
    siteName: "AutoToolsHub",
    images: [
      {
        url: "/images/blog/thumbnails/chatgpt-automation.svg", 
        width: 1200,
        height: 630,
        alt: "ChatGPT 5.0 블로그 자동화 가이드"
      }
    ],
    locale: "ko_KR",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT 블로그 글쓰기 완벽 가이드 2025 | 네이버 블로그 자동화 프로그램",
    description: "ChatGPT로 블로그 포스팅 자동화하는 법을 실제 화면과 함께 단계별로 설명합니다. 네이버 블로그 자동 업로드, 평균 2,300자 고품질 콘텐츠 생성 방법 완전 공개.",
    images: ["/images/blog/thumbnails/chatgpt-automation.svg"]
  },
  alternates: {
    canonical: `${siteUrl}/blog/chatgpt-blog-automation-guide`
  }
}

export default function ChatGPTBlogAutomationGuide() {
  const publishDate = "2025-01-07"
  const author = "Blog Pro 팀"
  const readTime = "12분"
  const category = "AI 자동화"

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "ChatGPT 블로그 글쓰기 완벽 가이드 2024 | 네이버 블로그 자동화",
    "description": "ChatGPT로 블로그 포스팅 자동화하는 법을 실제 화면과 함께 단계별로 설명합니다. 네이버 블로그 자동 업로드, 평균 2,300자 고품질 콘텐츠 생성 방법 완전 공개.",
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
    "url": `${siteUrl}/blog/chatgpt-blog-automation-guide`,
    "image": `${siteUrl}/images/blog/thumbnails/chatgpt-automation.svg`,
    "articleSection": category,
    "keywords": "ChatGPT 블로그 글쓰기, 네이버 블로그 자동화, 블로그 자동 포스팅 프로그램, AI 글쓰기 프로그램, ChatGPT로 블로그 포스팅 자동화하는 법",
    "wordCount": 1800,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/chatgpt-blog-automation-guide`
    }
  }

  const tableOfContents = [
    { id: "introduction", title: "Blog Pro 커스텀 GPT 방식이란?" },
    { id: "api-vs-custom", title: "API 방식 vs 커스텀 GPT 방식의 차이" },
    { id: "three-step-setup", title: "3단계 설정 방법" },
    { id: "excel-setup", title: "1단계: 엑셀 파일 제목 설정" },
    { id: "account-setup", title: "2단계: 계정 설정" },
    { id: "chatgpt-setup", title: "3단계: 커스텀 GPT 설정" },
    { id: "real-usage", title: "실제 사용 과정" }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto py-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground">홈</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground">블로그</Link>
            <span>/</span>
            <span className="text-foreground">Blog Pro 글쓰기 자동화 사용법</span>
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
                ChatGPT 블로그 글쓰기 <span className="text-gradient">완벽 가이드 2024</span> 네이버 블로그 자동화
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
                <ShareButton 
                  title="Blog Pro 글쓰기 자동화 실제 사용법 완전 공개"
                  description="전국 최초 커스텀 GPT 방식으로 개인 맞춤형 블로그 글을 자동 작성하는 혁신적인 방법을 확인하세요."
                  url={`${siteUrl}/blog/chatgpt-blog-automation-guide`}
                />
              </div>
              
              <p className="text-body-large text-muted-foreground leading-relaxed">
                <strong>전국 최초 커스텀 GPT 방식</strong>으로 개인 맞춤형 블로그 글을 자동 작성하는 Blog Pro의 실제 사용법을 완전히 공개합니다. 
                API 방식의 한계를 뛰어넘어 나만의 사업과 브랜드에 특화된 고품질 콘텐츠를 생성하는 혁신적인 방법을 확인하세요.
              </p>
            </header>
          </AnimatedSection>

          {/* Table of Contents */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-card rounded-xl border border-border p-6 mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-5 h-5 text-brand-accent" />
                <h2 className="font-semibold">목차</h2>
              </div>
              <nav className="space-y-2">
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
            <AnimatedSection animation="fade-up" delay={200}>
              <section id="introduction" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</div>
                  Blog Pro 커스텀 GPT 방식이란?
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Blog Pro의 가장 큰 특징은 <strong>전국 최초 커스텀 GPT를 이용한 글쓰기 방식</strong>입니다. 
                  기존 프로그램들의 API 방식과는 근본적으로 다른 접근으로, 나만의 사업과 브랜드에 특화된 콘텐츠를 자동 생성할 수 있습니다.
                </p>

                <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-lg p-6 mb-6">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-6 h-6 text-brand-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-brand-accent mb-2">왜 커스텀 GPT인가?</h3>
                      <p className="text-sm leading-relaxed">
                        블로그는 대부분 정보를 제공하면서 <strong>개인의 사업이나 이득을 위해</strong> 글을 작성합니다. 
                        API 방식으로 나에게 커스텀화가 안된 글을 작성하면, 잘못하면 <strong>남의 사업을 광고하는 글</strong>도 작성될 수 있습니다. 
                        <br /><br />
                        예를 들어, 내가 운영하는 식당의 맛집 글을 작성해야 하는데 옆집 식당을 홍보하는 글이 작성되는 것을 
                        <strong>원초적으로 막을 수 있는 방법</strong>이 바로 커스텀 GPT입니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-yellow-800 mb-3">💡 실제 사례</h3>
                  <p className="text-sm text-yellow-700 leading-relaxed">
                    취미로 자기 일기형식이나 하루일상을 작성하는 블로그가 아닌 이상, 나에게 이득이 되는 목적성을 가지고 블로그글을 작성하는게 대부분입니다. 
                    API 방식으로는 작성된 글을 다시 나에게 맞게 커스텀화하고 수정해야 하기 때문에 <strong>사실상 자동화가 힘듭니다</strong>. 
                    자동화로 글을 작성해도 고치는데 시간이 더 들기 때문입니다.
                  </p>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <section id="api-vs-custom" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</div>
                  API 방식 vs 커스텀 GPT 방식의 차이
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  기존 프로그램들은 모두 API 방식을 사용하지만, Blog Pro는 전국 최초로 커스텀 GPT 방식을 도입했습니다. 
                  이 둘의 차이를 정확히 이해하면 왜 Blog Pro가 혁신적인지 알 수 있습니다.
                </p>

                <h3 className="text-lg font-semibold mb-4">🚫 기존 API 방식의 한계</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <h4 className="font-semibold text-red-800 mb-2">프롬프트 양의 한계</h4>
                        <p className="text-sm text-red-700">API 방식은 주어진 프롬프트의 양이 제한적이어서 개인 맞춤화가 거의 불가능합니다.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <h4 className="font-semibold text-red-800 mb-2">검색/크롤링 방식의 위험성</h4>
                        <p className="text-sm text-red-700">프롬프트를 사용해 검색 및 크롤링으로 자료를 수집하기 때문에 <strong>예측할 수 없는 결과</strong>가 나옵니다.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <h4 className="font-semibold text-red-800 mb-2">개인 커스텀화 불가능</h4>
                        <p className="text-sm text-red-700">나에게 특화된 방식으로 글 작성이 불가능하여 <strong>남의 사업을 광고하는 글</strong>이 작성될 수도 있습니다.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-4">✅ Blog Pro 커스텀 GPT 방식의 장점</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">나만의 지식 배경 입력</h4>
                        <p className="text-sm text-green-700">ChatGPT에서 커스텀 GPT를 만들 때 <strong>나에게 맞는 지식배경을 입력</strong>해서 만들어놓은 데이터 안에서 글을 작성합니다.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">원초적 오류 방지</h4>
                        <p className="text-sm text-green-700">내가 운영하는 식당 맛집 글을 작성할 때 옆집 식당을 홍보하는 글이 작성되는 것을 <strong>원초적으로 막을 수 있습니다</strong>.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">진정한 자동화</h4>
                        <p className="text-sm text-green-700">API 방식처럼 작성 후 다시 수정할 필요가 없어서 <strong>진짜 자동화</strong>가 가능합니다. 고치는 시간이 따로 필요하지 않습니다.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">📊 실제 비교 결과</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-red-700 mb-2">API 방식 (기존 프로그램)</h5>
                      <ul className="text-sm text-red-600 space-y-1">
                        <li>• 작성 시간: 5분</li>
                        <li>• 수정 시간: 10-15분</li>
                        <li>• 총 소요 시간: 20분</li>
                        <li>• 정확도: 60-70%</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-700 mb-2">커스텀 GPT (Blog Pro)</h5>
                      <ul className="text-sm text-green-600 space-y-1">
                        <li>• 작성 시간: 3분</li>
                        <li>• 수정 시간: 0분</li>
                        <li>• 총 소요 시간: 3분</li>
                        <li>• 정확도: 95-98%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <section id="three-step-setup" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</div>
                  3단계 설정 방법
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Blog Pro의 글쓰기 자동화를 위해서는 <strong>총 3개를 세팅</strong>해야 합니다. 
                  각 단계별로 정확한 설정 방법을 안내드리겠습니다.
                </p>

                <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-brand-accent mb-4">📋 설정 순서 개요</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg border border-brand-accent/10">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2">1</div>
                      <h4 className="font-semibold text-sm">엑셀 파일 설정</h4>
                      <p className="text-xs text-muted-foreground mt-1">블로그 제목 입력</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-brand-accent/10">
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2">2</div>
                      <h4 className="font-semibold text-sm">계정 설정</h4>
                      <p className="text-xs text-muted-foreground mt-1">네이버 블로그 계정</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-brand-accent/10">
                      <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2">3</div>
                      <h4 className="font-semibold text-sm">커스텀 GPT 설정</h4>
                      <p className="text-xs text-muted-foreground mt-1">ChatGPT 대화창 URL</p>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={450}>
              <section id="excel-setup" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</div>
                  1단계: 엑셀 파일 제목 설정
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong>첫 번째는 블로그 제목으로 사용할 제목들이 입력되어 있는 엑셀파일</strong>입니다. 
                  제목을 구글시트나 엑셀에 만들어야 하며, 1행이 하루 사용할 제목입니다.
                </p>

                <div className="bg-card border border-border rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-blue-600 mb-4">📊 엑셀 파일 구조 예시</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold mb-2">✅ 예시: 계정 2개, 하루 3개 글씩 작성하는 경우</p>
                    <div className="grid grid-cols-6 gap-2 text-xs">
                      <div className="bg-blue-100 p-2 text-center font-semibold">1A (첫째계정)</div>
                      <div className="bg-blue-100 p-2 text-center font-semibold">1B (첫째계정)</div>
                      <div className="bg-blue-100 p-2 text-center font-semibold">1C (첫째계정)</div>
                      <div className="bg-green-100 p-2 text-center font-semibold">1D (둘째계정)</div>
                      <div className="bg-green-100 p-2 text-center font-semibold">1E (둘째계정)</div>
                      <div className="bg-green-100 p-2 text-center font-semibold">1F (둘째계정)</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">1A~1C: 첫 번째 계정, 1D~1F: 두 번째 계정</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <h4 className="font-semibold text-sm">행별 날짜 계획</h4>
                        <p className="text-sm text-muted-foreground">30일동안 매일 1번씩 작성할거라면 <strong>30행까지 제목을 입력</strong>하면 됩니다.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <h4 className="font-semibold text-sm">열별 계정 순서</h4>
                        <p className="text-sm text-muted-foreground">첫 번째 계정으로 3개 글 작성 후 → 두 번째 계정으로 나머지 3개 글 작성</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={500}>
              <section id="account-setup" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</div>
                  2단계: 계정 설정
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong>두 번째는 계정 설정</strong>입니다. 계정은 블로그 글쓰기 자동화에만 필요한게 아니라 
                  나머지 모든 기능들을 사용할때 다 필요한 요소입니다. 구입한 플랜에 따라 1개에서 여러개까지 사용이 가능합니다.
                </p>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-yellow-800 mb-3">⚠️ 중요한 주의사항</h3>
                  <p className="text-sm text-yellow-700 leading-relaxed">
                    계정정보를 입력할때 <strong>로그인 아이디와 블로그 ID가 다른 경우</strong>가 있습니다. 
                    로그인 할때 아이디를 따로 설정해 놓은 경우, <strong>로그인 할때 아이디를 &apos;아이디&apos;란에 입력하고 
                    원래 아이디를 &apos;블로그ID&apos;에 입력</strong>해야 합니다.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-green-600 mb-4">📝 계정 입력 가이드</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">로그인 ID</h4>
                        <p className="text-sm text-green-700">
                          실제 네이버에 <strong>로그인할 때 사용하는 ID</strong><br/>
                          (이메일 형태나 별도 설정한 ID)
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">블로그 ID</h4>
                        <p className="text-sm text-blue-700">
                          블로그 주소에 표시되는 <strong>원래 네이버 ID</strong><br/>
                          (blog.naver.com/[이부분])
                        </p>
                      </div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">💡 계정별 기능 범위</p>
                      <p className="text-xs text-muted-foreground">
                        계정 설정은 글쓰기 자동화(커스텀 GPT 방식)뿐만 아니라 댓글 자동화(Gemini API 사용), 서로이웃 자동화, 대댓글 자동화 등 
                        모든 기능에서 공통으로 사용되는 핵심 설정입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={500}>
              <section id="chatgpt-setup" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</div>
                  3단계: 커스텀 GPT 설정
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong>세 번째는 커스텀 GPT 설정</strong>입니다. 이 부분이 Blog Pro만의 핵심 차별점으로, 
                  기존 API 방식과 완전히 다른 혁신적인 글쓰기 품질을 제공합니다.
                </p>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-purple-800 mb-3">🎯 커스텀 GPT 주소 확인 방법</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <span className="inline-block w-6 h-6 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center font-bold">1</span>
                      <p className="text-sm text-purple-700">
                        ChatGPT에서 사용하고 싶은 <strong>커스텀 GPT 채팅창에 접속</strong>
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="inline-block w-6 h-6 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center font-bold">2</span>
                      <p className="text-sm text-purple-700">
                        채팅창 상단의 <strong>주소창 URL을 복사</strong> (예: https://chatgpt.com/g/g-xxxxx-custom-gpt-name)
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="inline-block w-6 h-6 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
                      <p className="text-sm text-purple-700">
                        복사한 URL을 Blog Pro의 <strong>&apos;커스텀 GPT 주소&apos; 입력란에 붙여넣기</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-green-600 mb-4">✅ 권장 커스텀 GPT 유형</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">📝 블로그 글쓰기 전용 GPT</h4>
                      <p className="text-sm text-green-700">
                        • SEO 최적화 글쓰기<br/>
                        • 네이버 블로그 스타일<br/>
                        • 키워드 자연스러운 배치<br/>
                        • 2,000-3,000자 적정 길이
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">🏆 고품질 콘텐츠 GPT</h4>
                      <p className="text-sm text-blue-700">
                        • 전문적이고 신뢰성 있는 내용<br/>
                        • 구조화된 글 구성<br/>
                        • 독자 중심 설명<br/>
                        • 실용적 정보 제공
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-800 mb-3">💡 프로 팁</h3>
                  <ul className="text-sm text-yellow-700 space-y-2">
                    <li>• <strong>여러 커스텀 GPT 활용:</strong> 주제별로 다른 GPT를 설정하여 전문성 향상</li>
                    <li>• <strong>정기적인 프롬프트 업데이트:</strong> 트렌드에 맞게 GPT 지시사항 개선</li>
                    <li>• <strong>품질 검증:</strong> 초기 몇 개 글은 수동 확인 후 완전 자동화</li>
                    <li>• <strong>백업 GPT:</strong> 메인 GPT 장애 대비 대체 GPT 준비</li>
                  </ul>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={600}>
              <section id="real-usage" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">4</div>
                  실제 사용 과정
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  3단계 설정이 완료되면, 실제로 Blog Pro가 어떻게 작동하는지 확인해보겠습니다. 
                  <strong>완전 자동으로 고품질 블로그 글이 생성되는 전체 과정</strong>을 살펴보세요.
                </p>

                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold text-brand-primary mb-4">🚀 자동화 실행 과정</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                          <h4 className="font-medium">엑셀에서 제목 자동 선택</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            설정한 엑셀 파일에서 랜덤하게 제목을 선택하고, 사용된 제목은 자동으로 표시 처리
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                          <h4 className="font-medium">네이버 블로그 자동 로그인</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            설정한 계정으로 네이버에 자동 로그인하고 블로그 글쓰기 페이지로 이동
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                          <h4 className="font-medium">커스텀 GPT로 고품질 글 생성</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            설정한 커스텀 GPT에 제목을 전달하여 2,000-3,000자 수준의 전문적인 블로그 글 생성
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                        <div>
                          <h4 className="font-medium">자동 편집 및 발행</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            생성된 글을 네이버 블로그에 붙여넣고, 카테고리 설정 후 자동으로 발행
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                    <h3 className="font-semibold text-green-800 mb-4">⏰ 소요 시간 비교</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-700 mb-2">수동 작업 시</h4>
                        <ul className="text-sm text-red-600 space-y-1">
                          <li>• 주제 선정: 10분</li>
                          <li>• 자료 조사: 20분</li>
                          <li>• 글쓰기: 30분</li>
                          <li>• 편집/발행: 10분</li>
                          <li><strong>• 총 소요시간: 70분</strong></li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-2">Blog Pro 자동화</h4>
                        <ul className="text-sm text-green-600 space-y-1">
                          <li>• 제목 선택: 자동</li>
                          <li>• 로그인: 자동</li>
                          <li>• 글 생성: 3분</li>
                          <li>• 발행: 자동</li>
                          <li><strong>• 총 소요시간: 3분</strong></li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-lg font-bold text-green-700">
                        ⚡ 23배 시간 단축 (70분 → 3분)
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={700}>
              <section id="content-quality" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">5</div>
                  2,300자 고품질 콘텐츠 생성 원리
                </h2>
                
                <div className="bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 border border-brand-accent/20 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-brand-accent mb-3">✨ 왜 평균 2,300자일까요?</h3>
                  <p className="text-sm text-muted-foreground">
                    네이버 검색 알고리즘 분석 결과, 1,800-3,000자 사이의 글이 가장 높은 검색 노출률을 보입니다. 
                    Blog Pro는 이 최적 구간에서 자동으로 글 길이를 조절합니다.
                  </p>
                </div>

                <h3 className="text-lg font-semibold mb-4">고품질 콘텐츠 생성 과정</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-medium">주제 분석 및 키워드 추출</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        설정한 주제에서 핵심 키워드를 추출하고 네이버 트렌드를 반영
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-medium">전문지식 프롬프트 적용</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        일반적인 질문이 아닌 전문가 수준의 상세한 프롬프트로 ChatGPT에 요청
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-medium">90초 딥씽킹으로 글 생성</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        ChatGPT가 충분한 시간을 갖고 구조화된 고품질 콘텐츠 작성
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-medium">자동 편집 및 최적화</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        SEO 최적화, 이미지 삽입, 카테고리 분류를 자동으로 처리
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={600}>
              <section id="real-screens" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">6</div>
                  실제 프로그램 화면
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  실제 동작하는 Blog Pro의 글쓰기 자동화 화면을 영상으로 확인하세요.
                </p>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">📹 실제 작동 영상</h3>
                  <div className="relative group">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/ocABPrhzkJ4" 
                        title="Blog Pro 글쓰기 자동화 실제 작동 영상" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="rounded-lg"
                      ></iframe>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 cursor-pointer">
                      <div className="flex items-center space-x-2 text-white text-sm font-medium">
                        <ExternalLink className="w-4 h-4" />
                        <span>실제 화면 보기</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    📺 3단계 설정부터 자동 글쓰기까지의 전체 과정을 실제 화면으로 확인할 수 있습니다.
                  </p>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={700}>
              <section id="tips" className="mb-12">
                <h2 className="text-title font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">7</div>
                  효과적인 활용 팁
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-semibold text-yellow-800 mb-3">💡 성공 팁</h3>
                    <ul className="text-sm text-yellow-700 space-y-2">
                      <li>• 계정별로 다른 카테고리와 스타일 설정</li>
                      <li>• 네이버 정책 준수를 위한 적절한 포스팅 주기</li>
                      <li>• 키워드는 5개 이내로 자연스럽게 배치</li>
                      <li>• 정기적인 수동 글 추가로 자연스러움 유지</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="font-semibold text-red-800 mb-3">⚠️ 주의사항</h3>
                    <ul className="text-sm text-red-700 space-y-2">
                      <li>• 동일 키워드 과다 반복 주의 (10회 미만)</li>
                      <li>• 너무 빈번한 포스팅으로 인한 스팸 감지 위험</li>
                      <li>• 금지어 및 민감한 주제 피하기</li>
                      <li>• 정기적인 계정 상태 확인 필요</li>
                    </ul>
                  </div>
                </div>
              </section>
            </AnimatedSection>
          </article>

          {/* CTA Section */}
          <AnimatedSection animation="fade-up" delay={800}>
            <div className="bg-gradient-to-r from-brand-primary to-brand-accent rounded-xl p-8 text-white text-center mt-12">
              <h3 className="text-title font-bold mb-4">
                Blog Pro 글쓰기 자동화를 직접 체험해보세요
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                이 가이드에서 소개한 커스텀 GPT 방식과 2,300자 고품질 콘텐츠 생성을 
                실제 프로그램으로 경험해보세요. 기존 프로그램들과의 차이를 직접 확인하실 수 있습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#pricing">
                  <Button variant="secondary" size="xl" className="bg-white text-brand-primary hover:bg-white/90">
                    Blog Pro 체험하기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                    다른 모듈 가이드 보기
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