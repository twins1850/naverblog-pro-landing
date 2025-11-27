import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Clock, 
  Users, 
  ChevronRight, 
  BookOpen,
  Video,
  Download,
  Star,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "동영상 튜토리얼 | BlogPro - 단계별 학습 가이드",
  description: "BlogPro 4모듈 자동화 시스템을 완벽하게 마스터할 수 있는 단계별 동영상 튜토리얼. 초보자부터 고급 사용자까지 모든 수준에 맞는 학습 자료를 제공합니다.",
  keywords: [
    "BlogPro 튜토리얼",
    "블로그 자동화 강의",
    "AI 글쓰기 가이드",
    "네이버 블로그 자동화 교육",
    "ChatGPT 블로그 활용법"
  ]
};

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'setup' | 'writing' | 'comments' | 'neighbor' | 'replies' | 'optimization';
  thumbnail: string;
  views: number;
  rating: number;
  isNew?: boolean;
  isPro?: boolean;
}

const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "BlogPro 시작하기 - 계정 설정 및 기본 셋업",
    description: "BlogPro 설치부터 네이버 블로그 연동, 기본 설정까지 처음 시작하는 분들을 위한 완벽 가이드",
    duration: "15:24",
    level: "beginner",
    category: "setup",
    thumbnail: "/images/youtube-blog-automation-tutorial.svg",
    views: 12450,
    rating: 4.9,
    isNew: true
  },
  {
    id: "2", 
    title: "4모듈 자동화 시스템 완벽 이해하기",
    description: "서로이웃 → 댓글 → 대댓글 → 글쓰기 순서로 진행되는 4모듈 시스템의 원리와 설정 방법",
    duration: "22:15",
    level: "beginner",
    category: "setup",
    thumbnail: "/images/youtube-blog-automation-tutorial.svg",
    views: 9830,
    rating: 4.8
  },
  {
    id: "3",
    title: "ChatGPT 5.0 기반 고품질 글쓰기 마스터",
    description: "AI가 평균 2,300자의 자연스러운 블로그 글을 작성하는 방법과 커스텀 프롬프트 활용법",
    duration: "18:45",
    level: "intermediate",
    category: "writing", 
    thumbnail: "/images/chatgpt-blog-writing-guide.svg",
    views: 8765,
    rating: 4.9,
    isPro: true
  },
  {
    id: "4",
    title: "스마트 댓글 자동화 - 진짜 소통하는 AI",
    description: "Gemini AI가 블로그 글을 읽고 분석해서 개인화된 댓글을 작성하는 고급 기술",
    duration: "16:30", 
    level: "intermediate",
    category: "comments",
    thumbnail: "/images/blog/thumbnails/comment-automation.svg",
    views: 7234,
    rating: 4.7
  },
  {
    id: "5",
    title: "서로이웃 자동화 - 수락률 최대화 전략",
    description: "상대방의 최신글을 분석해서 개인화된 서로이웃 메시지를 보내는 방법과 팁",
    duration: "14:12",
    level: "intermediate", 
    category: "neighbor",
    thumbnail: "/images/blog/thumbnails/neighbor-automation.svg",
    views: 6890,
    rating: 4.8
  },
  {
    id: "6",
    title: "세계 최초 대댓글 자동화 완전 정복",
    description: "업계 유일! 대댓글까지 자동으로 작성해서 재방문률을 300% 증가시키는 독점 기술",
    duration: "20:35",
    level: "advanced",
    category: "replies",
    thumbnail: "/images/blog/thumbnails/reply-automation-exclusive.svg", 
    views: 5432,
    rating: 5.0,
    isPro: true,
    isNew: true
  },
  {
    id: "7",
    title: "멀티계정 운영 마스터 클래스",
    description: "여러 네이버 블로그 계정을 동시에 관리하여 노출과 수익을 극대화하는 고급 전략",
    duration: "25:18",
    level: "advanced",
    category: "optimization", 
    thumbnail: "/images/blog/thumbnails/multi-account-management.svg",
    views: 4321,
    rating: 4.9,
    isPro: true
  },
  {
    id: "8",
    title: "수익 최적화 전략 - 월 100만원 달성 로드맵",
    description: "실제 사용자들의 성공 사례를 바탕으로 한 단계별 수익 증대 전략과 노하우",
    duration: "28:42",
    level: "advanced",
    category: "optimization",
    thumbnail: "/images/blog-monetization-statistics.svg",
    views: 3987,
    rating: 4.8,
    isPro: true
  }
];

const categories = {
  setup: { name: "설정 및 시작", icon: "⚙️", color: "bg-blue-100 text-blue-800" },
  writing: { name: "글쓰기 자동화", icon: "✍️", color: "bg-green-100 text-green-800" },
  comments: { name: "댓글 자동화", icon: "💬", color: "bg-purple-100 text-purple-800" },
  neighbor: { name: "서로이웃", icon: "👥", color: "bg-orange-100 text-orange-800" },
  replies: { name: "대댓글", icon: "🔄", color: "bg-pink-100 text-pink-800" },
  optimization: { name: "최적화", icon: "📈", color: "bg-indigo-100 text-indigo-800" }
};

const levels = {
  beginner: { name: "초급", color: "bg-green-100 text-green-800" },
  intermediate: { name: "중급", color: "bg-yellow-100 text-yellow-800" }, 
  advanced: { name: "고급", color: "bg-red-100 text-red-800" }
};

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <Link 
            href="/community" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            커뮤니티로 돌아가기
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              🎥 BlogPro 동영상 튜토리얼
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              4모듈 자동화 시스템을 완벽하게 마스터하는 단계별 학습 가이드
            </p>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Video className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">8개</div>
              <div className="text-sm text-muted-foreground">강의</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">2.7시간</div>
              <div className="text-sm text-muted-foreground">총 런타임</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">48K+</div>
              <div className="text-sm text-muted-foreground">총 수강생</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">평균 평점</div>
            </CardContent>
          </Card>
        </div>

        {/* 튜토리얼 목록 */}
        <div className="space-y-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  {/* 썸네일 */}
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      {tutorial.isNew && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          NEW
                        </Badge>
                      )}
                      {tutorial.isPro && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500">
                          PRO
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* 내용 */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{tutorial.title}</h3>
                      <p className="text-muted-foreground">{tutorial.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className={categories[tutorial.category].color}>
                        {categories[tutorial.category].icon} {categories[tutorial.category].name}
                      </Badge>
                      <Badge className={levels[tutorial.level].color}>
                        {levels[tutorial.level].name}
                      </Badge>
                    </div>
                  </div>

                  {/* 정보 및 액션 */}
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {tutorial.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {tutorial.views.toLocaleString()}명 시청
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2 fill-current text-yellow-500" />
                        {tutorial.rating}/5.0
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        시청하기
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        강의 자료
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 학습 로드맵 */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              📚 추천 학습 순서
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</div>
                <div className="flex-1">
                  <div className="font-medium">기본 설정 마스터 (1-2강)</div>
                  <div className="text-sm text-muted-foreground">BlogPro 설치 및 네이버 블로그 연동</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</div>
                <div className="flex-1">
                  <div className="font-medium">글쓰기 자동화 익히기 (3강)</div>
                  <div className="text-sm text-muted-foreground">ChatGPT 5.0 기반 고품질 콘텐츠 생성</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</div>
                <div className="flex-1">
                  <div className="font-medium">소통 자동화 완성 (4-6강)</div>
                  <div className="text-sm text-muted-foreground">댓글, 서로이웃, 대댓글 자동화로 네트워크 구축</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</div>
                <div className="flex-1">
                  <div className="font-medium">고급 최적화 전략 (7-8강)</div>
                  <div className="text-sm text-muted-foreground">멀티계정 운영 및 수익 극대화</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 지원 안내 */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-900">
                🎯 1:1 맞춤 지원 서비스
              </h3>
              <p className="text-blue-700">
                튜토리얼을 보고도 어려운 부분이 있으시면 언제든 문의해주세요!<br/>
                BlogPro 전문가가 직접 1:1로 도움을 드립니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/support" className="flex items-center">
                    🛟 고객지원 센터
                  </Link>
                </Button>
                <Button variant="outline">
                  <a href="http://pf.kakao.com/_ShwJn/chat" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    💬 카카오톡 문의
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}