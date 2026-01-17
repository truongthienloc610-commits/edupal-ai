import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AIAvatar } from "@/components/shared/AIAvatar";
import {
  BookOpen,
  Clock,
  FileText,
  GraduationCap,
  Heart,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Trợ lý học tập AI",
    description: "Lộ trình học cá nhân hóa dựa trên điểm mạnh và yếu của bạn",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Clock,
    title: "Quản lý thời gian",
    description: "Nhắc học thông minh và phân tích hiệu suất học tập",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: FileText,
    title: "Tóm tắt bài học",
    description: "Chuyển đổi nội dung dài thành ghi chú ngắn gọn, dễ hiểu",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: GraduationCap,
    title: "Luyện thi thông minh",
    description: "Câu hỏi luyện tập và phân tích lỗi sai chi tiết",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Heart,
    title: "Sức khỏe tinh thần",
    description: "Theo dõi tâm trạng và nhận gợi ý cải thiện lối sống",
    color: "text-wellness",
    bgColor: "bg-wellness/10",
  },
  {
    icon: Briefcase,
    title: "Định hướng nghề nghiệp",
    description: "Khám phá ngành nghề phù hợp và xây dựng kỹ năng",
    color: "text-secondary-foreground",
    bgColor: "bg-secondary",
  },
];

const benefits = [
  "Cá nhân hóa 100% theo nhu cầu học tập",
  "Giao diện thân thiện, dễ sử dụng",
  "Hỗ trợ 24/7 không giới hạn",
  "Bảo mật dữ liệu tuyệt đối",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">KMA-RES AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Tính năng
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              Giới thiệu
            </a>
            <Link to="/dashboard">
              <Button variant="gradient">
                Bắt đầu ngay
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </nav>
          <Link to="/dashboard" className="md:hidden">
            <Button size="sm" variant="gradient">Bắt đầu</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
                <Zap className="w-4 h-4" />
                Nền tảng AI hỗ trợ học tập #1 Việt Nam
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Học thông minh hơn với{" "}
                <span className="gradient-text">KMA-RES AI</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Trợ lý AI toàn diện giúp bạn học tập hiệu quả, quản lý thời gian, 
                chăm sóc sức khỏe tinh thần và định hướng nghề nghiệp tương lai.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Link to="/dashboard">
                  <Button size="xl" variant="hero" className="w-full sm:w-auto">
                    Khám phá ngay
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto">
                    Tìm hiểu thêm
                  </Button>
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                    />
                  ))}
                </div>
                <div className="text-left">
                <p className="font-semibold text-foreground">10,000+ học sinh</p>
                <p className="text-sm text-muted-foreground">đang sử dụng KMA-RES AI</p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-wellness/20 to-accent/20 rounded-3xl blur-3xl animate-pulse-slow" />
                <Card className="relative p-8 bg-card/90 backdrop-blur-xl shadow-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-start gap-4 mb-6">
                    <AIAvatar size="lg" />
                    <div>
                      <h3 className="font-semibold text-lg">Xin chào! Mình là KMA-RES AI 👋</h3>
                      <p className="text-muted-foreground mt-1">
                        Mình sẽ giúp bạn học tập hiệu quả hơn, quản lý thời gian tốt hơn và phát triển bản thân mỗi ngày!
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {["Tạo lộ trình học Toán cho tôi", "Tóm tắt bài học Vật lý", "Tôi cảm thấy stress"].map((text, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                      >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm">{text}</span>
                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tất cả trong một nền tảng
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              KMA-RES AI tích hợp đầy đủ công cụ hỗ trợ học sinh, sinh viên trong mọi khía cạnh của việc học tập và phát triển bản thân.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="about" className="py-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tại sao chọn KMA-RES AI?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Được phát triển bởi đội ngũ chuyên gia giáo dục và công nghệ, 
                KMA-RES AI mang đến trải nghiệm học tập được cá nhân hóa hoàn toàn cho bạn.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    </div>
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link to="/dashboard" className="inline-block mt-8">
                <Button size="lg" variant="gradient">
                  Trải nghiệm miễn phí
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <Card className="p-6 text-center bg-primary/5 border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-muted-foreground">Hài lòng</p>
              </Card>
              <Card className="p-6 text-center bg-success/5 border-success/20">
                <div className="text-4xl font-bold text-success mb-2">2x</div>
                <p className="text-muted-foreground">Hiệu quả học</p>
              </Card>
              <Card className="p-6 text-center bg-wellness/5 border-wellness/20">
                <div className="text-4xl font-bold text-wellness mb-2">85%</div>
                <p className="text-muted-foreground">Giảm stress</p>
              </Card>
              <Card className="p-6 text-center bg-accent/5 border-accent/20">
                <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                <p className="text-muted-foreground">Hỗ trợ</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/10 via-wellness/10 to-accent/10 border-none shadow-2xl">
            <AIAvatar size="lg" className="mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn sàng học thông minh hơn?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tham gia cùng hàng ngàn học sinh, sinh viên đang sử dụng KMA-RES AI 
              để đạt được mục tiêu học tập của mình.
            </p>
            <Link to="/dashboard">
              <Button size="xl" variant="hero">
                Bắt đầu hành trình
                <Sparkles className="w-5 h-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold">KMA-RES AI</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2024 KMA-RES AI. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
              Điều khoản
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
              Bảo mật
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
