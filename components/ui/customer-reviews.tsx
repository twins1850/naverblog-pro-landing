"use client"

import * as React from "react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "김○○님",
      period: "3개월 사용",
      rating: 5,
      title: "정말 신세계네요. 기존 프로그램과는 차원이 다릅니다",
      content: "다른 자동화 프로그램 3개 써봤는데 전부 복붙 댓글이라 금방 들통났어요. Blog Pro는 정말 사람이 쓴 것처럼 댓글을 달아줘서 답방률이 300% 올랐습니다. 특히 멀티계정 기능이 최고예요!",
      modules: ["글쓰기", "댓글", "서로이웃"],
      results: "답방률 300%↑, 월 수익 250만원"
    },
    {
      id: 2,
      name: "박○○님", 
      period: "6개월 사용",
      rating: 5,
      title: "댓글 답방률이 정말 높아졌어요. AI가 정말 사람처럼 댓글을 써요",
      content: "처음엔 반신반의했는데 진짜 AI가 글을 읽고 댓글을 써줘요. 그냥 '좋은 글 감사합니다' 이런 게 아니라 글 내용에 대한 구체적인 댓글을 달아줘서 블로거들이 진짜 좋아해요. 대댓글 기능은 정말 혁신이에요.",
      modules: ["댓글", "대댓글", "서로이웃"],
      results: "댓글 답방률 280%↑, 재방문율 400%↑"
    },
    {
      id: 3,
      name: "이○○님",
      period: "4개월 사용", 
      rating: 5,
      title: "멀티계정 기능 덕분에 효율이 2배 늘었습니다",
      content: "계정 5개를 동시에 관리하는데 한 번 설정하면 모든 계정에서 알아서 돌아가요. 예전엔 계정별로 하나씩 해야 해서 하루 종일 걸렸는데 지금은 30분이면 끝이에요. 시간이 남아서 다른 일도 할 수 있어요.",
      modules: ["멀티계정", "글쓰기", "댓글", "서로이웃"],
      results: "작업 시간 80% 단축, 계정 5개 동시 관리"
    },
    {
      id: 4,
      name: "최○○님",
      period: "8개월 사용",
      rating: 5,
      title: "서로이웃 수락률이 기존 대비 3배 이상 올랐어요", 
      content: "개인화된 메시지가 정말 대단해요. 상대방 최신글을 읽고 그에 맞는 메시지를 보내주니까 거절당할 이유가 없어요. 서로이웃이 늘어나니까 자연스럽게 방문자도 늘고 수익도 늘었습니다.",
      modules: ["서로이웃", "댓글"],
      results: "서로이웃 수락률 320%↑, 일 방문자 500명→1,800명"
    },
    {
      id: 5,
      name: "강○○님",
      period: "1년 사용",
      rating: 5,
      title: "대댓글 자동화는 정말 혁신적이에요. 블로그가 살아났어요",
      content: "다른 프로그램엔 없는 대댓글 기능이 정말 대박이에요. 댓글 달아주면 대댓글까지 자동으로 달아줘서 블로그가 정말 활발해 보여요. 방문자들이 계속 와서 소통하고 싶어해요. 재방문율이 엄청 올랐습니다.",
      modules: ["대댓글", "댓글", "글쓰기"],
      results: "재방문율 350%↑, 댓글 참여도 500%↑"
    },
    {
      id: 6,
      name: "정○○님", 
      period: "5개월 사용",
      rating: 5,
      title: "전문가급 글 품질에 놀랐습니다. 정말 사람이 쓴 것 같아요",
      content: "2,300자 정도 되는 고품질 글을 써주는데 정말 전문가가 쓴 것 같아요. 검색에도 잘 노출되고 방문자들 반응도 좋아요. 다른 자동화 프로그램 글들은 티가 나는데 이건 정말 자연스러워요.",
      modules: ["글쓰기", "댓글"],
      results: "검색 노출 400%↑, 평균 체류시간 3분→7분"
    }
  ]

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [isPaused, setIsPaused] = React.useState(false)
  const intervalRef = React.useRef<NodeJS.Timeout>()

  // 자동 롤링 기능
  React.useEffect(() => {
    if (isPlaying && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        )
      }, 5000) // 5초마다 변경
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, isPaused, reviews.length])

  // 마우스 호버시 일시정지
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const nextReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    )
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const currentReview = reviews[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-title font-bold mb-6">
            실제 사용자들의 <span className="text-gradient">생생한 후기</span>
          </h2>
          
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            가짜 후기가 아닌 실제 사용자들의 솔직한 경험담을 확인하세요. 
            구체적인 수치와 함께 검증된 결과를 보여드립니다.
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {/* 메인 리뷰 카드 */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatedSection animation="fade-in" key={currentReview.id}>
              <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                {/* 헤더 */}
                <div className="bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 p-6 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full flex items-center justify-center text-white font-bold">
                        {currentReview.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{currentReview.name}</h3>
                        <p className="text-sm text-muted-foreground">{currentReview.period}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(currentReview.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Quote className="w-8 h-8 text-brand-primary/30" />
                  </div>
                </div>

                {/* 콘텐츠 */}
                <div className="p-8 space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-3">
                      "{currentReview.title}"
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {currentReview.content}
                    </p>
                  </div>

                  {/* 사용 모듈 */}
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">사용한 모듈</div>
                    <div className="flex flex-wrap gap-2">
                      {currentReview.modules.map((module, index) => (
                        <span 
                          key={index}
                          className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium"
                        >
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 결과 */}
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-600 mb-1">실제 성과</div>
                    <div className="font-bold text-green-700 dark:text-green-400">
                      {currentReview.results}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* 컨트롤 버튼들 */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlayPause}
                className="bg-black/10 hover:bg-black/20 text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevReview}
                className="bg-black/10 hover:bg-black/20 text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextReview}
                className="bg-black/10 hover:bg-black/20 text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 인디케이터 */}
          <div className="flex items-center justify-center space-x-3 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-brand-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          {/* 요약 통계 */}
          <AnimatedSection animation="fade-up" delay={400} className="mt-16">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-900/30 rounded-2xl p-8">
              <h3 className="text-subtitle font-bold text-center text-blue-600 mb-8">
                전체 사용자 평균 성과
              </h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
                  <div className="text-blue-600/80 text-sm">사용자 만족도</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">312%</div>
                  <div className="text-blue-600/80 text-sm">평균 답방률 증가</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">285%</div>
                  <div className="text-blue-600/80 text-sm">평균 재방문율 증가</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">67%</div>
                  <div className="text-blue-600/80 text-sm">평균 시간 절약</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}