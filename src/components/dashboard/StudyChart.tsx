import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";

const weeklyData = [
  { day: "T2", hours: 3.5, target: 4, tasks: 5 },
  { day: "T3", hours: 4.2, target: 4, tasks: 6 },
  { day: "T4", hours: 2.5, target: 4, tasks: 3 },
  { day: "T5", hours: 5, target: 4, tasks: 7 },
  { day: "T6", hours: 3, target: 4, tasks: 4 },
  { day: "T7", hours: 2, target: 3, tasks: 3 },
  { day: "CN", hours: 1.5, target: 2, tasks: 2 },
];

const subjectData = [
  { subject: "Toán", score: 75, previous: 68 },
  { subject: "Lý", score: 60, previous: 55 },
  { subject: "Anh", score: 85, previous: 80 },
  { subject: "Hóa", score: 45, previous: 50 },
  { subject: "Văn", score: 70, previous: 65 },
];

export function StudyHoursChart() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Giờ học trong tuần
        </h3>
        <span className="text-sm text-muted-foreground">Tổng: 21.7h</span>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(174 62% 47%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(174 62% 47%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(215 16% 47%)' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(215 16% 47%)' }}
              unit="h"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0 0% 100%)',
                border: '1px solid hsl(214 32% 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number) => [`${value}h`, 'Giờ học']}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="hsl(174 62% 47%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorHours)"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="hsl(263 60% 60%)"
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Thực tế</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-wellness" style={{ borderStyle: 'dashed' }} />
          <span className="text-muted-foreground">Mục tiêu</span>
        </div>
      </div>
    </Card>
  );
}

export function SubjectProgressChart() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Tiến độ theo môn học</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={subjectData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" vertical={false} />
            <XAxis 
              dataKey="subject" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(215 16% 47%)' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(215 16% 47%)' }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0 0% 100%)',
                border: '1px solid hsl(214 32% 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number, name: string) => [
                `${value}%`,
                name === 'score' ? 'Tuần này' : 'Tuần trước'
              ]}
            />
            <Legend 
              formatter={(value) => value === 'previous' ? 'Tuần trước' : 'Tuần này'}
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar 
              dataKey="previous" 
              fill="hsl(214 32% 91%)" 
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
            <Bar 
              dataKey="score" 
              fill="hsl(174 62% 47%)" 
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
