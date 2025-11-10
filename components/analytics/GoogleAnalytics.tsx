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
  console.log('GoogleAnalytics component rendered with measurementId:', measurementId);
  
  return (
    <>
      {/* Add debug comment to verify component is rendering */}
      {/* Google Analytics Debug: measurementId = {measurementId} */}
      <div style={{display: 'none'}} data-ga-debug={measurementId}>GA Component Loaded</div>
      
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={() => console.log('GA gtag script loaded')}
        onError={(e) => console.error('GA gtag script error:', e)}
      />
      <Script 
        id="google-analytics" 
        strategy="afterInteractive"
        onLoad={() => console.log('GA inline script loaded')}
        onError={(e) => console.error('GA inline script error:', e)}
      >
        {`
          console.log('GA inline script executing');
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
          console.log('GA initialized with ID: ${measurementId}');
        `}
      </Script>
    </>
  )
}