"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// 스피너 로딩
interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  return (
    <Loader2 className={cn("animate-spin", sizes[size], className)} />
  )
}

// 펄스 로딩 (스켈레톤)
interface PulseProps {
  className?: string
  children?: React.ReactNode
}

export function Pulse({ className, children }: PulseProps) {
  return (
    <div className={cn("animate-pulse bg-muted rounded", className)}>
      {children}
    </div>
  )
}

// 글리머 로딩 효과
interface GlimmerProps {
  className?: string
}

export function Glimmer({ className }: GlimmerProps) {
  return (
    <div className={cn("relative overflow-hidden bg-muted rounded", className)}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )
}

// 타이핑 애니메이션
interface TypingAnimationProps {
  text: string
  speed?: number
  className?: string
}

export function TypingAnimation({ text, speed = 50, className }: TypingAnimationProps) {
  const [displayText, setDisplayText] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-blink">|</span>
      )}
    </span>
  )
}

// 카운터 애니메이션
interface CounterAnimationProps {
  from: number
  to: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function CounterAnimation({ 
  from, 
  to, 
  duration = 1000, 
  className,
  prefix = "",
  suffix = ""
}: CounterAnimationProps) {
  const [count, setCount] = React.useState(from)

  React.useEffect(() => {
    const startTime = Date.now()
    const difference = to - from

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      setCount(Math.round(from + difference * easeOut))

      if (progress >= 1) {
        clearInterval(timer)
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [from, to, duration])

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// 프로그레스 바
interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showValue?: boolean
  animated?: boolean
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className, 
  showValue = false,
  animated = true 
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn("relative", className)}>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={cn(
            "h-2 bg-brand-accent rounded-full transition-all duration-500 ease-out",
            animated && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <span className="absolute right-0 top-3 text-xs text-muted-foreground">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}

// 도트 로딩
export function DotsLoading({ className }: { className?: string }) {
  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-brand-accent rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
}