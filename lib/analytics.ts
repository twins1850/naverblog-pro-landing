// Google Analytics 이벤트 추적 유틸리티

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      action: string | Date,
      parameters?: Record<string, any>
    ) => void
  }
}

// 이벤트 타입 정의
export interface GAEvent {
  action: string
  category?: string
  label?: string
  value?: number
}

// 기본 이벤트 추적 함수
export const trackEvent = ({ action, category, label, value }: GAEvent) => {
  // 개발 환경에서는 콘솔에만 로그 출력
  if (process.env.NODE_ENV === 'development') {
    console.log('GA Event:', { action, category, label, value })
    return
  }

  // 프로덕션 환경에서만 실제 Google Analytics에 전송
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// 페이지 조회 추적
export const trackPageView = (url: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('GA Page View:', url)
    return
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: url,
    })
  }
}

// 결제 이벤트 추적
export const trackPurchase = (orderId: string, value: number, currency = 'KRW') => {
  trackEvent({
    action: 'purchase',
    category: 'ecommerce',
    label: orderId,
    value: value,
  })

  // Enhanced Ecommerce 이벤트
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: value,
      currency: currency,
      items: [{
        item_id: 'blog_pro_license',
        item_name: 'Blog Pro 라이선스',
        category: 'Software License',
        quantity: 1,
        price: value,
      }]
    })
  }
}

// 뉴스레터 구독 추적
export const trackNewsletterSignup = (email?: string) => {
  trackEvent({
    action: 'newsletter_signup',
    category: 'engagement',
    label: email ? 'success' : 'attempt',
  })
}

// 라이선스 다운로드 추적
export const trackLicenseDownload = (licenseId: string) => {
  trackEvent({
    action: 'license_download',
    category: 'conversion',
    label: licenseId,
  })
}

// 카카오톡 채널 클릭 추적
export const trackKakaoChannelClick = () => {
  trackEvent({
    action: 'kakao_channel_click',
    category: 'external_link',
    label: 'customer_support',
  })
}

// 외부 링크 클릭 추적
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent({
    action: 'external_link_click',
    category: 'engagement',
    label: linkText || url,
  })
}

// 폼 제출 추적
export const trackFormSubmit = (formName: string, success: boolean = true) => {
  trackEvent({
    action: 'form_submit',
    category: 'engagement',
    label: `${formName}_${success ? 'success' : 'error'}`,
  })
}

// 파일 다운로드 추적
export const trackDownload = (fileName: string, fileType?: string) => {
  trackEvent({
    action: 'download',
    category: 'engagement',
    label: `${fileType || 'file'}_${fileName}`,
  })
}

// 검색 이벤트 추적
export const trackSearch = (searchTerm: string, resultCount?: number) => {
  trackEvent({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
    value: resultCount,
  })
}

// 비디오 재생 추적
export const trackVideoPlay = (videoTitle: string, videoUrl?: string) => {
  trackEvent({
    action: 'video_play',
    category: 'engagement',
    label: videoTitle,
  })
}

// 스크롤 깊이 추적
export const trackScrollDepth = (percentage: number) => {
  trackEvent({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage,
  })
}

// 사용자 타이밍 추적 (성능 측정)
export const trackTiming = (category: string, variable: string, time: number, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: variable,
      value: time,
      event_category: category,
      event_label: label,
    })
  }
}