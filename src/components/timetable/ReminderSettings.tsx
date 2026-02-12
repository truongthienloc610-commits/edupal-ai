import { useState, useEffect } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loadReminderSettings, saveReminderSettings } from "@/hooks/useStudyReminder";
import { toast } from "sonner";

const REMINDER_OPTIONS = [
  { value: "5", label: "5 phút" },
  { value: "10", label: "10 phút" },
  { value: "15", label: "15 phút" },
  { value: "30", label: "30 phút" },
  { value: "60", label: "1 giờ" },
];

export function ReminderSettings() {
  const [enabled, setEnabled] = useState(false);
  const [minutesBefore, setMinutesBefore] = useState("15");

  useEffect(() => {
    const s = loadReminderSettings();
    setEnabled(s.enabled);
    setMinutesBefore(String(s.minutesBefore));
  }, []);

  const handleToggle = (val: boolean) => {
    setEnabled(val);
    saveReminderSettings({ enabled: val, minutesBefore: Number(minutesBefore) });

    if (val && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((p) => {
        if (p === "denied") {
          toast.warning("Trình duyệt đã từ chối quyền thông báo. Bạn vẫn nhận được nhắc trong app.");
        }
      });
    }

    toast.success(val ? "Đã bật nhắc lịch học" : "Đã tắt nhắc lịch học");
  };

  const handleMinutesChange = (val: string) => {
    setMinutesBefore(val);
    saveReminderSettings({ enabled, minutesBefore: Number(val) });
    if (enabled) toast.success(`Sẽ nhắc trước ${val} phút`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          {enabled ? <Bell className="w-4 h-4 text-primary" /> : <BellOff className="w-4 h-4" />}
          Nhắc lịch
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="reminder-toggle" className="font-medium">Bật nhắc lịch học</Label>
            <Switch id="reminder-toggle" checked={enabled} onCheckedChange={handleToggle} />
          </div>
          {enabled && (
            <div className="space-y-2">
              <Label>Nhắc trước</Label>
              <Select value={minutesBefore} onValueChange={handleMinutesChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REMINDER_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Bạn sẽ nhận thông báo trong app và trình duyệt (nếu đã cấp quyền).
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
