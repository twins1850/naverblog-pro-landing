"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { AnimatedSection, StaggerContainer } from "@/components/ui/animated-section"
import { 
  PenTool, 
  MessageCircle, 
  Users, 
  RotateCcw, 
  Zap, 
  Brain,
  Target,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  X
} from "lucide-react"

interface ModuleFeaturesProps {
  onPurchaseClick?: () => void
}

export function ModuleFeatures({ onPurchaseClick }: ModuleFeaturesProps) {
  const modules = [
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "📝 블로그AI자동화",
      subtitle: "ChatGPT 5.0 기반 글쓰기",
      gradient: "from-blue-500 to-cyan-600",
      existing: {
        title: "기존 프로그램",
        problems: [
          "단순 API 호출로 기계적 글",
          "천편일률적 내용",
          "봇 감지 위험"
        ]
      },
      our: {
        title: "Blog Pro 방식",
        solutions: [
          "커스텀 GPT + 전문지식 프롬프트",
          "평균 2,300자 고품질 콘텐츠",
          "99.9% 자연스러운 글",
          "멀티계정 동시 글쓰기"
        ]
      },
      stats: "99.9% 성공률"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "💬 AI댓글자동화", 
      subtitle: "Gemini AI 맞춤 소통",
      gradient: "from-green-500 to-emerald-600",
      existing: {
        title: "기존 프로그램",
        problems: [
          "복붙 고정 멘트",
          "성의없는 댓글",
          "무시당하는 결과"
        ]
      },
      our: {
        title: "Blog Pro 방식", 
        solutions: [
          "Gemini가 글 내용 실제 분석",
          "개인화된 정성스러운 댓글",
          "답방률 300% 증가",
          "멀티계정 개별 톤앤매너"
        ]
      },
      stats: "답방률 300%↑"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "👥 AI서로이웃자동화",
      subtitle: "개인화된 네트워킹 메시지", 
      gradient: "from-purple-500 to-pink-600",
      existing: {
        title: "기존 프로그램",
        problems: [
          "똑같은 메시지 발송",
          "기계적인 접근",
          "거부당하는 결과"
        ]
      },
      our: {
        title: "Blog Pro 방식",
        solutions: [
          "최신글 분석해서 맞춤 메시지",
          "개인화된 진심어린 접근",
          "수락률 업계 최고 달성",
          "멀티계정별 다양한 접근법"
        ]
      },
      stats: "수락률 최고"
    },
    {
      icon: <RotateCcw className="w-8 h-8" />,
      title: "🔄 AI대댓글자동화",
      subtitle: "세계 최초 독점 기능",
      gradient: "from-yellow-500 to-orange-600", 
      existing: {
        title: "기존 프로그램",
        problems: [
          "기능 자체가 존재하지 않음",
          "소통의 단절",
          "일회성 방문"
        ]
      },
      our: {
        title: "Blog Pro 독점",
        solutions: [
          "세계 최초 대댓글 완전 자동화",
          "AI가 자동으로 답변 생성",
          "재방문율 300% 증가",
          "멀티계정 동시 대댓글 관리"
        ]
      },
      stats: "재방문 300%↑",
      highlight: true
    }
  ]

  return (
    <section id="module-features" className="py-20 bg-background">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-title font-bold mb-6">
            네이버블로그자동화 핵심 4가지 모듈
          </h2>
          
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            블로그AI자동화부터 AI댓글자동화, AI서로이웃자동화, 세계최초 AI대댓글자동화까지 완벽한 블로그자동화 시스템입니다.
          </p>
        </AnimatedSection>

        <StaggerContainer staggerDelay={200} className="space-y-16">
          {modules.map((module, index) => (
            <AnimatedSection 
              key={index} 
              animation={index % 2 === 0 ? "slide-right" : "slide-left"}
              className={`${module.highlight ? 'relative overflow-hidden' : ''}`}
            >
              {/* 하이라이트 배경 */}
              {module.highlight && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-3xl" />
              )}
              
              <div className={`relative grid lg:grid-cols-2 gap-8 items-center ${module.highlight ? 'p-8' : ''}`}>
                {/* 좌측: 모듈 정보 */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${module.gradient} text-white`}>
                      {module.icon}
                    </div>
                    
                    <div>
                      <h3 className="text-subtitle font-bold mb-2">{module.title}</h3>
                      <p className="text-muted-foreground text-lg">{module.subtitle}</p>
                      {module.highlight && (
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-600 text-sm font-medium mt-2">
                          <Zap className="w-4 h-4" />
                          <span>업계 독점</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 성과 지표 */}
                  <div className={`inline-block px-6 py-3 rounded-2xl font-bold text-lg ${
                    module.highlight 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400'
                      : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-700 dark:text-green-400'
                  }`}>
                    {module.stats}
                  </div>
                </div>

                {/* 우측: 비교 테이블 */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* 기존 방식 */}
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <X className="w-5 h-5 text-red-500" />
                      <h4 className="font-semibold text-red-600">{module.existing.title}</h4>
                    </div>
                    
                    <ul className="space-y-2">
                      {module.existing.problems.map((problem, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-red-700 dark:text-red-400">{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 우리 방식 */}
                  <div className={`border rounded-2xl p-6 ${
                    module.highlight
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-900/30'
                      : 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/30'
                  }`}>
                    <div className="flex items-center space-x-2 mb-4">
                      <CheckCircle className={`w-5 h-5 ${module.highlight ? 'text-yellow-500' : 'text-green-500'}`} />
                      <h4 className={`font-semibold ${module.highlight ? 'text-yellow-600' : 'text-green-600'}`}>
                        {module.our.title}
                      </h4>
                    </div>
                    
                    <ul className="space-y-2">
                      {module.our.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                            module.highlight ? 'bg-yellow-400' : 'bg-green-400'
                          }`} />
                          <span className={`${
                            module.highlight 
                              ? 'text-yellow-700 dark:text-yellow-400' 
                              : 'text-green-700 dark:text-green-400'
                          }`}>
                            {solution}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 하이라이트 테두리 */}
              {module.highlight && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-transparent to-orange-500/20 rounded-3xl pointer-events-none" />
              )}
            </AnimatedSection>
          ))}
        </StaggerContainer>

        {/* CTA 섹션 */}
        <AnimatedSection animation="fade-up" delay={600} className="text-center mt-16">
          <div className="bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 border border-brand-primary/20 rounded-2xl p-8">
            <h3 className="text-subtitle font-bold mb-4">
              완벽한 블로그자동화프로그램을 한 번에
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              블로그AI자동화부터 AI댓글자동화, AI서로이웃자동화, AI대댓글자동화까지 4개 모듈이 완벽하게 연동되어 네이버블로그자동화의 새로운 기준을 제시합니다.
            </p>
            
            <Button 
              variant="brand" 
              size="xl" 
              onClick={onPurchaseClick}
              className="group"
            >
              모든 모듈 확인하기
              <TrendingUp className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}