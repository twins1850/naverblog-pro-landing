# 🎥 Videos Folder Structure

## 📁 폴더 구조

### `/hero/` - 메인 히어로 영상 (직접 호스팅)
랜딩페이지 상단의 핵심 어필 영상
```
├── main-demo.mp4              # 메인 제품 데모 (30-60초)
├── main-demo-mobile.mp4       # 모바일 최적화 버전
├── main-demo-poster.webp      # 영상 썸네일 이미지
└── quick-results.mp4          # 빠른 성과 어필 영상
```

### `/demos/` - 기능별 데모 영상 파일 (백업용)
유튜브 업로드 전 원본 보관 또는 경량화 버전
```
├── blog-writing-demo.mp4      # 글쓰기 모듈 데모
├── comment-automation-demo.mp4 # 댓글 자동화 데모  
├── neighbor-automation-demo.mp4 # 서로이웃 자동화 데모
├── reply-automation-demo.mp4   # 대댓글 자동화 데모
└── dashboard-overview-demo.mp4 # 대시보드 전체 데모
```

## 🎬 영상 스펙 가이드

### 메인 히어로 영상 (직접 호스팅)
```yaml
목적: 즉시 임팩트, 페이지 이탈 방지
포맷: MP4 (H.264 코덱)
해상도: 1920x1080 (데스크톱), 1280x720 (모바일)
길이: 30-60초
파일크기: 3-8MB (max 10MB)
비트레이트: 2-3 Mbps
프레임레이트: 30fps
오디오: AAC 128kbps (auto-play용은 음소거)
```

### 기능별 데모 영상 (유튜브 + 백업)
```yaml
목적: 상세 설명, 신뢰성 구축
포맷: MP4 (H.264 코덱)
해상도: 1920x1080 (Full HD)
길이: 1-3분
파일크기: 제한 없음 (유튜브 업로드용)
비트레이트: 5-8 Mbps
프레임레이트: 30fps 또는 60fps
오디오: AAC 256kbps (고품질)
```

## 📺 유튜브 설정 가이드

### 업로드 최적화
- **제목**: "Blog Pro - [기능명] 실제 작동 영상"
- **설명**: 상세한 기능 설명 + 웹사이트 링크
- **태그**: 블로그자동화, AI글쓰기, ChatGPT, 부업 등
- **썸네일**: 고품질 커스텀 이미지
- **카테고리**: 과학 기술

### 보안 설정
- **공개 범위**: 공개 또는 제한 없는 링크
- **댓글**: 승인 후 게시
- **임베드**: 허용
- **관련 영상**: 비활성화 (가능한 경우)

## 🎯 구현 전략

### Phase 1: 메인 히어로 영상
1. **30초 핵심 데모 제작**
   - 4개 모듈 빠른 소개
   - 실제 수익 화면
   - 자동화 과정 타임랩스

2. **최적화 및 압축**
   - FFmpeg 사용 권장
   - 여러 해상도 버전 생성
   - 썸네일 이미지 추출

### Phase 2: 유튜브 채널 구축
1. **브랜드 채널 생성**
   - Blog Pro 전용 채널
   - 브랜드 아이덴티티 적용
   - 채널 아트 및 소개 설정

2. **기능별 영상 업로드**
   - 플레이리스트 구성
   - SEO 최적화 설정
   - 웹사이트 연동

## 🔧 기술 구현

### 직접 호스팅 비디오 컴포넌트
```jsx
<VideoPlayer
  src="/assets/media/videos/hero/main-demo.mp4"
  poster="/assets/media/videos/hero/main-demo-poster.webp"
  autoPlay
  muted
  loop
  className="hero-video"
/>
```

### 유튜브 임베드 컴포넌트  
```jsx
<YouTubeEmbed
  videoId="YOUR_VIDEO_ID"
  title="Blog Pro 기능 데모"
  autoplay={false}
  controls={true}
  modestbranding={true}
/>
```

## 📊 성능 모니터링

### 추적 지표
- 영상 재생률 (View Rate)
- 완료율 (Completion Rate)  
- 클릭률 (Click-through Rate)
- 페이지 이탈률 (Bounce Rate)
- 로딩 속도 (Loading Time)

### 최적화 체크리스트
- [ ] 파일 크기 최적화
- [ ] 다중 해상도 지원
- [ ] Lazy loading 구현
- [ ] 프리로딩 최적화
- [ ] 모바일 반응형 확인

---

**🎬 준비 완료!** 
영상 파일을 해당 폴더에 업로드하시면 컴포넌트 구현을 진행하겠습니다.