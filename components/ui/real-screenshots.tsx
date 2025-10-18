"use client"

import * as React from "react"
import { useState } from "react"
import { AnimatedSection, StaggerContainer } from "@/components/ui/animated-section"
import { VideoModal } from "@/components/ui/video-modal"
import { getVideoData } from "@/lib/video-data"
import { PenTool, MessageCircle, Users, RotateCcw, ExternalLink } from "lucide-react"

export function RealScreenshots() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const screenshots = [
    {
      id: "blog-writing",
      icon: <PenTool className="w-6 h-6" />,
      title: "📝 글쓰기 자동화",
      description: "커스텀 GPT로 평균 2,300자 전문가급 글 생성",
      image: "/assets/media/screenshots/blog-writing.webp",
      alt: "Blog Pro 글쓰기 자동화 실제 화면",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      id: "comment-automation",
      icon: <MessageCircle className="w-6 h-6" />,
      title: "💬 댓글 자동화",
      description: "AI가 글 내용을 읽고 맞춤형 댓글 생성",
      image: "/assets/media/screenshots/comment-automation.webp",
      alt: "Blog Pro 댓글 자동화 실제 화면",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: "neighbor-automation",
      icon: <Users className="w-6 h-6" />,
      title: "👥 서로이웃 자동화",
      description: "최신글 분석하여 개인화된 서로이웃 메시지",
      image: "/assets/media/screenshots/neighbor-automation.webp",
      alt: "Blog Pro 서로이웃 자동화 실제 화면",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: "reply-automation",
      icon: <RotateCcw className="w-6 h-6" />,
      title: "🔄 대댓글 자동화",
      description: "세계 최초! 대댓글까지 완전 자동화",
      image: "/assets/media/screenshots/reply-automation.webp",
      alt: "Blog Pro 대댓글 자동화 실제 화면",
      gradient: "from-yellow-500 to-orange-600",
      highlight: true
    }
  ]

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId)
    setIsVideoModalOpen(true)
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
    setSelectedVideo(null)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-muted/10 to-background">
      <div className="container real-screenshots-container mx-auto">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-title font-bold mb-6">
            실제 <span className="text-gradient">프로그램 화면</span>을 확인하세요
          </h2>
          
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            Mock이 아닌 실제로 동작하는 프로그램의 화면입니다. 
            직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다.
          </p>
        </AnimatedSection>

        <StaggerContainer staggerDelay={200} className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {screenshots.map((item, index) => (
            <AnimatedSection 
              key={index} 
              animation="scale-in" 
              delay={index * 100}
              className={`group relative ${item.highlight ? 'md:col-span-2' : ''}`}
            >
              <div className={`relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
                item.highlight ? 'ring-2 ring-yellow-500/20' : ''
              }`}>
                {/* 헤더 */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} text-white`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      {item.highlight && (
                        <div className="inline-flex items-center space-x-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-600 text-xs font-medium mt-2">
                          <span>🏆</span>
                          <span>세계 최초</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 스크린샷 */}
                <div className="relative">
                  <img 
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  
                  {/* 호버 오버레이 */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 cursor-pointer"
                    onClick={() => handleVideoClick(item.id)}
                  >
                    <div className="flex items-center space-x-2 text-white text-sm font-medium">
                      <ExternalLink className="w-4 h-4" />
                      <span>실제 화면 보기</span>
                    </div>
                  </div>
                </div>

                {/* 하이라이트 테두리 효과 */}
                {item.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-orange-500/10 pointer-events-none" />
                )}
              </div>
            </AnimatedSection>
          ))}
        </StaggerContainer>

        {/* 특징 강조 */}
        <AnimatedSection animation="fade-up" delay={600} className="mt-16 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-900/30 rounded-2xl p-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 font-medium">
                <Users className="w-5 h-5" />
                <span>멀티계정 동시 관리</span>
              </div>
              <h3 className="text-subtitle font-bold text-blue-600">
                모든 모듈이 멀티계정을 지원합니다
              </h3>
              <p className="text-blue-600/80 max-w-3xl mx-auto leading-relaxed">
                한 번의 설정으로 여러 계정에서 동시에 4개 모듈이 작동합니다. 
                효율성은 극대화하고 시간은 최소화하는 혁신적인 시스템을 경험하세요.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">2-10개</div>
                  <div className="text-sm text-blue-600/80">동시 관리 계정</div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">50%</div>
                  <div className="text-sm text-blue-600/80">시간 절약</div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">2배</div>
                  <div className="text-sm text-blue-600/80">노출 증대</div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-blue-600/80">무중단 작업</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* 영상 모달 */}
      {selectedVideo && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={closeVideoModal}
          title={getVideoData(selectedVideo)?.title || ""}
          description={getVideoData(selectedVideo)?.description}
          videoId={getVideoData(selectedVideo)?.videoId}
          videoUrl={getVideoData(selectedVideo)?.videoUrl}
          thumbnailUrl={getVideoData(selectedVideo)?.thumbnailUrl}
        />
      )}
    </section>
  )
}