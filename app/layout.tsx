import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "@/styles/globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://naverblog-pro.com'

export const metadata: Metadata = {
  title: {
    default: "Blog Pro | ChatGPT 5.0 기반 AI 자동 포스팅",
    template: "%s | Blog Pro"
  },
  description: "ChatGPT 4.0/5.0 기반 AI로 24시간 자동 블로그 운영. 글쓰기, 댓글, 서로이웃, 대댓글 자동화로 월 수익 창출. 검색 상위 노출 보장.",
  keywords: [
    "블로그 자동화",
    "AI 블로그 포스팅", 
    "ChatGPT 블로그",
    "블로그 수익화",
    "블로그 SEO",
    "자동 포스팅",
    "댓글 자동화",
    "서로이웃 자동화",
    "블로그 마케팅",
    "AI 콘텐츠 생성"
  ],
  authors: [{ name: "Blog Pro" }],
  creator: "Blog Pro",
  publisher: "Blog Pro",
  metadataBase: new URL(siteUrl),
  
  // Open Graph
  openGraph: {
    type: "website",
    siteName: "Blog Pro",
    title: "Blog Pro | ChatGPT 5.0 기반 AI 자동 포스팅",
    description: "ChatGPT 4.0/5.0 기반 AI로 24시간 자동 블로그 운영. 글쓰기, 댓글, 서로이웃, 대댓글 자동화로 월 수익 창출.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog Pro - ChatGPT 기반 AI 자동 포스팅"
      }
    ],
    locale: "ko_KR"
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@blogpro_auto",
    creator: "@blogpro_auto",
    title: "Blog Pro | ChatGPT 5.0 기반 AI 자동 포스팅",
    description: "ChatGPT 4.0/5.0 기반 AI로 24시간 자동 블로그 운영. 월 수익 창출 보장.",
    images: ["/twitter-image.png"]
  },

  // 기타 메타데이터
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION || '',
    }
  },

  // 아이콘 관련
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icon-192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/icon-512.png',
      },
    ],
  },

  // 앱 관련
  manifest: "/manifest.json",
  
  // 추가 메타태그
  other: {
    'msapplication-TileColor': '#1a202c',
    'theme-color': '#1a202c',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Blog Pro'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Blog Pro",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Windows, macOS",
    "description": "ChatGPT 4.0/5.0 기반 AI로 24시간 자동 블로그 운영. 글쓰기, 댓글, 서로이웃, 대댓글 자동화로 월 수익 창출. 검색 상위 노출 보장.",
    "url": siteUrl,
    "author": {
      "@type": "Organization",
      "name": "Blog Pro"
    },
    "offers": {
      "@type": "Offer",
      "category": "Software License",
      "priceCurrency": "KRW",
      "price": "100000",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "100000",
        "priceCurrency": "KRW",
        "unitText": "Monthly"
      }
    },
    "featureList": [
      "ChatGPT 4.0/5.0 기반 AI 글쓰기 자동화",
      "댓글 자동화",
      "서로이웃 자동화", 
      "대댓글 자동화",
      "검색 상위 노출",
      "24시간 자동 운영"
    ],
    "screenshot": `${siteUrl}/og-image.png`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "applicationSubCategory": "Blog Automation",
    "softwareVersion": "5.0",
    "releaseNotes": "ChatGPT 5.0 지원, 성능 개선"
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
