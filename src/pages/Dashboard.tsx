import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Brain,
  Heart,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { path: "/learning", label: "Tạo lộ trình học", icon: BookOpen, color: "bg-primary" },
  { path: "/summary", label: "Tóm tắt bài học", icon: Brain, color: "bg-success" },
  { path: "/practice", label: "Luyện thi ngay", icon: Target, color: "bg-warning" },
  { path: "/wellness", label: "Check-in sức khỏe", icon: Heart, color: "bg-wellness" },
];

const recentActivities = [
  { time: "Hôm nay, 14:30", action: "Hoàn thành bài luyện tập Toán", type: "success" },
  { time: "Hôm nay, 10:15", action: "Tóm tắt bài Vật lý Chương 5", type: "primary" },
  { time: "Hôm qua, 20:00", action: "Check-in sức khỏe tinh thần", type: "wellness" },
  { time: "Hôm qua, 16:45", action: "Cập nhật lộ trình học Tiếng Anh", type: "accent" },
];

const upcomingTasks = [
  { task: "Ôn tập Hóa học - Chương 3", time: "15:00", priority: "high" },
  { task: "Làm bài tập Toán", time: "17:00", priority: "medium" },
  { task: "Đọc tài liệu Lịch sử", time: "19:00", priority: "low" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Xin chào! 👋"
        description="Chào mừng bạn quay trở lại. Hãy cùng học tập hiệu quả hôm nay!"
        icon={<LayoutDashboard className="w-6 h-6" />}
      />

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Giờ học hôm nay"
          value="2.5h"
          description="Mục tiêu: 4h"
          icon={<Clock className="w-5 h-5" />}
          variant="primary"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Bài đã hoàn thành"
          value="12"
          description="Tuần này"
          icon={<Target className="w-5 h-5" />}
          variant="success"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Streak học tập"
          value="7 ngày"
          description="Kỷ lục: 14 ngày"
          icon={<TrendingUp className="w-5 h-5" />}
          variant="accent"
        />
        <StatCard
          title="Điểm sức khỏe"
          value="85/100"
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
                <h3 className="font-semibold text-lg mb-2">Gợi ý từ AI</h3>
                <p className="text-muted-foreground mb-4">
                  Dựa trên lịch sử học tập, mình gợi ý bạn nên ôn lại phần 
                  <strong className="text-foreground"> "Phương trình bậc 2"</strong> vì bạn hay sai ở dạng này. 
                  Muốn mình tạo bài luyện tập không?
                </p>
                <div className="flex gap-3">
                  <Link to="/practice">
                    <Button size="sm" variant="gradient">
                      <Sparkles className="w-4 h-4" />
                      Luyện tập ngay
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

          {/* Progress Section */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Tiến độ tuần này</h3>
            <div className="space-y-4">
              {[
                { subject: "Toán học", progress: 75, color: "bg-primary" },
                { subject: "Vật lý", progress: 60, color: "bg-success" },
                { subject: "Tiếng Anh", progress: 85, color: "bg-accent" },
                { subject: "Hóa học", progress: 45, color: "bg-wellness" },
              ].map((item) => (
                <div key={item.subject}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.subject}</span>
                    <span className="text-muted-foreground">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Lịch hôm nay</h3>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      task.priority === "high"
                        ? "bg-destructive"
                        : task.priority === "medium"
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{task.task}</p>
                    <p className="text-xs text-muted-foreground">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/schedule">
              <Button variant="ghost" className="w-full mt-4" size="sm">
                Xem tất cả
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>

          {/* Recent Activities */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Hoạt động gần đây</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success"
                        ? "bg-success"
                        : activity.type === "primary"
                        ? "bg-primary"
                        : activity.type === "wellness"
                        ? "bg-wellness"
                        : "bg-accent"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
