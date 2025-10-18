// 기능별 영상 데이터 관리

export interface VideoData {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  videoId?: string // 유튜브 비디오 ID
  videoUrl?: string // 직접 호스팅 URL
  isReady: boolean // 영상 준비 상태
  features: string[] // 주요 기능 포인트
  duration?: string // 영상 길이
}

export const featuresVideos: VideoData[] = [
  {
    id: "blog-writing",
    title: "AI 글쓰기 자동화",
    description: "ChatGPT 5.0 기반으로 SEO 최적화된 고품질 블로그 글을 자동으로 작성합니다. 키워드 분석부터 발행까지 원클릭으로 완성됩니다.",
    thumbnailUrl: "/assets/media/screenshots/blog-writing.webp",
    videoId: "ocABPrhzkJ4", // 글쓰기 자동화 영상
    videoUrl: "", // 직접 호스팅시 URL 입력
    isReady: true, // 영상 준비 완료!
    features: [
      "ChatGPT 5.0 고품질 글쓰기",
      "SEO 키워드 자동 최적화",
      "이미지 자동 삽입",
      "카테고리 자동 분류",
      "발행 시간 스케줄링"
    ],
    duration: "2:30"
  },
  {
    id: "comment-automation",
    title: "댓글 자동화",
    description: "다른 블로그에 자연스럽고 의미있는 댓글을 자동으로 작성합니다. 스팸으로 인식되지 않는 고품질 댓글로 백링크를 확보합니다.",
    thumbnailUrl: "/assets/media/screenshots/comment-automation.webp",
    videoId: "oCDEMbYIMFo", // 댓글 자동화 영상
    videoUrl: "",
    isReady: true, // 영상 준비 완료!
    features: [
      "자연스러운 댓글 생성",
      "타겟 키워드 포함",
      "스팸 필터 우회",
      "백링크 자동 생성",
      "댓글 시간 분산"
    ],
    duration: "2:45"
  },
  {
    id: "neighbor-automation",
    title: "서로이웃 자동화",
    description: "타겟 분야의 활성 블로거들과 자동으로 서로이웃을 맺습니다. 상호 방문과 댓글 교환으로 블로그 활성도를 높입니다.",
    thumbnailUrl: "/assets/media/screenshots/neighbor-automation.webp",
    videoId: "fFgMb4dkm9w", // 서로이웃 자동화 영상
    videoUrl: "",
    isReady: true, // 영상 준비 완료!
    features: [
      "타겟 이웃 자동 발굴",
      "서로이웃 신청 자동화",
      "이웃 블로그 방문",
      "상호 교류 관리",
      "네트워크 확장"
    ],
    duration: "2:15"
  },
  {
    id: "reply-automation",
    title: "대댓글 자동화",
    description: "내 블로그 댓글에 즉시 대댓글을 자동으로 작성합니다. 방문자와의 소통을 활성화하여 재방문율과 체류시간을 증가시킵니다.",
    thumbnailUrl: "/assets/media/screenshots/reply-automation.webp",
    videoId: "JtwblOcgix0", // 대댓글 자동화 영상
    videoUrl: "",
    isReady: true, // 영상 준비 완료!
    features: [
      "댓글 즉시 감지",
      "맞춤형 대댓글 생성",
      "감정 분석 기반 응답",
      "재방문 유도 메시지",
      "소통 활성화"
    ],
    duration: "2:00"
  }
]

// 특정 기능 영상 데이터 가져오기
export function getVideoData(id: string): VideoData | undefined {
  return featuresVideos.find(video => video.id === id)
}

// 모든 영상 데이터 가져오기
export function getAllVideos(): VideoData[] {
  return featuresVideos
}

// 준비된 영상만 가져오기
export function getReadyVideos(): VideoData[] {
  return featuresVideos.filter(video => video.isReady)
}

// 영상 준비 상태 업데이트 (관리자용)
export function updateVideoStatus(id: string, isReady: boolean, videoId?: string, videoUrl?: string) {
  const video = featuresVideos.find(v => v.id === id)
  if (video) {
    video.isReady = isReady
    if (videoId) video.videoId = videoId
    if (videoUrl) video.videoUrl = videoUrl
  }
}