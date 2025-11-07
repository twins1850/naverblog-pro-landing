"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface Subscriber {
  timestamp: string
  email: string
  date: string
}

interface SubscribersResponse {
  subscribers: Subscriber[]
  count: number
  message: string
}

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [authKey, setAuthKey] = useState('')

  const fetchSubscribers = async () => {
    if (!authKey) {
      setMessage('관리자 키를 입력해주세요.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/newsletter-subscribers', {
        headers: {
          'Authorization': `Bearer ${authKey}`
        }
      })

      if (response.ok) {
        const data: SubscribersResponse = await response.json()
        setSubscribers(data.subscribers)
        setMessage(data.message)
      } else {
        const error = await response.json()
        setMessage(error.error || '데이터를 가져오는데 실패했습니다.')
      }
    } catch (error) {
      setMessage('서버 연결 실패')
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const syncToSheets = async () => {
    if (!authKey) {
      setMessage('관리자 키를 입력해주세요.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/newsletter-subscribers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'sync-to-sheets' })
      })

      if (response.ok) {
        const data = await response.json()
        setMessage(data.message)
      } else {
        const error = await response.json()
        setMessage(error.error || 'Google Sheets 동기화에 실패했습니다.')
      }
    } catch (error) {
      setMessage('서버 연결 실패')
      console.error('Sync error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">뉴스레터 구독자 관리</h1>
        
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">관리자 인증</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">관리자 키</label>
              <input
                type="password"
                value={authKey}
                onChange={(e) => setAuthKey(e.target.value)}
                placeholder="관리자 키를 입력하세요"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              />
            </div>
            <Button onClick={fetchSubscribers} disabled={loading}>
              {loading ? '로딩중...' : '구독자 조회'}
            </Button>
          </div>
        </div>

        {message && (
          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm">{message}</p>
          </div>
        )}

        {subscribers.length > 0 && (
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">구독자 목록 ({subscribers.length}명)</h2>
              <Button onClick={syncToSheets} disabled={loading} variant="outline">
                Google Sheets 동기화
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3">이메일</th>
                    <th className="text-left py-2 px-3">구독일시</th>
                    <th className="text-left py-2 px-3">타임스탬프</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-2 px-3 font-mono text-sm">{subscriber.email}</td>
                      <td className="py-2 px-3 text-sm">{subscriber.date}</td>
                      <td className="py-2 px-3 text-xs text-muted-foreground">{subscriber.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 text-sm text-muted-foreground">
          <h3 className="font-medium mb-2">사용법:</h3>
          <ul className="space-y-1">
            <li>• 관리자 키: <code className="bg-muted px-1 py-0.5 rounded">admin-secret-key</code></li>
            <li>• 구독자 조회: 현재 저장된 뉴스레터 구독자 목록을 확인합니다</li>
            <li>• Google Sheets 동기화: 구독자 데이터를 Google Sheets에 백업합니다</li>
          </ul>
        </div>
      </div>
    </div>
  )
}