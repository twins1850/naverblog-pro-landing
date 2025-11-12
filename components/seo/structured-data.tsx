"use client"

/**
 * 구조적 데이터 (JSON-LD) 컴포넌트
 * - FAQ 스키마
 * - 브레드크럼 스키마  
 * - 제품/서비스 스키마
 * - 조직 스키마
 */

interface FAQItem {
  question: string
  answer: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

interface ProductSchemaProps {
  name: string
  description: string
  price?: string
  currency?: string
  availability?: string
  rating?: {
    value: number
    count: number
    bestRating?: number
    worstRating?: number
  }
}

interface OrganizationSchemaProps {
  name: string
  url: string
  logo?: string
  description?: string
  email?: string
  phone?: string
  address?: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  socialLinks?: string[]
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": {
        "@type": "WebPage",
        "@id": item.url
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ProductSchema({ 
  name, 
  description, 
  price, 
  currency = "KRW", 
  availability = "InStock",
  rating 
}: ProductSchemaProps) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": "BloggingApplication",
    "operatingSystem": "Web Browser",
    "downloadUrl": "https://www.autotoolshub.com",
    "offers": {
      "@type": "Offer",
      "price": price || "0",
      "priceCurrency": currency,
      "availability": `https://schema.org/${availability}`
    },
    "author": {
      "@type": "Organization",
      "name": "AutoToolsHub"
    }
  }

  // 평점 정보가 있으면 추가
  if (rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": rating.value,
      "reviewCount": rating.count,
      "bestRating": rating.bestRating || 5,
      "worstRating": rating.worstRating || 1
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationSchema({
  name,
  url,
  logo,
  description,
  email,
  phone,
  address,
  socialLinks
}: OrganizationSchemaProps) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": url,
    "description": description
  }

  if (logo) {
    schema.logo = {
      "@type": "ImageObject",
      "url": logo
    }
  }

  if (email || phone) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      "contactType": "customer service"
    }
    if (email) schema.contactPoint.email = email
    if (phone) schema.contactPoint.telephone = phone
  }

  if (address) {
    schema.address = {
      "@type": "PostalAddress",
      "streetAddress": address.street,
      "addressLocality": address.city,
      "postalCode": address.postalCode,
      "addressCountry": address.country
    }
  }

  if (socialLinks && socialLinks.length > 0) {
    schema.sameAs = socialLinks
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// 메인 페이지용 종합 스키마
export function HomePageSchema() {
  const faqs: FAQItem[] = [
    {
      question: "Blog Pro는 다른 블로그 자동화 프로그램과 어떻게 다른가요?",
      answer: "Blog Pro는 단순한 API 호출이 아닌 커스텀 GPT 방식을 사용하여 평균 2,300자의 고품질 콘텐츠를 생성합니다. 또한 세계 최초로 대댓글 자동화 기능을 제공하며, 멀티계정 동시 관리가 가능합니다."
    },
    {
      question: "안전한가요? 계정 제재 위험은 없나요?",
      answer: "Blog Pro는 AI가 실제 글 내용을 분석하여 자연스러운 댓글과 메시지를 생성하므로 기계적 감지 위험이 현저히 낮습니다. 하지만 모든 자동화 도구 사용 시 네이버 정책을 준수해야 합니다."
    },
    {
      question: "얼마나 효과적인가요?",
      answer: "평균적으로 답방률 300% 증가, 재방문율 285% 증가, 시간 절약 67% 등의 성과를 보이고 있습니다. 98.5%의 사용자 만족도를 기록하고 있습니다."
    },
    {
      question: "기술 지원은 어떻게 받나요?",
      answer: "카카오톡, 이메일, 전화 등 다양한 방법으로 기술 지원을 제공합니다. 설치부터 사용법까지 전 과정을 상세히 안내해드립니다."
    },
    {
      question: "몇 개의 계정을 동시에 관리할 수 있나요?",
      answer: "Blog Pro는 2-10개의 계정을 동시에 관리할 수 있습니다. 각 계정별로 다른 톤앤매너와 접근법을 적용하여 개별화된 작업이 가능합니다."
    }
  ]

  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: "홈",
      url: "https://www.autotoolshub.com"
    }
  ]

  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbs} />
      <ProductSchema 
        name="Blog Pro"
        description="ChatGPT 4.0/5.0 기반 AI 완전 자동화 블로그 운영 시스템. 글쓰기, 댓글, 서로이웃, 대댓글까지 모든 것을 자동화하여 블로그 트래픽을 300% 증대시킵니다."
        rating={{
          value: 4.8,
          count: 150,
          bestRating: 5,
          worstRating: 1
        }}
      />
      <OrganizationSchema 
        name="AutoToolsHub"
        url="https://www.autotoolshub.com"
        logo="https://www.autotoolshub.com/NaverBlogPro -logo-main.png"
        description="AI 기반 블로그 자동화 솔루션을 제공하는 기업"
        email="jireh202503@gmail.com"
        phone="010-4248-1850"
        address={{
          street: "가락로26 702호",
          city: "서울",
          postalCode: "05844",
          country: "KR"
        }}
        socialLinks={[
          "https://github.com/naverblog-auto",
          "https://twitter.com/naverblog_auto", 
          "https://youtube.com/@naverblog-auto"
        ]}
      />
    </>
  )
}