"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Check, Star, Zap, Crown, Shield } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Pricing() {
  const [isAnnual, setIsAnnual] = React.useState(false)

  const plans = [
    {
      name: "베이직",
      description: "개인 블로거를 위한 기본 플랜",
      icon: <Zap className="w-6 h-6" />,
      price: {
        monthly: 29000,
        annual: 290000,
        originalAnnual: 348000
      },
      features: [
        "ChatGPT 4.0 기본 기능",
        "월 100개 포스팅 자동화",
        "기본 SEO 최적화",
        "이메일 지원",
        "1개 블로그 연동",
        "기본 템플릿 제공"
      ],
      limitations: [
        "ChatGPT 5.0 미지원",
        "고급 분석 기능 제한",
        "우선 지원 불가"
      ],
      popular: false,
      cta: "베이직으로 시작",
      color: "border-border"
    },
    {
      name: "프로",
      description: "전문 블로거 및 마케터를 위한 인기 플랜",
      icon: <Star className="w-6 h-6" />,
      price: {
        monthly: 59000,
        annual: 590000,
        originalAnnual: 708000
      },
      features: [
        "ChatGPT 4.0 & 5.0 전체 기능",
        "월 500개 포스팅 자동화",
        "고급 SEO 최적화 및 키워드 분석",
        "우선 이메일 지원",
        "최대 3개 블로그 연동",
        "프리미엄 템플릿 무제한",
        "실시간 트래픽 분석",
        "자동 스케줄링 고급 설정"
      ],
      limitations: [],
      popular: true,
      cta: "프로로 업그레이드",
      color: "border-brand-accent shadow-brand"
    },
    {
      name: "엔터프라이즈",
      description: "기업 및 에이전시를 위한 최고급 플랜",
      icon: <Crown className="w-6 h-6" />,
      price: {
        monthly: 99000,
        annual: 990000,
        originalAnnual: 1188000
      },
      features: [
        "ChatGPT 4.0 & 5.0 + 최신 모델 우선 지원",
        "무제한 포스팅 자동화",
        "AI 기반 맞춤형 SEO 전략",
        "24/7 전화 및 실시간 채팅 지원",
        "무제한 블로그 연동",
        "커스텀 템플릿 제작 서비스",
        "고급 분석 및 리포팅",
        "API 접근 권한",
        "전담 계정 매니저",
        "맞춤형 교육 및 컨설팅"
      ],
      limitations: [],
      popular: false,
      cta: "엔터프라이즈 문의",
      color: "border-warning"
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  const calculateSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.price.monthly * 12
    const savings = monthlyCost - plan.price.annual
    const percentage = Math.round((savings / monthlyCost) * 100)
    return { amount: savings, percentage }
  }

  return (
    <section id="pricing" className="section">
      <div className="container mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium mb-4">
            💰 투명한 요금제
          </div>
          
          <h2 className="text-headline font-bold mb-4">
            블로그 수익에 <span className="text-gradient">투자하세요</span>
          </h2>
          
          <p className="text-body-large text-muted-foreground mb-8">
            첫 달부터 투자 대비 10배 이상의 수익을 경험할 수 있습니다.
            무료 체험으로 부담없이 시작하세요.
          </p>

          {/* 월/연 토글 */}
          <div className="inline-flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                !isAnnual 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              월간 결제
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all relative",
                isAnnual 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              연간 결제
              <span className="absolute -top-2 -right-2 bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                17% 절약
              </span>
            </button>
          </div>
        </div>

        {/* 요금제 카드들 */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const savings = calculateSavings(plan)
            
            return (
              <div 
                key={index}
                className={cn(
                  "relative bg-card rounded-2xl p-8 border-2 transition-all duration-300 hover:-translate-y-1 scroll-reveal",
                  plan.popular 
                    ? "border-brand-accent shadow-brand scale-105" 
                    : plan.color,
                  "hover:shadow-xl"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* 인기 배지 */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-brand-accent text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>가장 인기</span>
                    </div>
                  </div>
                )}

                {/* 플랜 헤더 */}
                <div className="text-center mb-8">
                  <div className={cn(
                    "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
                    plan.popular 
                      ? "bg-brand-accent text-white" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {plan.icon}
                  </div>
                  
                  <h3 className="text-title font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                {/* 가격 */}
                <div className="text-center mb-8">
                  <div className="mb-2">
                    <span className="text-4xl font-bold">
                      ₩{formatPrice(isAnnual ? Math.floor(plan.price.annual / 12) : plan.price.monthly)}
                    </span>
                    <span className="text-muted-foreground">
                      /{isAnnual ? '월' : '월'}
                    </span>
                  </div>
                  
                  {isAnnual && (
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground line-through">
                        연 ₩{formatPrice(plan.price.originalAnnual)}
                      </div>
                      <div className="text-sm text-success font-medium">
                        연 ₩{formatPrice(savings.amount)} 절약 ({savings.percentage}% 할인)
                      </div>
                    </div>
                  )}
                </div>

                {/* 기능 목록 */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold flex items-center">
                    <Check className="w-4 h-4 text-success mr-2" />
                    포함된 기능
                  </h4>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-semibold text-muted-foreground mb-3">제한사항</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <div className="w-4 h-4 border border-muted-foreground rounded-full mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* CTA 버튼 */}
                <Button 
                  variant={plan.popular ? "brand" : "outline"}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link href={plan.name === "엔터프라이즈" ? "#contact" : "/purchase"}>
                    {plan.cta}
                  </Link>
                </Button>

                {/* 무료 체험 안내 */}
                {index < 2 && (
                  <div className="text-center mt-4">
                    <p className="text-xs text-muted-foreground">
                      💳 신용카드 정보 없이 7일 무료 체험
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* 추가 정보 */}
        <div className="grid md:grid-cols-3 gap-8 scroll-reveal">
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <Shield className="w-8 h-8 text-brand-accent mx-auto mb-4" />
            <h3 className="font-semibold mb-2">100% 안전 결제</h3>
            <p className="text-sm text-muted-foreground">
              SSL 암호화 및 PCI DSS 인증으로 안전한 결제를 보장합니다.
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <Zap className="w-8 h-8 text-success mx-auto mb-4" />
            <h3 className="font-semibold mb-2">즉시 활성화</h3>
            <p className="text-sm text-muted-foreground">
              결제 완료 즉시 모든 기능을 사용할 수 있습니다.
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <Crown className="w-8 h-8 text-warning mx-auto mb-4" />
            <h3 className="font-semibold mb-2">30일 환불 보장</h3>
            <p className="text-sm text-muted-foreground">
              만족하지 않으시면 30일 내 100% 환불해드립니다.
            </p>
          </div>
        </div>

        {/* FAQ 섹션 */}
        <div className="mt-20 text-center scroll-reveal">
          <h3 className="text-title font-semibold mb-8">
            자주 묻는 질문이 있으신가요?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="font-semibold mb-2">무료 체험 기간은 얼마나 되나요?</h4>
              <p className="text-sm text-muted-foreground">
                베이직과 프로 플랜은 7일간 무료로 체험할 수 있습니다. 신용카드 등록 없이 시작할 수 있어요.
              </p>
            </div>
            
            <div className="text-left">
              <h4 className="font-semibold mb-2">언제든지 플랜을 변경할 수 있나요?</h4>
              <p className="text-sm text-muted-foreground">
                네, 언제든지 상위 플랜으로 업그레이드하거나 하위 플랜으로 다운그레이드할 수 있습니다.
              </p>
            </div>
            
            <div className="text-left">
              <h4 className="font-semibold mb-2">환불 정책은 어떻게 되나요?</h4>
              <p className="text-sm text-muted-foreground">
                30일 내에 만족하지 않으시면 100% 환불해드립니다. 별도의 수수료는 없습니다.
              </p>
            </div>
            
            <div className="text-left">
              <h4 className="font-semibold mb-2">기술 지원은 어떻게 받을 수 있나요?</h4>
              <p className="text-sm text-muted-foreground">
                이메일, 채팅(프로 이상), 전화(엔터프라이즈) 지원을 제공합니다. 평균 응답 시간은 4시간 이내입니다.
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link href="#contact">
                더 많은 질문이 있으신가요? 문의하기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}