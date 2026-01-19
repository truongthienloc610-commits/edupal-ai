import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Heart,
  Droplets,
  Scale,
  TrendingUp,
  TrendingDown,
  Plus,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const bloodPressureData = [
  { date: "01/01", systolic: 120, diastolic: 80 },
  { date: "05/01", systolic: 125, diastolic: 82 },
  { date: "10/01", systolic: 118, diastolic: 78 },
  { date: "15/01", systolic: 130, diastolic: 85 },
  { date: "20/01", systolic: 122, diastolic: 80 },
];

const bloodSugarData = [
  { date: "01/01", fasting: 100, afterMeal: 140 },
  { date: "05/01", fasting: 105, afterMeal: 155 },
  { date: "10/01", fasting: 98, afterMeal: 135 },
  { date: "15/01", fasting: 110, afterMeal: 160 },
  { date: "20/01", fasting: 102, afterMeal: 145 },
];

const weightData = [
  { date: "01/01", weight: 70 },
  { date: "08/01", weight: 69.5 },
  { date: "15/01", weight: 69 },
  { date: "22/01", weight: 68.5 },
];

interface HealthMetric {
  label: string;
  value: string;
  unit: string;
  status: "normal" | "warning" | "danger";
  trend: "up" | "down" | "stable";
  icon: React.ReactNode;
}

const currentMetrics: HealthMetric[] = [
  {
    label: "Huyết áp",
    value: "122/80",
    unit: "mmHg",
    status: "normal",
    trend: "stable",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    label: "Đường huyết",
    value: "102",
    unit: "mg/dL",
    status: "normal",
    trend: "down",
    icon: <Droplets className="w-5 h-5" />,
  },
  {
    label: "Cân nặng",
    value: "68.5",
    unit: "kg",
    status: "normal",
    trend: "down",
    icon: <Scale className="w-5 h-5" />,
  },
  {
    label: "Nhịp tim",
    value: "72",
    unit: "bpm",
    status: "normal",
    trend: "stable",
    icon: <Activity className="w-5 h-5" />,
  },
];

const getStatusColor = (status: HealthMetric["status"]) => {
  switch (status) {
    case "normal":
      return "text-success";
    case "warning":
      return "text-warning";
    case "danger":
      return "text-destructive";
  }
};

const getTrendIcon = (trend: HealthMetric["trend"]) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-4 h-4 text-warning" />;
    case "down":
      return <TrendingDown className="w-4 h-4 text-success" />;
    case "stable":
      return <span className="w-4 h-4 text-primary">—</span>;
  }
};

export default function HealthTracking() {
  const [activeTab, setActiveTab] = useState("bloodpressure");

  return (
    <DashboardLayout>
      <PageHeader
        title="Theo dõi sức khỏe"
        description="Biểu đồ theo dõi các chỉ số sức khỏe quan trọng"
        icon={<Activity className="w-6 h-6" />}
      />

      <div className="space-y-6">
        {/* Current Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {currentMetrics.map((metric, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-muted ${getStatusColor(metric.status)}`}>
                  {metric.icon}
                </div>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="text-2xl font-bold">
                {metric.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {metric.unit}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </Card>
          ))}
        </div>

        {/* Add New Reading */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Thêm chỉ số mới</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bp-sys">Huyết áp tâm thu</Label>
              <Input id="bp-sys" type="number" placeholder="120" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bp-dia">Huyết áp tâm trương</Label>
              <Input id="bp-dia" type="number" placeholder="80" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sugar">Đường huyết (mg/dL)</Label>
              <Input id="sugar" type="number" placeholder="100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Cân nặng (kg)</Label>
              <Input id="weight" type="number" step="0.1" placeholder="70" />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="gradient">
              <Plus className="w-4 h-4" />
              Lưu chỉ số
            </Button>
          </div>
        </Card>

        {/* Charts */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="bloodpressure">Huyết áp</TabsTrigger>
            <TabsTrigger value="bloodsugar">Đường huyết</TabsTrigger>
            <TabsTrigger value="weight">Cân nặng</TabsTrigger>
          </TabsList>

          <TabsContent value="bloodpressure" className="mt-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Biểu đồ huyết áp</h3>
                  <p className="text-sm text-muted-foreground">Theo dõi huyết áp trong tháng</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span>Tâm thu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-wellness" />
                    <span>Tâm trương</span>
                  </div>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis domain={[60, 150]} className="text-xs" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="hsl(var(--wellness))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--wellness))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  <strong>Nhận xét:</strong> Huyết áp ở mức bình thường (120/80 - 130/85 mmHg). 
                  Tiếp tục duy trì chế độ ăn ít muối và tập thể dục đều đặn.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="bloodsugar" className="mt-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Biểu đồ đường huyết</h3>
                  <p className="text-sm text-muted-foreground">Theo dõi đường huyết trong tháng</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <span>Lúc đói</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span>Sau ăn</span>
                  </div>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bloodSugarData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis domain={[80, 180]} className="text-xs" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="fasting"
                      stroke="hsl(var(--success))"
                      fill="hsl(var(--success) / 0.2)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="afterMeal"
                      stroke="hsl(var(--accent))"
                      fill="hsl(var(--accent) / 0.2)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  <strong>Nhận xét:</strong> Đường huyết lúc đói dao động 98-110 mg/dL (mức tiền tiểu đường). 
                  Cần kiểm soát chế độ ăn và tập luyện thường xuyên.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="weight" className="mt-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Biểu đồ cân nặng</h3>
                  <p className="text-sm text-muted-foreground">Theo dõi cân nặng trong tháng</p>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis domain={[65, 75]} className="text-xs" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">-1.5kg</p>
                  <p className="text-sm text-muted-foreground">Giảm trong tháng</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">68.5kg</p>
                  <p className="text-sm text-muted-foreground">Hiện tại</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-success">65kg</p>
                  <p className="text-sm text-muted-foreground">Mục tiêu</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
