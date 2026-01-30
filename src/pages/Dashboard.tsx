import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StudyHoursChart, SubjectProgressChart } from "@/components/dashboard/StudyChart";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Clock,
  Brain,
  Briefcase,
  Heart,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { path: "/learning", label: "Tạo lộ trình", icon: BookOpen, color: "bg-primary" },
  { path: "/summary", label: "Tóm tắt bài", icon: Brain, color: "bg-accent" },
  { path: "/practice", label: "Luyện tập", icon: Target, color: "bg-success" },
  { path: "/ai-consult", label: "Hỏi AI", icon: MessageCircle, color: "bg-wellness" },
];

const todayTasks = [
  { task: "Học chương 5 - Đạo hàm", subject: "Toán", done: true },
  { task: "Làm bài tập tiếng Anh Unit 8", subject: "Anh", done: true },
  { task: "Đọc bài Lịch sử Việt Nam", subject: "Sử", done: false },
  { task: "Ôn tập Vật lý chương 3", subject: "Lý", done: false },
];

const upcomingEvents = [
  { event: "Kiểm tra Toán 15 phút", date: "Thứ 3", type: "exam" },
  { event: "Nộp bài tập Văn", date: "Thứ 5", type: "homework" },
  { event: "Thi giữa kỳ Anh văn", date: "Thứ 7", type: "exam" },
];

export default function Dashboard() {
  const completedTasks = todayTasks.filter(t => t.done).length;
  const totalTasks = todayTasks.length;

  return (
    <DashboardLayout>
      <PageHeader
        title="Xin chào! 👋"
        description="Chào mừng bạn quay trở lại. Đây là tổng quan học tập hôm nay."
        icon={<LayoutDashboard className="w-6 h-6" />}
      />

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Giờ học hôm nay"
          value="3.5h"
          description="Mục tiêu: 4h"
          icon={<Clock className="w-5 h-5" />}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Bài tập hoàn thành"
          value={`${completedTasks}/${totalTasks}`}
          description="Còn lại 2 bài"
          icon={<Target className="w-5 h-5" />}
          variant="accent"
        />
        <StatCard
          title="Streak học tập"
          value="7 ngày"
          description="Kỷ lục: 15 ngày"
          icon={<TrendingUp className="w-5 h-5" />}
          variant="success"
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Điểm wellness"
          value="85"
          description="Tốt"
          icon={<Heart className="w-5 h-5" />}
          variant="wellness"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Assistant Card */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <AIAvatar size="md" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Gợi ý từ KMA-RES AI</h3>
                <p className="text-muted-foreground mb-4">
                  Hôm nay bạn nên tập trung ôn tập <strong className="text-foreground">Vật lý chương 3</strong> vì 
                  tuần sau có bài kiểm tra. Mình đã chuẩn bị sẵn tóm tắt và bài tập cho bạn!
                </p>
                <div className="flex gap-3">
                  <Link to="/summary">
                    <Button size="sm" variant="gradient">
                      <Sparkles className="w-4 h-4" />
                      Xem tóm tắt
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline">Để sau</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Truy cập nhanh</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <Link key={action.path} to={action.path}>
                  <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                    <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                      <action.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <p className="font-medium text-sm">{action.label}</p>
                    <ArrowRight className="w-4 h-4 mt-2 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <StudyHoursChart />
            <SubjectProgressChart />
          </div>

          {/* Today's Tasks */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Nhiệm vụ hôm nay</h3>
              <span className="text-sm text-muted-foreground">{completedTasks}/{totalTasks} hoàn thành</span>
            </div>
            <div className="space-y-3">
              {todayTasks.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    item.done
                      ? "bg-success/5 border-success/20"
                      : "bg-muted/50 border-border"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    item.done ? "bg-success border-success" : "border-muted-foreground"
                  }`}>
                    {item.done && <CheckCircle className="w-3 h-3 text-success-foreground" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${item.done ? "line-through text-muted-foreground" : ""}`}>
                      {item.task}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Sắp tới</h3>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    item.type === "exam" ? "bg-destructive" : "bg-warning"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.event}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/schedule">
              <Button variant="ghost" className="w-full mt-4" size="sm">
                Xem lịch đầy đủ
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>

          {/* Study Progress */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Tiến độ tuần này</h3>
            <div className="space-y-4">
              {[
                { label: "Toán học", value: 75, color: "bg-primary" },
                { label: "Tiếng Anh", value: 85, color: "bg-success" },
                { label: "Vật lý", value: 60, color: "bg-accent" },
                { label: "Hóa học", value: 45, color: "bg-wellness" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Quick AI Consult */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-wellness/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Hỏi AI</h3>
                <p className="text-xs text-muted-foreground">Giải đáp mọi thắc mắc</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Có câu hỏi về bài học? Hỏi KMA-RES AI để được giải đáp ngay!
            </p>
            <Link to="/ai-consult">
              <Button className="w-full" variant="gradient">
                <Sparkles className="w-4 h-4" />
                Bắt đầu chat
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
