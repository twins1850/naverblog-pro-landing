'use client'

import Script from 'next/script'
import { useEffect } from 'react'

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
    dataLayer: any[]
  }
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    console.log('GoogleAnalytics component mounted with measurementId:', measurementId);
  }, [measurementId]);
  
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('GA gtag script loaded for ID:', measurementId);
        }}
        onError={(e) => {
          console.error('GA gtag script error:', e);
        }}
      />
      <Script 
        id="google-analytics" 
        strategy="afterInteractive"
        onLoad={() => {
          console.log('GA inline script loaded for ID:', measurementId);
        }}
        onError={(e) => {
          console.error('GA inline script error:', e);
        }}
      >
        {`
          console.log('GA inline script executing for ID: ${measurementId}');
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
          console.log('GA initialized with ID: ${measurementId}');
        `}
      </Script>
      <div style={{display: 'none'}} data-ga-debug={measurementId}>
        GA Component Active: {measurementId}
      </div>
    </>
  )
}