"use client"

import * as React from "react"
import { Header } from "@/components/ui/header"
import { Hero } from "@/components/ui/hero" 
import { CompetitorPainPoints } from "@/components/ui/competitor-pain-points"
import { ProblemSolution } from "@/components/ui/problem-solution"
import { ModuleFeatures } from "@/components/ui/module-features"
import { RealScreenshots } from "@/components/ui/real-screenshots"
import { CustomerReviews } from "@/components/ui/customer-reviews"
import { Features } from "@/components/ui/features"
import { Footer } from "@/components/ui/footer"
import { PriceCalculator } from "@/components/ui/price-calculator"

export default function LandingPage() {
  const [showPriceCalculator, setShowPriceCalculator] = React.useState(false)

  const handlePurchaseClick = () => {
    // 가격 계산기 페이지로 리다이렉트
    window.location.href = '/payment-info'
  }

  const handleClosePriceCalculator = () => {
    setShowPriceCalculator(false)
  }

  const handlePurchase = (selectedModules: string[], totalPrice: number) => {
    // Here you would integrate with your payment system
    console.log('Purchase request:', { selectedModules, totalPrice })
    
    // For now, redirect to a payment page or show success message
    alert(`구매 요청: 선택된 모듈 ${selectedModules.length}개, 총 가격: ₩${totalPrice.toLocaleString()}`)
    setShowPriceCalculator(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onPurchaseClick={handlePurchaseClick} />
      <Hero onPurchaseClick={handlePurchaseClick} />
      <CompetitorPainPoints />
      <ProblemSolution />
      <ModuleFeatures onPurchaseClick={handlePurchaseClick} />
      <RealScreenshots />
      <CustomerReviews />
      <Features onPurchaseClick={handlePurchaseClick} />
      <Footer />
      
      {showPriceCalculator && (
        <PriceCalculator 
          onClose={handleClosePriceCalculator}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  )
}