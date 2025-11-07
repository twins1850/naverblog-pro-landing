"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  title: string
  description: string
  url: string
}

export function ShareButton({ title, description, url }: ShareButtonProps) {
  const handleShare = async () => {
    const shareData = {
      title,
      text: description,
      url
    }

    try {
      if (navigator.share) {
        // Web Share API 사용 (모바일에서 주로 지원)
        await navigator.share(shareData)
      } else {
        // URL 클립보드에 복사
        await navigator.clipboard.writeText(shareData.url)
        alert('페이지 링크가 클립보드에 복사되었습니다!')
      }
    } catch (error) {
      // 에러 시 URL만 복사
      try {
        await navigator.clipboard.writeText(shareData.url)
        alert('페이지 링크가 클립보드에 복사되었습니다!')
      } catch (clipboardError) {
        console.error('공유 실패:', error)
        alert('공유에 실패했습니다. 브라우저 설정을 확인해주세요.')
      }
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleShare}>
      <Share2 className="w-4 h-4 mr-2" />
      공유하기
    </Button>
  )
}