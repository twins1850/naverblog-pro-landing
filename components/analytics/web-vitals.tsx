"use client"

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

interface WebVitalsProps {
  debug?: boolean
}

export function WebVitals({ debug = false }: WebVitalsProps) {
  useEffect(() => {
    const reportWebVitals = (metric: any) => {
      if (debug) {
        console.log('[Web Vitals]', metric)
      }

      // Google Analytics 4로 데이터 전송
      if (typeof gtag !== 'undefined') {
        gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
          custom_parameter_1: metric.rating,
          custom_parameter_2: metric.delta
        })
      }

      // 개발 환경에서 콘솔 출력
      if (process.env.NODE_ENV === 'development' || debug) {
        console.group(`🚀 ${metric.name} (${metric.rating})`)
        console.log(`Value: ${metric.value}`)
        console.log(`Delta: ${metric.delta}`)
        console.log(`ID: ${metric.id}`)
        console.groupEnd()
      }
    }

    // Core Web Vitals 측정
    onCLS(reportWebVitals)
    onINP(reportWebVitals)
    onFCP(reportWebVitals)
    onLCP(reportWebVitals)
    onTTFB(reportWebVitals)

  }, [debug])

  return null
}

// GTM 타입 정의
declare global {
  function gtag(...args: any[]): void
}