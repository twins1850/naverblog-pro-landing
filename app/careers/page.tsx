import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Code, 
  Palette, 
  TrendingUp,
  Coffee,
  Lightbulb,
  Globe
} from "lucide-react";

export const metadata: Metadata = {
  title: "채용정보 | Blog Pro - 블로그자동화 전문가 채용",
  description: "Blog Pro에서 블로그자동화 전문가를 모집합니다. 네이버블로그자동화, AI댓글자동화 분야의 개발자, 마케터를 찾습니다.",
};

export default function CareersPage() {
  const jobOpenings = [
    {
      title: "AI/ML 개발자",
      department: "기술팀",
      location: "서울 · 원격",
      type: "정규직",
      experience: "3년 이상",
      salary: "협의",
      description: "ChatGPT, Gemini AI를 활용한 블로그자동화 시스템 개발",
      skills: ["Python", "TensorFlow", "OpenAI API", "자연어처리", "머신러닝"],
      responsibilities: [
        "AI 기반 콘텐츠 생성 알고리즘 개발",
        "자연어 처리 모델 최적화",
        "댓글 및 대댓글 자동화 시스템 개발",
        "AI 모델 성능 향상 및 품질 관리"
      ]
    },
    {
      title: "백엔드 개발자",
      department: "기술팀",
      location: "서울 · 원격",
      type: "정규직",
      experience: "2년 이상",
      salary: "협의",
      description: "블로그자동화 플랫폼의 안정적인 백엔드 시스템 구축",
      skills: ["Node.js", "Python", "AWS", "Database", "API 설계"],
      responsibilities: [
        "마이크로서비스 아키텍처 설계",
        "네이버 블로그 API 연동 개발",
        "대용량 트래픽 처리 시스템 구축",
        "서버 보안 및 성능 최적화"
      ]
    },
    {
      title: "프론트엔드 개발자",
      department: "기술팀",
      location: "서울 · 원격",
      type: "정규직",
      experience: "2년 이상",
      salary: "협의",
      description: "직관적이고 사용하기 쉬운 블로그자동화 대시보드 개발",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "UI/UX"],
      responsibilities: [
        "블로그 관리 대시보드 UI/UX 개발",
        "실시간 데이터 시각화 구현",
        "반응형 웹 인터페이스 구축",
        "사용자 경험 개선 및 최적화"
      ]
    },
    {
      title: "디지털 마케터",
      department: "마케팅팀",
      location: "서울",
      type: "정규직",
      experience: "2년 이상",
      salary: "협의",
      description: "블로그자동화 서비스의 성장을 이끌 마케팅 전문가",
      skills: ["SEO", "구글광고", "네이버광고", "콘텐츠마케팅", "데이터분석"],
      responsibilities: [
        "블로그자동화 키워드 SEO 최적화",
        "구글/네이버 광고 캠페인 관리",
        "마케팅 성과 분석 및 개선",
        "브랜드 인지도 향상 전략 수립"
      ]
    }
  ];

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "경쟁력 있는 급여",
      description: "시장 수준 이상의 급여와 성과급"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "유연한 근무",
      description: "원격근무, 자율출퇴근 지원"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "성장 기회",
      description: "AI 자동화 분야 최신 기술 경험"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "복리후생",
      description: "건강보험, 교육비 지원, 휴가비"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "혁신 문화",
      description: "창의적 아이디어 장려, 자율적 업무"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "글로벌 비전",
      description: "해외 시장 진출 기회"
    }
  ];

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">함께 성장할 동료를 찾습니다</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Blog Pro는 AI 기반 블로그자동화 분야의 선두주자로, 
              혁신적인 기술로 사용자의 블로그 운영을 혁신하고 있습니다.
            </p>
          </div>

          {/* Company Culture */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">우리의 미션</h2>
                <p className="text-muted-foreground mb-4">
                  AI 기술을 활용하여 블로그 운영의 모든 과정을 자동화하고, 
                  누구나 쉽게 성공적인 블로그를 운영할 수 있는 세상을 만들어갑니다.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 혁신적인 AI 자동화 기술 개발</li>
                  <li>• 사용자 중심의 서비스 제공</li>
                  <li>• 지속 가능한 블로그 생태계 구축</li>
                  <li>• 전 세계로의 서비스 확장</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-muted-foreground">활성 사용자</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-muted-foreground">서비스 안정성</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-purple-600">4개</div>
                  <div className="text-sm text-muted-foreground">핵심 자동화 모듈</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-muted-foreground">무중단 서비스</div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Blog Pro에서 일하는 이유</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3 text-blue-600">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Job Openings */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">채용 공고</h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="outline">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {job.type}
                          </Badge>
                          <Badge variant="outline">
                            경력 {job.experience}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">{job.description}</CardDescription>
                      </div>
                      <Button asChild>
                        <Link href="/contact">지원하기</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">주요 업무</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {job.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">필요 기술</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">지원 절차</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">이력서 제출</h3>
                <p className="text-sm text-muted-foreground">관심 있는 포지션에 이력서와 포트폴리오 제출</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">서류 검토</h3>
                <p className="text-sm text-muted-foreground">1-2주 내 서류 검토 후 연락드립니다</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">면접 진행</h3>
                <p className="text-sm text-muted-foreground">1-2차 면접 (기술면접 + 컬처핏)</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">최종 합격</h3>
                <p className="text-sm text-muted-foreground">처우 협의 후 입사일 결정</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Blog Pro와 함께 미래를 만들어가세요</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              AI 블로그자동화 분야의 혁신을 주도하며, 
              전 세계 사용자들의 블로그 경험을 변화시킬 동료를 기다립니다.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
              <div className="text-center">
                <div className="text-sm text-blue-200">지원 문의</div>
                <div className="font-semibold">jireh202503@gmail.com</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-blue-200">전화 상담</div>
                <div className="font-semibold">010-4248-1850</div>
              </div>
            </div>

            <div className="space-x-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">지원서 제출하기</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/about">회사 더 알아보기</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}