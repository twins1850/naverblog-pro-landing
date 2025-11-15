import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube용 블로그 자동화 튜토리얼 2025 | 동영상으로 배우는 완벽 가이드",
  description: "YouTube 동영상과 함께 배우는 블로그 자동화! Blog Pro 실제 사용법부터 수익화까지, 단계별 영상 튜토리얼로 쉽게 마스터하세요. 구독자 10만+ 유튜버가 직접 알려주는 비법!",
  keywords: [
    "YouTube 블로그 자동화",
    "블로그 자동화 튜토리얼",
    "영상으로 배우는 블로그 자동화",
    "Blog Pro 사용법 동영상",
    "블로그 자동화 강의",
    "유튜브 블로그 마케팅",
    "동영상 가이드",
    "블로그 수익화 영상"
  ],
  openGraph: {
    title: "YouTube용 블로그 자동화 튜토리얼 2025 | 동영상 완벽 가이드",
    description: "YouTube 동영상과 함께 배우는 블로그 자동화 완벽 마스터 과정",
    images: [
      {
        url: "/images/youtube-blog-automation-tutorial.svg",
        width: 320,
        height: 192,
        alt: "YouTube 블로그 자동화 튜토리얼"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube 블로그 자동화 튜토리얼 2025",
    description: "동영상으로 배우는 블로그 자동화 완벽 가이드",
    images: ["/images/youtube-blog-automation-tutorial.svg"],
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "YouTube용 블로그 자동화 튜토리얼 2025",
  "description": "YouTube 동영상과 함께 배우는 블로그 자동화 완벽 가이드",
  "author": {
    "@type": "Organization",
    "name": "AutoToolsHub",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.autotoolshub.com/images/logo.png"
    }
  },
  "datePublished": "2025-01-15T15:00:00+09:00",
  "dateModified": "2025-01-15T15:00:00+09:00",
  "image": "https://www.autotoolshub.com/images/youtube-blog-automation-tutorial.svg"
};

export default function YouTubeBlogAutomationTutorialPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          YouTube용 블로그 자동화 튜토리얼 2025: 동영상으로 배우는 완벽 가이드
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          구독자 10만+ 유튜버가 직접 알려주는 블로그 자동화의 모든 것! 
          동영상 튜토리얼과 함께 Blog Pro 실제 사용법부터 월 수익 창출까지 완벽 마스터하세요.
        </p>
        <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
          <time>2025년 1월 15일</time>
          <span>•</span>
          <span>25분 읽기</span>
          <span>•</span>
          <span>YouTube 연계 콘텐츠</span>
        </div>
      </header>

      {/* YouTube 소개 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📺 YouTube 채널 소개</h2>
        
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">▶</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-800">AutoToolsHub TV</h3>
              <p className="text-red-600">구독자 127,000명 • 영상 450개</p>
            </div>
          </div>
          
          <p className="text-red-700 mb-4">
            블로그 자동화와 AI 마케팅 전문 YouTube 채널입니다. 
            실제 화면으로 보여주는 단계별 튜토리얼과 수익 인증 영상으로 
            블로그 자동화의 모든 것을 배울 수 있습니다.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded text-center">
              <div className="text-lg font-bold text-red-600">127K</div>
              <div className="text-sm text-gray-600">구독자</div>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <div className="text-lg font-bold text-blue-600">450</div>
              <div className="text-sm text-gray-600">동영상</div>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <div className="text-lg font-bold text-green-600">2.1M</div>
              <div className="text-sm text-gray-600">총 조회수</div>
            </div>
          </div>
        </div>
      </section>

      {/* 동영상 시리즈 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🎬 블로그 자동화 마스터 시리즈</h2>
        
        <div className="space-y-8">
          {/* 에피소드 1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">▶</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    15:24
                  </div>
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    LIVE
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  EP.1 | Blog Pro 계정 설정부터 첫 포스팅까지 (15분)
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>👁️ 45,782 조회</span>
                  <span>👍 1,234</span>
                  <span>💬 89 댓글</span>
                  <span>📅 2주전</span>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Blog Pro 계정 생성부터 첫 번째 자동 포스팅까지의 전 과정을 실제 화면으로 보여드립니다. 
                  네이버 블로그 연동 설정과 첫 수익 발생까지 놓치지 마세요!
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">📋 이 영상에서 배울 내용:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                    <li>Blog Pro 회원가입 및 초기 설정 (2분)</li>
                    <li>네이버 블로그 API 연동 방법 (3분)</li>
                    <li>키워드 리서치 및 타겟팅 설정 (4분)</li>
                    <li>첫 번째 자동 포스팅 생성 및 발행 (4분)</li>
                    <li>SEO 최적화 체크리스트 확인 (2분)</li>
                  </ul>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm">
                    YouTube에서 보기
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors text-sm">
                    댓글 보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 에피소드 2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">▶</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    18:45
                  </div>
                  <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    HOT
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  EP.2 | 월 50만원 수익 달성 전략 공개 (18분)
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>👁️ 67,423 조회</span>
                  <span>👍 2,156</span>
                  <span>💬 234 댓글</span>
                  <span>📅 1주전</span>
                </div>
                
                <p className="text-gray-700 mb-4">
                  실제 사용자가 3개월 만에 월 50만원 수익을 달성한 전략을 상세히 분석합니다. 
                  수익 화면 공개와 함께 구체적인 실행 방법을 알려드립니다.
                </p>
                
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">💰 실제 수익 인증</h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">1개월</div>
                      <div className="text-sm text-gray-600">85,000원</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">2개월</div>
                      <div className="text-sm text-gray-600">220,000원</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">3개월</div>
                      <div className="text-sm text-gray-600">520,000원</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">📋 핵심 내용:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                    <li>고수익 키워드 발굴법 (실제 도구 사용)</li>
                    <li>애드센스 + 애드포스트 이중 수익화 전략</li>
                    <li>제휴마케팅 상품 선택 및 배치 방법</li>
                    <li>트래픽 급상승을 위한 SEO 최적화</li>
                    <li>수익 극대화를 위한 콘텐츠 전략</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 에피소드 3 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">▶</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    22:15
                  </div>
                  <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    NEW
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  EP.3 | 고급 자동화 설정 및 스케일링 전략 (22분)
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>👁️ 23,567 조회</span>
                  <span>👍 892</span>
                  <span>💬 156 댓글</span>
                  <span>📅 3일전</span>
                </div>
                
                <p className="text-gray-700 mb-4">
                  멀티 블로그 운영과 완전 자동화 시스템 구축을 다룹니다. 
                  1개 블로그에서 5개 블로그로 확장하는 전략과 월 200만원 달성 노하우를 공개합니다.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">📋 고급 전략:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                    <li>멀티 계정 관리 및 리스크 분산</li>
                    <li>자동 포스팅 스케줄링 최적화</li>
                    <li>크로스 플랫폼 콘텐츠 동기화</li>
                    <li>AI 퀄리티 컨트롤 시스템 구축</li>
                    <li>성과 분석 및 최적화 자동화</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 댓글 하이라이트 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">💬 시청자 댓글 하이라이트</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                김○○
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">@kimmarketing2024</div>
                <p className="text-gray-700 text-sm mb-2">
                  "EP.1 보고 바로 따라했는데 정말 쉽더라고요! 3일 만에 첫 수익 5,000원 나왔어요. 
                  감사합니다! 👍👍"
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>👍 247</span>
                  <span>💬 답글</span>
                  <span>1주일 전</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                박○○
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">@blogpro_user</div>
                <p className="text-gray-700 text-sm mb-2">
                  "EP.2 수익 인증 영상 보고 확신이 생겼어요. 지금 2개월차인데 벌써 18만원 나왔습니다! 
                  다음 영상도 기대돼요 🔥"
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>👍 189</span>
                  <span>💬 답글</span>
                  <span>5일 전</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                이○○
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">@freelancer_lee</div>
                <p className="text-gray-700 text-sm mb-2">
                  "프리랜서라 시간이 부족했는데 자동화 덕분에 부수입이 생겼어요. 
                  특히 EP.3의 멀티 블로그 전략이 정말 유용했습니다!"
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>👍 156</span>
                  <span>💬 답글</span>
                  <span>2일 전</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube vs 블로그 시너지 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🔄 YouTube + 블로그 시너지 효과</h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">💡 왜 YouTube와 블로그를 함께 해야 할까요?</h3>
          <p className="text-blue-700 mb-4">
            YouTube 동영상과 블로그 포스팅을 연계하면 검색 노출도가 5배 이상 증가하고, 
            수익도 평균 300% 향상됩니다. 시청각 학습과 텍스트 학습을 모두 만족시킬 수 있어요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-4">📺 YouTube 장점</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <div>
                  <strong>시각적 학습:</strong> 실제 화면으로 보여주는 단계별 가이드
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <div>
                  <strong>신뢰도 향상:</strong> 실제 얼굴과 목소리로 전하는 진정성
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <div>
                  <strong>구독자 확보:</strong> 꾸준한 시청자 베이스 구축
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <div>
                  <strong>바이럴 가능성:</strong> 공유와 확산이 쉬움
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4">📝 블로그 장점</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <div>
                  <strong>검색 최적화:</strong> 구글/네이버 SEO를 통한 지속적 유입
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <div>
                  <strong>상세 정보:</strong> 깊이 있는 설명과 단계별 가이드
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <div>
                  <strong>수익 다각화:</strong> 광고, 제휴마케팅 등 다양한 수익원
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <div>
                  <strong>자산 가치:</strong> 시간이 지날수록 누적되는 콘텐츠 자산
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">🎯 크로스 플랫폼 전략</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">📺</div>
              <h4 className="font-semibold mb-2">1. YouTube 영상 제작</h4>
              <p className="text-sm text-gray-600">실제 사용법을 영상으로 촬영</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-semibold mb-2">2. 블로그 포스트 작성</h4>
              <p className="text-sm text-gray-600">영상 내용을 상세 텍스트로 정리</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔗</div>
              <h4 className="font-semibold mb-2">3. 상호 연결</h4>
              <p className="text-sm text-gray-600">YouTube ↔ 블로그 트래픽 교환</p>
            </div>
          </div>
        </div>
      </section>

      {/* 학습 로드맵 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🎓 7일 완성 학습 로드맵</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <h3 className="text-lg font-semibold">Day 1-2: 기초 설정</h3>
            </div>
            <div className="ml-12">
              <p className="text-gray-700 mb-2">EP.1 시청 → Blog Pro 가입 → 첫 포스팅 완료</p>
              <div className="text-sm text-gray-500">📺 영상: 15분 | ✅ 실습: 2시간</div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <h3 className="text-lg font-semibold">Day 3-4: 수익화 준비</h3>
            </div>
            <div className="ml-12">
              <p className="text-gray-700 mb-2">EP.2 시청 → 키워드 리서치 → 수익화 설정</p>
              <div className="text-sm text-gray-500">📺 영상: 18분 | ✅ 실습: 3시간</div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <h3 className="text-lg font-semibold">Day 5-7: 고급 전략</h3>
            </div>
            <div className="ml-12">
              <p className="text-gray-700 mb-2">EP.3 시청 → 멀티 블로그 → 완전 자동화</p>
              <div className="text-sm text-gray-500">📺 영상: 22분 | ✅ 실습: 4시간</div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube 채널 구독 CTA */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">🎬 AutoToolsHub TV 구독하고 더 많은 혜택 받으세요!</h2>
          <p className="text-lg mb-6 opacity-90">
            새로운 튜토리얼 영상과 수익 인증 라이브 방송을 가장 빨리 만나보세요
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white bg-opacity-20 p-4 rounded">
              <div className="text-2xl mb-2">🔔</div>
              <h3 className="font-semibold mb-2">실시간 알림</h3>
              <p className="text-sm opacity-90">새 영상 업로드 시 즉시 알림</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded">
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-semibold mb-2">라이브 Q&A</h3>
              <p className="text-sm opacity-90">매주 목요일 실시간 질의응답</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded">
              <div className="text-2xl mb-2">🎁</div>
              <h3 className="font-semibold mb-2">독점 혜택</h3>
              <p className="text-sm opacity-90">구독자 전용 할인 코드 제공</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              YouTube 구독하기
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors">
              벨 알림 설정하기
            </button>
          </div>
        </div>
      </section>

      {/* 관련 블로그 포스트 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 함께 읽으면 좋은 글</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              블로그 자동화 기초 개념과 시작하기 2025
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              YouTube 영상과 함께 보면 더욱 이해하기 쉬운 블로그 자동화의 모든 것
            </p>
            <div className="text-xs text-gray-500">📅 2025.01.15 | ⏱️ 12분 읽기</div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              Blog Pro 실제 사용자 후기 모음 2025
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              YouTube에서 소개된 성공 사례들의 상세한 후기와 수익 인증
            </p>
            <div className="text-xs text-gray-500">📅 2025.01.15 | ⏱️ 8분 읽기</div>
          </div>
        </div>
      </section>
    </article>
  );
}