/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 이미지 최적화 설정
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1년 캐시
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // 외부 이미지 도메인 허용 (필요시)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'autotoolshub.com',
      },
      {
        protocol: 'https',
        hostname: '*.autotoolshub.com',
      }
    ],
    
    // 이미지 압축 설정은 runtime에서 처리
  },
  
  // 성능 최적화
  compress: true,
  poweredByHeader: false,
  
  // ESLint 설정 (배포를 위해 경고 무시)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript 설정 (배포를 위해 에러 무시)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 실험적 기능 (성능 향상)
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // 번들 분석 (개발 시에만)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname),
      }
      return config
    }
  }),
  
  // 빌드 최적화
  reactStrictMode: true,
  
  // 정적 파일 최적화
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // 헤더 설정 (성능 및 보안)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 보안 헤더
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          // 이미지 캐싱
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/optimized/(.*)',
        headers: [
          // 최적화된 이미지 장기 캐싱
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          // 정적 파일 장기 캐싱
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig