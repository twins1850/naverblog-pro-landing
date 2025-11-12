'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

function GoogleAnalyticsInner({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return

    const url = pathname + searchParams.toString()
    
    // Page view tracking
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
    })
  }, [pathname, searchParams, GA_MEASUREMENT_ID])

  return null
}

export function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID?: string }) {
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
            
            // Blog-specific events
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href
            });

            // SEO performance tracking
            gtag('event', 'seo_performance', {
              event_category: 'SEO',
              event_label: 'page_load',
              value: 1
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsInner GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
      </Suspense>
    </>
  )
}

// Blog-specific event tracking functions
export const trackBlogEvent = (eventName: string, parameters: any = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'Blog',
      ...parameters
    })
  }
}

export const trackCTAClick = (buttonName: string, location: string) => {
  trackBlogEvent('cta_click', {
    event_label: buttonName,
    event_category: 'Conversion',
    custom_location: location,
    value: 1
  })
}

export const trackNewsletterSignup = (source: string) => {
  trackBlogEvent('newsletter_signup', {
    event_label: source,
    event_category: 'Conversion',
    value: 1
  })
}

export const trackScrollDepth = (depth: number) => {
  trackBlogEvent('scroll_depth', {
    event_label: `${depth}%`,
    event_category: 'Engagement',
    value: depth
  })
}

export const trackExternalLinkClick = (url: string) => {
  trackBlogEvent('external_link_click', {
    event_label: url,
    event_category: 'Engagement',
    value: 1
  })
}