import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autotoolshub.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/temp_downloads/',
          '/downloads/',
          '/_next/',
          '/.well-known/',
          '/private/',
          '*?token=*',
          '*?debug=*',
          '/payment-info/fail',
          '/test-*'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/temp_downloads/',
          '/downloads/',
          '/_next/',
          '*?token=*',
          '*?debug=*'
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/temp_downloads/',
          '/downloads/',
          '/_next/',
          '*?token=*',
          '*?debug=*'
        ],
      },
      // 네이버봇 최적화
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/temp_downloads/',
          '/downloads/',
          '/_next/',
          '*?token=*',
          '*?debug=*'
        ],
      },
      // 다음 봇
      {
        userAgent: 'Daumoa',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/temp_downloads/',
          '/downloads/',
          '/_next/',
          '*?token=*',
          '*?debug=*'
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}