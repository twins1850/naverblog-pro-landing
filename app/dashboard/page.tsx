import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "성과 대시보드 | AutoToolsHub - 블로그 수익 분석",
  description: "Blog Pro 사용자들의 실시간 성과 분석 대시보드. 월별 수익, 트래픽 증가율, ROI 분석을 한눈에 확인하세요.",
  keywords: [
    "블로그 성과 분석",
    "수익 대시보드",
    "ROI 측정",
    "블로그 트래픽 분석",
    "Blog Pro 성과"
  ]
};

interface PerformanceMetrics {
  totalUsers: number;
  monthlyRevenue: number;
  trafficGrowth: number;
  conversionRate: number;
  averageROI: number;
}

interface UserStory {
  name: string;
  period: string;
  startRevenue: number;
  currentRevenue: number;
  growthRate: number;
  category: string;
}

const mockMetrics: PerformanceMetrics = {
  totalUsers: 1247,
  monthlyRevenue: 52840000,
  trafficGrowth: 234.5,
  conversionRate: 23.8,
  averageROI: 768
};

const userStories: UserStory[] = [
  {
    name: "김○○",
    period: "3개월",
    startRevenue: 80000,
    currentRevenue: 450000,
    growthRate: 462.5,
    category: "초보자"
  },
  {
    name: "박○○",
    period: "5개월", 
    startRevenue: 120000,
    currentRevenue: 680000,
    growthRate: 466.7,
    category: "주부"
  },
  {
    name: "이○○",
    period: "7개월",
    startRevenue: 200000,
    currentRevenue: 1200000,
    growthRate: 500,
    category: "직장인"
  },
  {
    name: "최○○",
    period: "4개월",
    startRevenue: 50000,
    currentRevenue: 380000,
    growthRate: 660,
    category: "대학생"
  },
  {
    name: "정○○",
    period: "6개월",
    startRevenue: 150000,
    currentRevenue: 920000,
    growthRate: 513.3,
    category: "프리랜서"
  }
];

interface ContentMetrics {
  postTitle: string;
  views: number;
  engagement: number;
  conversionRate: number;
  revenue: number;
  publishDate: string;
}

const contentPerformance: ContentMetrics[] = [
  {
    postTitle: "네이버 블로그 자동 업로드 완벽 가이드 2025",
    views: 15680,
    engagement: 8.4,
    conversionRate: 12.3,
    revenue: 2840000,
    publishDate: "2024-11-10"
  },
  {
    postTitle: "ChatGPT로 블로그 글쓰기 10배 빠르게 하는 방법",
    views: 12340,
    engagement: 9.1,
    conversionRate: 15.7,
    revenue: 3200000,
    publishDate: "2024-11-08"
  },
  {
    postTitle: "Blog Pro 실제 후기: 3개월만에 월 45만원 달성 비법",
    views: 18920,
    engagement: 11.2,
    conversionRate: 18.9,
    revenue: 4560000,
    publishDate: "2024-11-05"
  },
  {
    postTitle: "Ultimate Blog Automation Guide 2025",
    views: 8760,
    engagement: 7.8,
    conversionRate: 9.4,
    revenue: 1680000,
    publishDate: "2024-11-12"
  },
  {
    postTitle: "YouTube × 블로그 자동화 완전 연동 수익극대화 전략",
    views: 6540,
    engagement: 6.9,
    conversionRate: 8.2,
    revenue: 980000,
    publishDate: "2024-11-15"
  }
];

function MetricCard({ title, value, unit, trend, trendColor }: {
  title: string;
  value: string | number;
  unit: string;
  trend?: number;
  trendColor?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-lg text-gray-500">{unit}</span>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-sm ${trendColor || 'text-green-600'}`}>
          <span>↗</span>
          <span>{trend}% 증가</span>
        </div>
      )}
    </div>
  );
}

function ProgressBar({ current, start, className }: { 
  current: number; 
  start: number; 
  className?: string; 
}) {
  const progress = ((current - start) / start) * 100;
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(progress / 5, 100)}%` }}
      ></div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AutoToolsHub 성과 대시보드
          </h1>
          <p className="text-gray-600">
            실시간 사용자 성과와 콘텐츠 분석을 확인하세요
          </p>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="총 활성 사용자"
            value={mockMetrics.totalUsers.toLocaleString()}
            unit="명"
            trend={12.4}
          />
          <MetricCard
            title="월 총 수익"
            value={(mockMetrics.monthlyRevenue / 10000).toFixed(0)}
            unit="만원"
            trend={28.7}
          />
          <MetricCard
            title="평균 트래픽 증가"
            value={mockMetrics.trafficGrowth}
            unit="%"
            trend={15.2}
          />
          <MetricCard
            title="평균 ROI"
            value={mockMetrics.averageROI}
            unit="%"
            trend={45.8}
          />
        </div>

        {/* User Success Stories */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">실시간 사용자 성과</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">사용자</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">기간</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">시작 수익</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">현재 수익</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">성장률</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">진행도</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">분류</th>
                </tr>
              </thead>
              <tbody>
                {userStories.map((user, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">{user.name}</td>
                    <td className="py-4 px-4 text-gray-600">{user.period}</td>
                    <td className="py-4 px-4 text-gray-600">
                      {(user.startRevenue / 10000).toFixed(0)}만원
                    </td>
                    <td className="py-4 px-4 font-semibold text-green-600">
                      {(user.currentRevenue / 10000).toFixed(0)}만원
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        +{user.growthRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <ProgressBar 
                        current={user.currentRevenue} 
                        start={user.startRevenue}
                        className="w-20"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {user.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Content Performance */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">콘텐츠 성과 분석</h2>
          <div className="space-y-4">
            {contentPerformance.map((content, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900 flex-1 pr-4">{content.postTitle}</h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{content.publishDate}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">조회수</span>
                    <p className="font-semibold text-blue-600">{content.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">참여율</span>
                    <p className="font-semibold text-green-600">{content.engagement}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">전환율</span>
                    <p className="font-semibold text-purple-600">{content.conversionRate}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">수익 기여</span>
                    <p className="font-semibold text-orange-600">
                      {(content.revenue / 10000).toFixed(0)}만원
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">투자 대비 수익률 (ROI)</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">평균 초기 투자</span>
                <span className="font-semibold text-gray-900">8.7만원</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="text-gray-600">평균 3개월 수익</span>
                <span className="font-semibold text-green-600">75.5만원</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="text-gray-600">평균 ROI</span>
                <span className="font-bold text-blue-600 text-xl">{mockMetrics.averageROI}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">성과 지표</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">사용자 만족도</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">목표 달성률</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">재구매율</span>
                  <span className="font-medium">76%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Updates */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white p-6">
          <h2 className="text-xl font-bold mb-4">실시간 업데이트</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <span className="block text-blue-200">🔥 인기 급상승</span>
              <span className="font-semibold">네이버 블로그 자동 업로드 가이드</span>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <span className="block text-green-200">💰 최고 수익</span>
              <span className="font-semibold">Blog Pro 후기 (4,560만원)</span>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <span className="block text-yellow-200">⚡ 신규 등록</span>
              <span className="font-semibold">YouTube 연동 전략 (신규)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}