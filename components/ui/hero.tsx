"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection, StaggerContainer } from "@/components/ui/animated-section"
import { ArrowRight, Play, CheckCircle, TrendingUp, Clock, Zap, X } from "lucide-react"

interface HeroProps {
  onPurchaseClick?: () => void
}

export function Hero({ onPurchaseClick }: HeroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false)

  const stats = [
    { 
      icon: <TrendingUp className="w-5 h-5" />,
      value: "300%", 
      label: "블로그 트래픽 증가" 
    },
    { 
      icon: <Clock className="w-5 h-5" />,
      value: "90%", 
      label: "시간 절약" 
    },
    { 
      icon: <Zap className="w-5 h-5" />,
      value: "24/7", 
      label: "자동 포스팅" 
    }
  ]

  const benefits = [
    "ChatGPT 4.0 & 5.0 지원으로 고품질 콘텐츠 생성",
    "완전 자동화된 블로그 포스팅 시스템",
    "SEO 최적화 및 키워드 자동 삽입",
    "검색 노출 극대화 전략"
  ]

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-noise" />
      
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-transparent to-brand-accent/5" />

      <div className="container relative z-10 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 좌측 콘텐츠 */}
          <AnimatedSection animation="fade-up" className="space-y-8">
            {/* 배지 */}
            <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-sm font-medium mb-4">
              🚀 기존 블로그 자동화는 잊어주세요
            </div>

            {/* 메인 헤딩 */}
            <div className="space-y-6">
              <h1 className="text-display font-bold tracking-tight">
                진짜 AI가 만드는<br />
                <span className="text-gradient">진짜 소통</span>의 시대
              </h1>
              
              <div className="space-y-3 text-body-large">
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">❌</span>
                  <span className="line-through text-muted-foreground">"복붙 댓글"</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-green-500 font-medium">"맞춤형 진심 소통"</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">❌</span>
                  <span className="line-through text-muted-foreground">"기계적 글쓰기"</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-green-500 font-medium">"전문가급 고품질 콘텐츠"</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">❌</span>
                  <span className="line-through text-muted-foreground">"무차별 서로이웃"</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-green-500 font-medium">"AI 개인화 메시지"</span>
                </div>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <span className="text-yellow-500">🏆</span>
                  <span className="font-bold text-yellow-600">세계 최초 대댓글 자동화</span>
                </div>
              </div>
            </div>

            {/* 주요 혜택 */}
            <StaggerContainer staggerDelay={150} className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </StaggerContainer>

            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="brand" 
                size="xl" 
                className="group"
                onClick={onPurchaseClick}
              >
                지금 시작하기
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                className="group"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                데모 영상 보기
              </Button>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2 text-brand-accent">
                    {stat.icon}
                  </div>
                  <div className="font-bold text-2xl text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* 우측 비주얼 */}
          <AnimatedSection animation="slide-left" delay={200} className="relative">
            <div className="relative">
              {/* 실제 프로그램 스크린샷 */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                <img 
                  src="/assets/media/screenshots/blog-writing.webp" 
                  alt="Blog Pro 메인 대시보드 - 블로그 글쓰기 자동화" 
                  className="w-full h-auto"
                  loading="eager"
                />
                {/* 이미지 오버레이 효과 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* 플로팅 카드들 */}
              <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-bounce">
                ✅ 자동 포스팅 완료
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-brand-accent text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
                🚀 SEO 최적화 적용
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* 비디오 모달 (간단한 구현) */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:text-white/80"
              onClick={() => setIsVideoPlaying(false)}
            >
              <X className="w-6 h-6" />
            </Button>
            <div className="bg-black rounded-lg overflow-hidden aspect-video">
              <div className="w-full h-full flex items-center justify-center text-white">
                데모 영상 플레이어 (구현 예정)
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}