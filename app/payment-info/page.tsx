"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle,
  Info,
  Banknote,
  PenTool, 
  MessageCircle, 
  Users, 
  Reply,
  Plus,
  Minus,
  Calculator,
  Zap,
  Check,
  RefreshCw,
  Calendar,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";

// 🚨 결제 기능 활성화 상태 (테스트 완료 후 true로 변경)
const PAYMENT_ENABLED = false;

interface Module {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  basePrice: number
  isMainModule?: boolean
}

export default function PaymentInfoPage() {
  // 모듈 정의
  const modules: Module[] = [
    {
      id: 'writing',
      name: '글쓰기자동화',
      description: 'ChatGPT 4.0/5.0 기반 AI 블로그 포스팅 자동화',
      icon: <PenTool className="w-6 h-6" />,
      basePrice: 100000,
      isMainModule: true
    },
    {
      id: 'comment',
      name: '댓글자동화',
      description: '다른 블로그에 자연스러운 댓글 자동 작성',
      icon: <MessageCircle className="w-6 h-6" />,
      basePrice: 50000
    },
    {
      id: 'neighbor',
      name: '서로이웃자동화',
      description: '서로이웃 신청 및 관리 자동화',
      icon: <Users className="w-6 h-6" />,
      basePrice: 50000
    },
    {
      id: 'reply',
      name: '대댓글자동화',
      description: '댓글에 대한 대댓글 자동 작성',
      icon: <Reply className="w-6 h-6" />,
      basePrice: 50000
    }
  ];

  // 상태 관리
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [accountCount, setAccountCount] = useState(1);
  const [postCount, setPostCount] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // 글쓰기 모듈 선택 여부
  const hasWritingModule = selectedModules.includes('writing');

  // 가격 계산 함수
  const calculatePrice = () => {
    let totalPrice = 0;

    selectedModules.forEach(moduleId => {
      const moduleItem = modules.find(m => m.id === moduleId);
      if (!moduleItem) return;

      if (moduleItem.isMainModule) {
        // 글쓰기 모듈: 10만원 + (아이디 수 × 글 수 × 1만원)
        totalPrice += moduleItem.basePrice + (accountCount * postCount * 10000);
      } else {
        // 기타 모듈: 기본 5만원, 글쓰기 모듈 있으면 1만원 할인
        const discountedPrice = hasWritingModule ? moduleItem.basePrice - 10000 : moduleItem.basePrice;
        totalPrice += discountedPrice;
      }
    });

    return totalPrice;
  };

  // 모듈 선택/해제
  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // 수량 조절 함수
  const adjustCount = (type: 'account' | 'post', operation: 'increase' | 'decrease') => {
    if (type === 'account') {
      setAccountCount(prev => operation === 'increase' ? Math.min(prev + 1, 10) : Math.max(prev - 1, 1));
    } else {
      setPostCount(prev => operation === 'increase' ? Math.min(prev + 1, 10) : Math.max(prev - 1, 1));
    }
  };

  // 개별 모듈 가격 계산
  const getModulePrice = (module: Module) => {
    if (module.isMainModule) {
      return module.basePrice + (accountCount * postCount * 10000);
    } else {
      return hasWritingModule ? module.basePrice - 10000 : module.basePrice;
    }
  };

  const totalPrice = calculatePrice();

  // 상품명 생성 함수
  const generateProductName = () => {
    const moduleNames = selectedModules.map(id => {
      const module = modules.find(m => m.id === id);
      return module?.name || '';
    }).join('+');
    
    if (hasWritingModule) {
      return `${moduleNames} ${accountCount}.${postCount}`;
    } else {
      return moduleNames;
    }
  };

  // 이메일, 이름, 전화번호 검증 함수
  const validateEmail = (value: string) =>
    /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(value);
  const validatePhone = (value: string) =>
    /^01[016789][0-9]{7,8}$/.test(value.replace(/-/g, ""));

  // 결제 버튼 활성화 조건
  const isFormValid =
    validateEmail(email) && name.trim().length > 0 && validatePhone(phone) && selectedModules.length > 0;

  // 계좌이체 결제 버튼 클릭 시
  const handleBankTransfer = () => {
    let valid = true;
    
    // 모듈 선택 확인
    if (selectedModules.length === 0) {
      alert('최소 1개 이상의 모듈을 선택해주세요.');
      return;
    }

    // 6.6 초과 버전 차단 로직 추가
    if (accountCount > 6 || postCount > 6) {
      alert(
        `❌ 랜딩페이지에서는 최대 아이디 6개, 글 6개까지만 구매 가능합니다.\n\n` +
        `현재 선택: 아이디 ${accountCount}개, 글 ${postCount}개\n` +
        `최대 허용: 아이디 6개, 글 6개\n\n` +
        `더 많은 아이디/글이 필요하시면 카카오채널로 기업형 문의 바랍니다.\n` +
        `문의: http://pf.kakao.com/_ShwJn/chat`
      );
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("이메일은 필수 입력이며, 이메일 형식이어야 합니다.");
      emailInputRef.current?.focus();
      valid = false;
    } else {
      setEmailError("");
    }
    if (name.trim().length === 0) {
      setNameError("이름은 필수 입력입니다.");
      if (valid) nameInputRef.current?.focus();
      valid = false;
    } else {
      setNameError("");
    }
    if (!validatePhone(phone)) {
      setPhoneError("전화번호는 숫자만 입력(01012345678) 형식이어야 합니다.");
      if (valid) phoneInputRef.current?.focus();
      valid = false;
    } else {
      setPhoneError("");
    }
    if (!valid) return;

    // 계좌이체 페이지로 이동
    const productName = generateProductName();
    const amount = totalPrice;
    const params = new URLSearchParams({
      productName,
      amount: amount.toString(),
      accountIds: accountCount.toString(),
      postsPerAccount: postCount.toString(),
      months: "1", // 1개월 고정
      discountRate: "0", // 할인 없음
      email,
      name,
      phone,
      selectedModules: selectedModules.join(','), // 선택된 모듈 ID들 전달
    });
    window.location.href = `/bank-transfer?${params.toString()}`;
  };

  // 토스 결제 버튼 클릭 시
  const handlePayment = () => {
    // 🚨 결제 기능 비활성화 상태 체크
    if (!PAYMENT_ENABLED) {
      alert(
        `🚧 카드결제 서비스 준비 중입니다\n\n` +
        `현재 심사 진행 중이며, 계좌이체를 이용해주세요.\n\n` +
        `문의사항이 있으시면 아래로 연락해주세요:\n` +
        `📧 이메일: jireh202503@gmail.com\n` +
        `📞 전화: 010-4248-1850`
      );
      return;
    }
    
    // 동일한 검증 로직
    handleBankTransfer();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            BlogPro 모듈별 가격 계산기
          </h1>
          <p className="text-xl text-gray-600">
            필요한 기능을 선택하고 정확한 가격을 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 모듈 선택 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>모듈 선택</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {modules.map((module) => {
                  const isSelected = selectedModules.includes(module.id);
                  const modulePrice = getModulePrice(module);
                  
                  return (
                    <div
                      key={module.id}
                      className={cn(
                        "p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                        isSelected 
                          ? "border-brand-accent bg-brand-accent/5 shadow-lg transform scale-[1.02]" 
                          : "border-border hover:border-brand-accent/50 hover:bg-brand-accent/2"
                      )}
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            isSelected 
                              ? "bg-brand-accent text-white" 
                              : "bg-muted text-muted-foreground"
                          )}>
                            {module.icon}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold">{module.name}</h4>
                              {module.isMainModule && (
                                <Badge variant="secondary" className="text-xs">
                                  메인
                                </Badge>
                              )}
                              {hasWritingModule && !module.isMainModule && (
                                <Badge variant="outline" className="text-xs text-success">
                                  1만원 할인
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {module.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold">
                            ₩{formatPrice(modulePrice)}
                            <span className="text-xs text-muted-foreground font-normal">/월</span>
                          </div>
                          {!module.isMainModule && hasWritingModule && (
                            <div className="text-xs text-muted-foreground line-through">
                              ₩{formatPrice(module.basePrice)}/월
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* 글쓰기 모듈 상세 설정 */}
                      {module.isMainModule && isSelected && (
                        <div className="mt-4 p-3 bg-muted/50 rounded-lg border">
                          <h5 className="font-medium mb-3">상세 설정</h5>
                          
                          <div className="grid grid-cols-2 gap-4">
                            {/* 아이디 수 */}
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                아이디 수
                              </label>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:scale-110 transition-transform duration-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    adjustCount('account', 'decrease');
                                  }}
                                  disabled={accountCount <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">
                                  {accountCount}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:scale-110 transition-transform duration-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    adjustCount('account', 'increase');
                                  }}
                                  disabled={accountCount >= 10}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {/* 글 수 */}
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                일일 글 수
                              </label>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:scale-110 transition-transform duration-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    adjustCount('post', 'decrease');
                                  }}
                                  disabled={postCount <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">
                                  {postCount}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:scale-110 transition-transform duration-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    adjustCount('post', 'increase');
                                  }}
                                  disabled={postCount >= 10}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* 가격 계산 설명 */}
                          <div className="mt-3 p-2 bg-background rounded text-xs">
                            <div className="space-y-1">
                              <div>기본 기능: ₩{formatPrice(module.basePrice)}/월</div>
                              <div>확장 비용: {accountCount} × {postCount} × ₩10,000 = ₩{formatPrice(accountCount * postCount * 10000)}/월</div>
                              <div className="font-medium border-t pt-1">
                                월 구독료: ₩{formatPrice(modulePrice)}/월
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: 가격 요약 및 결제 */}
          <div className="space-y-6">
            {/* 가격 요약 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>월 구독료 요약</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedModules.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>모듈을 선택해주세요</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* 선택된 모듈 목록 */}
                    <div className="space-y-3">
                      {selectedModules.map(moduleId => {
                        const moduleItem = modules.find(m => m.id === moduleId)!;
                        const modulePrice = getModulePrice(moduleItem);
                        
                        return (
                          <div key={moduleId} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-brand-accent/10 rounded-lg flex items-center justify-center text-brand-accent">
                                {React.cloneElement(moduleItem.icon as React.ReactElement, { 
                                  className: "w-4 h-4" 
                                })}
                              </div>
                              <div>
                                <div className="font-medium text-sm">{moduleItem.name}</div>
                                {moduleItem.isMainModule && (
                                  <div className="text-xs text-muted-foreground">
                                    {accountCount}개 계정 × {postCount}글
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                ₩{formatPrice(modulePrice)}<span className="text-xs text-muted-foreground">/월</span>
                              </div>
                              {!moduleItem.isMainModule && hasWritingModule && (
                                <div className="text-xs text-success">
                                  -1만원 할인
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* 할인 혜택 */}
                    {hasWritingModule && selectedModules.filter(id => id !== 'writing').length > 0 && (
                      <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                        <div className="flex items-center space-x-2 text-success">
                          <Zap className="w-4 h-4" />
                          <span className="text-sm font-medium">할인 혜택 적용</span>
                        </div>
                        <p className="text-xs text-success/80 mt-1">
                          글쓰기자동화 이용 시 다른 모듈 각 1만원 할인
                        </p>
                      </div>
                    )}
                    
                    {/* 총 가격 */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">총 월 구독료</span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-brand-accent">
                            ₩{formatPrice(totalPrice)}
                          </span>
                          <span className="text-sm text-muted-foreground">/월</span>
                        </div>
                      </div>
                      <div className="mt-2 p-2 bg-brand-accent/5 rounded-lg border border-brand-accent/10">
                        <div className="flex items-center space-x-2 text-xs text-brand-accent">
                          <RefreshCw className="w-3 h-3" />
                          <span className="font-medium">매월 수동 결제 방식</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          • 매월 직접 계좌이체로 결제<br/>
                          • 언제든지 구독 중단 가능<br/>
                          • 사용한 기간만 비용 지불
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 사용자 정보 입력 */}
            {selectedModules.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>결제자 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 이메일 입력란 */}
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold mb-1 block">
                      인증키 받을 이메일 주소 <span className="text-red-600">(필수)</span>
                    </Label>
                    <Input
                      id="email"
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`mt-1 ${emailError ? "border-red-500 focus:ring-red-500" : ""}`}
                      placeholder="example@email.com"
                    />
                    {emailError && (
                      <div className="text-red-600 text-sm mt-1">{emailError}</div>
                    )}
                  </div>

                  {/* 결제자 정보 입력란 */}
                  <div>
                    <Label className="text-base font-semibold mb-1 block">
                      결제자 정보 <span className="text-red-600">(필수)</span>
                    </Label>
                    <div className="space-y-2">
                      <Input
                        id="name"
                        ref={nameInputRef}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={nameError ? "border-red-500 focus:ring-red-500" : ""}
                        placeholder="이름"
                      />
                      {nameError && (
                        <div className="text-red-600 text-sm mt-1">{nameError}</div>
                      )}
                      <Input
                        id="phone"
                        ref={phoneInputRef}
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={phoneError ? "border-red-500 focus:ring-red-500" : ""}
                        placeholder="전화번호 (01012345678)"
                      />
                      {phoneError && (
                        <div className="text-red-600 text-sm mt-1">{phoneError}</div>
                      )}
                    </div>
                  </div>

                  {/* 상품명 미리보기 */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">결제 상품명:</div>
                    <Badge variant="outline" className="text-sm">
                      {generateProductName()}
                    </Badge>
                  </div>

                  {/* 결제 방법 선택 */}
                  <div className="space-y-3">
                    <div className="text-base font-semibold">결제 방법 선택</div>
                    
                    {/* 계좌이체 결제 버튼 */}
                    <Button
                      onClick={handleBankTransfer}
                      className="w-full text-lg py-3 bg-blue-600 hover:bg-blue-700"
                      size="lg"
                      disabled={!isFormValid}
                    >
                      <Banknote className="mr-2 h-5 w-5" />
                      계좌이체로 결제하기 (추천)
                    </Button>
                    
                    {/* 토스 결제 버튼 (비활성화) */}
                    <Button
                      onClick={handlePayment}
                      className={`w-full text-lg py-3 ${
                        !PAYMENT_ENABLED
                          ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                      size="lg"
                      disabled={!isFormValid || !PAYMENT_ENABLED}
                    >
                      {!PAYMENT_ENABLED ? (
                        <>
                          🚧 카드결제 서비스 준비 중
                          <Info className="ml-2 h-5 w-5" />
                        </>
                      ) : (
                        <>
                          카드로 결제하기
                          <CreditCard className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>

                  {/* 결제 방법 안내 메시지 */}
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">💡 추천 결제 방법</p>
                        <p className="text-xs">
                          <strong>계좌이체</strong>가 더 안전하고 빠릅니다! 카드결제는 현재 심사 진행 중입니다.
                          <br />
                          문의: <strong>jireh202503@gmail.com</strong> 또는 전화 <strong>010-4248-1850</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* 가격 정책 안내 */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>가격 정책 안내</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 4개 모듈 가격 구조 */}
              <div>
                <h3 className="font-semibold text-lg mb-3">📋 모듈별 가격 구조</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border">
                    <div className="font-medium text-blue-900 mb-2">
                      📝 글쓰기자동화 (메인)
                    </div>
                    <div className="text-sm space-y-1">
                      <div>• 기본 기능: ₩100,000/월</div>
                      <div>• 확장 비용: (아이디 수 × 글 수 × ₩10,000)/월</div>
                      <div className="text-xs text-gray-600">
                        예) 1.1버전 = 10만원 + 1만원 = 11만원
                      </div>
                      <div className="text-xs text-gray-600">
                        예) 2.2버전 = 10만원 + 4만원 = 14만원
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border">
                    <div className="font-medium text-green-900 mb-2">
                      💬 댓글자동화
                    </div>
                    <div className="text-sm space-y-1">
                      <div>• 기본 가격: ₩50,000/월</div>
                      <div className="text-success font-medium">• 글쓰기 선택시: ₩40,000/월 (1만원 할인)</div>
                      <div className="text-xs text-gray-600">
                        AI가 글 내용을 분석해서 맞춤 댓글 작성
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border">
                    <div className="font-medium text-purple-900 mb-2">
                      👥 서로이웃자동화
                    </div>
                    <div className="text-sm space-y-1">
                      <div>• 기본 가격: ₩50,000/월</div>
                      <div className="text-success font-medium">• 글쓰기 선택시: ₩40,000/월 (1만원 할인)</div>
                      <div className="text-xs text-gray-600">
                        최신글 분석하여 개인화된 서로이웃 메시지
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border">
                    <div className="font-medium text-orange-900 mb-2">
                      🔄 대댓글자동화
                    </div>
                    <div className="text-sm space-y-1">
                      <div>• 기본 가격: ₩50,000/월</div>
                      <div className="text-success font-medium">• 글쓰기 선택시: ₩40,000/월 (1만원 할인)</div>
                      <div className="text-xs text-gray-600">
                        세계 최초! 대댓글까지 완전 자동화
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 할인 혜택 */}
              <div>
                <h3 className="font-semibold text-lg mb-3">💰 할인 혜택</h3>
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="font-medium text-success">글쓰기자동화 포함 시 다른 모듈 각 1만원 할인</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>• 글쓰기 + 댓글: ₩110,000 + ₩40,000 = ₩150,000/월</div>
                    <div>• 전체 모듈: ₩110,000 + ₩40,000 × 3 = ₩230,000/월</div>
                  </div>
                </div>
              </div>

              {/* 인기 조합 */}
              <div>
                <h3 className="font-semibold text-lg mb-3">🎯 인기 조합</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                    <span className="text-sm">베이직: 글쓰기자동화 (1계정×1글)</span>
                    <span className="font-semibold">₩110,000/월</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                    <span className="text-sm">스탠다드: 글쓰기 + 댓글자동화</span>
                    <span className="font-semibold">₩150,000/월</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                    <span className="text-sm">프리미엄: 전체 4개 모듈</span>
                    <span className="font-semibold">₩230,000/월</span>
                  </div>
                </div>
              </div>

              {/* 장기 결제 할인 (향후 기능) */}
              <div>
                <h3 className="font-semibold text-lg mb-3">📅 향후 장기 결제 할인 (준비중)</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <span>1개월: 할인 없음</span>
                  <span>3개월: 10% 할인</span>
                  <span>6개월: 15% 할인</span>
                  <span>12개월: 20% 할인</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ※ 현재는 매월 수동 결제만 지원됩니다
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 하단 안내 */}
        <div className="mt-8 text-center">
          <Card className="bg-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">안전한 결제 시스템</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                <strong>계좌이체</strong>는 입금 후 즉시 자동 확인되며 1분 이내에 라이선스가 발급되고,
                <br />
                <strong>카드결제</strong>는 토스(Toss) 안전결제 시스템을 통해 즉시 처리됩니다.
                <br />
                라이선스는 등록하신 이메일로 발송됩니다.
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-bold">
                  결제 관련 문의: jireh202503@gmail.com | 010-4248-1850
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 뒤로가기 */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}