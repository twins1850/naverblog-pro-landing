"use client"

import * as React from "react"
import { AnimatedSection, StaggerContainer } from "@/components/ui/animated-section"
import { CheckCircle, X, Zap, MessageCircle, Users, RotateCcw } from "lucide-react"

export function ProblemSolution() {
  const problemsAndSolutions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "글쓰기",
      problem: {
        title: "API 단순 호출",
        description: "기계적 내용 → 봇 감지 위험",
        color: "text-red-500"
      },
      solution: {
        title: "커스텀 GPT",
        description: "전문지식 기반 → 평균 2,300자 고품질 → 99.9% 성공률",
        color: "text-green-500",
        stats: "99.9% 성공률"
      }
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "댓글",
      problem: {
        title: "복붙 멘트",
        description: "성의없음 → 무시당함",
        color: "text-red-500"
      },
      solution: {
        title: "AI 맞춤 댓글",
        description: "글 내용 분석 → 정성스러운 댓글 → 답방률 300%↑",
        color: "text-green-500",
        stats: "답방률 300%↑"
      }
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "서로이웃",
      problem: {
        title: "똑같은 메시지",
        description: "기계적 → 거부당함",
        color: "text-red-500"
      },
      solution: {
        title: "AI 개인화",
        description: "최신글 읽고 → 맞춤 메시지 → 수락률 최고",
        color: "text-green-500",
        stats: "수락률 최고"
      }
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "대댓글",
      problem: {
        title: "기능 자체가 없음",
        description: "소통 단절",
        color: "text-red-500"
      },
      solution: {
        title: "세계 최초 대댓글",
        description: "독점 기능 → 진짜 소통 → 재방문 300%↑",
        color: "text-yellow-500",
        stats: "재방문 300%↑",
        highlight: true
      }
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-title font-bold mb-6">
            왜 <span className="text-gradient">완전히 다른가?</span>
          </h2>
          
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            기존 프로그램들의 근본적 한계를 완전히 뛰어넘는 혁신적 접근 방식을 확인하세요.
          </p>
        </AnimatedSection>

        <div className="space-y-16">
          {/* 문제점 섹션 */}
          <AnimatedSection animation="slide-right" delay={200}>
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <X className="w-6 h-6 text-red-500" />
                <h3 className="text-subtitle font-bold text-red-600">기존 프로그램들이 실패하는 이유</h3>
              </div>

              <StaggerContainer staggerDelay={100} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {problemsAndSolutions.map((item, index) => (
                  <div key={`problem-${index}`} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="text-red-500">{item.icon}</div>
                      <h4 className="font-semibold text-red-600">{item.title}</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="font-medium text-red-700 dark:text-red-400">
                        {item.problem.title}
                      </div>
                      <div className="text-red-600/80 dark:text-red-400/80">
                        {item.problem.description}
                      </div>
                    </div>
                  </div>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* 해결책 섹션 */}
          <AnimatedSection animation="slide-left" delay={400}>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="text-subtitle font-bold text-green-600">우리가 완전히 다른 방식</h3>
              </div>

              <StaggerContainer staggerDelay={100} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {problemsAndSolutions.map((item, index) => (
                  <div 
                    key={`solution-${index}`} 
                    className={`space-y-3 ${item.solution.highlight ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-950/30 dark:to-orange-950/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/30' : ''}`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={item.solution.highlight ? "text-yellow-500" : "text-green-500"}>
                        {item.solution.highlight ? <Zap className="w-6 h-6" /> : item.icon}
                      </div>
                      <h4 className={`font-semibold ${item.solution.highlight ? 'text-yellow-600' : 'text-green-600'}`}>
                        {item.title}
                      </h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className={`font-bold ${item.solution.highlight ? 'text-yellow-700 dark:text-yellow-400' : 'text-green-700 dark:text-green-400'}`}>
                        {item.solution.title}
                      </div>
                      <div className={`${item.solution.highlight ? 'text-yellow-600/80 dark:text-yellow-400/80' : 'text-green-600/80 dark:text-green-400/80'}`}>
                        {item.solution.description}
                      </div>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        item.solution.highlight 
                          ? 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20' 
                          : 'bg-green-500/10 text-green-600 border border-green-500/20'
                      }`}>
                        {item.solution.stats}
                      </div>
                    </div>
                  </div>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* 멀티계정 추가 강조 */}
          <AnimatedSection animation="fade-up" delay={600}>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-900/30 rounded-2xl p-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 font-medium">
                  <Users className="w-5 h-5" />
                  <span>업계 유일 멀티계정 동시 작업</span>
                </div>
                <h3 className="text-subtitle font-bold text-blue-600">
                  여러 계정을 한번에 관리하여 극대화된 효율성
                </h3>
                <p className="text-blue-600/80 max-w-2xl mx-auto">
                  한 번의 설정으로 모든 계정에서 동시에 작업이 진행되어 시간은 50% 절약하고 노출은 2배 증대
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}