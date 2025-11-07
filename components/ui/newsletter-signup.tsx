"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setError('유효한 이메일 주소를 입력해주세요.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setEmail('')
      } else {
        setError(data.error || '구독 처리 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Newsletter signup error:', error)
      setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="border-t border-border py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-semibold mb-2">최신 업데이트를 받아보세요</h3>
            <p className="text-sm text-muted-foreground">
              새로운 기능, 팁, 그리고 블로그 자동화 전략을 이메일로 받아보세요.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 dark:text-green-400 font-medium">
              구독이 완료되었습니다!
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-border py-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="font-semibold mb-2">최신 업데이트를 받아보세요</h3>
          <p className="text-sm text-muted-foreground">
            새로운 기능, 팁, 그리고 블로그 자동화 전략을 이메일로 받아보세요.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent text-sm"
                disabled={isLoading}
              />
              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-primary text-white hover:bg-brand-primary/90 shadow-brand hover:shadow-brand-lg active:scale-[0.98] h-9 px-4 py-2 text-xs"
            >
              {isLoading ? '처리중...' : '구독하기'}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}