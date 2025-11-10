"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatedSection, StaggerContainer } from "@/components/ui/animated-section"
import { AlertCircle, XCircle, TrendingDown, ThumbsDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PainPoint {
  id: string
  title: string
  hookText: string
  problems: string[]
  visual: {
    type: string
    overlay: string
    badge: string
    exampleText?: string
  }
}

interface AnimatedCardProps extends PainPoint {
  delay?: number
}

function AnimatedCard({ id, title, hookText, problems, visual, delay = 0 }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)
  
  // Use fixed indices to avoid hydration mismatch
  // Can be made dynamic based on props or other deterministic factors
  const commentImages = [1, 2]

  return (
    <AnimatedSection delay={delay}>
      <div
        className={cn(
          "relative group overflow-hidden rounded-2xl",
          "bg-gradient-to-br from-white via-gray-50 to-white",
          "dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90",
          "border border-red-200 dark:border-red-500/20",
          "transition-all duration-500",
          isHovered && "scale-[1.02] border-red-400 dark:border-red-500/40"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0",
          "transition-opacity duration-500",
          isHovered && "opacity-100"
        )} />

        {/* Animated border */}
        <div className={cn(
          "absolute inset-0 rounded-2xl",
          isHovered && "animate-pulse"
        )}>
          <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-br from-red-500/20 via-red-600/20 to-red-500/20 blur-lg" />
        </div>

        <div className="relative z-10 p-8">
          {/* Badge */}
          <div className="absolute top-4 right-4">
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-bold",
              "bg-red-100 text-red-700 border border-red-300",
              "dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30",
              isHovered && "animate-pulse"
            )}>
              {visual.badge}
            </div>
          </div>

          {/* Title */}
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">{title}</h3>
          </div>

          {/* Hook Text */}
          <p className={cn(
            "text-xl md:text-2xl font-bold mb-6",
            "bg-gradient-to-r from-red-600 to-red-500 dark:from-red-400 dark:to-red-300 bg-clip-text text-transparent",
            "leading-relaxed"
          )}>
            {hookText}
          </p>

          {/* Visual Example */}
          <div className={cn(
            "relative rounded-lg overflow-hidden mb-6",
            "bg-red-50/30 dark:bg-gray-950/50",
            "border border-red-200 dark:border-red-500/10 p-4"
          )}>
            {/* Example content based on type - Shows image if available, otherwise fallback */}
            {id === 'writing' && (
              <>
                {/* Placeholder for actual screenshot */}
                <div className="relative">
                  <Image 
                    src="/images/competitor-examples/competitor-api-writing.webp" 
                    alt="타사 프로그램 글쓰기 실패 예시"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded opacity-90 hover:opacity-100 transition-opacity"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                    priority
                  />
                  <div className="space-y-3 hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-500 text-sm">SEO 점수</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-300 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="w-[23%] h-full bg-red-500 rounded-full" />
                        </div>
                        <span className="text-red-500 dark:text-red-400 text-sm font-bold">23/100</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded border border-gray-300 dark:border-gray-800">
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-through">
                        "오늘은 날씨가 좋습니다. 많은 사람들이 밖에 나갔습니다..."
                      </p>
                      <p className="text-red-500 dark:text-red-400 text-xs mt-2">❌ 검색 노출 불가능</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {id === 'comment' && (
              <>
                <div className="grid grid-cols-1 gap-2">
                  <Image 
                    src={`/images/competitor-examples/competitor-comment-${commentImages[0]}.webp`}
                    alt="타사 프로그램 댓글 실패 예시 1" 
                    width={600}
                    height={300}
                    className="w-full h-auto rounded opacity-90 hover:opacity-100 transition-opacity"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                  />
                  <Image 
                    src={`/images/competitor-examples/competitor-comment-${commentImages[1]}.webp`}
                    alt="타사 프로그램 댓글 실패 예시 2" 
                    width={600}
                    height={300}
                    className="w-full h-auto rounded opacity-90 hover:opacity-100 transition-opacity"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                  />
                </div>
                <div className="space-y-2 hidden" style={{display: 'none'}}>
                  <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded border border-gray-300 dark:border-gray-800">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">"좋은 글 잘 보고 갑니다"</p>
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded border border-gray-300 dark:border-gray-800">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">"좋은 글 잘 보고 갑니다"</p>
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded border border-gray-300 dark:border-gray-800">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">"좋은 글 잘 보고 갑니다"</p>
                  </div>
                  <p className="text-red-500 dark:text-red-400 text-xs text-center mt-2">🚫 100% 무시당함</p>
                </div>
              </>
            )}

            {id === 'neighbor' && (
              <>
                <Image 
                  src="/images/competitor-examples/competitor-neighbor.webp"
                  alt="타사 프로그램 서로이웃 실패 예시"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded opacity-90 hover:opacity-100 transition-opacity"
                  onError={() => setImageError(true)}
                  onLoad={() => setImageError(false)}
                />
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded border border-gray-300 dark:border-gray-800 hidden">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    "안녕하세요 서로이웃 신청합니다 맞구독 부탁드려요"
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <button className="px-3 py-1 bg-red-500/20 text-red-500 dark:text-red-400 rounded text-xs">
                      거절
                    </button>
                    <span className="text-gray-600 dark:text-gray-500 text-xs">수락률 3%</span>
                  </div>
                </div>
              </>
            )}

            {id === 'reply' && (
              <>
                <Image 
                  src="/images/competitor-examples/competitor-reply.webp"
                  alt="타사 프로그램 대댓글 실패 예시"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded opacity-90 hover:opacity-100 transition-opacity"
                  onError={() => setImageError(true)}
                  onLoad={() => setImageError(false)}
                />
                <div className="space-y-3 hidden">
                  <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded border border-gray-300 dark:border-gray-800">
                    <p className="text-gray-700 dark:text-gray-300 text-sm">방문자: "정말 유용한 정보네요!"</p>
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded border border-red-300 dark:border-red-500/20 ml-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">답글: "감사합니다"</p>
                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">❌ 대화 종료</p>
                  </div>
                  <p className="text-red-500 dark:text-red-400 text-xs text-center">💔 소통 기회 상실</p>
                </div>
              </>
            )}

            {/* Overlay - only show on hover and when images are loaded */}
            {isHovered && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 backdrop-blur-[1px] transition-opacity duration-300 pointer-events-none">
                <div className="transform rotate-12">
                  <div className="px-4 py-2 bg-red-500 text-white font-bold text-lg rounded shadow-xl">
                    {visual.overlay}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Problems list */}
          <div className="space-y-2">
            {problems.map((problem, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                <span className="text-gray-800 dark:text-gray-400 text-sm font-medium">{problem}</span>
              </div>
            ))}
          </div>

          {/* Shake animation on hover */}
          <div className={cn(
            "absolute inset-0 pointer-events-none",
            isHovered && "animate-shake"
          )} />
        </div>
      </div>
    </AnimatedSection>
  )
}

export function CompetitorPainPoints() {
  const painPoints: PainPoint[] = [
    {
      id: 'writing',
      title: '글쓰기 자동화',
      hookText: '아직도 API 방식 AI로 SEO도 다 무시하고 그냥 검색해서 나온 그런 간단한 글로 내 블로그에 맞지도 않는 글을 자동발행 하시나요?',
      problems: ['SEO 점수 최하위', '검색 노출 불가', '블로그 특성 무시'],
      visual: {
        type: 'screenshot',
        overlay: 'SEO FAILED',
        badge: '❌ 검색 노출 실패'
      }
    },
    {
      id: 'comment',
      title: '댓글 자동화',
      hookText: '이렇게 복사 붙여넣기 식의 댓글로 어떤 효과를 바라시나요?',
      problems: ['똑같은 댓글 반복', '진정성 없음', '100% 무시당함'],
      visual: {
        type: 'screenshot',
        overlay: 'IGNORED',
        badge: '🚫 효과 없음'
      }
    },
    {
      id: 'neighbor',
      title: '서로이웃 신청',
      hookText: '여러분은 이런 서로이웃 신청글을 보고 서로이웃 수락을 하고싶나요?',
      problems: ['기계적 메시지', '개인화 없음', '거부당함'],
      visual: {
        type: 'screenshot',
        overlay: 'REJECTED',
        badge: '❌ 수락률 최저'
      }
    },
    {
      id: 'reply',
      title: '대댓글 자동화',
      hookText: '내 블로그에 달린 소중한 댓글을 무의미한 복사 붙여넣기를 해서 진짜 소통의 기회를 날려버리실건가요?',
      problems: ['복붙 대댓글', '소통 기회 상실', '관계 단절'],
      visual: {
        type: 'screenshot',
        overlay: 'LOST CHANCE',
        badge: '💔 소통 실패'
      }
    }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dark/Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
      
      {/* Red overlay - lighter in light mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-50/20 to-transparent dark:from-red-500/5 dark:to-transparent" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-100/5 to-transparent dark:via-gray-800/5" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section title */}
        <StaggerContainer className="text-center mb-16">
          <AnimatedSection delay={0}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              이런 프로그램, 아직도 사용하시나요?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              기존의 블로그 자동화 프로그램의 불편한 진실
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-300 dark:bg-red-500/10 dark:border-red-500/20">
              <TrendingDown className="w-4 h-4 text-red-700 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-400 text-sm font-semibold">실패율 97%</span>
            </div>
          </AnimatedSection>
        </StaggerContainer>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {painPoints.map((point, index) => (
            <AnimatedCard 
              key={point.id} 
              {...point}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA hint */}
        <AnimatedSection delay={0.8} className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-2">이제 더 이상 실패하지 마세요</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Blog Pro가 해결해드립니다
          </p>
        </AnimatedSection>
      </div>

      {/* Add shake animation styles */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </section>
  )
}