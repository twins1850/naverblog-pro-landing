import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "커뮤니티 | AutoToolsHub - Blog Pro 사용자 소통 공간",
  description: "Blog Pro 사용자들과 함께 성과를 공유하고, 노하우를 교환하는 커뮤니티입니다. 실시간 질문답변과 성공사례를 확인하세요.",
  keywords: [
    "블로그 자동화 커뮤니티",
    "Blog Pro 사용자",
    "수익 공유",
    "블로그 노하우",
    "자동화 팁"
  ]
};

interface CommunityPost {
  id: string;
  author: string;
  title: string;
  content: string;
  category: 'success' | 'question' | 'tip' | 'review';
  likes: number;
  comments: number;
  timeAgo: string;
  revenue?: number;
  period?: string;
  verified: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
}

const communityPosts: CommunityPost[] = [
  {
    id: "1",
    author: "김○○",
    title: "3개월만에 월 45만원 달성! Blog Pro 후기",
    content: "완전 초보에서 시작해서 3개월만에 월 45만원을 달성했어요! 처음엔 반신반의했는데 정말 놀라운 결과네요. 특히 네이버 블로그 자동 업로드 기능이 정말 혁신적이었습니다. 매일 포스팅하던 시간을 다른 일에 투자할 수 있게 되었어요.",
    category: "success",
    likes: 127,
    comments: 23,
    timeAgo: "2시간 전",
    revenue: 450000,
    period: "3개월",
    verified: true
  },
  {
    id: "2", 
    author: "박○○",
    title: "ChatGPT 프롬프트 최적화 팁 공유",
    content: "블로그 자동화에서 가장 중요한 건 프롬프트 작성이더라구요. 제가 사용하는 고급 프롬프트들을 공유합니다. 이거 사용하면 글 품질이 확연히 달라져요!",
    category: "tip",
    likes: 89,
    comments: 15,
    timeAgo: "5시간 전",
    verified: true
  },
  {
    id: "3",
    author: "이○○",
    title: "YouTube 연동 후 수익 2배 증가!",
    content: "YouTube와 블로그를 연동한 후 정말 대박났어요! 한 달 수익이 38만원에서 67만원으로 껑충 뛰었습니다. 영상 하나로 블로그 포스트 5개가 자동으로 생성되니까 효율이 엄청나네요.",
    category: "success",
    likes: 156,
    comments: 31,
    timeAgo: "1일 전",
    revenue: 670000,
    period: "5개월",
    verified: true
  },
  {
    id: "4",
    author: "최○○",
    title: "키워드 분석 도구 추천 좀 해주세요",
    content: "Blog Pro와 함께 사용할만한 키워드 분석 도구가 있을까요? 지금은 네이버 키워드 플래너만 사용하고 있는데, 더 정확한 분석이 필요해서요.",
    category: "question",
    likes: 12,
    comments: 8,
    timeAgo: "3일 전",
    verified: false
  },
  {
    id: "5",
    author: "정○○",
    title: "Blog Pro vs 타 프로그램 솔직 비교 후기",
    content: "다른 자동화 도구들도 써봤는데, Blog Pro가 확실히 다르더라구요. 특히 한국 시장에 특화된 기능들이 정말 유용해요. 가격 대비 성능이 최고인 것 같습니다.",
    category: "review",
    likes: 78,
    comments: 19,
    timeAgo: "1주 전",
    verified: true
  }
];

const featuredMembers = [
  {
    name: "김○○",
    revenue: 450000,
    period: "3개월",
    specialty: "네이버 블로그 최적화",
    posts: 12,
    likes: 456
  },
  {
    name: "박○○", 
    revenue: 680000,
    period: "5개월",
    specialty: "YouTube 연동 전문가",
    posts: 8,
    likes: 328
  },
  {
    name: "이○○",
    revenue: 920000, 
    period: "7개월",
    specialty: "ChatGPT 프롬프트 마스터",
    posts: 15,
    likes: 612
  }
];

const liveChat = [
  { user: "신규유저123", message: "Blog Pro 구매를 고민중인데, 진짜 효과 있나요?", time: "방금 전" },
  { user: "김○○", message: "저는 3개월만에 월 45만원 달성했어요!", time: "1분 전" },
  { user: "블로그마스터", message: "YouTube 연동 기능이 정말 대박이에요 ㅎㅎ", time: "2분 전" },
  { user: "수익왕", message: "초보자도 쉽게 따라할 수 있어서 좋아요", time: "3분 전" },
  { user: "자동화닌자", message: "질문있으시면 언제든 올려주세요~", time: "5분 전" }
];

function CategoryBadge({ category }: { category: CommunityPost['category'] }) {
  const styles = {
    success: "bg-green-100 text-green-800",
    question: "bg-blue-100 text-blue-800", 
    tip: "bg-yellow-100 text-yellow-800",
    review: "bg-purple-100 text-purple-800"
  };
  
  const labels = {
    success: "성공사례",
    question: "질문", 
    tip: "팁/노하우",
    review: "후기"
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[category]}`}>
      {labels[category]}
    </span>
  );
}

function PostCard({ post }: { post: CommunityPost }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{post.author.charAt(0)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{post.author}</span>
              {post.verified && (
                <span className="text-blue-500 text-sm">✓</span>
              )}
            </div>
            <span className="text-sm text-gray-500">{post.timeAgo}</span>
          </div>
        </div>
        <CategoryBadge category={post.category} />
      </div>
      
      <h3 className="font-bold text-lg text-gray-900 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
      
      {post.revenue && post.period && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">달성 수익:</span>
            <span className="font-bold text-green-600">{(post.revenue / 10000).toFixed(0)}만원</span>
            <span className="text-gray-600">기간:</span>
            <span className="font-medium text-gray-900">{post.period}</span>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
            <span>👍</span>
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
            <span>💬</span>
            <span>{post.comments}</span>
          </button>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          자세히 보기
        </button>
      </div>
    </div>
  );
}

function FeaturedMember({ member }: { member: typeof featuredMembers[0] }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-blue-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">{member.name.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{member.name}</h4>
          <span className="text-sm text-gray-600">{member.specialty}</span>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">월 수익:</span>
          <span className="font-bold text-green-600">{(member.revenue / 10000).toFixed(0)}만원</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">경험:</span>
          <span className="font-medium">{member.period}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">게시글:</span>
          <span className="text-blue-600">{member.posts}개</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">좋아요:</span>
          <span className="text-red-500">{member.likes}개</span>
        </div>
      </div>
    </div>
  );
}

export default function Community() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AutoToolsHub 커뮤니티
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Blog Pro 사용자들과 함께 성과를 공유하고 성장하세요
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              새 글 작성
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              성과 인증하기
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
            <div className="text-gray-600">활성 멤버</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">5,284</div>
            <div className="text-gray-600">누적 게시글</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">768%</div>
            <div className="text-gray-600">평균 ROI</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">94%</div>
            <div className="text-gray-600">성공률</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium whitespace-nowrap">
                전체
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 whitespace-nowrap">
                성공사례
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 whitespace-nowrap">
                질문답변
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 whitespace-nowrap">
                팁/노하우
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 whitespace-nowrap">
                후기/리뷰
              </button>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {communityPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                더 많은 글 보기
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Members */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">이달의 성과왕</h2>
              <div className="space-y-4">
                {featuredMembers.map((member, index) => (
                  <FeaturedMember key={index} member={member} />
                ))}
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">실시간 채팅</h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {liveChat.map((chat, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-blue-600">{chat.user}</span>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 ml-2">{chat.message}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                  전송
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">빠른 링크</h2>
              <div className="space-y-2">
                <a href="/blog" className="block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  📖 블로그 가이드
                </a>
                <a href="/dashboard" className="block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  📊 성과 대시보드
                </a>
                <a href="/tutorials" className="block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  🎥 동영상 튜토리얼
                </a>
                <a href="/support" className="block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  🛟 고객지원
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}