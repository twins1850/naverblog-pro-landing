"use client"

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Card } from "@/components/ui/card"

// FAQ 데이터 - AEO 최적화를 위한 상세한 답변
const faqData = [
  {
    id: "what-is-blog-pro",
    question: "Blog Pro가 정확히 무엇인가요?",
    answer: "Blog Pro는 ChatGPT 4.0/5.0 기반 AI 기술을 활용한 완전 자동화 블로그 운영 시스템입니다. 글쓰기, 댓글, 서로이웃 신청, 대댓글까지 네이버 블로그 운영의 모든 과정을 자동화하여 24시간 무인으로 블로그를 관리할 수 있습니다. 기존의 단순한 API 호출 방식이 아닌 커스텀 GPT와 전문 프롬프트를 활용하여 평균 2,300자의 고품질 콘텐츠를 생성합니다."
  },
  {
    id: "how-different-from-competitors",
    question: "기존 블로그 자동화 프로그램과 어떻게 다른가요?",
    answer: "Blog Pro는 기존 프로그램들과 다음과 같은 차이점이 있습니다: 1) AI 기반 맞춤형 댓글 생성 (복붙 댓글 X), 2) 글 내용을 실제로 분석하여 정성스러운 댓글 작성, 3) 세계 최초 대댓글 자동화 기능, 4) 멀티계정 동시 관리, 5) SEO 최적화된 고품질 글쓰기. 답방률 300% 증가, 재방문율 300% 증가라는 실제 성과를 보여줍니다."
  },
  {
    id: "multi-account-management",
    question: "멀티계정 관리는 어떻게 작동하나요?",
    answer: "Blog Pro는 2-10개의 네이버 계정을 동시에 관리할 수 있습니다. 한 번의 설정으로 모든 계정에서 글쓰기, 댓글, 서로이웃, 대댓글 작업이 동시에 진행됩니다. 각 계정마다 다른 톤앤매너와 접근법을 사용하여 자연스러운 운영이 가능하며, 작업 시간은 50% 절약하고 노출은 2배 증대시킬 수 있습니다."
  },
  {
    id: "chatgpt-integration",
    question: "ChatGPT는 어떻게 활용되나요?",
    answer: "Blog Pro는 ChatGPT 4.0과 5.0을 모두 지원하며, 90초 딥씽킹 모드로 고품질 콘텐츠를 생성합니다. 단순한 API 호출이 아닌 커스텀 GPT 설정과 전문 지식 기반 프롬프트를 활용하여 99.9% 자연스러운 글을 작성합니다. SEO 키워드 자동 삽입, 다양한 글쓰기 스타일 지원, 30초 재시도 간격으로 안정적인 작업을 보장합니다."
  },
  {
    id: "reply-automation-feature",
    question: "대댓글 자동화는 어떤 기능인가요?",
    answer: "대댓글 자동화는 Blog Pro만의 세계 최초 독점 기능입니다. 내 블로그에 댓글이 달리면 AI가 자동으로 댓글 내용을 분석하여 적절한 대댓글을 생성하고 답변을 작성합니다. 이를 통해 블로그 내 소통이 활성화되고, 재방문율이 300% 증가하는 효과를 얻을 수 있습니다. 멀티계정에서도 각 계정별로 다른 스타일의 대댓글을 자동 관리합니다."
  },
  {
    id: "seo-optimization",
    question: "SEO 최적화는 어떻게 이루어지나요?",
    answer: "Blog Pro는 검색 알고리즘에 특화된 SEO 전략을 적용합니다: 1) 트렌딩 키워드 분석 및 자동 적용, 2) 메타태그 자동 최적화, 3) 검색 트렌드 기반 콘텐츠 생성, 4) 검색 상위 노출 전략 적용. 평균 2,300자의 고품질 콘텐츠와 함께 검색엔진이 선호하는 구조로 글을 작성하여 검색 상위권 진입을 보장합니다."
  },
  {
    id: "success-rate",
    question: "실제 성공률이 어떻게 되나요?",
    answer: "Blog Pro 사용자들의 평균 성과는 다음과 같습니다: 1) 사용자 만족도 98.5%, 2) 평균 답방률 312% 증가, 3) 평균 재방문율 285% 증가, 4) 평균 시간 절약 67%, 5) 글쓰기 성공률 99.9%. 실제 사용자들이 월 250만원 이상의 수익을 창출하는 사례들이 지속적으로 보고되고 있습니다."
  },
  {
    id: "pricing-and-license",
    question: "요금제와 라이선스는 어떻게 되나요?",
    answer: "Blog Pro는 월 10만원의 라이선스 방식으로 제공됩니다. 하드웨어 바인딩으로 라이선스 도용을 방지하며, 4개 모듈(글쓰기, 댓글, 서로이웃, 대댓글) 모두 포함된 가격입니다. 멀티계정 지원, 24/7 무인 자동 운영, 실시간 모니터링, 기술지원 등 모든 기능이 포함되어 있습니다."
  },
  {
    id: "safety-and-policy",
    question: "네이버 정책 위반 위험은 없나요?",
    answer: "Blog Pro는 네이버 블로그 정책을 준수하도록 설계되었습니다. AI가 생성하는 콘텐츠는 99.9% 자연스러워서 봇 감지 위험을 최소화하며, 각 계정마다 다른 접근법과 톤앤매너를 사용하여 자연스러운 운영이 가능합니다. 다만, 본 서비스는 네이버 공식 서비스가 아니므로 사용자가 네이버 이용약관을 준수하여 사용해야 하며, 자동화 사용으로 인한 계정 제재는 사용자 책임입니다."
  },
  {
    id: "technical-support",
    question: "기술 지원과 사용법 교육은 제공되나요?",
    answer: "네, Blog Pro는 포괄적인 지원을 제공합니다: 1) 24시간 기술지원 서비스, 2) 상세한 사용법 가이드와 튜토리얼, 3) 실시간 채팅 지원, 4) 이메일 지원 (jireh202503@gmail.com), 5) 전화 지원 (010-4248-1850). 또한 YouTube 채널과 각종 소셜미디어를 통해 지속적인 사용법 교육과 팁을 제공하고 있습니다."
  }
]

export default function FAQPage() {
  // FAQ Schema 구조화된 데이터 생성
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                자주 묻는 질문
                <span className="block text-gradient">FAQ</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Blog Pro에 대한 궁금한 점들을 상세히 답변드립니다.
                더 많은 질문이 있으시면 언제든지 문의해주세요.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqData.map((faq, index) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left py-6 hover:no-underline">
                      <span className="font-semibold text-lg pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="text-muted-foreground leading-relaxed text-base">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold mb-6">
                더 궁금한 점이 있으신가요?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                언제든지 문의해주세요. 빠르고 정확한 답변을 드리겠습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:jireh202503@gmail.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  이메일 문의
                </a>
                <a 
                  href="tel:010-4248-1850"
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  전화 문의
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  )
}