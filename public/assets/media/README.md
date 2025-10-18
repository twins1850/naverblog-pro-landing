# Media Assets for Blog Pro Landing Page

## 📁 Folder Structure

### `/screenshots/`
실제 프로그램 GUI 스크린샷들
- `dashboard-main.png` - 메인 대시보드 화면
- `multi-account.png` - 멀티계정 관리 화면
- `progress-monitor.png` - 실시간 작업 진행 상황
- `module-settings.png` - 4개 모듈 설정 화면
- `writing-module.png` - 글쓰기 모듈 화면
- `comment-module.png` - 댓글 모듈 화면
- `neighbor-module.png` - 서로이웃 모듈 화면
- `reply-module.png` - 대댓글 모듈 화면

### `/videos/`
데모 영상들
- `demo-overview.mp4` - 전체 프로그램 데모
- `multi-account-demo.mp4` - 멀티계정 작업 데모
- `module-demo.mp4` - 4개 모듈 작동 데모

## 📊 파일 최적화 가이드

### 스크린샷
- 포맷: WebP (최적화) 또는 PNG (고화질)
- 해상도: 1920x1080 또는 그 비율 유지
- 파일크기: 500KB 이하 권장

### 비디오
- 포맷: MP4 (H.264 코덱)
- 해상도: 1920x1080 (Full HD)
- 길이: 30초-2분 권장
- 파일크기: 10MB 이하 권장

## 🔗 사용 방법

파일 업로드 후 컴포넌트에서 다음과 같이 사용:
```jsx
// 스크린샷
<Image src="/assets/media/screenshots/dashboard-main.png" alt="대시보드" />

// 비디오
<video src="/assets/media/videos/demo-overview.mp4" controls />
```