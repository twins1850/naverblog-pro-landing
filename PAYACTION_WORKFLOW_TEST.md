# PayAction 입금 알림 및 자동 라이선스 발급 시스템 테스트 가이드

## 📋 시스템 개요

PayAction 입금 알림을 받아 자동으로 라이선스를 발급하고 이메일을 전송하는 완전 자동화 시스템

## 🔄 전체 워크플로우

```mermaid
graph TD
    A[고객 계좌이체] --> B[PayAction 입금 감지]
    B --> C[PayAction 웹훅 발송]
    C --> D[/api/payaction-webhook]
    D --> E[Google Sheets 고객 조회]
    E --> F[입금 상태 업데이트]
    F --> G[Render 백엔드 V3 라이선스 발급]
    G --> H[Gmail 이메일 발송]
    H --> I[Google Sheets 라이선스 정보 저장]
    I --> J[완료]
```

## 🛠️ 구현된 API 엔드포인트

### 1. PayAction 웹훅 수신 API
- **엔드포인트**: `POST /api/payaction-webhook`
- **기능**: PayAction 입금 알림 수신 및 자동 라이선스 발급 처리
- **상태**: ✅ 구현 완료

### 2. 웹훅 테스트 API
- **엔드포인트**: `POST /api/test-payaction`
- **기능**: PayAction 웹훅 시뮬레이션으로 전체 플로우 테스트
- **상태**: ✅ 구현 완료

## 🔧 핵심 구현 사항

### 1. PayAction 웹훅 처리 (`/app/api/payaction-webhook/route.ts`)

**주요 기능:**
- PayAction 입금 확인 알림 수신
- 주문번호로 Google Sheets에서 고객 정보 조회
- 입금자명 및 입금 정보 검증
- 자동 라이선스 발급 (Render 백엔드 V3 라이선스)
- 입금 확인 이메일 자동 발송
- Google Sheets 상태 업데이트

**데이터 처리:**
```typescript
const { 
  orderId,           // 주문번호
  depositorName,     // 입금자명  
  amount,            // 입금금액
  bankName,          // 은행명
  accountNumber,     // 계좌번호
  depositTime,       // 입금시간
  customerEmail,     // 고객 이메일
  customerName,      // 고객명
  customerPhone,     // 고객 연락처
  productName,       // 상품명
  accountIds,        // 아이디 수
  postsPerAccount,   // 글 수
  months            // 개월 수
} = data;
```

### 2. Google Sheets 연동 확장 (`/lib/google-sheets.ts`)

**추가된 메서드:**
- `findCustomerByOrderId(orderId)` - 주문번호로 고객 조회
- `updatePaymentStatus(orderId, updateData)` - 입금 상태 업데이트  
- `updateLicenseInfo(orderId, licenseData)` - 라이선스 정보 업데이트

### 3. 라이선스 발급 서비스 확장 (`/lib/license-service.js`)

**개선 사항:**
- 은행 이체 고객을 위한 특별 이메일 템플릿
- 입금 확인 정보 포함 (입금자명, 입금시간, 입금금액)
- 실제 V3 라이선스 발급 (Render 백엔드 연동)
- 자동 이메일 발송 및 Google Sheets 저장

**이메일 템플릿 특징:**
- 은행 이체 고객용 입금 확인 섹션
- 라이선스 키 안전 보관 안내
- macOS/Windows 프로그램 다운로드 링크
- 카카오채널 고객 지원 연결

## 🧪 테스트 방법

### 1. 웹훅 테스트 API 사용

```bash
curl -X POST http://localhost:3000/api/test-payaction \
  -H "Content-Type: application/json" \
  -d '{"testOrderId": "BLOG202510296709"}'
```

### 2. 실제 PayAction 웹훅 설정

PayAction 대시보드에서 웹훅 URL 설정:
```
https://autotoolshub.com/api/payaction-webhook
```

### 3. 테스트 시나리오

1. **정상 플로우 테스트**
   - 실제 주문번호로 웹훅 테스트
   - Google Sheets에서 고객 정보 조회 확인
   - 라이선스 발급 및 이메일 발송 확인
   - 최종 상태 업데이트 확인

2. **예외 상황 테스트**
   - 존재하지 않는 주문번호
   - 입금자명 불일치
   - 라이선스 발급 실패
   - 이메일 발송 실패

## ✅ 검증 체크리스트

### PayAction 웹훅 수신
- [ ] POST 요청 정상 수신
- [ ] 입금 확인 타입 필터링
- [ ] 필수 데이터 검증

### Google Sheets 연동
- [ ] 주문번호로 고객 정보 조회
- [ ] 입금 상태 "입금완료"로 업데이트
- [ ] 라이선스 정보 저장

### 라이선스 발급
- [ ] Render 백엔드 V3 라이선스 발급
- [ ] 실제 라이선스 키 생성 (목업 아님)
- [ ] 기능 코드 매핑 (A=글쓰기자동화)

### 이메일 발송
- [ ] Gmail SMTP 인증 성공
- [ ] 은행 이체 전용 템플릿 사용
- [ ] 입금 확인 정보 포함
- [ ] 라이선스 키 및 다운로드 링크 포함

### 상태 업데이트
- [ ] Google Sheets 최종 상태 업데이트
- [ ] 라이선스 정보 기록
- [ ] 성공/실패 로깅

## 🎯 다음 단계

1. **실제 PayAction 연동**
   - PayAction 대시보드에서 웹훅 URL 설정
   - 테스트 입금으로 실제 플로우 검증

2. **모니터링 설정**
   - 웹훅 수신 실패 알림
   - 라이선스 발급 실패 알림
   - 이메일 발송 실패 알림

3. **관리자 도구**
   - 웹훅 로그 조회
   - 수동 라이선스 재발급
   - 상태 모니터링 대시보드

## 📝 주요 변경사항

1. **실제 라이선스 발급**: 목업이 아닌 Render 백엔드 V3 라이선스 사용
2. **은행 이체 최적화**: 입금 확인 전용 이메일 템플릿
3. **완전 자동화**: 입금 알림부터 라이선스 발급까지 무인 처리
4. **상태 추적**: Google Sheets로 전체 과정 기록 및 추적

시스템이 정상 작동하면 고객이 계좌이체 후 몇 분 내에 자동으로 라이선스를 받을 수 있습니다.