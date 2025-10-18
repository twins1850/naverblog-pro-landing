"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  PenTool, 
  MessageCircle, 
  Users, 
  Reply,
  Plus,
  Minus,
  Calculator,
  Zap,
  Check,
  X
} from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"

interface Module {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  basePrice: number
  isMainModule?: boolean
}

interface PriceCalculatorProps {
  onClose?: () => void
  onPurchase?: (selectedModules: string[], totalPrice: number) => void
}

export function PriceCalculator({ onClose, onPurchase }: PriceCalculatorProps) {
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
  ]

  // 상태 관리
  const [selectedModules, setSelectedModules] = React.useState<string[]>([])
  const [accountCount, setAccountCount] = React.useState(1)
  const [postCount, setPostCount] = React.useState(1)

  // 글쓰기 모듈 선택 여부
  const hasWritingModule = selectedModules.includes('writing')

  // 가격 계산 함수
  const calculatePrice = () => {
    let totalPrice = 0

    selectedModules.forEach(moduleId => {
      const moduleItem = modules.find(m => m.id === moduleId)
      if (!moduleItem) return

      if (moduleItem.isMainModule) {
        // 글쓰기 모듈: 10만원 + (아이디 수 × 글 수)
        totalPrice += moduleItem.basePrice + (accountCount * postCount * 10000)
      } else {
        // 기타 모듈: 기본 5만원, 글쓰기 모듈 있으면 1만원 할인
        const discountedPrice = hasWritingModule ? moduleItem.basePrice - 10000 : moduleItem.basePrice
        totalPrice += discountedPrice
      }
    })

    return totalPrice
  }

  // 모듈 선택/해제
  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  // 수량 조절 함수
  const adjustCount = (type: 'account' | 'post', operation: 'increase' | 'decrease') => {
    if (type === 'account') {
      setAccountCount(prev => operation === 'increase' ? Math.min(prev + 1, 10) : Math.max(prev - 1, 1))
    } else {
      setPostCount(prev => operation === 'increase' ? Math.min(prev + 1, 10) : Math.max(prev - 1, 1))
    }
  }

  // 개별 모듈 가격 계산
  const getModulePrice = (module: Module) => {
    if (module.isMainModule) {
      return module.basePrice + (accountCount * postCount * 10000)
    } else {
      return hasWritingModule ? module.basePrice - 10000 : module.basePrice
    }
  }

  const totalPrice = calculatePrice()

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-6 h-6 text-brand-accent" />
                <span>라이선스 가격 계산기</span>
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                필요한 기능을 선택하고 정확한 가격을 확인하세요
              </p>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 모듈 선택 섹션 */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-semibold">모듈 선택</h3>
              
              <div className="grid gap-4">
                {modules.map((module) => {
                  const isSelected = selectedModules.includes(module.id)
                  const modulePrice = getModulePrice(module)
                  
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
                          </div>
                          {!module.isMainModule && hasWritingModule && (
                            <div className="text-xs text-muted-foreground line-through">
                              ₩{formatPrice(module.basePrice)}
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
                                    e.stopPropagation()
                                    adjustCount('account', 'decrease')
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
                                    e.stopPropagation()
                                    adjustCount('account', 'increase')
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
                                    e.stopPropagation()
                                    adjustCount('post', 'decrease')
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
                                    e.stopPropagation()
                                    adjustCount('post', 'increase')
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
                              <div>기본 기능: ₩{formatPrice(module.basePrice)}</div>
                              <div>확장 비용: {accountCount} × {postCount} × ₩10,000 = ₩{formatPrice(accountCount * postCount * 10000)}</div>
                              <div className="font-medium border-t pt-1">
                                총 가격: ₩{formatPrice(modulePrice)}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 가격 요약 섹션 */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">가격 요약</h3>
              
              <Card>
                <CardContent className="p-4">
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
                          const moduleItem = modules.find(m => m.id === moduleId)!
                          const modulePrice = getModulePrice(moduleItem)
                          
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
                                  ₩{formatPrice(modulePrice)}
                                </div>
                                {!moduleItem.isMainModule && hasWritingModule && (
                                  <div className="text-xs text-success">
                                    -1만원 할인
                                  </div>
                                )}
                              </div>
                            </div>
                          )
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
                          <span className="font-semibold">총 월 이용료</span>
                          <span className="text-2xl font-bold text-brand-accent">
                            ₩{formatPrice(totalPrice)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          * 1개월 단위 자동 갱신
                        </p>
                      </div>

                      {/* 구매 버튼 */}
                      <Button 
                        variant="brand" 
                        size="lg" 
                        className="w-full hover:scale-105 transition-transform duration-200 group"
                        onClick={() => onPurchase?.(selectedModules, totalPrice)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        라이선스 구매하기
                      </Button>
                      
                      {/* 추가 정보 */}
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Check className="w-3 h-3 text-success" />
                          <span>30일 환불 보장</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Check className="w-3 h-3 text-success" />
                          <span>무료 기술 지원</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Check className="w-3 h-3 text-success" />
                          <span>언제든지 모듈 추가/제거 가능</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}