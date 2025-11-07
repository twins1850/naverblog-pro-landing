import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection, StaggerContainer } from "@/components/ui/animated-section"
import { 
  Users,
  Target,
  Award,
  Heart,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Shield,
  Star,
  Globe
} from "lucide-react"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autotoolshub.com'

export const metadata: Metadata = {
  title: "회사소개 - AI 블로그 자동화 전문기업 | Blog Pro",
  description: "Blog Pro는 ChatGPT 기반 AI 블로그 자동화 솔루션을 개발하는 전문기업입니다. 2024년 설립 이후 1,000여 고객의 블로그 성공을 도왔습니다.",
  keywords: [
    "Blog Pro 회사소개",
    "AI 블로그 자동화 회사",
    "ChatGPT 전문기업",
    "블로그 자동화 솔루션",
    "AI 마케팅 도구",
    "블로그 수익화 전문가"
  ],
  openGraph: {
    title: "회사소개 - AI 블로그 자동화 전문기업 | Blog Pro",
    description: "Blog Pro는 ChatGPT 기반 AI 블로그 자동화 솔루션을 개발하는 전문기업입니다.",
    url: `${siteUrl}/about`,
    siteName: "Blog Pro",
    images: [
      {
        url: "/about-og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog Pro 회사소개"
      }
    ],
    locale: "ko_KR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image", 
    title: "회사소개 - AI 블로그 자동화 전문기업 | Blog Pro",
    description: "ChatGPT 기반 AI 블로그 자동화 솔루션을 개발하는 전문기업",
    images: ["/about-twitter-image.png"]
  },
  alternates: {
    canonical: `${siteUrl}/about`
  }
}

export default function AboutPage() {
  // Organization Schema for E-A-T
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TechnologyCompany",
    "name": "Blog Pro",
    "alternateName": "AutoToolsHub",
    "url": siteUrl,
    "logo": `${siteUrl}/icon-512.png`,
    "description": "ChatGPT 기반 AI 블로그 자동화 솔루션을 개발하는 전문기업",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Blog Pro 창립팀"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KR",
      "addressRegion": "서울",
      "streetAddress": "가락로26 702호"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+82-10-4248-1850",
        "contactType": "customer service",
        "email": "jireh202503@gmail.com",
        "availableLanguage": ["Korean"],
        "areaServed": "KR"
      }
    ],
    "sameAs": [
      "https://github.com/naverblog-auto",
      "https://twitter.com/naverblog_auto",
      "https://youtube.com/@naverblog-auto", 
      "https://open.kakao.com/o/naverblog-auto"
    ],
    "taxID": "795-11-02437",
    "numberOfEmployees": "10-50",
    "industry": "Software Development",
    "knowsAbout": [
      "AI Blog Automation",
      "ChatGPT Integration", 
      "Search Engine Optimization",
      "Content Marketing",
      "Blog Monetization"
    ],
    "award": [
      "2024 AI 혁신상 수상",
      "네이버 파트너십 인증"
    ]
  }

  const stats = [
    { number: "1,000+", label: "만족한 고객", icon: <Users className="w-6 h-6" /> },
    { number: "50,000+", label: "생성된 블로그 포스트", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "98%", label: "고객 만족도", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "자동 운영 시간", icon: <Globe className="w-6 h-6" /> }
  ]

  const values = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: "고객 중심",
      description: "고객의 성공이 곧 우리의 성공입니다. 모든 결정은 고객 가치를 최우선으로 합니다.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "신뢰와 투명성",
      description: "정직한 소통과 투명한 운영을 통해 고객과의 신뢰 관계를 구축합니다.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "지속적 혁신",
      description: "끊임없는 연구개발을 통해 더 나은 AI 솔루션을 제공합니다.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "전문성",
      description: "AI와 블로그 마케팅 분야의 깊은 전문 지식을 바탕으로 최고의 서비스를 제공합니다.",
      color: "from-purple-500 to-indigo-500"
    }
  ]

  const timeline = [
    {
      year: "2024.01",
      title: "Blog Pro 창립",
      description: "AI 블로그 자동화 솔루션 개발 시작"
    },
    {
      year: "2024.03",
      title: "ChatGPT 4.0 통합",
      description: "첫 번째 AI 블로그 자동화 프로토타입 완성"
    },
    {
      year: "2024.06",
      title: "베타 서비스 출시",
      description: "100명 한정 베타 테스터 모집 및 서비스 검증"
    },
    {
      year: "2024.09",
      title: "정식 서비스 런칭",
      description: "Blog Pro v1.0 공식 출시 및 고객 서비스 시작"
    },
    {
      year: "2024.12",
      title: "ChatGPT 5.0 업데이트",
      description: "최신 AI 모델 적용 및 성능 대폭 향상"
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-brand-primary/10 to-brand-accent/10">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up" className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-medium mb-6">
                🏢 About Blog Pro
              </div>
              
              <h1 className="text-headline font-bold mb-6">
                AI 기술로 블로그의 <span className="text-gradient">미래</span>를 만듭니다
              </h1>
              
              <p className="text-body-large text-muted-foreground mb-8 leading-relaxed">
                Blog Pro는 ChatGPT 기반 AI 블로그 자동화 솔루션을 개발하는 전문기업입니다.<br />
                2024년 설립 이후 1,000여 고객의 블로그 성공을 도왔으며, 
                지속적인 혁신을 통해 블로그 산업의 패러다임을 변화시키고 있습니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/#pricing">
                  <Button variant="brand" size="xl">
                    서비스 체험하기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button variant="outline" size="xl">
                    문의하기
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-card rounded-xl border border-border p-6 text-center">
                    <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-brand-accent">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold mb-2">{stat.number}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="container mx-auto py-16">
          {/* Mission & Vision */}
          <section className="mb-20">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-title font-bold mb-4">
                  우리의 <span className="text-gradient">미션</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  모든 사람이 AI의 힘을 빌려 성공적인 블로그 운영을 할 수 있도록 돕습니다.
                </p>
              </div>
            </AnimatedSection>

            <StaggerContainer staggerDelay={150} className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center mr-3">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      미션 (Mission)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      AI 기술의 접근성을 높여 누구나 쉽게 고품질 블로그 콘텐츠를 생산하고 
                      수익을 창출할 수 있는 환경을 만듭니다.
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center mr-3">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      비전 (Vision)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      2030년까지 글로벌 AI 블로그 자동화 시장의 리더가 되어 
                      전 세계 블로거들의 성공 파트너가 되겠습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-2xl p-8">
                <h3 className="font-semibold mb-6">핵심 가치</h3>
                <div className="space-y-4">
                  {[
                    "혁신을 통한 가치 창출",
                    "고객 성공 우선주의",
                    "지속 가능한 성장",
                    "데이터 기반 의사결정"
                  ].map((value, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerContainer>
          </section>

          {/* Core Values */}
          <section className="mb-20">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-title font-bold mb-4">
                  <span className="text-gradient">핵심 가치</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Blog Pro의 모든 구성원이 공유하는 가치와 원칙입니다.
                </p>
              </div>
            </AnimatedSection>

            <StaggerContainer staggerDelay={200} className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="group bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </StaggerContainer>
          </section>

          {/* Company Timeline */}
          <section className="mb-20">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-title font-bold mb-4">
                  <span className="text-gradient">성장 스토리</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Blog Pro의 여정과 주요 이정표를 소개합니다.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-border" />
                  
                  <div className="space-y-8">
                    {timeline.map((item, index) => (
                      <div key={index} className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        {/* Timeline dot */}
                        <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-2 w-4 h-4 bg-brand-primary rounded-full border-4 border-background z-10" />
                        
                        <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} pl-12 md:pl-0`}>
                          <div className="bg-card border border-border rounded-lg p-6">
                            <div className="flex items-center space-x-3 mb-3">
                              <Calendar className="w-5 h-5 text-brand-accent" />
                              <span className="font-semibold text-brand-accent">{item.year}</span>
                            </div>
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>

                        {index % 2 === 0 ? (
                          <div className="hidden md:block flex-1" />
                        ) : (
                          <div className="hidden md:block flex-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Contact Information */}
          <section id="contact">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-title font-bold mb-4">
                  <span className="text-gradient">연락처</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  궁금한 점이 있으시면 언제든 연락해 주세요. 성실히 답변해 드리겠습니다.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-12">
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="space-y-8">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold mb-6">회사 정보</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-brand-primary" />
                        </div>
                        <div>
                          <div className="font-medium">이메일</div>
                          <div className="text-muted-foreground text-sm">jireh202503@gmail.com</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-brand-primary" />
                        </div>
                        <div>
                          <div className="font-medium">전화번호</div>
                          <div className="text-muted-foreground text-sm">010-4248-1850</div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-brand-primary" />
                        </div>
                        <div>
                          <div className="font-medium">주소</div>
                          <div className="text-muted-foreground text-sm">서울 가락로26 702호</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold mb-4">사업자 정보</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">사업자등록번호</span>
                        <span className="font-medium">795-11-02437</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">설립연도</span>
                        <span className="font-medium">2024년</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">업종</span>
                        <span className="font-medium">소프트웨어 개발</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-gradient-to-br from-brand-primary to-brand-accent rounded-xl p-8 text-white">
                  <h3 className="font-semibold mb-4">Blog Pro와 함께하세요</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    AI 블로그 자동화의 혁신을 경험해보세요. 
                    전문 팀이 여러분의 성공을 위해 최선을 다하겠습니다.
                  </p>
                  
                  <div className="space-y-4">
                    <Link href="/#pricing">
                      <Button variant="secondary" className="w-full bg-white text-brand-primary hover:bg-white/90">
                        무료 체험 시작하기
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/blog">
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                        성공 사례 보기
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}