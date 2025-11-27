import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { WebVitals } from "@/components/analytics/web-vitals";
import { SEOMonitoring } from "@/components/analytics/seo-monitoring";
import { HomePageSchema } from "@/components/seo/structured-data";
import Script from "next/script";
import "@/styles/globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.autotoolshub.com'

export const metadata: Metadata = {
  title: {
    default: "블로그자동화 프로그램 | Blog Pro - AI댓글자동화, 서로이웃자동화",
    template: "%s | Blog Pro"
  },
  description: "네이버블로그자동화 전문 프로그램. ChatGPT 기반 AI댓글자동화, 서로이웃자동화, 세계최초 대댓글자동화로 월수익 창출. 무료체험 가능.",
  keywords: [
    "블로그자동화",
    "블로그자동화프로그램",
    "네이버블로그자동화",
    "블로그AI자동화",
    "블로그AI자동화프로그램",
    "댓글자동화",
    "AI댓글자동화",
    "서로이웃자동화",
    "AI서로이웃자동화",
    "대댓글자동화",
    "AI대댓글자동화",
    "블로그 수익화",
    "자동 포스팅",
    "네이버 블로그",
    "ChatGPT 블로그"
  ],
  authors: [{ name: "Blog Pro" }],
  creator: "Blog Pro",
  publisher: "Blog Pro",
  metadataBase: new URL(siteUrl),
  
  // Canonical URL
  alternates: {
    canonical: siteUrl
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    siteName: "Blog Pro",
    title: "블로그자동화 프로그램 | Blog Pro - AI댓글자동화, 서로이웃자동화",
    description: "네이버블로그자동화 전문 프로그램. ChatGPT 기반 AI댓글자동화, 서로이웃자동화, 세계최초 대댓글자동화로 월수익 창출. 무료체험 가능.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "BlogPro - AI 4모듈 자동화 시스템 (글쓰기, 댓글, 대댓글, 서로이웃)",
        type: "image/webp"
      }
    ],
    locale: "ko_KR"
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@blogpro_auto",
    creator: "@blogpro_auto",
    title: "블로그자동화 프로그램 | Blog Pro - AI댓글자동화",
    description: "네이버블로그자동화 전문 프로그램. AI댓글자동화, 서로이웃자동화, 대댓글자동화로 월수익 창출.",
    images: [`${siteUrl}/og-image.webp`]
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
    google: '52HUzxYTz8HntzWHHGmO0TPdq9vyCb3RC4EOeYpvdyc',
    yandex: 'fde8012ad5530527',
    other: {
      'naver-site-verification': '2e9b03b0400033f451f75640c5de4a53b651ce82',
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
  // 여러 Schema 데이터
  const softwareSchema = {
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Blog Pro",
    "url": siteUrl,
    "logo": `${siteUrl}/icon-512.png`,
    "description": "AI 기반 완전 자동화 시스템으로 블로그를 운영하고 안정적인 수익을 창출하는 솔루션을 제공합니다.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+82-10-4248-1850",
      "contactType": "customer service",
      "email": "jireh202503@gmail.com",
      "availableLanguage": ["Korean"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KR",
      "addressRegion": "서울",
      "streetAddress": "가락로26 702호"
    },
    "sameAs": [
      "https://github.com/naverblog-auto",
      "https://twitter.com/naverblog_auto", 
      "https://youtube.com/@naverblog-auto",
      "https://open.kakao.com/o/naverblog-auto"
    ],
    "taxID": "795-11-02437"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "블로그자동화 프로그램이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "블로그자동화는 AI 기술을 활용해 블로그 포스팅, 댓글, 서로이웃 관리를 완전 자동화하는 시스템입니다. Blog Pro는 ChatGPT 기반 AI댓글자동화, AI서로이웃자동화, 세계최초 AI대댓글자동화를 제공합니다."
        }
      },
      {
        "@type": "Question",
        "name": "네이버블로그자동화와 다른 블로그자동화의 차이점은?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네이버블로그자동화는 네이버 블로그 플랫폼에 특화된 자동화 시스템입니다. 네이버의 알고리즘과 정책에 최적화되어 있어 검색 노출과 트래픽 증가에 더욱 효과적입니다."
        }
      },
      {
        "@type": "Question",
        "name": "AI댓글자동화가 기존 댓글자동화와 다른 점은?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "기존 댓글자동화는 복붙식 고정 멘트를 사용하지만, AI댓글자동화는 Gemini AI가 글 내용을 실제 분석하여 개인화된 정성스러운 댓글을 생성합니다. 답방률이 300% 향상됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "AI대댓글자동화는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI대댓글자동화는 Blog Pro의 세계최초 독점 기능으로, 내 블로그에 달린 댓글에 AI가 자동으로 답변을 생성하여 대댓글을 달아주는 시스템입니다. 재방문율이 300% 증가합니다."
        }
      },
      {
        "@type": "Question",
        "name": "블로그AI자동화 프로그램은 안전한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Blog Pro는 네이버 정책을 준수하며 자연스러운 활동 패턴을 모방합니다. 99.9% 자연스러운 글쓰기와 개인화된 소통으로 봇 감지 위험을 최소화합니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "네이버블로그자동화 설정 방법",
    "description": "Blog Pro를 활용한 네이버블로그자동화 완벽 설정 가이드",
    "image": `${siteUrl}/og-image.webp`,
    "totalTime": "PT30M",
    "estimatedCost": "0",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Blog Pro 프로그램 다운로드",
        "text": "공식 웹사이트에서 Blog Pro 블로그자동화 프로그램을 다운로드하고 설치합니다."
      },
      {
        "@type": "HowToStep", 
        "name": "네이버 계정 연동",
        "text": "네이버블로그자동화를 위해 네이버 계정을 프로그램에 안전하게 연동합니다."
      },
      {
        "@type": "HowToStep",
        "name": "AI댓글자동화 설정",
        "text": "AI댓글자동화 기능을 활성화하고 댓글 스타일과 빈도를 설정합니다."
      }
    ]
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="yandex-verification" content="fde8012ad5530527" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M9FF22PQ');
            `,
          }}
        />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QN3V4ZH4HL"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QN3V4ZH4HL');
            `,
          }}
        />
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-M9FF22PQ"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
