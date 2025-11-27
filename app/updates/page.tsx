import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Star,
  Zap,
  Shield,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "업데이트 내역 | Blog Pro - 블로그자동화 최신 버전",
  description: "Blog Pro 블로그자동화 프로그램의 최신 업데이트 내역을 확인하세요. 네이버블로그자동화 신기능, 버그 수정, 성능 개선 소식입니다.",
};

export default function UpdatesPage() {
  const updates = [
    {
      version: "v5.2.1",
      date: "2024-11-25",
      type: "major",
      status: "latest",
      title: "AI대댓글자동화 성능 대폭 개선",
      description: "세계최초 AI대댓글자동화 기능의 응답 속도와 품질이 크게 향상되었습니다.",
      features: [
        "AI대댓글 생성 속도 40% 개선",
        "더욱 자연스러운 대댓글 생성 알고리즘",
        "멀티계정 대댓글 동시 관리 최적화",
        "대댓글 품질 필터링 강화"
      ],
      fixes: [
        "특정 상황에서 대댓글이 중복 생성되는 오류 수정",
        "긴 댓글에 대한 대댓글 생성 안정성 개선"
      ],
      downloadUrl: "/download"
    },
    {
      version: "v5.1.8",
      date: "2024-11-18",
      type: "minor",
      status: "stable",
      title: "ChatGPT 5.0 지원 및 안정성 개선",
      description: "최신 ChatGPT 5.0 API 지원으로 더욱 고품질의 블로그 콘텐츠를 생성할 수 있습니다.",
      features: [
        "ChatGPT 5.0 API 완전 지원",
        "블로그AI자동화 품질 향상 (평균 2,500자)",
        "AI댓글자동화 개인화 수준 개선",
        "네트워크 연결 안정성 강화"
      ],
      fixes: [
        "간헐적 로그인 오류 해결",
        "메모리 사용량 최적화",
        "Windows 11 호환성 개선"
      ]
    },
    {
      version: "v5.0.0",
      date: "2024-11-01",
      type: "major",
      status: "stable",
      title: "4개 모듈 순차 자동화 시스템 출시",
      description: "서로이웃 → 댓글 → 대댓글 → 글쓰기 순서로 완전 자동화되는 혁신적 시스템을 선보입니다.",
      features: [
        "4개 모듈 순차 자동화 시스템 (업계 최초)",
        "AI서로이웃자동화 맞춤형 메시지 생성",
        "AI댓글자동화 Gemini AI 적용",
        "AI대댓글자동화 세계최초 출시",
        "블로그AI자동화 ChatGPT 4.0 적용"
      ],
      fixes: [
        "전체적인 UI/UX 리뉴얼",
        "성능 최적화 및 버그 수정"
      ]
    },
    {
      version: "v4.5.2",
      date: "2024-10-15",
      type: "minor",
      status: "stable",
      title: "보안 강화 및 스팸 필터링 개선",
      description: "네이버 블로그 정책 준수를 위한 보안 기능과 스팸 필터링이 강화되었습니다.",
      features: [
        "스마트 스팸 블로그 필터링 시스템",
        "계정 보안 강화 (2단계 인증 지원)",
        "API 호출 최적화로 안정성 향상",
        "실시간 네이버 정책 준수 체크"
      ],
      fixes: [
        "특정 브라우저에서 로그인 실패 문제 해결",
        "대량 댓글 작성 시 속도 저하 개선"
      ]
    }
  ];

  const plannedFeatures = [
    {
      title: "GPT-4 Turbo 지원",
      description: "더욱 빠르고 정확한 AI 글쓰기",
      estimatedDate: "2024-12"
    },
    {
      title: "모바일 앱 출시",
      description: "iOS/Android 네이티브 앱",
      estimatedDate: "2025-01"
    },
    {
      title: "다중 플랫폼 지원",
      description: "티스토리, 워드프레스 확장",
      estimatedDate: "2025-02"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-green-500';
      case 'minor': return 'bg-blue-500';
      case 'patch': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'latest': return <Badge className="bg-green-500 hover:bg-green-600">최신</Badge>;
      case 'stable': return <Badge variant="secondary">안정</Badge>;
      case 'beta': return <Badge className="bg-orange-500 hover:bg-orange-600">베타</Badge>;
      default: return null;
    }
  };

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">업데이트 내역</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Blog Pro 블로그자동화 프로그램의 최신 업데이트와 새로운 기능을 확인하세요
            </p>
          </div>

          {/* Current Version Info */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-2xl p-6 mb-8 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-700 dark:text-green-400">최신 버전</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Version 5.2.1</h2>
                <p className="text-muted-foreground">AI대댓글자동화 성능 대폭 개선</p>
              </div>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/payment-info">
                  <Download className="w-4 h-4 mr-2" />
                  지금 다운로드
                </Link>
              </Button>
            </div>
          </div>

          {/* Update History */}
          <div className="space-y-6 mb-12">
            {updates.map((update, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getTypeColor(update.type)}`} />
                        <span className="font-mono font-bold text-lg">{update.version}</span>
                        {getStatusBadge(update.status)}
                      </div>
                      <CardTitle className="text-xl mb-1">{update.title}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{update.date}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {update.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* New Features */}
                    <div>
                      <h4 className="flex items-center space-x-2 font-semibold mb-3 text-green-700 dark:text-green-400">
                        <Sparkles className="w-4 h-4" />
                        <span>새로운 기능</span>
                      </h4>
                      <ul className="space-y-2">
                        {update.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bug Fixes */}
                    {update.fixes && (
                      <div>
                        <h4 className="flex items-center space-x-2 font-semibold mb-3 text-blue-700 dark:text-blue-400">
                          <Shield className="w-4 h-4" />
                          <span>버그 수정</span>
                        </h4>
                        <ul className="space-y-2">
                          {update.fixes.map((fix, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{fix}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Planned Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">예정된 기능</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {plannedFeatures.map((feature, index) => (
                <Card key={index} className="border-dashed border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <Badge variant="outline" className="text-xs">
                        {feature.estimatedDate} 예정
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Update Notifications */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  자동 업데이트 알림
                </h3>
                <p className="text-blue-600 dark:text-blue-300 text-sm mb-3">
                  새로운 업데이트가 출시되면 프로그램 내에서 자동으로 알림을 받을 수 있습니다. 
                  항상 최신 버전을 유지하여 최적의 성능을 경험하세요.
                </p>
                <div className="text-sm text-blue-600 dark:text-blue-300">
                  <strong>업데이트 확인:</strong> 설정 → 자동 업데이트 → 지금 확인
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-bold text-foreground mb-4">
              최신 버전으로 업데이트하세요
            </h3>
            <p className="text-muted-foreground mb-6">
              새로운 기능과 성능 개선으로 더욱 효율적인 블로그자동화를 경험해보세요
            </p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/payment-info">
                  <Download className="w-4 h-4 mr-2" />
                  최신 버전 다운로드
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">업데이트 문의</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}