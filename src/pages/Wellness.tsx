import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Heart,
  Moon,
  Smile,
  Meh,
  Frown,
  AlertTriangle,
  Sparkles,
  Loader2,
  Activity,
  Brain,
  Coffee,
  Zap,
} from "lucide-react";
import { analyzeWellness, type WellnessAdvice, type WellnessCheckIn } from "@/lib/ai";
import { cn } from "@/lib/utils";

const moodOptions = [
  { value: "happy", icon: Smile, label: "Vui vẻ", color: "text-success" },
  { value: "neutral", icon: Meh, label: "Bình thường", color: "text-warning" },
  { value: "sad", icon: Frown, label: "Buồn", color: "text-muted-foreground" },
  { value: "anxious", icon: AlertTriangle, label: "Lo lắng", color: "text-destructive" },
  { value: "tired", icon: Coffee, label: "Mệt mỏi", color: "text-wellness" },
];

const weeklyMood = [
  { day: "T2", mood: "happy", score: 85 },
  { day: "T3", mood: "neutral", score: 70 },
  { day: "T4", mood: "happy", score: 80 },
  { day: "T5", mood: "anxious", score: 45 },
  { day: "T6", mood: "neutral", score: 65 },
  { day: "T7", mood: "happy", score: 90 },
  { day: "CN", mood: "happy", score: 88 },
];

export default function Wellness() {
  const [sleepHours, setSleepHours] = useState([7]);
  const [stressLevel, setStressLevel] = useState([5]);
  const [selectedMood, setSelectedMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<WellnessAdvice | null>(null);

  const handleCheckIn = async () => {
    if (!selectedMood) return;

    const checkIn: WellnessCheckIn = {
      sleepHours: sleepHours[0],
      stressLevel: stressLevel[0],
      mood: selectedMood,
    };

    setLoading(true);
    try {
      const result = await analyzeWellness(checkIn);
      setAdvice(result);
    } catch (error) {
      console.error(error);
      const { toast } = await import("sonner");
      toast.error("Không thể phân tích sức khỏe. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Sức khỏe tinh thần"
        description="Theo dõi tâm trạng và nhận gợi ý cải thiện lối sống"
        icon={<Heart className="w-6 h-6" />}
      />

      {/* Disclaimer */}
      <Card className="p-4 mb-6 bg-warning/10 border-warning/20">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
          <p className="text-sm">
            <strong>Lưu ý:</strong> Đây không phải tư vấn y tế chuyên nghiệp. Nếu bạn gặp vấn đề nghiêm trọng về sức khỏe tinh thần, 
            hãy liên hệ chuyên gia tâm lý hoặc đường dây nóng hỗ trợ.
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Check-in Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <AIAvatar size="sm" />
              <div>
                <h3 className="font-semibold">Check-in hằng ngày</h3>
                <p className="text-sm text-muted-foreground">Chia sẻ tình trạng của bạn hôm nay</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Sleep */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-wellness" />
                    Số giờ ngủ đêm qua
                  </Label>
                  <span className="font-semibold text-primary">{sleepHours[0]} giờ</span>
                </div>
                <Slider
                  value={sleepHours}
                  onValueChange={setSleepHours}
                  min={0}
                  max={12}
                  step={0.5}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0h</span>
                  <span>6h</span>
                  <span>12h</span>
                </div>
              </div>

              {/* Stress */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-warning" />
                    Mức độ căng thẳng
                  </Label>
                  <span className={cn(
                    "font-semibold",
                    stressLevel[0] <= 3 ? "text-success" :
                    stressLevel[0] <= 6 ? "text-warning" : "text-destructive"
                  )}>
                    {stressLevel[0]}/10
                  </span>
                </div>
                <Slider
                  value={stressLevel}
                  onValueChange={setStressLevel}
                  min={1}
                  max={10}
                  step={1}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Thấp</span>
                  <span>Trung bình</span>
                  <span>Cao</span>
                </div>
              </div>

              {/* Mood */}
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Smile className="w-4 h-4 text-success" />
                  Tâm trạng hiện tại
                </Label>
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                        selectedMood === mood.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <mood.icon className={cn("w-6 h-6", mood.color)} />
                      <span className="text-xs font-medium">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleCheckIn}
                disabled={!selectedMood || loading}
                variant="wellness"
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang phân tích...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Nhận gợi ý từ AI
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* AI Advice */}
          {advice && (
            <Card className="p-6 animate-fade-in">
              <div className="flex items-start gap-3 mb-4">
                <AIAvatar size="sm" />
                <div>
                  <h3 className="font-semibold">Phân tích từ AI</h3>
                  <p className="text-sm text-muted-foreground mt-1">{advice.summary}</p>
                </div>
              </div>

              {advice.warnings.length > 0 && (
                <div className="mb-4 space-y-2">
                  {advice.warnings.map((warning, index) => (
                    <div key={index} className="p-3 rounded-lg bg-warning/10 border border-warning/20 text-sm">
                      {warning}
                    </div>
                  ))}
                </div>
              )}

              {advice.recommendations.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Gợi ý cải thiện:</h4>
                  <div className="space-y-2">
                    {advice.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-success">•</span>
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {advice.activities.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Hoạt động đề xuất:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {advice.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-wellness/10 border border-wellness/20 text-sm"
                      >
                        {activity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly Overview */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-wellness" />
              Tâm trạng tuần này
            </h3>
            <div className="space-y-3">
              {weeklyMood.map((day, index) => {
                const MoodIcon = moodOptions.find(m => m.value === day.mood)?.icon || Meh;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-8 text-sm font-medium text-muted-foreground">{day.day}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          day.score >= 80 ? "bg-success" :
                          day.score >= 60 ? "bg-primary" :
                          day.score >= 40 ? "bg-warning" : "bg-destructive"
                        )}
                        style={{ width: `${day.score}%` }}
                      />
                    </div>
                    <MoodIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Tips Card */}
          <Card className="p-6 bg-gradient-to-br from-wellness/10 to-primary/10 border-wellness/20">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-wellness" />
              <h3 className="font-semibold">Mẹo nhỏ hôm nay</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Hít thở sâu 4-7-8: Hít vào 4 giây, giữ 7 giây, thở ra 8 giây. 
              Lặp lại 3-4 lần để giảm căng thẳng ngay lập tức.
            </p>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Thống kê nhanh</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Giờ ngủ TB</span>
                <span className="font-semibold">6.8 giờ</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Stress TB</span>
                <span className="font-semibold text-warning">5.2/10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tâm trạng phổ biến</span>
                <span className="font-semibold text-success">Vui vẻ</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Streak check-in</span>
                <span className="font-semibold text-primary">5 ngày</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
