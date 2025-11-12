# GTM/GA 배포 문제 해결 보고서

## 📋 문제 요약

**발생 일시**: 2025-01-10  
**문제**: Google Tag Manager (GTM-M9FF22PQ)와 Google Analytics (G-QN3V4ZH4HL)가 실제 프로덕션 도메인 www.autotoolshub.com에서 로드되지 않는 문제

## 🔍 문제 분석

### 1. 근본 원인
- **Vercel 배포 구조 혼선**: 여러 배포 URL이 동시에 존재하여 도메인이 구버전에 연결됨
- **도메인-배포 연결 불일치**: www.autotoolshub.com이 최신 배포가 아닌 이전 배포에 연결
- **코드는 정상, 배포 라우팅 문제**: layout.tsx에 GTM/GA 코드는 올바르게 구현되어 있었음

### 2. 발견된 증상
```
✅ 로컬 개발 환경: GTM/GA 정상 작동
✅ 코드베이스: layout.tsx에 올바른 구현
❌ 프로덕션 도메인: GTM/GA 스크립트 없음
❌ 구버전 UI: 네비게이션 "기능, 요금제, 문의"만 표시
```

### 3. Vercel 배포 상태 분석
```bash
# 문제 발생 시점의 배포 상태
vercel list
```

**발견된 문제점**:
- 20개 이상의 배포 URL 존재
- 실제 도메인이 구 배포 `autotoolshub-website-q01redqmm-twins1850s-projects.vercel.app`에 연결
- 최신 코드가 포함된 배포는 별도 URL에 존재

## 🛠️ 해결 과정

### 1단계: 문제 진단
```bash
# 현재 도메인 연결 상태 확인
vercel domains inspect autotoolshub.com

# 플레이라이트로 실제 로드된 스크립트 확인
# 결과: GTM/GA 스크립트 0개 검출
```

### 2단계: 강제 프로덕션 배포
```bash
# 최신 코드를 프로덕션에 강제 배포
vercel --prod --force
```

**배포 결과**:
- 새로운 프로덕션 URL: `autotoolshub-website-ne5241knz-twins1850s-projects.vercel.app`
- 도메인 자동 연결: www.autotoolshub.com → 최신 배포

### 3단계: 실시간 검증
플레이라이트를 통한 실시간 확인:

**수정 전**:
```javascript
{
  "gtmScripts": 0,
  "gaScripts": 0,
  "hasDataLayer": false,
  "dataLayerLength": 0
}
```

**수정 후**:
```javascript
{
  "gtmScripts": 3,
  "gaScripts": 3,
  "hasDataLayer": true,
  "dataLayerLength": 5,
  "gtmContainerIds": ["GTM-M9FF22PQ"],
  "gaMeasurementIds": ["G-QN3V4ZH4HL"],
  "gtmLoaded": true
}
```

## ✅ 해결 결과

### 성공적으로 구현된 항목
1. **GTM 컨테이너**: GTM-M9FF22PQ 정상 로드
2. **GA 측정 ID**: G-QN3V4ZH4HL 정상 로드  
3. **DataLayer**: 5개 이벤트로 정상 초기화
4. **실시간 추적**: gtag 함수 정상 작동
5. **최신 UI**: 전체 네비게이션 메뉴 표시

### DataLayer 이벤트 상세
```javascript
[
  {
    "gtm.start": 1762759293896,
    "event": "gtm.js",
    "gtm.uniqueEventId": 3
  },
  {
    "0": "js",
    "1": "2025-11-10T07:21:33.896Z"
  },
  {
    "0": "config", 
    "1": "G-QN3V4ZH4HL"
  }
]
```

## 🎯 핵심 학습 사항

### 1. 배포 전략 개선
- **문제**: 여러 배포 URL로 인한 혼선
- **해결**: 정기적인 배포 정리 및 도메인 연결 확인

### 2. 검증 프로세스 강화  
- **도구**: 플레이라이트 자동화 테스트
- **검증 항목**: GTM/GA 스크립트 로드, DataLayer 초기화, 실시간 추적

### 3. 모니터링 체계
```bash
# 정기 점검 명령어
vercel domains inspect autotoolshub.com
vercel list | head -5
```

## 🔧 향후 예방 조치

### 1. 배포 후 자동 검증
- 프로덕션 배포 시 GTM/GA 자동 확인 스크립트 실행
- 플레이라이트 E2E 테스트에 추적 코드 검증 포함

### 2. 도메인 연결 모니터링
- 주기적으로 실제 도메인과 최신 배포 연결 상태 확인
- Vercel 배포 URL 정리 (월 1회)

### 3. 알림 시스템
- Google Analytics 실시간 데이터 모니터링
- GTM 컨테이너 상태 확인 자동화

## 📊 성과 지표

**수정 전**:
- GTM 스크립트: 0개
- GA 스크립트: 0개  
- DataLayer: 없음
- 실시간 추적: 불가

**수정 후**:
- GTM 스크립트: 3개 ✅
- GA 스크립트: 3개 ✅
- DataLayer: 5개 이벤트 ✅  
- 실시간 추적: 정상 ✅

---

**작성일**: 2025-01-10  
**작성자**: Claude Code  
**검증 도구**: Playwright, Vercel CLI  
**상태**: 해결 완료 ✅