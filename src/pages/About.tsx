import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { Card } from "@/components/ui/card";
import {
  Info,
  Target,
  Users,
  Shield,
  Heart,
  BookOpen,
  Sparkles,
  Mail,
  ExternalLink,
} from "lucide-react";

export default function About() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Giới thiệu"
        description="Tìm hiểu về EduLife AI và điều khoản sử dụng"
        icon={<Info className="w-6 h-6" />}
      />

      <div className="max-w-4xl space-y-8">
        {/* About Section */}
        <Card className="p-8">
          <div className="flex items-start gap-6">
            <AIAvatar size="lg" animated={false} />
            <div>
              <h2 className="text-2xl font-bold mb-2">KMA-RES AI</h2>
              <p className="text-muted-foreground mb-4">
                Nền tảng trợ lý AI toàn diện hỗ trợ học sinh, sinh viên trong học tập, 
                quản lý thời gian, chăm sóc sức khỏe tinh thần và định hướng nghề nghiệp.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">AI-Powered</span>
                <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm">Miễn phí</span>
                <span className="px-3 py-1 rounded-full bg-wellness/10 text-wellness text-sm">Cá nhân hóa</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Mission */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Sứ mệnh</h3>
          </div>
          <p className="text-muted-foreground">
            KMA-RES AI được phát triển với mục tiêu tạo ra một công cụ học tập thông minh, 
            giúp mọi học sinh, sinh viên Việt Nam có thể tiếp cận phương pháp học tập hiệu quả, 
            cá nhân hóa và toàn diện. Chúng tôi tin rằng mỗi người học đều xứng đáng có một 
            trợ lý AI riêng để đồng hành trong suốt hành trình học tập.
          </p>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Học tập thông minh</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Tạo lộ trình học cá nhân hóa, tóm tắt bài học và luyện tập với phân tích chi tiết
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-wellness" />
              <h4 className="font-semibold">Sức khỏe toàn diện</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Theo dõi tâm trạng, nhận gợi ý cải thiện lối sống và cảnh báo stress sớm
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-accent" />
              <h4 className="font-semibold">Định hướng tương lai</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Khám phá nghề nghiệp phù hợp, xây dựng CV và phát triển kỹ năng
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-warning" />
              <h4 className="font-semibold">AI tiên tiến</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Sử dụng công nghệ AI mới nhất để đưa ra gợi ý chính xác và hữu ích
            </p>
          </Card>
        </div>

        {/* Terms of Service */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <h3 className="font-semibold text-lg">Điều khoản sử dụng</h3>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-1">1. Mục đích sử dụng</h4>
              <p>
                KMA-RES AI được thiết kế để hỗ trợ học tập và phát triển cá nhân. 
                Người dùng cam kết sử dụng nền tảng cho mục đích học tập chính đáng.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">2. Giới hạn trách nhiệm</h4>
              <p>
                Các gợi ý từ AI mang tính tham khảo. Đặc biệt, phần sức khỏe tinh thần 
                <strong className="text-foreground"> KHÔNG THAY THẾ </strong> 
                tư vấn y tế chuyên nghiệp. Nếu gặp vấn đề nghiêm trọng, vui lòng liên hệ chuyên gia.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">3. Bảo mật dữ liệu</h4>
              <p>
                Dữ liệu người dùng được lưu trữ cục bộ (localStorage) và không được chia sẻ 
                với bên thứ ba. Chúng tôi cam kết bảo vệ quyền riêng tư của bạn.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">4. Quyền sở hữu trí tuệ</h4>
              <p>
                Nội dung và thiết kế của KMA-RES AI thuộc quyền sở hữu của nhóm phát triển. 
                Người dùng không được sao chép hoặc phân phối lại mà không có sự cho phép.
              </p>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Liên hệ</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Nếu bạn có câu hỏi, góp ý hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:edulife.ai@email.com"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <Mail className="w-4 h-4" />
              edulife.ai@email.com
            </a>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>© 2024 KMA-RES AI. Phát triển cho cuộc thi ý tưởng công nghệ giáo dục.</p>
          <p className="mt-1">Phiên bản 1.0.0 | Made with ❤️ in Vietnam</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
