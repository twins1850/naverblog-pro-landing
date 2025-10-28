"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Copy,
  CheckCircle,
  Info,
  Clock,
  Banknote,
  Calculator,
  AlertTriangle,
  RefreshCw,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface OrderInfo {
  productName: string;
  amount: number;
  accountIds: number;
  postsPerAccount: number;
  months: number;
  discountRate: number;
  email: string;
  name: string;
  phone: string;
  selectedModules?: string; // 선택된 모듈 ID들
}

// 입금 계좌 정보 (페이액션 연동 계좌)
const BANK_INFO = {
  bankName: "케이뱅크",
  accountNumber: "100-232-962872",
  accountHolder: "김형원",
};

export default function BankTransferPage() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [orderId, setOrderId] = useState<string>("");
  const [depositName, setDepositName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'manual' | 'auto'>('manual');
  const [copied, setCopied] = useState(false);

  // URL 파라미터에서 주문 정보 추출
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('productName');
    const amount = urlParams.get('amount');
    const accountIds = urlParams.get('accountIds');
    const postsPerAccount = urlParams.get('postsPerAccount');
    const months = urlParams.get('months');
    const discountRate = urlParams.get('discountRate');
    const email = urlParams.get('email');
    const selectedModules = urlParams.get('selectedModules'); // 선택된 모듈 ID들 받기
    const name = urlParams.get('name');
    const phone = urlParams.get('phone');

    if (productName && amount && email && name && phone) {
      setOrderInfo({
        productName,
        amount: parseInt(amount),
        accountIds: parseInt(accountIds || '1'),
        postsPerAccount: parseInt(postsPerAccount || '1'),
        months: parseInt(months || '1'),
        discountRate: parseInt(discountRate || '0'),
        email,
        name,
        phone,
        selectedModules: selectedModules || '', // 선택된 모듈 ID들 추가
      });
      setDepositName(name); // 기본값으로 주문자 이름 설정
      
      // 주문번호 생성 (현재 날짜 + 랜덤 숫자)
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
      const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
      setOrderId(`BLOG${dateStr}${randomNum}`);
    }
  }, []);

  // 계좌번호 복사 기능
  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(BANK_INFO.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  // 입금 정보 제출
  const handleSubmitTransfer = async () => {
    if (!orderInfo || !depositName.trim()) {
      alert('입금자명을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Google Sheets에 주문 정보 저장
      const response = await fetch('/api/save-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: orderInfo.name,
          email: orderInfo.email,
          phone: orderInfo.phone,
          amount: orderInfo.amount,
          accountCount: orderInfo.accountIds,
          postCount: orderInfo.postsPerAccount,
          months: orderInfo.months,
          orderId: orderId,
          paymentKey: `BANK_TRANSFER_${orderId}`,
          status: '입금대기',
          depositName: depositName,
          paymentMethod: paymentMethod,
          productName: orderInfo.productName || '알 수 없는 상품',
          selectedModules: orderInfo.selectedModules || '', // 선택된 모듈 ID들 전달
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        alert('주문이 접수되었습니다!\n\n' +
              '입금 확인 후 24시간 이내에 라이선스가 발급됩니다.\n' +
              '문의: jireh202503@gmail.com');
      } else {
        throw new Error(result.error || '주문 접수 실패');
      }
    } catch (error) {
      console.error('주문 접수 오류:', error);
      alert('주문 접수 중 오류가 발생했습니다.\n다시 시도해주시거나 관리자에게 문의하세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!orderInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">주문 정보를 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-4">
              계좌이체 결제를 위해서는 먼저 가격 계산기에서<br/>
              상품을 선택하고 결제 정보를 입력해주세요.
            </p>
            <div className="space-y-2">
              <Link href="/payment-info">
                <Button className="w-full">가격 계산기로 이동</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">홈으로 돌아가기</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            계좌이체 결제
          </h1>
          <p className="text-gray-600">
            아래 계좌로 입금해주시면 확인 후 라이선스를 발급해드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 주문 정보 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>주문 정보</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">주문번호:</span>
                    <span className="font-mono font-semibold">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">상품명:</span>
                    <Badge variant="outline">{orderInfo.productName}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">아이디 수:</span>
                    <span>{orderInfo.accountIds}개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">일일 글 수:</span>
                    <span>{orderInfo.postsPerAccount}개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">이용 기간:</span>
                    <span>{orderInfo.months}개월</span>
                  </div>
                  {orderInfo.discountRate > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>할인율:</span>
                      <span>{orderInfo.discountRate}%</span>
                    </div>
                  )}
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>총 결제금액:</span>
                    <span className="text-green-600">
                      ₩{orderInfo.amount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">주문자 정보</h4>
                  <div className="space-y-1 text-sm">
                    <div>이름: {orderInfo.name}</div>
                    <div>이메일: {orderInfo.email}</div>
                    <div>연락처: {orderInfo.phone}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 결제 방식 선택 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>결제 방식 선택</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div 
                    className={cn(
                      "p-4 border-2 rounded-lg cursor-pointer transition-all",
                      paymentMethod === 'manual' 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setPaymentMethod('manual')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2",
                        paymentMethod === 'manual' ? "border-blue-500 bg-blue-500" : "border-gray-300"
                      )} />
                      <div>
                        <h4 className="font-semibold">일회성 수동 결제</h4>
                        <p className="text-sm text-gray-600">
                          매월 직접 계좌이체로 결제 (추천)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={cn(
                      "p-4 border-2 rounded-lg cursor-pointer transition-all",
                      paymentMethod === 'auto' 
                        ? "border-green-500 bg-green-50" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setPaymentMethod('auto')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2",
                        paymentMethod === 'auto' ? "border-green-500 bg-green-500" : "border-gray-300"
                      )} />
                      <div>
                        <h4 className="font-semibold flex items-center space-x-2">
                          <span>자동이체 설정</span>
                          <Badge variant="secondary" className="text-xs">준비중</Badge>
                        </h4>
                        <p className="text-sm text-gray-600">
                          매월 자동으로 계좌에서 출금 (향후 지원 예정)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'auto' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium">자동이체 서비스 준비 중</p>
                        <p>현재 효성CMS 연동을 준비하고 있습니다. 우선 수동 결제를 이용해주세요.</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: 입금 안내 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Banknote className="w-5 h-5" />
                  <span>입금 계좌 정보</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">은행명:</span>
                      <span className="font-semibold text-lg">{BANK_INFO.bankName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">계좌번호:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-lg">
                          {BANK_INFO.accountNumber}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyAccountNumber}
                          className="flex items-center space-x-1"
                        >
                          {copied ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>복사됨</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>복사</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">예금주:</span>
                      <span className="font-semibold text-lg">{BANK_INFO.accountHolder}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">입금금액:</span>
                      <span className="font-bold text-xl text-green-600">
                        ₩{orderInfo.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="depositName" className="text-base font-semibold">
                      입금자명 <span className="text-red-600">(필수)</span>
                    </Label>
                    <Input
                      id="depositName"
                      type="text"
                      value={depositName}
                      onChange={(e) => setDepositName(e.target.value)}
                      placeholder="입금할 때 사용할 이름"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      ※ 입금할 때 사용할 이름을 정확히 입력해주세요 (입금 확인용)
                    </p>
                  </div>

                  <Button
                    onClick={handleSubmitTransfer}
                    disabled={!depositName.trim() || isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        주문 접수 중...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        입금 정보 제출
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 입금 안내사항 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>입금 안내사항</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>정확한 금액</strong>으로 입금해주세요: ₩{orderInfo.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>입금자명</strong>을 위에 입력한 이름과 동일하게 해주세요
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      입금 확인 후 <strong>24시간 이내</strong>에 라이선스 발급
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      라이선스는 등록하신 <strong>이메일</strong>로 발송됩니다
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">문의 및 입금 확인</p>
                      <p>📧 이메일: jireh202503@gmail.com</p>
                      <p>📞 전화: 010-4248-1850</p>
                      <p>💬 카카오톡: @blogpro</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 뒤로가기 */}
        <div className="mt-8 text-center">
          <Link
            href="/payment-info"
            className="inline-flex items-center text-gray-600 hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> 가격 계산기로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}