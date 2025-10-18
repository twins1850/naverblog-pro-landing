"use client"

import * as React from "react"
import { useScrollAnimation } from "@/lib/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up" | "scale-in" | "fade-up-stagger"
  delay?: number
  duration?: number
  threshold?: number
  as?: keyof JSX.IntrinsicElements
}

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  as: Component = "div",
  className,
  ...props
}: AnimatedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold })

  const getAnimationClasses = (animationType: string, isVisible: boolean) => {
    const animations = {
      "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      "fade-in": isVisible ? "opacity-100" : "opacity-0", 
      "slide-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
      "slide-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
      "scale-up": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
      "scale-in": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
      "fade-up-stagger": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }
    
    return animations[animationType as keyof typeof animations] || animations["fade-up"]
  }

  return (
    <Component
      ref={elementRef as React.RefObject<HTMLElement>['current']}
      className={cn(
        "transition-all ease-out",
        getAnimationClasses(animation, isVisible),
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
      {...props}
    >
      {children}
    </Component>
  )
}

// 자식 요소들을 순차적으로 애니메이션하는 컨테이너
interface StaggerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  staggerDelay?: number
  threshold?: number
}

export function StaggerContainer({ 
  children, 
  staggerDelay = 100, 
  threshold = 0.1,
  className,
  ...props 
}: StaggerContainerProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold })

  return (
    <div
      ref={elementRef}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <div
          className={cn(
            "transition-all duration-600 ease-out",
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          )}
          style={{
            transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}