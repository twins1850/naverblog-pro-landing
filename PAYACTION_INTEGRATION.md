# PayAction 통합 가이드 - 완벽 문서

> PayAction 개발자 센터의 모든 내용을 체계적으로 정리한 통합 문서입니다.

## 📚 목차

1. [연동 가이드](#1-연동-가이드)
2. [API 레퍼런스](#2-api-레퍼런스)
   - [헤더 설정](#21-헤더-설정)
   - [입금 자동확인 API](#22-입금-자동확인-api)
   - [입출금 데이터수신 API](#23-입출금-데이터수신-api)
   - [웹훅(Webhook)](#24-웹훅webhook)
3. [자주묻는 질문(FAQ)](#3-자주묻는-질문faq)
4. [트러블슈팅](#4-트러블슈팅)

---

## 1. 연동 가이드

PayAction은 무통장입금 결제가 필요한 모든 곳에 연동하여 사용할 수 있는 커머스/뱅킹 SaaS입니다.

### 제공 서비스
- ✅ 실시간 결제확인을 위한 1초 자동 입금확인
- ✅ 결제내역 현금영수증 자동발행/취소
- ✅ 계좌 실시간 거래데이터 수신을 위한 1초 입출금 데이터 수신

### 연동 순서

#### (1) 상점등록
- [연동관리] 메뉴에서 상점정보를 입력합니다.

#### (2) 계좌등록  
- 계좌등록 및 해당은행 SMS 통지서비스 등 가이드에 따라 신청합니다.

#### (3) API정보 입력
- [API설정] 메뉴에서 API키를 생성하고 웹훅URL을 입력합니다.

#### (4) 서비스 개발 및 연동
- 아래 API 레퍼런스를 참고하여 서비스를 개발 및 연동합니다.

---

## 2. API 레퍼런스

PayAction의 모든 API는 REST API로 제공되며, HTTP 요청을 보낼 수 있는 환경이라면 OS나 DB에 관계없이 사용할 수 있습니다.

### 특징
- 🔒 모든 데이터는 저장 및 전송시 암호화
- 🛡️ SOC 2 Type II 보안표준 준수
- ☁️ Amazon AWS 최고 보안수준 관리
- 🔐 SSL 보안이 적용된 HTTPS 프로토콜만 지원
- 📄 요청 결과는 JSON 형식으로 응답

### 2.1 헤더 설정

모든 API 요청시 반드시 포함되어야 하는 헤더:

| 헤더명 | 값 | 설명 |
|--------|-----|------|
| `Content-Type` | `application/json` | 필수 |
| `x-api-key` | `your-api-key` | [대시보드] > [API설정]의 'API키'에서 확인 |
| `x-mall-id` | `your-mall-id` | [대시보드] > [API설정]의 '상점ID'에서 확인 |

### 2.2 입금 자동확인 API

주문을 제출하고, 입금 발생시 매칭되는 경우 웹훅으로 받아 처리하는 API입니다.

#### 2.2.1 주문 API

**Endpoint**: `POST https://api.payaction.app/order`

**Request Body 예시**:
```json
{
  "order_number": "1234567890",
  "order_amount": 19000,
  "order_date": "2023-07-26T11:31:00+09:00",
  "billing_name": "홍길동",
  "orderer_name": "홍길동",
  "orderer_phone_number": "01012345678",
  "orderer_email": "hong@gildong.kr",
  "trade_usage": "소득공제용",
  "identity_number": "01012345678"
}
```

**Request Parameters**:

| 필드명 | 설명 | 필수 | 비고 |
|--------|------|------|------|
| `order_number` | 주문번호 | **Yes** | 22자 이하 권장, 초과시 알림톡 발송불가 |
| `order_amount` | 주문금액 | **Yes** | 숫자 |
| `order_date` | 주문일시 | **Yes** | ISO 8601 Format (YYYY-MM-DDTHH:MM:SS+09:00) |
| `billing_name` | 입금자명 | **Yes** | ⚠️ 자동매칭시 매칭여부 판단 항목 |
| `orderer_name` | 주문자명 | **Yes** | - |
| `orderer_phone_number` | 주문자 전화번호 | No | 하이픈(-) 제외, 예: 01012345678 |
| `orderer_email` | 주문자 이메일 | No | - |
| `trade_usage` | 현금영수증 거래구분 | No | "소득공제용" 또는 "지출증빙용" |
| `identity_number` | 현금영수증 식별번호 | No | 숫자만 입력 |

**📌 중요 사항**:
- `orderer_phone_number`와 `orderer_email`은 알림 발송을 원하는 경우에만 포함
  - 알림톡 발송: `orderer_phone_number` 필드 포함
  - 이메일 발송: `orderer_email` 필드 포함
- 현금영수증 자동발행은 프리미어 플랜 이상에서 지원

**Response 예시**:

✅ 성공시:
```json
{
  "status": "success",
  "response": {}
}
```

❌ 실패시:
```json
{
  "status": "error",
  "response": {
    "message": "이미 해당 주문번호의 주문이 존재합니다."
  }
}
```

⚠️ **경고**: 유효하지 않은 API 요청을 지속적으로 과다제출하는 경우 서비스 이용이 제한될 수 있습니다.

#### 2.2.2 주문-매칭제외 API

**Endpoint**: `POST https://api.payaction.app/order-exclude`

매칭 대상에서 제외할 주문건을 처리합니다.

#### 2.2.3 현금영수증-발행취소 API

**Endpoint**: `POST https://api.payaction.app/cashbill-cancel`

발행된 현금영수증을 취소합니다.

#### 2.2.4 매칭완료 웹훅

**Type**: `WEBHOOK`

입금과 주문이 매칭되면 등록된 웹훅 URL로 전송됩니다.

### 2.3 입출금 데이터수신 API

주문 제출 없이 해당 계좌의 입금 및 출금 발생시 웹훅으로 받을 수 있는 API입니다.

**용도**: PayAction에 주문 입력 없이 입출금 내역 수신이 필요한 경우

**Type**: `WEBHOOK` - 입출금 발생시 자동 전송

### 2.4 웹훅(Webhook)

특정 이벤트 발생시 고객사 서버로 이벤트 정보를 자동전송하는 기능입니다.

#### 2.4.1 인증정보

웹훅 수신시 함께 전송되는 헤더 정보:

| 헤더명 | 설명 |
|--------|------|
| `Content-Type` | `application/json` |
| `x-webhook-key` | 웹훅키 (대시보드 > API설정 > 웹훅키에서 확인) |
| `x-mall-id` | 상점ID (대시보드 > API설정 > 상점ID에서 확인) |
| `x-trace-id` | 트랜잭션 고유 ID |

⚠️ **보안 주의**: 웹훅키는 발신자가 PayAction임을 검증하는 중요한 정보이므로, 외부 노출시 즉시 재발급 필요

#### 2.4.2 프로세스

1. **이벤트 발생**: 이벤트 발생 즉시 미리 등록한 웹훅 URL로 HTTP POST 요청
2. **웹훅 수신 및 응답 발신**: 고객사는 수신한 JSON 데이터를 시스템에 반영하고 즉시 응답
3. **응답 확인**: PayAction이 응답을 확인하여 성공/실패 판단

#### 2.4.3 응답결과 반환

**🔴 매우 중요**: 웹훅을 정상적으로 수신한 경우 반드시 아래와 같이 응답해야 합니다.

| 유형 | 상태코드 | 결과값 |
|------|---------|--------|
| Response Body | **200** | `{"status": "success"}` |

```json
{
  "status": "success"
}
```

⚠️ 정상 응답을 반환하지 않으면:
- 실패로 간주되어 재전송됨
- 지속적으로 실패시 웹훅 발송 중단

#### 2.4.4 실패 및 재시도

**주요 실패 사유**:
- 응답결과 미반환: 고객사 서버가 웹훅 수신 후 응답결과를 반환하지 않는 경우
- Response Body 형식 불일치: 요구한 형식과 일치하지 않는 경우  
- HTTP 통신 오류: 네트워크 문제, 서버 다운, 연결 오류 등
- 기타: 위에서 언급되지 않은 실패

💡 **팁**: 고객사 시스템 정상화 후 PayAction 사이트에서 웹훅 재전송 요청 가능

#### 2.4.5 전송내역 확인

- **경로**: 대시보드 > API설정 > Webhook로그
- **조회 기간**: 최근 1달 이내 발송된 웹훅 내역
- **재전송**: [재전송] 버튼 클릭시 해당 웹훅 즉시 발송
- **용도**: 3회 이상 실패로 알림 이메일 수신한 경우, 서버 정상화 후 재수신

#### 2.4.6 재전송 정책

웹훅 누락이나 지연 방지를 위해 **최초 전송 포함 최대 3회**까지 재전송합니다.

- 1차 시도: 즉시
- 2차 시도: 실패 후 일정 시간 후
- 3차 시도: 마지막 시도
- **최종 실패시**: 알림 이메일 발송

---

## 3. 자주묻는 질문(FAQ)

### Q1. 자동매칭되는 기준은 무엇인가요?

**답변**: 
- 입금내역의 **입금자명**과 **입금액**이 주문의 **billing_name**과 **order_amount**와 일치하는 주문이 **정확히 1건**일 때 자동매칭
- 일치하는 주문이 없거나 복수건이면 매칭되지 않음
- 매칭 실패시 알림 이메일 발송

💡 **스마트오더매칭 기능**: 
- 대시보드 > 연동관리 내 기능설정에서 활성화
- 매칭 대상이 복수건이어도 매칭 가능 (가장 최근 또는 가장 오래된 주문으로 매칭)

### Q2. 수동매칭시에도 웹훅으로 전달되나요?

**답변**: 네, 전달됩니다.

### Q3. 자동매칭이 되지 않았어요.

**개발시 점검사항**:

1. ⏰ **주문 타이밍**
   - 입금내역 수신시 매칭이 진행되므로, 주문이 입금보다 먼저 전달되어야 함
   - 주문 발생시 즉시 [주문] 엔드포인트 호출
   - 주문일시를 미래시간으로 입력하지 않도록 주의

2. 👤 **입금자명 일치**
   - 입금내역의 입금자명 = 주문의 `billing_name` (⚠️ `orderer_name`이 아님!)

3. 🔤 **공백문자 처리**
   - 입금자명 앞뒤 공백문자 제거 (Trim 활용)

**일반적인 매칭실패 사유**:

| 원인 | 해결방법 |
|------|---------|
| 매칭대상이 여러 건 | 스마트오더매칭 기능 사용 |
| 주문 후 2주일 경과 | 2주 이내 주문만 매칭 대상 |
| 주문이 입금보다 늦게 전달 | 주문을 먼저 전송 |
| 주문일시가 입금보다 미래 | 정확한 주문일시 입력 |
| 입금자명 불일치 | `billing_name` 확인 |
| 공백문자 포함 | Trim 처리 |

### Q4. 웹훅이 오지 않아요.

**체크리스트**:

✅ API설정 페이지에서 등록한 웹훅 URL이 정확한가요?

✅ 해당 URL이 외부 인터넷에서 접근 가능한 공개 주소인가요?
   - ❌ localhost 주소는 사용 불가

✅ 방화벽이나 클라우드 서비스에서 미국을 차단하고 있지 않나요?
   - PayAction은 AWS us-east-1 (미국 동부, 버지니아 북부) 리전 사용

✅ 유효한 SSL 인증서가 설치되어 있나요?
   - 인증서 만료 여부
   - 인증서 체인 문제

✅ Postman 등으로 웹훅 URL 테스트시 정상 응답하나요?

### Q5. 웹훅 수신 실패 관련

모든 웹훅 정상 수신시 반드시 `{"status": "success"}` 응답을 반환해야 합니다.

- 응답 미반환시 → 실패 처리 → 재전송
- 최종 실패시 → 알림 발송
- 중복 수신 방지를 위해 정확한 응답 필수

---

## 4. 트러블슈팅

### 🔴 "누락된 필드가 존재합니다" 에러

**원인**: API 요청시 필수 필드 누락 또는 잘못된 필드명 사용

**해결**: 
```javascript
// ❌ 잘못된 필드명
{
  "orderNo": "...",        // ❌
  "amount": 10000,          // ❌  
  "customer_name": "..."    // ❌
}

// ✅ 올바른 필드명
{
  "order_number": "...",    // ✅
  "order_amount": 10000,    // ✅
  "billing_name": "...",    // ✅
  "orderer_name": "..."     // ✅
}
```

### 🔴 웹훅 수신 실패

**원인 및 해결**:

1. **SSL 인증서 문제**
   - Let's Encrypt 등 유효한 인증서 설치
   - 인증서 체인 완성도 확인

2. **방화벽 설정**
   - AWS Security Group에서 미국 리전 허용
   - Cloudflare 등에서 국가 차단 해제

3. **응답 형식 오류**
   ```javascript
   // ❌ 잘못된 응답
   res.send("OK");
   res.json({result: "success"});
   
   // ✅ 올바른 응답
   res.status(200).json({status: "success"});
   ```

### 🔴 자동매칭 실패

**체크 포인트**:

1. **주문 전송 시점**: 입금 전에 주문이 PayAction에 등록되었는지
2. **입금자명 정확성**: `billing_name`과 실제 입금자명 일치 여부
3. **금액 일치**: `order_amount`와 입금액 정확히 일치
4. **주문 유효기간**: 2주 이내 주문인지
5. **중복 주문**: 동일 금액/입금자명 주문이 여러 개 있는지

---

## 5. 구현 예시 코드

### Node.js/Express 웹훅 수신 예시

```javascript
app.post('/api/payaction-webhook', async (req, res) => {
  try {
    // 1. 웹훅 인증 검증
    const webhookKey = req.headers['x-webhook-key'];
    const mallId = req.headers['x-mall-id'];
    const traceId = req.headers['x-trace-id'];
    
    if (webhookKey !== process.env.PAYACTION_WEBHOOK_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // 2. 웹훅 데이터 처리
    const webhookData = req.body;
    console.log('웹훅 수신:', webhookData);
    
    // 3. 비즈니스 로직 처리
    // 예: 주문 상태 업데이트, 라이센스 발급 등
    await processPaymentConfirmation(webhookData);
    
    // 4. 필수: 성공 응답 반환
    return res.status(200).json({ status: "success" });
    
  } catch (error) {
    console.error('웹훅 처리 오류:', error);
    // 에러시에도 성공 응답 반환 (재전송 방지)
    return res.status(200).json({ status: "success" });
  }
});
```

### 주문 제출 예시

```javascript
async function submitOrder(orderData) {
  const response = await fetch('https://api.payaction.app/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.PAYACTION_API_KEY,
      'x-mall-id': process.env.PAYACTION_MALL_ID
    },
    body: JSON.stringify({
      order_number: orderData.orderId,
      order_amount: orderData.amount,
      order_date: new Date().toISOString().replace('Z', '+09:00'),
      billing_name: orderData.depositName || orderData.customerName,
      orderer_name: orderData.customerName,
      orderer_phone_number: orderData.phone.replace(/-/g, ''),
      orderer_email: orderData.email
    })
  });
  
  const result = await response.json();
  
  if (result.status !== 'success') {
    throw new Error(`PayAction API 오류: ${result.response?.message}`);
  }
  
  return result;
}
```

---

## 📌 핵심 요약

1. **필수 헤더**: `x-api-key`, `x-mall-id` 
2. **올바른 필드명**: `order_number`, `order_amount`, `billing_name` 등
3. **웹훅 응답**: 반드시 `{"status": "success"}` with HTTP 200
4. **자동매칭 조건**: 입금자명 + 금액 = 1개 주문
5. **재전송 정책**: 최대 3회 시도
6. **주문 타이밍**: 입금 전에 주문 먼저 전송
7. **SSL 필수**: 유효한 인증서 설치
8. **미국 리전 허용**: AWS us-east-1 접근 허용

---

*이 문서는 PayAction 개발자 센터의 공식 문서를 기반으로 작성되었습니다.*
*최종 업데이트: 2024년*