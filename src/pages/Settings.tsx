import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Palette,
  Shield,
  Save,
  Eye,
  EyeOff,
  Accessibility,
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    school: "Trường THPT ABC",
    grade: "Lớp 12",
  });

  const [notifications, setNotifications] = useState({
    studyReminders: true,
    weeklyReports: true,
    wellnessCheckin: true,
    newFeatures: false,
  });

  const [accessibility, setAccessibility] = useState({
    simpleMode: false,
    largeText: false,
    reduceMotion: false,
    offlineMode: false,
  });

  const handleSave = () => {
    toast.success("Đã lưu cài đặt thành công!");
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Cài đặt"
        description="Tùy chỉnh trải nghiệm của bạn"
        icon={<SettingsIcon className="w-6 h-6" />}
      />

      <Tabs defaultValue="profile" className="max-w-3xl">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Hồ sơ
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Thông báo
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="gap-2">
            <Accessibility className="w-4 h-4" />
            Hỗ trợ đặc biệt
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Thông tin cá nhân</h3>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="school">Trường học</Label>
                  <Input
                    id="school"
                    value={profile.school}
                    onChange={(e) => setProfile({ ...profile, school: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="grade">Lớp/Khóa</Label>
                  <Input
                    id="grade"
                    value={profile.grade}
                    onChange={(e) => setProfile({ ...profile, grade: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button onClick={handleSave} variant="gradient">
                <Save className="w-4 h-4" />
                Lưu thay đổi
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Cài đặt thông báo</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nhắc nhở học tập</p>
                  <p className="text-sm text-muted-foreground">Nhận thông báo nhắc học vào các khung giờ đã đặt</p>
                </div>
                <Switch
                  checked={notifications.studyReminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, studyReminders: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Báo cáo hàng tuần</p>
                  <p className="text-sm text-muted-foreground">Nhận email tổng kết tiến độ học tập mỗi tuần</p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Check-in sức khỏe</p>
                  <p className="text-sm text-muted-foreground">Nhắc nhở check-in sức khỏe tinh thần hàng ngày</p>
                </div>
                <Switch
                  checked={notifications.wellnessCheckin}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, wellnessCheckin: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tính năng mới</p>
                  <p className="text-sm text-muted-foreground">Thông báo khi có tính năng mới trên EduLife AI</p>
                </div>
                <Switch
                  checked={notifications.newFeatures}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newFeatures: checked })}
                />
              </div>
              <Button onClick={handleSave} variant="gradient">
                <Save className="w-4 h-4" />
                Lưu thay đổi
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Accessibility Settings */}
        <TabsContent value="accessibility">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-2">Chế độ hỗ trợ đặc biệt</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Các tùy chọn giúp ứng dụng dễ sử dụng hơn
            </p>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Giao diện đơn giản</p>
                  <p className="text-sm text-muted-foreground">Ẩn bớt các hiệu ứng và chi tiết phức tạp</p>
                </div>
                <Switch
                  checked={accessibility.simpleMode}
                  onCheckedChange={(checked) => setAccessibility({ ...accessibility, simpleMode: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Chữ lớn</p>
                  <p className="text-sm text-muted-foreground">Tăng kích thước văn bản để dễ đọc hơn</p>
                </div>
                <Switch
                  checked={accessibility.largeText}
                  onCheckedChange={(checked) => setAccessibility({ ...accessibility, largeText: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Giảm hiệu ứng</p>
                  <p className="text-sm text-muted-foreground">Tắt các animation và chuyển động</p>
                </div>
                <Switch
                  checked={accessibility.reduceMotion}
                  onCheckedChange={(checked) => setAccessibility({ ...accessibility, reduceMotion: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Chế độ offline (Demo)</p>
                  <p className="text-sm text-muted-foreground">Sử dụng dữ liệu đã lưu khi không có mạng</p>
                </div>
                <Switch
                  checked={accessibility.offlineMode}
                  onCheckedChange={(checked) => setAccessibility({ ...accessibility, offlineMode: checked })}
                />
              </div>
              <Button onClick={handleSave} variant="gradient">
                <Save className="w-4 h-4" />
                Lưu thay đổi
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
