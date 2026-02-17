import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  Bell,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";
import { ReminderSettings } from "@/components/timetable/ReminderSettings";

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

const defaultTasks: Task[] = [
  { id: "1", title: "Ôn tập Toán - Đạo hàm", time: "08:00", completed: true, priority: "high" },
  { id: "2", title: "Đọc tài liệu Văn học", time: "10:00", completed: true, priority: "medium" },
  { id: "3", title: "Làm bài tập Tiếng Anh", time: "14:00", completed: false, priority: "high" },
  { id: "4", title: "Luyện đề Hóa học", time: "16:00", completed: false, priority: "medium" },
  { id: "5", title: "Xem video bài giảng Lý", time: "19:00", completed: false, priority: "low" },
];

const weeklyStats = [
  { day: "T2", hours: 3.5, target: 4 },
  { day: "T3", hours: 4.2, target: 4 },
  { day: "T4", hours: 2.5, target: 4 },
  { day: "T5", hours: 5, target: 4 },
  { day: "T6", hours: 3, target: 4 },
  { day: "T7", hours: 2, target: 3 },
  { day: "CN", hours: 1.5, target: 2 },
];

const effectiveHours = [
  { time: "06:00 - 09:00", efficiency: 95, label: "Rất hiệu quả" },
  { time: "09:00 - 12:00", efficiency: 85, label: "Hiệu quả" },
  { time: "14:00 - 17:00", efficiency: 75, label: "Khá tốt" },
  { time: "19:00 - 22:00", efficiency: 70, label: "Trung bình" },
];

export default function Schedule() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [newTask, setNewTask] = useState("");
  const [newTime, setNewTime] = useState("");

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (!newTask || !newTime) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      time: newTime,
      completed: false,
      priority: "medium",
    };
    setTasks([...tasks, task].sort((a, b) => a.time.localeCompare(b.time)));
    setNewTask("");
    setNewTime("");
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <DashboardLayout>
      <PageHeader
        title="Quản lý thời gian"
        description="Đặt mục tiêu và theo dõi hiệu suất học tập của bạn"
        icon={<Clock className="w-6 h-6" />}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Nhiệm vụ hôm nay
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Đã hoàn thành {completedCount}/{tasks.length} nhiệm vụ
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
              </div>
            </div>

            <Progress value={progress} className="h-2 mb-6" />

            {/* Add new task */}
            <div className="flex gap-3 mb-6">
              <Input
                placeholder="Thêm nhiệm vụ mới..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1"
              />
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-32"
              />
              <Button onClick={addTask} disabled={!newTask || !newTime}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Task list */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    task.completed
                      ? "bg-success/5 border-success/20"
                      : "bg-card hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="focus:outline-none"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{task.time}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-destructive/10 text-destructive"
                        : task.priority === "medium"
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {task.priority === "high" ? "Quan trọng" : task.priority === "medium" ? "Bình thường" : "Thấp"}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Chart */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Thống kê tuần này
            </h3>
            <div className="flex items-end justify-between gap-2 h-40">
              {weeklyStats.map((stat, index) => {
                const percentage = (stat.hours / stat.target) * 100;
                const barHeight = Math.min(percentage, 100);
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full h-32 bg-muted/50 rounded-lg overflow-hidden">
                      <div
                        className={`absolute bottom-0 left-0 right-0 rounded-lg transition-all ${
                          percentage >= 100 ? "bg-success" : percentage >= 75 ? "bg-primary" : "bg-warning"
                        }`}
                        style={{ height: `${barHeight}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{stat.day}</span>
                    <span className="text-xs text-muted-foreground">{stat.hours}h</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Tổng: 21.7 giờ / Mục tiêu: 25 giờ
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Smart Reminder */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Nhắc học thông minh</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Dựa trên phân tích, khung giờ <strong className="text-foreground">8:00 - 10:00</strong> là 
              lúc bạn học hiệu quả nhất. Hãy ưu tiên môn khó vào thời điểm này!
            </p>
            <ReminderSettings />
          </Card>

          {/* Effective Hours */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-success" />
              Khung giờ hiệu quả
            </h3>
            <div className="space-y-4">
              {effectiveHours.map((hour, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{hour.time}</span>
                    <span className={`font-medium ${
                      hour.efficiency >= 90 ? "text-success" :
                      hour.efficiency >= 80 ? "text-primary" :
                      hour.efficiency >= 70 ? "text-warning" : "text-muted-foreground"
                    }`}>
                      {hour.label}
                    </span>
                  </div>
                  <Progress value={hour.efficiency} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Report */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Báo cáo tuần</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tổng giờ học</span>
                <span className="font-semibold">21.7 giờ</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Nhiệm vụ hoàn thành</span>
                <span className="font-semibold">28/35</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Streak hiện tại</span>
                <span className="font-semibold text-primary">7 ngày 🔥</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Hiệu suất</span>
                <span className="font-semibold text-success">+15% ↑</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
