import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileHeart,
  Search,
  FileText,
  Pill,
  TestTube,
  Activity,
  Download,
  Eye,
  Calendar,
  User,
} from "lucide-react";

interface HealthRecord {
  id: string;
  patientName: string;
  patientId: string;
  type: "prescription" | "test" | "report" | "note";
  title: string;
  date: string;
  doctor: string;
  summary: string;
}

const mockRecords: HealthRecord[] = [
  {
    id: "HS001",
    patientName: "Nguyễn Văn A",
    patientId: "BN001",
    type: "test",
    title: "Xét nghiệm máu tổng quát",
    date: "2024-01-18",
    doctor: "BS. Trần Văn X",
    summary: "Chỉ số đường huyết: 6.5 mmol/L, HbA1c: 7.2%",
  },
  {
    id: "HS002",
    patientName: "Nguyễn Văn A",
    patientId: "BN001",
    type: "prescription",
    title: "Đơn thuốc điều trị tiểu đường",
    date: "2024-01-18",
    doctor: "BS. Trần Văn X",
    summary: "Metformin 500mg x 2 lần/ngày, Gliclazide 30mg x 1 lần/ngày",
  },
  {
    id: "HS003",
    patientName: "Trần Thị B",
    patientId: "BN002",
    type: "test",
    title: "Đo huyết áp định kỳ",
    date: "2024-01-17",
    doctor: "BS. Nguyễn Thị Y",
    summary: "Huyết áp: 145/95 mmHg, Nhịp tim: 78 bpm",
  },
  {
    id: "HS004",
    patientName: "Phạm Thị D",
    patientId: "BN004",
    type: "report",
    title: "Kết quả siêu âm thai 20 tuần",
    date: "2024-01-15",
    doctor: "BS. Lê Thị Z",
    summary: "Thai phát triển bình thường, cân nặng ước tính 350g",
  },
  {
    id: "HS005",
    patientName: "Lê Văn C",
    patientId: "BN003",
    type: "note",
    title: "Ghi chú khám viêm khớp",
    date: "2024-01-10",
    doctor: "BS. Trần Văn X",
    summary: "Đau khớp gối phải, sưng nhẹ, cần theo dõi thêm",
  },
];

const getTypeIcon = (type: HealthRecord["type"]) => {
  switch (type) {
    case "prescription":
      return <Pill className="w-5 h-5 text-primary" />;
    case "test":
      return <TestTube className="w-5 h-5 text-success" />;
    case "report":
      return <FileText className="w-5 h-5 text-accent" />;
    case "note":
      return <Activity className="w-5 h-5 text-wellness" />;
  }
};

const getTypeBadge = (type: HealthRecord["type"]) => {
  switch (type) {
    case "prescription":
      return <Badge className="bg-primary/10 text-primary">Đơn thuốc</Badge>;
    case "test":
      return <Badge className="bg-success/10 text-success">Xét nghiệm</Badge>;
    case "report":
      return <Badge className="bg-accent/10 text-accent">Báo cáo</Badge>;
    case "note":
      return <Badge className="bg-wellness/10 text-wellness">Ghi chú</Badge>;
  }
};

export default function HealthRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [records] = useState<HealthRecord[]>(mockRecords);
  const [activeTab, setActiveTab] = useState("all");

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && record.type === activeTab;
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Hồ sơ sức khỏe"
        description="Quản lý kết quả xét nghiệm, đơn thuốc và hồ sơ y tế"
        icon={<FileHeart className="w-6 h-6" />}
      />

      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">Đơn thuốc</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <TestTube className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">Xét nghiệm</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">Báo cáo</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-wellness/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-wellness" />
              </div>
              <div>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">Ghi chú</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên bệnh nhân hoặc tiêu đề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        {/* Tabs and Records */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="prescription">Đơn thuốc</TabsTrigger>
            <TabsTrigger value="test">Xét nghiệm</TabsTrigger>
            <TabsTrigger value="report">Báo cáo</TabsTrigger>
            <TabsTrigger value="note">Ghi chú</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {filteredRecords.length === 0 ? (
                <Card className="p-8 text-center">
                  <FileHeart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Không tìm thấy hồ sơ nào</p>
                </Card>
              ) : (
                filteredRecords.map((record) => (
                  <Card key={record.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                          {getTypeIcon(record.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{record.title}</h4>
                            {getTypeBadge(record.type)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {record.summary}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {record.patientName} ({record.patientId})
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(record.date).toLocaleDateString("vi-VN")}
                            </div>
                            <span>{record.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
