# 📸 Screenshots Folder Structure

## 📁 폴더 구조

### `/our-product/` - 우리 제품 결과물
우리 Blog Pro의 실제 작업 결과물 스크린샷
```
├── blog-post-quality.webp          # ChatGPT 5.0 기반 고품질 글
├── comment-automation-result.webp   # 자연스러운 댓글 자동화
├── neighbor-automation-result.webp  # 서로이웃 자동화 성과
├── reply-automation-result.webp     # 대댓글 자동화 품질
├── seo-optimization-result.webp     # SEO 최적화 결과
├── dashboard-analytics.webp         # 성과 분석 대시보드
├── revenue-dashboard.webp           # 실시간 수익 현황
└── multi-account-management.webp    # 멀티계정 관리 화면
```

### `/competitor-comparison/` - 경쟁사 비교
타사 제품의 문제점과 우리의 우위점 비교
```
├── competitor-blog-quality.webp     # 타사 AI 글쓰기 품질 (낮음)
├── competitor-comment-fail.webp     # 타사 부자연스러운 댓글
├── competitor-seo-issues.webp       # 타사 SEO 최적화 부족
├── competitor-ui-complexity.webp    # 타사 복잡한 UI
└── quality-comparison-grid.webp     # 품질 비교 그리드
```

### `/results/` - 성과 증명 자료
실제 사용자들의 성과 데이터와 차트
```
├── revenue-growth-chart.webp        # 월별 수익 증가 차트
├── traffic-growth-chart.webp        # 방문자 증가 추이
├── search-ranking-improvement.webp  # 검색 순위 상승 그래프
├── engagement-metrics.webp          # 참여도 지표 개선
├── roi-calculation.webp             # ROI 계산 결과
└── success-timeline.webp            # 성공 타임라인
```

### `/before-after/` - 사용 전후 비교
사용 전과 후의 극명한 차이점 시각화
```
├── blog-traffic-before-after.webp   # 트래픽 변화
├── revenue-before-after.webp        # 수익 변화
├── search-ranking-before-after.webp # 검색순위 변화
├── content-quality-before-after.webp # 콘텐츠 품질 변화
└── overall-performance-comparison.webp # 전체 성과 비교
```

## 📊 파일 최적화 가이드

### 권장 스펙
- **포맷**: WebP (최적 압축)
- **해상도**: 1920x1080 (16:9) 또는 1600x900
- **파일크기**: 300-500KB 이하
- **화질**: 85-90% 압축률

### 캡처 가이드라인
- ✅ 깔끔한 배경 설정
- ✅ 핵심 수치/결과 명확히 표시
- ✅ 개인정보 모자이크 처리
- ✅ 타사 브랜드명 가림 처리
- ✅ 일관된 UI 테마 사용

### 품질 체크리스트
- [ ] 해상도 적절한가?
- [ ] 텍스트가 선명하게 읽히는가?
- [ ] 핵심 내용이 돋보이는가?
- [ ] 파일 크기가 적절한가?
- [ ] 개인정보가 보호되었는가?

## 🎯 사용 방법

업로드 완료 후 컴포넌트에서 다음과 같이 사용:

```jsx
// 우리 제품 결과물
<Image 
  src="/assets/media/screenshots/our-product/blog-post-quality.webp" 
  alt="ChatGPT 5.0 기반 고품질 블로그 글" 
/>

// 비교 슬라이더
<ComparisonSlider 
  before="/assets/media/screenshots/competitor-comparison/competitor-blog-quality.webp"
  after="/assets/media/screenshots/our-product/blog-post-quality.webp"
  title="글쓰기 품질 비교"
/>

// 성과 차트
<ResultChart 
  src="/assets/media/screenshots/results/revenue-growth-chart.webp"
  title="월별 수익 증가"
/>
```

## 📝 업로드 체크리스트

### 우리 제품 (필수)
- [ ] blog-post-quality.webp - AI 글쓰기 품질
- [ ] comment-automation-result.webp - 댓글 자동화
- [ ] seo-optimization-result.webp - SEO 최적화
- [ ] dashboard-analytics.webp - 성과 대시보드

### 경쟁사 비교 (권장)
- [ ] competitor-blog-quality.webp - 타사 글품질
- [ ] quality-comparison-grid.webp - 비교표

### 성과 자료 (필수)
- [ ] revenue-growth-chart.webp - 수익 증가
- [ ] traffic-growth-chart.webp - 트래픽 증가

---

**📁 폴더 준비 완료!** 
이제 위 구조에 맞춰 스크린샷을 업로드해주세요.