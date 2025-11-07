import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection, StaggerContainer } from "@/components/ui/animated-section"
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  TrendingUp,
  Zap,
  Target,
  Brain,
  BarChart3
} from "lucide-react"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autotoolshub.com'

export const metadata: Metadata = {
  title: "블로그 자동화 가이드 | Blog Pro",
  description: "ChatGPT 기반 AI 블로그 자동화 전략, 수익화 방법, SEO 최적화 팁을 전문가가 직접 공유합니다. 블로그 운영의 모든 것을 배워보세요.",
  keywords: [
    "블로그 자동화",
    "AI 블로그 운영",
    "ChatGPT 블로그",
    "블로그 수익화",
    "SEO 최적화",
    "블로그 마케팅",
    "자동 포스팅",
    "블로그 성장 전략"
  ],
  openGraph: {
    title: "블로그 자동화 가이드 | Blog Pro",
    description: "AI 기반 블로그 자동화로 수익 창출하는 방법을 전문가가 직접 알려드립니다.",
    url: `${siteUrl}/blog`,
    siteName: "Blog Pro",
    images: [
      {
        url: "/blog-og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog Pro - AI 블로그 자동화 가이드"
      }
    ],
    locale: "ko_KR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "블로그 자동화 가이드 | Blog Pro", 
    description: "AI 기반 블로그 자동화로 수익 창출하는 방법을 배워보세요.",
    images: ["/blog-twitter-image.png"]
  },
  alternates: {
    canonical: `${siteUrl}/blog`
  }
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  image: string
}

const featuredPosts: BlogPost[] = [
  {
    id: "chatgpt-blog-automation-guide",
    title: "Blog Pro 글쓰기 자동화 실제 사용법 - ChatGPT 4.0/5.0 연동 가이드",
    excerpt: "Blog Pro의 커스텀 GPT 기능을 활용한 블로그 글쓰기 자동화 시스템을 실제 화면과 함께 단계별로 설명합니다. 평균 2,300자 고품질 콘텐츠 생성 방법.",
    content: "Blog Pro는 기존의 단순 API 호출 방식과는 완전히 다른 '커스텀 GPT 방식'을 사용하여 평균 2,300자의 고품질 콘텐츠를 생성합니다...",
    author: "Blog Pro 팀",
    publishDate: "2025-01-07",
    readTime: "12분",
    category: "AI 자동화",
    tags: ["Blog Pro 사용법", "커스텀 GPT", "고품질 콘텐츠"],
    image: "/blog/chatgpt-automation.jpg"
  },
  {
    id: "naver-blog-seo-optimization",
    title: "네이버 블로그 댓글 자동화의 현실 - Gemini 기반 맞춤형 댓글 시스템",
    excerpt: "Blog Pro의 Gemini 기반 댓글 자동화가 기존 복붙 댓글과 어떻게 다른지, 실제 답방률 300% 향상 사례와 함께 상세히 설명합니다.",
    content: "기존의 블로그 댓글 자동화는 똑같은 복붙 댓글로 인해 무시당하는 것이 현실입니다...",
    author: "Blog Pro 팀",
    publishDate: "2025-01-06",
    readTime: "10분",
    category: "AI 자동화",
    tags: ["Gemini 댓글 시스템", "맞춤형 댓글", "답방률 향상"],
    image: "/blog/naver-comment.jpg"
  },
  {
    id: "multi-account-blog-management",
    title: "멀티계정 블로그 관리 전략 - 효율적인 계정 운영과 리스크 관리법",
    excerpt: "Blog Pro의 멀티계정 관리 시스템을 활용한 안전하고 효율적인 블로그 네트워크 구축 전략과 실제 성공 사례를 공개합니다.",
    content: "단일 계정으로는 한계가 있는 블로그 활동을 멀티계정을 통해 효율적으로 확장하면서도 안전하게 관리하는 전략을...",
    author: "Blog Pro 팀",
    publishDate: "2025-01-05",
    readTime: "8분",
    category: "AI 자동화",
    tags: ["멀티계정 관리", "리스크 분산", "효율적 운영"],
    image: "/blog/multi-account.jpg"
  },
  {
    id: "neighbor-automation-reality",
    title: "서로이웃 자동화의 진실 - 성의없는 신청 vs 진정한 네트워킹 전략",
    excerpt: "기존 서로이웃 자동화의 문제점과 Blog Pro의 의미있는 관계 구축 시스템을 통한 진정한 블로그 네트워킹 방법을 공개합니다.",
    content: "'안녕하세요 ~글 잘 읽어 봤어요. 서로이웃 신청합니다' 같은 성의없는 메시지로는 진정한 네트워킹이 불가능합니다...",
    author: "Blog Pro 팀",
    publishDate: "2025-01-04",
    readTime: "9분",
    category: "AI 자동화",
    tags: ["서로이웃 자동화", "진정한 네트워킹", "관계 구축"],
    image: "/blog/neighbor-automation.jpg"
  },
  {
    id: "reply-automation-exclusive",
    title: "대댓글 자동화 독점 기능 활용법 - Blog Pro만의 차별화된 소통 전략",
    excerpt: "다른 프로그램에는 없는 Blog Pro만의 대댓글 자동화 기능으로 더 깊이있는 소통을 만드는 전략과 실제 활용 사례를 공개합니다.",
    content: "기존 블로그 자동화 프로그램들이 제공하지 못하는 Blog Pro만의 차별화된 기능, 대댓글 자동화로 더 깊이있고 의미있는 블로그 소통을...",
    author: "Blog Pro 팀",
    publishDate: "2025-01-03",
    readTime: "7분",
    category: "AI 자동화",
    tags: ["대댓글 자동화", "독점 기능", "깊이있는 소통"],
    image: "/blog/reply-automation.jpg"
  },
  {
    id: "blog-monetization-strategies",
    title: "블로그 수익화 전략: 월 수익 1000만원 달성 로드맵",
    excerpt: "성공한 블로거들의 수익화 노하우와 실제 수익 구조를 분석하여 체계적인 수익 창출 방법을 제시합니다.",
    content: "블로그로 안정적인 수익을 창출하는 다양한 방법과 전략에 대해 살펴보겠습니다...",
    author: "Blog Pro 팀", 
    publishDate: "2025-01-02",
    readTime: "15분",
    category: "수익화",
    tags: ["블로그 수익화", "애드센스", "제휴마케팅"],
    image: "/blog/monetization.jpg"
  }
]

const categories = [
  { name: "AI 자동화", count: 5, icon: <Brain className="w-5 h-5" /> },
  { name: "수익화", count: 1, icon: <TrendingUp className="w-5 h-5" /> }
]

export default function BlogPage() {
  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog`
    },
    "headline": "블로그 자동화 가이드",
    "description": "ChatGPT 기반 AI 블로그 자동화 전략, 수익화 방법, SEO 최적화 팁을 전문가가 직접 공유합니다.",
    "author": {
      "@type": "Organization", 
      "name": "Blog Pro"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Blog Pro",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/icon-512.png`
      }
    },
    "blogPost": featuredPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Organization",
        "name": post.author
      },
      "datePublished": post.publishDate,
      "url": `${siteUrl}/blog/${post.id}`,
      "image": `${siteUrl}${post.image}`,
      "articleSection": post.category,
      "keywords": post.tags.join(", ")
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-brand-primary/5 to-brand-accent/5">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up" className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-medium mb-6">
                📚 전문가 인사이트
              </div>
              
              <h1 className="text-headline font-bold mb-6">
                <span className="text-gradient">AI 블로그 자동화</span> 완벽 가이드
              </h1>
              
              <p className="text-body-large text-muted-foreground mb-8 leading-relaxed">
                ChatGPT 5.0 기반 블로그 자동화부터 수익화까지,<br />
                성공한 블로거들의 노하우를 무료로 공개합니다.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#featured-posts">
                  <Button variant="brand" size="xl">
                    최신 가이드 보기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/#features">
                  <Button variant="outline" size="xl">
                    Blog Pro 알아보기
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="container mx-auto py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Posts */}
              <section id="featured-posts">
                <AnimatedSection animation="fade-up">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-title font-bold">
                      최신 <span className="text-gradient">가이드</span>
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {featuredPosts.length}개의 가이드
                    </span>
                  </div>
                </AnimatedSection>

                <StaggerContainer staggerDelay={200} className="space-y-8">
                  {featuredPosts.map((post, index) => (
                    <article 
                      key={post.id}
                      className="group bg-card rounded-xl border border-border hover:border-brand-accent/50 transition-all duration-300 hover:shadow-lg overflow-hidden"
                    >
                      <div className="md:flex">
                        {/* Image */}
                        <div className="md:w-80 md:flex-shrink-0">
                          <div className="h-48 md:h-full bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center">
                            <div className="text-4xl font-bold text-brand-primary/50">
                              {index + 1}
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 md:p-8 flex-1">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.publishDate).toLocaleDateString('ko-KR')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime} 읽기</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-3 group-hover:text-brand-accent transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 2).map(tag => (
                                <span 
                                  key={tag}
                                  className="px-2 py-1 bg-brand-accent/10 text-brand-accent text-xs rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            
                            <Link href={`/blog/${post.id}`}>
                              <Button variant="ghost" size="sm" className="group-hover:text-brand-accent">
                                자세히 보기
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </StaggerContainer>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8 sticky top-8">
                {/* Categories */}
                <AnimatedSection animation="fade-up" delay={200}>
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="font-semibold mb-4">카테고리</h3>
                    <div className="space-y-3">
                      {categories.map(category => (
                        <Link
                          key={category.name}
                          href={`/blog/category/${category.name.toLowerCase()}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-brand-accent">
                              {category.icon}
                            </div>
                            <span className="text-sm group-hover:text-brand-accent transition-colors">
                              {category.name}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                {/* CTA */}
                <AnimatedSection animation="fade-up" delay={300}>
                  <div className="bg-gradient-to-br from-brand-primary to-brand-accent rounded-xl p-6 text-white text-center">
                    <h3 className="font-bold mb-2">
                      지금 바로 시작하세요
                    </h3>
                    <p className="text-white/90 text-sm mb-4">
                      Blog Pro로 블로그 자동화를 경험해보세요
                    </p>
                    <Link href="/#pricing">
                      <Button variant="secondary" size="sm" className="w-full bg-white text-brand-primary hover:bg-white/90">
                        무료 체험하기
                      </Button>
                    </Link>
                  </div>
                </AnimatedSection>

                {/* Newsletter */}
                <AnimatedSection animation="fade-up" delay={400}>
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="font-semibold mb-3">뉴스레터 구독</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      최신 블로그 자동화 팁과 성공 사례를 받아보세요
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="이메일 주소"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent text-sm"
                      />
                      <Button variant="brand" size="sm" className="w-full">
                        구독하기
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}