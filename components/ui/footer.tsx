"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github,
  Twitter,
  Youtube,
  MessageCircle
} from "lucide-react"
import { NewsletterSignup } from "@/components/ui/newsletter-signup"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navigation = {
    product: [
      { name: "기능", href: "#features" },
      { name: "요금제", href: "#pricing" },
      { name: "데모", href: "#demo" },
      { name: "대시보드", href: "/dashboard" },
    ],
    support: [
      { name: "도움말", href: "/help" },
      { name: "문의하기", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "커뮤니티", href: "/community" },
    ],
    company: [
      { name: "회사소개", href: "/about" },
      { name: "블로그", href: "/blog" },
      { name: "채용", href: "/careers" },
      { name: "파트너십", href: "/partners" },
    ],
    legal: [
      { name: "이용약관", href: "/terms" },
      { name: "개인정보처리방침", href: "/privacy" },
      { name: "라이선스", href: "/license" },
      { name: "환불정책", href: "/refund" },
    ],
  }

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/naverblog-auto",
      icon: <Github className="w-5 h-5" />
    },
    {
      name: "Twitter",
      href: "https://twitter.com/naverblog_auto",
      icon: <Twitter className="w-5 h-5" />
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@naverblog-auto",
      icon: <Youtube className="w-5 h-5" />
    },
    {
      name: "카카오톡",
      href: "https://open.kakao.com/o/naverblog-auto",
      icon: <MessageCircle className="w-5 h-5" />
    }
  ]

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "이메일",
      value: "jireh202503@gmail.com",
      href: "mailto:jireh202503@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "전화",
      value: "010-4248-1850",
      href: "tel:010-4248-1850"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "주소",
      value: "가락로26 702호",
      href: null
    }
  ]

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto">
        {/* 메인 푸터 콘텐츠 */}
        <div className="grid lg:grid-cols-5 gap-8 py-16">
          {/* 브랜드 섹션 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 로고 */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BP</span>
              </div>
              <span className="font-heading font-semibold text-lg">
                Blog Pro
              </span>
            </Link>

            {/* 설명 */}
            <p className="text-muted-foreground leading-relaxed max-w-md">
              AI 기반 완전 자동화 시스템으로 블로그를 운영하고 
              안정적인 수익을 창출하세요. 매일 24시간 당신의 블로그가 성장합니다.
            </p>

            {/* 연락처 정보 */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="text-brand-accent">
                    {item.icon}
                  </div>
                  {item.href ? (
                    <Link 
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* 소셜 링크 */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-brand-accent/10 transition-all duration-200"
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* 네비게이션 링크들 */}
          <div className="lg:col-span-3 grid md:grid-cols-4 gap-8">
            {/* 제품 */}
            <div>
              <h3 className="font-semibold mb-4">제품</h3>
              <ul className="space-y-3">
                {navigation.product.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 지원 */}
            <div>
              <h3 className="font-semibold mb-4">지원</h3>
              <ul className="space-y-3">
                {navigation.support.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 회사 */}
            <div>
              <h3 className="font-semibold mb-4">회사</h3>
              <ul className="space-y-3">
                {navigation.company.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 법적 */}
            <div>
              <h3 className="font-semibold mb-4">법적 고지</h3>
              <ul className="space-y-3">
                {navigation.legal.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 뉴스레터 섹션 */}
        <NewsletterSignup />

        {/* 하단 섹션 */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 저작권 */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} Blog Pro. All rights reserved.
            </div>

            {/* 부가 정보 */}
            <div className="flex items-center space-x-6">
              <div className="text-sm text-muted-foreground">
                사업자등록번호: 795-11-02437
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">테마:</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* 면책조항 */}
        <div className="border-t border-border py-4">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            본 서비스는 네이버 공식 서비스가 아니며, 네이버의 이용약관을 준수하여 사용해야 합니다. 
            자동화 사용으로 인한 계정 제재는 사용자 책임입니다. 
            서비스 이용 전 네이버 블로그 정책을 반드시 확인하시기 바랍니다.
          </p>
        </div>
      </div>
    </footer>
  )
}