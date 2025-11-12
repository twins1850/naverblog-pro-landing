'use client'

import { useEffect } from 'react'
import { trackBlogEvent } from './google-analytics'

export function SEOMonitoring() {
  useEffect(() => {
    // Track page load performance for SEO
    const trackSEOMetrics = () => {
      if (typeof window === 'undefined') return

      // Core Web Vitals tracking
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            trackBlogEvent('core_web_vitals', {
              metric_name: entry.name,
              metric_value: Math.round(entry.startTime),
              event_category: 'Performance'
            })
          }
        }
      })

      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] })

      // Track scroll depth for engagement
      let maxScroll = 0
      const trackScrollDepth = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        )
        
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
          maxScroll = scrollPercent
          trackBlogEvent('scroll_depth', {
            depth: scrollPercent,
            event_category: 'Engagement'
          })
        }
      }

      window.addEventListener('scroll', trackScrollDepth)

      // Track time on page
      const startTime = Date.now()
      const trackTimeOnPage = () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000)
        trackBlogEvent('time_on_page', {
          time_seconds: timeSpent,
          event_category: 'Engagement'
        })
      }

      window.addEventListener('beforeunload', trackTimeOnPage)

      // Track keyword visibility (simulate based on page content)
      const trackKeywordVisibility = () => {
        const keywords = [
          '네이버 블로그 자동화',
          'ChatGPT 블로그 글쓰기',
          'AI 글쓰기 프로그램',
          '블로그 자동 포스팅 프로그램',
          '블로그 마케팅 자동화'
        ]

        const content = document.body.innerText.toLowerCase()
        keywords.forEach(keyword => {
          if (content.includes(keyword.toLowerCase())) {
            trackBlogEvent('keyword_visibility', {
              keyword: keyword,
              event_category: 'SEO',
              value: 1
            })
          }
        })
      }

      // Run after page is fully loaded
      setTimeout(trackKeywordVisibility, 2000)

      return () => {
        observer.disconnect()
        window.removeEventListener('scroll', trackScrollDepth)
        window.removeEventListener('beforeunload', trackTimeOnPage)
      }
    }

    // Track initial page load
    trackBlogEvent('page_load_complete', {
      event_category: 'Performance',
      page_type: getPageType(),
      value: 1
    })

    return trackSEOMetrics()
  }, [])

  return null
}

function getPageType(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const pathname = window.location.pathname
  
  if (pathname === '/') return 'homepage'
  if (pathname.startsWith('/blog/') && pathname !== '/blog') return 'blog_post'
  if (pathname === '/blog') return 'blog_index'
  if (pathname.startsWith('/pricing')) return 'pricing'
  
  return 'other'
}

// Search Console data simulation (for demo purposes)
export const trackSearchConsoleMetrics = () => {
  if (typeof window === 'undefined') return

  // Simulate search console metrics tracking
  const metrics = {
    impressions: Math.floor(Math.random() * 1000) + 100,
    clicks: Math.floor(Math.random() * 50) + 10,
    position: Math.floor(Math.random() * 20) + 1,
    ctr: Math.round((Math.random() * 0.1 + 0.02) * 100) / 100
  }

  trackBlogEvent('search_console_metrics', {
    ...metrics,
    event_category: 'SEO_Performance'
  })
}