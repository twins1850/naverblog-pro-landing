'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  measurementId: string
}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
  }
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // 테스트를 위해 개발 환경에서도 Analytics 로드
  // if (process.env.NODE_ENV === 'development') {
  //   return null
  // }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}