"use client"

import * as React from "react"
import { 
  Brain, 
  Zap, 
  Target, 
  Shield, 
  TrendingUp, 
  Clock,
  Search,
  BarChart3,
  Smartphone,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection, StaggerContainer } from "@/components/ui/animated-section"
import Link from "next/link"

interface FeaturesProps {
  onPurchaseClick?: () => void
}

export function Features({ onPurchaseClick }: FeaturesProps) {
  const mainFeatures = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "ChatGPT 4.0 & 5.0 지원",
      description: "최신 AI 기술로 고품질 블로그 콘텐츠를 자동 생성합니다. 사람이 작성한 것과 구별할 수 없는 자연스러운 글을 생성합니다.",
      features: [
        "90초 딥씽킹 모드로 고품질 콘텐츠 생성",
        "30초 재시도 간격으로 안정적 작업",
        "SEO 키워드 자동 삽입",
        "다양한 글쓰기 스타일 지원"
      ],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "완전 자동화 시스템",
      description: "24시간 무인 운영으로 블로그 포스팅부터 관리까지 모든 것을 자동화합니다. 잠들어 있는 동안에도 블로그가 성장합니다.",
      features: [
        "24/7 무인 자동 포스팅",
        "스케줄링 기능으로 최적 시간 포스팅",
        "자동 카테고리 분류",
        "이미지 자동 삽입 및 최적화"
      ],
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "SEO 최적화",
      description: "검색 알고리즘에 특화된 SEO 전략으로 검색 상위권 진입을 보장합니다. 트래픽과 수익 증대를 경험하세요.",
      features: [
        "검색 상위 노출 전략",
        "키워드 분석 및 자동 적용",
        "메타태그 자동 최적화",
        "검색 트렌드 기반 콘텐츠 생성"
      ],
      gradient: "from-orange-500 to-red-600"
    }
  ]

  const additionalFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "보안 강화",
      description: "하드웨어 바인딩으로 라이선스 도용 방지"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "실시간 분석",
      description: "포스팅 성과와 트래픽을 실시간으로 모니터링"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "모바일 지원",
      description: "언제 어디서나 모바일로 블로그 관리 가능"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "키워드 최적화",
      description: "트렌딩 키워드 분석으로 검색 노출 극대화"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "수익 극대화",
      description: "애드센스 연동으로 자동 수익 창출"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "시간 절약",
      description: "기존 대비 90% 시간 절약으로 효율성 극대화"
    }
  ]

  return (
    <section id="features" className="section bg-muted/20">
      <div className="container mx-auto">
        {/* 섹션 헤더 */}
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-medium mb-4">
            ⚡ 강력한 기능들
          </div>
          
          <h2 className="text-headline font-bold mb-4">
            블로그 자동화의 <span className="text-gradient">모든 것</span>
          </h2>
          
          <p className="text-body-large text-muted-foreground">
            최신 AI 기술과 SEO 전략을 결합한 완전 자동화 솔루션으로
            블로그 운영의 새로운 패러다임을 경험하세요.
          </p>
        </AnimatedSection>

        {/* 메인 기능들 */}
        <StaggerContainer staggerDelay={200} className="grid lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* 그라데이션 배경 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
              
              {/* 아이콘 */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* 제목과 설명 */}
              <h3 className="text-title font-semibold mb-4 group-hover:text-brand-accent transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* 기능 목록 */}
              <ul className="space-y-3">
                {feature.features.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              {/* 호버 효과 화살표 */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-5 h-5 text-brand-accent" />
              </div>
            </div>
          ))}
        </StaggerContainer>

        {/* 추가 기능들 */}
        <AnimatedSection animation="fade-up">
          <h3 className="text-title font-semibold text-center mb-12">
            그 외에도 <span className="text-gradient">더 많은 기능</span>이 있습니다
          </h3>
          
          <StaggerContainer staggerDelay={100} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index}
                className="group bg-card rounded-xl p-6 border border-border hover:border-brand-accent/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 group-hover:text-brand-accent transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* CTA 섹션 */}
        <AnimatedSection animation="scale-up" delay={300} className="text-center mt-16">
          <div className="bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10" />
            
            <div className="relative z-10">
              <h3 className="text-title font-bold mb-4">
                지금 바로 시작해보세요
              </h3>
              
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Blog Pro로 매월 안정적인 수익을 창출하고, 
                시간은 절약하면서 블로그는 성장시키세요.
              </p>
              
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-white text-brand-primary hover:bg-white/90"
                onClick={onPurchaseClick}
              >
                지금 시작하기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}