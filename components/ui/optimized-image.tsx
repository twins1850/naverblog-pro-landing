"use client"

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  fill?: boolean
  placeholder?: "blur" | "empty" | undefined
  blurDataURL?: string
  loading?: "lazy" | "eager" | undefined
}

/**
 * LCP 최적화된 이미지 컴포넌트
 * - 자동 WebP/AVIF 변환
 * - 지연 로딩 최적화
 * - 반응형 이미지 지원
 * - 로딩 상태 처리
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 80,
  sizes,
  fill = false,
  placeholder = "empty",
  blurDataURL,
  loading = "lazy",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // LCP 중요 이미지인지 확인 (히어로 섹션, above-fold)
  const isLCPCandidate = priority || loading === "eager"

  return (
    <div className={cn("relative", className)}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "duration-700 ease-in-out",
            isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
            error ? "bg-gray-200" : ""
          )}
          quality={quality}
          priority={isLCPCandidate}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoadingComplete={() => setLoading(false)}
          onError={() => {
            setError(true)
            setLoading(false)
          }}
          {...props}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "duration-700 ease-in-out",
            isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
            error ? "bg-gray-200" : ""
          )}
          quality={quality}
          priority={isLCPCandidate}
          loading={loading}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoadingComplete={() => setLoading(false)}
          onError={() => {
            setError(true)
            setLoading(false)
          }}
          {...props}
        />
      )}
      
      {/* 로딩 스케leton */}
      {isLoading && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      {/* 에러 플레이스홀더 */}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded">
          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  )
}

/**
 * 히어로 섹션용 우선순위 이미지
 * LCP 최적화를 위한 즉시 로딩
 */
export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      loading="eager"
      quality={85}
      placeholder="blur"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
    />
  )
}

/**
 * Above-the-fold 이미지
 * 빠른 로딩이 필요한 상단 이미지용
 */
export function AboveFoldImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      loading="eager"
      quality={80}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}

/**
 * Below-the-fold 이미지
 * 지연 로딩 최적화된 일반 이미지용
 */
export function LazyImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority={false}
      loading="lazy"
      quality={75}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkJyucAcThR1A4z8U1JEBAkJOuT1qS1lfHB4YmEgkibR/Eb5/VLFRaKIgEzQUINj"
    />
  )
}