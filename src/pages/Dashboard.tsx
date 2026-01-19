import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileHeart,
  Activity,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { path: "/patients", label: "Thêm bệnh nhân", icon: Users, color: "bg-primary" },
  { path: "/appointments", label: "Đặt lịch khám", icon: CalendarDays, color: "bg-accent" },
  { path: "/health-records", label: "Xem hồ sơ", icon: FileHeart, color: "bg-success" },
  { path: "/ai-consult", label: "Tư vấn AI", icon: MessageCircle, color: "bg-wellness" },
];

const recentActivities = [
  { time: "14:30", action: "Bệnh nhân Nguyễn Văn A đã khám xong", type: "success" },
  { time: "13:15", action: "Đã cập nhật kết quả xét nghiệm máu", type: "primary" },
  { time: "11:00", action: "Lịch hẹn mới: Trần Thị B - 15:00", type: "accent" },
  { time: "09:45", action: "Đơn thuốc đã được kê cho Lê Văn C", type: "wellness" },
];

const upcomingAppointments = [
  { patient: "Nguyễn Văn A", time: "15:00", type: "Khám tổng quát", status: "waiting" },
  { patient: "Trần Thị B", time: "15:30", type: "Tái khám", status: "confirmed" },
  { patient: "Lê Văn C", time: "16:00", type: "Xét nghiệm", status: "waiting" },
];

const healthAlerts = [
  { patient: "Phạm Thị D", alert: "Huyết áp cao bất thường", severity: "high" },
  { patient: "Hoàng Văn E", alert: "Cần tái khám sau 7 ngày", severity: "medium" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Xin chào, Bác sĩ! 👋"
        description="Chào mừng bạn quay trở lại. Đây là tổng quan hoạt động hôm nay."
        icon={<LayoutDashboard className="w-6 h-6" />}
      />

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Bệnh nhân hôm nay"
          value="24"
          description="Đã khám: 18"
          icon={<Users className="w-5 h-5" />}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Lịch hẹn chờ"
          value="6"
          description="Trong ngày"
          icon={<CalendarDays className="w-5 h-5" />}
          variant="accent"
        />
        <StatCard
          title="Hồ sơ cập nhật"
          value="45"
          description="Tuần này"
          icon={<FileHeart className="w-5 h-5" />}
          variant="success"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Cảnh báo sức khỏe"
          value="2"
          description="Cần xử lý"
          icon={<Activity className="w-5 h-5" />}
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
                <h3 className="font-semibold text-lg mb-2">Gợi ý từ MediCare AI</h3>
                <p className="text-muted-foreground mb-4">
                  Có <strong className="text-foreground">2 bệnh nhân</strong> cần theo dõi đặc biệt hôm nay. 
                  Bệnh nhân Phạm Thị D có chỉ số huyết áp cao bất thường, cần kiểm tra ngay.
                </p>
                <div className="flex gap-3">
                  <Link to="/health-tracking">
                    <Button size="sm" variant="gradient">
                      <Sparkles className="w-4 h-4" />
                      Xem chi tiết
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

          {/* Health Alerts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Cảnh báo sức khỏe</h3>
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div className="space-y-3">
              {healthAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-lg border ${
                    alert.severity === "high"
                      ? "bg-destructive/10 border-destructive/30"
                      : "bg-warning/10 border-warning/30"
                  }`}
                >
                  <AlertTriangle className={`w-5 h-5 ${
                    alert.severity === "high" ? "text-destructive" : "text-warning"
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium">{alert.patient}</p>
                    <p className="text-sm text-muted-foreground">{alert.alert}</p>
                  </div>
                  <Button size="sm" variant="outline">Xem</Button>
                </div>
              ))}
            </div>
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
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Lịch hẹn sắp tới</h3>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    appointment.status === "confirmed" ? "bg-success" : "bg-warning"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{appointment.patient}</p>
                    <p className="text-xs text-muted-foreground">{appointment.time} - {appointment.type}</p>
                  </div>
                  {appointment.status === "confirmed" && (
                    <CheckCircle className="w-4 h-4 text-success" />
                  )}
                </div>
              ))}
            </div>
            <Link to="/appointments">
              <Button variant="ghost" className="w-full mt-4" size="sm">
                Xem tất cả
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>

          {/* Today's Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Thống kê hôm nay</h3>
            <div className="space-y-4">
              {[
                { label: "Khám tổng quát", value: 12, total: 15, color: "bg-primary" },
                { label: "Tái khám", value: 8, total: 10, color: "bg-success" },
                { label: "Xét nghiệm", value: 5, total: 8, color: "bg-accent" },
                { label: "Cấp cứu", value: 2, total: 2, color: "bg-wellness" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">{item.value}/{item.total}</span>
                  </div>
                  <Progress value={(item.value / item.total) * 100} className="h-2" />
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
                <h3 className="font-semibold">Tư vấn AI</h3>
                <p className="text-xs text-muted-foreground">Hỗ trợ 24/7</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Hỏi MediCare AI về triệu chứng, thuốc, hoặc phác đồ điều trị.
            </p>
            <Link to="/ai-consult">
              <Button className="w-full" variant="gradient">
                <Sparkles className="w-4 h-4" />
                Bắt đầu tư vấn
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
