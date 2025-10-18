"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Play, ExternalLink } from "lucide-react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  videoId?: string // 유튜브 비디오 ID
  videoUrl?: string // 직접 호스팅 비디오 URL
  description?: string
  thumbnailUrl?: string
}

export function VideoModal({
  isOpen,
  onClose,
  title,
  videoId,
  videoUrl,
  description,
  thumbnailUrl
}: VideoModalProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleVideoLoad = () => {
    setIsLoading(false)
  }

  const renderVideo = () => {
    if (videoId) {
      // 유튜브 임베드
      return (
        <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-sm">영상을 불러오는 중...</p>
              </div>
            </div>
          )}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleVideoLoad}
          />
        </div>
      )
    }

    if (videoUrl) {
      // 직접 호스팅 비디오
      return (
        <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-cover"
            poster={thumbnailUrl}
            onLoadedData={handleVideoLoad}
          >
            <source src={videoUrl} type="video/mp4" />
            귀하의 브라우저는 비디오 태그를 지원하지 않습니다.
          </video>
        </div>
      )
    }

    // 영상 준비 중 상태
    return (
      <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto">
            <Play className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">영상 준비 중</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              고품질 데모 영상을 제작 중입니다.<br />
              곧 실제 화면을 확인하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-white border-0">
        <div className="relative">
          {/* 헤더 */}
          <DialogHeader className="p-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-gray-900">
                {title}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {description && (
              <p className="text-gray-600 text-sm mt-2">{description}</p>
            )}
          </DialogHeader>

          {/* 비디오 영역 */}
          <div className="p-6">
            {renderVideo()}
          </div>

          {/* 하단 액션 */}
          <div className="p-6 pt-4 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                실제 프로그램 화면을 확인해보세요
              </div>
              <div className="flex items-center space-x-3">
                {videoId && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://youtu.be/${videoId}`, '_blank')}
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>유튜브에서 보기</span>
                  </Button>
                )}
                <Button
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  닫기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}