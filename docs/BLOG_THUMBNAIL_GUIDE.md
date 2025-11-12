# 블로그 썸네일 제작 가이드

## 📐 기본 규격
- **크기**: 320 x 192 픽셀 (16:10 비율)
- **형식**: SVG (벡터 형식으로 확대/축소 시 깨지지 않음)
- **파일 위치**: `/public/images/blog/thumbnails/{post-id}.svg`

## 🎨 디자인 원칙

### 1. 시각적 일관성
- **배경**: 그라디언트 (blue to purple)
- **메인 카드**: 흰색 반투명 배경 (rgba(255,255,255,0.95))
- **모서리**: 둥근 모서리 (border-radius: 12px)
- **여백**: 양쪽 20px, 상하 20px

### 2. 색상 팔레트
```css
Primary Colors:
- Blue: #1e40af
- Purple: #7c3aed
- White: #ffffff

Brand Colors:
- Naver Green: #03c75a
- Red Badge: #dc2626
- Orange: #f59e0b
- Red: #ef4444
- Purple: #8b5cf6
- Green: #10b981
- Blue: #3b82f6

Text Colors:
- Title: #1e293b
- Subtitle: #475569  
- Description: #64748b
```

### 3. 레이아웃 구조
```
┌─────────────────────────────────────┐
│  [로고]              [배지]        │
│                                     │
│  [아이콘들]                        │
│                                     │
│  제목                              │
│  부제목                            │
│  설명                              │
└─────────────────────────────────────┘
```

## 📝 템플릿

### 기본 SVG 구조
```svg
<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
  <!-- Background Gradient -->
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="320" height="192" fill="url(#bgGrad)"/>
  <rect width="320" height="192" fill="rgba(0,0,0,0.3)"/>
  
  <!-- Main Content Card -->
  <rect x="20" y="20" width="280" height="152" rx="12" fill="rgba(255,255,255,0.95)"/>
  
  <!-- 브랜드 로고 (좌상단) -->
  <rect x="40" y="40" width="40" height="40" rx="6" fill="#03c75a"/>
  <text x="60" y="66" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">N</text>
  
  <!-- 배지 (우상단) -->
  <circle cx="260" cy="60" r="20" fill="#dc2626"/>
  <text x="260" y="58" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" font-weight="bold">TOP</text>
  <text x="260" y="68" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">5</text>
  
  <!-- 제목 및 설명 -->
  <text x="40" y="110" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1e293b">메인 제목</text>
  <text x="40" y="130" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#475569">부제목</text>
  <text x="40" y="150" font-family="Arial, sans-serif" font-size="12" fill="#64748b">설명 텍스트</text>
  
  <!-- 아이콘들 (필요시) -->
  <rect x="100" y="40" width="12" height="12" rx="2" fill="#f59e0b"/>
  <!-- 추가 아이콘들... -->
</svg>
```

## 🎯 콘텐츠별 특화 가이드

### 1. 프로그램 비교/리뷰
- **메인 로고**: 관련 플랫폼 로고 (N for Naver)
- **배지**: TOP X, NEW, 2024 등
- **아이콘**: 5개의 컬러 박스 (각기 다른 프로그램 표현)
- **제목**: "플랫폼 + 프로그램 + 추천"

### 2. 사용법/가이드  
- **메인 로고**: 도구/기능 아이콘
- **배지**: GUIDE, HOW-TO
- **아이콘**: 단계별 프로세스 표현
- **제목**: "기능명 + 사용법/가이드"

### 3. 전략/팁
- **메인 로고**: 전략 관련 아이콘
- **배지**: TIPS, 전략
- **아이콘**: 결과/성과 지표
- **제목**: "목표 + 전략/방법"

### 4. 뉴스/업데이트
- **메인 로고**: 관련 브랜드 로고
- **배지**: NEW, 2024, UPDATE
- **아이콘**: 변경사항 표시
- **제목**: "제품명 + 업데이트/뉴스"

## 🚀 블로그 포스트 생성 체크리스트

### ✅ 콘텐츠 작성
- [ ] 타겟 키워드 선정 (SEO 최적화)
- [ ] 2,000+ 글자 고품질 콘텐츠
- [ ] 실제 사례/후기 포함
- [ ] CTA(Call-to-Action) 적절히 배치

### ✅ 메타데이터 설정  
- [ ] SEO 타이틀 (60자 이내)
- [ ] 메타 설명 (160자 이내)
- [ ] 키워드 배열 (5-10개)
- [ ] OpenGraph/Twitter 카드

### ✅ 썸네일 제작
- [ ] 320x192 픽셀 SVG 파일
- [ ] 브랜드 가이드라인 준수
- [ ] 관련 아이콘/로고 포함
- [ ] 명확한 제목/설명 표시
- [ ] 파일명: {post-id}.svg

### ✅ 블로그 목록 업데이트
- [ ] `/app/blog/page.tsx`의 `featuredPosts` 배열에 추가
- [ ] 최신 포스트를 배열 최상단에 배치
- [ ] 카테고리 업데이트 (필요시)
- [ ] 발행일/읽기시간 설정

### ✅ 배포 및 확인
- [ ] Git commit 및 push
- [ ] Vercel 자동 배포 대기
- [ ] 개별 포스트 페이지 접근 확인
- [ ] 블로그 목록에서 썸네일 표시 확인
- [ ] SEO 메타데이터 정상 작동 확인

## 📚 기존 썸네일 참고
- `chatgpt-automation.svg` - ChatGPT 자동화 가이드
- `comment-automation.svg` - 댓글 자동화 시스템  
- `multi-account-management.svg` - 멀티 계정 관리
- `neighbor-automation.svg` - 서로이웃 자동화
- `reply-automation-exclusive.svg` - 대댓글 자동화
- `blog-monetization.svg` - 블로그 수익화 전략
- `naver-upload-programs.svg` - 네이버 업로드 프로그램 비교

---

**💡 핵심 포인트**: 썸네일은 블로그 포스트의 첫인상이므로, 내용을 명확히 전달하면서도 시각적으로 매력적이어야 합니다. 일관된 디자인 시스템을 유지하여 브랜드 아이덴티티를 강화하세요.