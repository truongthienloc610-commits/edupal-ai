import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Sparkles,
  Loader2,
  CheckCircle2,
  Lightbulb,
  Calendar,
  Target,
} from "lucide-react";
import { generateLearningPlan, type LearningPlan } from "@/lib/mockAI";

export default function Learning() {
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");
  const [weakPoints, setWeakPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<LearningPlan | null>(null);

  const handleGenerate = async () => {
    if (!subject || !score || !weakPoints) return;
    
    setLoading(true);
    try {
      const result = await generateLearningPlan(subject, parseFloat(score), weakPoints);
      setPlan(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Trợ lý học tập AI"
        description="Tạo lộ trình học cá nhân hóa dựa trên nhu cầu của bạn"
        icon={<BookOpen className="w-6 h-6" />}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <AIAvatar size="sm" />
            <div>
              <h3 className="font-semibold">Nhập thông tin môn học</h3>
              <p className="text-sm text-muted-foreground">
                AI sẽ tạo lộ trình học phù hợp với bạn
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Môn học</Label>
              <Input
                id="subject"
                placeholder="Ví dụ: Toán học, Vật lý, Tiếng Anh..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="score">Điểm số gần đây (thang 10)</Label>
              <Input
                id="score"
                type="number"
                min="0"
                max="10"
                step="0.5"
                placeholder="Ví dụ: 6.5"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="weakPoints">Chủ đề/Phần yếu</Label>
              <Textarea
                id="weakPoints"
                placeholder="Ví dụ: Phương trình bậc 2, hình học không gian..."
                value={weakPoints}
                onChange={(e) => setWeakPoints(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!subject || !score || !weakPoints || loading}
              className="w-full"
              variant="gradient"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang tạo lộ trình...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Tạo lộ trình học
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Result */}
        <div className="space-y-6">
          {!plan && !loading && (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Chưa có lộ trình</h3>
              <p className="text-muted-foreground">
                Điền thông tin bên trái để AI tạo lộ trình học cá nhân hóa cho bạn
              </p>
            </Card>
          )}

          {loading && (
            <Card className="p-8 text-center">
              <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
              <h3 className="font-semibold text-lg mb-2">Đang phân tích...</h3>
              <p className="text-muted-foreground">
                AI đang tạo lộ trình học phù hợp với bạn
              </p>
            </Card>
          )}

          {plan && !loading && (
            <Tabs defaultValue="goals" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="goals">Mục tiêu</TabsTrigger>
                <TabsTrigger value="schedule">Lịch học</TabsTrigger>
                <TabsTrigger value="tips">Gợi ý</TabsTrigger>
              </TabsList>

              <TabsContent value="goals" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Mục tiêu tuần này - {plan.subject}
                  </h3>
                  <div className="space-y-3">
                    {plan.weeklyGoals.map((goal, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tiến độ hiện tại</span>
                      <span className="text-primary font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Lịch học theo ngày
                  </h3>
                  <div className="space-y-4">
                    {plan.dailyTasks.map((day, index) => (
                      <div key={index} className="border-l-2 border-primary/30 pl-4 py-2">
                        <h4 className="font-medium text-primary">{day.day}</h4>
                        <ul className="mt-2 space-y-1">
                          {day.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="tips" className="mt-4 space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-warning" />
                    Cải thiện phần yếu
                  </h3>
                  <div className="text-muted-foreground whitespace-pre-line">
                    {plan.weakPointExplanation}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Mẹo học hiệu quả</h3>
                  <div className="space-y-3">
                    {plan.tips.map((tip, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5"
                      >
                        {tip}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
