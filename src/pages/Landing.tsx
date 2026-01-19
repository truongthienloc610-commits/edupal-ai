import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AIAvatar } from "@/components/shared/AIAvatar";
import {
  Users,
  CalendarDays,
  FileHeart,
  Stethoscope,
  Activity,
  MessageCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Shield,
  Clock,
  Heart,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Quản lý bệnh nhân",
    description: "Hồ sơ bệnh nhân đầy đủ, lịch sử khám chữa bệnh và theo dõi điều trị",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: CalendarDays,
    title: "Đặt lịch khám",
    description: "Hệ thống đặt lịch thông minh, nhắc nhở tự động cho bệnh nhân và bác sĩ",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: FileHeart,
    title: "Hồ sơ sức khỏe",
    description: "Lưu trữ kết quả xét nghiệm, chỉ số sức khỏe và đơn thuốc điện tử",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Stethoscope,
    title: "Tra cứu y khoa",
    description: "Cơ sở dữ liệu thuốc, triệu chứng và hướng dẫn điều trị cập nhật",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Activity,
    title: "Theo dõi sức khỏe",
    description: "Biểu đồ theo dõi chỉ số sức khỏe: huyết áp, đường huyết, cân nặng",
    color: "text-wellness",
    bgColor: "bg-wellness/10",
  },
  {
    icon: MessageCircle,
    title: "Tư vấn AI",
    description: "Chatbot AI hỗ trợ tư vấn sức khỏe và trả lời thắc mắc 24/7",
    color: "text-secondary-foreground",
    bgColor: "bg-secondary",
  },
];

const benefits = [
  "Bảo mật thông tin y tế tuyệt đối",
  "Giao diện thân thiện, dễ sử dụng",
  "Hỗ trợ tư vấn AI 24/7",
  "Đồng bộ dữ liệu đa nền tảng",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-wellness flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">MediCare AI</span>
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
                <Shield className="w-4 h-4" />
                Nền tảng quản lý y tế thông minh
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Chăm sóc sức khỏe với{" "}
                <span className="gradient-text">MediCare AI</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Giải pháp y tế toàn diện: quản lý bệnh nhân, đặt lịch khám, 
                theo dõi sức khỏe và tư vấn AI thông minh cho phòng khám và bệnh viện.
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
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-wellness border-2 border-background"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">500+ cơ sở y tế</p>
                  <p className="text-sm text-muted-foreground">đang sử dụng MediCare AI</p>
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
                      <h3 className="font-semibold text-lg">Xin chào! Tôi là MediCare AI 👋</h3>
                      <p className="text-muted-foreground mt-1">
                        Tôi sẽ hỗ trợ bạn quản lý thông tin y tế, đặt lịch khám và tư vấn sức khỏe mỗi ngày!
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {["Đặt lịch khám cho tôi", "Tra cứu kết quả xét nghiệm", "Tư vấn triệu chứng đau đầu"].map((text, i) => (
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
              MediCare AI tích hợp đầy đủ công cụ quản lý y tế hiện đại, từ hồ sơ bệnh nhân đến tư vấn AI thông minh.
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
                Tại sao chọn MediCare AI?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Được phát triển bởi đội ngũ chuyên gia y tế và công nghệ, 
                MediCare AI mang đến giải pháp quản lý y tế toàn diện và an toàn.
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
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <p className="text-muted-foreground">Bệnh nhân</p>
              </Card>
              <Card className="p-6 text-center bg-success/5 border-success/20">
                <div className="text-4xl font-bold text-success mb-2">500+</div>
                <p className="text-muted-foreground">Cơ sở y tế</p>
              </Card>
              <Card className="p-6 text-center bg-wellness/5 border-wellness/20">
                <div className="text-4xl font-bold text-wellness mb-2">99.9%</div>
                <p className="text-muted-foreground">Uptime</p>
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
              Sẵn sàng nâng cấp dịch vụ y tế?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tham gia cùng hàng trăm cơ sở y tế đang sử dụng MediCare AI 
              để cải thiện chất lượng chăm sóc bệnh nhân.
            </p>
            <Link to="/dashboard">
              <Button size="xl" variant="hero">
                Bắt đầu ngay hôm nay
                <Heart className="w-5 h-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <span className="font-semibold">MediCare AI</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2024 MediCare AI. Tất cả quyền được bảo lưu.
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
