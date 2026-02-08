import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle, Save, Camera, Mail, School, BookOpen, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    display_name: "",
    school: "",
    class_name: "",
  });

  // Populate form from profile data
  useEffect(() => {
    if (profile) {
      setForm({
        display_name: profile.display_name || "",
        school: profile.school || "",
        class_name: profile.class_name || "",
      });
      if (profile.avatar_url) {
        setAvatarPreview(profile.avatar_url);
      }
    }
  }, [profile]);

  const userEmail = user?.email || "";
  const displayInitial = form.display_name?.charAt(0)?.toUpperCase() || userEmail?.charAt(0)?.toUpperCase() || "U";

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh (JPG, PNG, etc.)");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ảnh không được vượt quá 2MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Add cache-busting param
      const avatarUrl = `${publicUrl}?t=${Date.now()}`;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      setAvatarPreview(avatarUrl);
      await refreshProfile();
      toast.success("Đã cập nhật ảnh đại diện!");
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      toast.error("Không thể tải ảnh lên: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: form.display_name || null,
          school: form.school || null,
          class_name: form.class_name || null,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      await refreshProfile();
      toast.success("Đã lưu hồ sơ thành công!");
    } catch (error: any) {
      console.error("Profile save error:", error);
      toast.error("Không thể lưu hồ sơ: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Hồ sơ cá nhân"
        description="Quản lý thông tin cá nhân của bạn"
        icon={<UserCircle className="w-6 h-6" />}
      />

      <div className="max-w-2xl space-y-6">
        {/* Avatar Section */}
        <Card className="p-6 glass-card">
          <h3 className="font-semibold text-lg mb-4">Ảnh đại diện</h3>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-2 border-primary/20">
                <AvatarImage src={avatarPreview || undefined} alt="Avatar" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
                  {displayInitial}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute inset-0 rounded-full bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                {uploading ? (
                  <Loader2 className="w-6 h-6 text-background animate-spin" />
                ) : (
                  <Camera className="w-6 h-6 text-background" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{form.display_name || "Chưa đặt tên"}</p>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang tải...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4" />
                    Thay đổi ảnh
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Profile Info Section */}
        <Card className="p-6 glass-card">
          <h3 className="font-semibold text-lg mb-4">Thông tin cá nhân</h3>
          <div className="space-y-4">
            {/* Email - read only */}
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={userEmail}
                disabled
                className="mt-1 bg-muted/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Email được liên kết tự động từ tài khoản đăng nhập
              </p>
            </div>

            {/* Display Name */}
            <div>
              <Label htmlFor="display_name" className="flex items-center gap-2">
                <UserCircle className="w-4 h-4 text-muted-foreground" />
                Họ và tên
              </Label>
              <Input
                id="display_name"
                value={form.display_name}
                onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                placeholder="Nhập họ và tên của bạn"
                className="mt-1"
              />
            </div>

            {/* School */}
            <div>
              <Label htmlFor="school" className="flex items-center gap-2">
                <School className="w-4 h-4 text-muted-foreground" />
                Trường học
              </Label>
              <Input
                id="school"
                value={form.school}
                onChange={(e) => setForm({ ...form, school: e.target.value })}
                placeholder="Nhập tên trường học"
                className="mt-1"
              />
            </div>

            {/* Class */}
            <div>
              <Label htmlFor="class_name" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                Lớp / Khóa
              </Label>
              <Input
                id="class_name"
                value={form.class_name}
                onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                placeholder="Nhập lớp hoặc khóa học"
                className="mt-1"
              />
            </div>

            <Button onClick={handleSave} disabled={saving} variant="gradient" className="w-full sm:w-auto">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Lưu thay đổi
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
