import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Stethoscope,
  Search,
  Pill,
  AlertTriangle,
  Info,
  BookOpen,
  ChevronRight,
} from "lucide-react";

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  dosage: string;
  usage: string;
  sideEffects: string[];
  contraindications: string[];
}

interface Symptom {
  id: string;
  name: string;
  description: string;
  possibleCauses: string[];
  recommendations: string[];
  severity: "low" | "medium" | "high";
}

const mockMedicines: Medicine[] = [
  {
    id: "M001",
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    category: "Giảm đau, hạ sốt",
    dosage: "500-1000mg mỗi 4-6 giờ, tối đa 4g/ngày",
    usage: "Điều trị đau đầu, đau răng, đau cơ, hạ sốt",
    sideEffects: ["Buồn nôn", "Phát ban (hiếm)", "Tổn thương gan (liều cao)"],
    contraindications: ["Bệnh gan nặng", "Dị ứng paracetamol"],
  },
  {
    id: "M002",
    name: "Amoxicillin 500mg",
    genericName: "Amoxicillin",
    category: "Kháng sinh",
    dosage: "250-500mg mỗi 8 giờ",
    usage: "Nhiễm khuẩn đường hô hấp, tai mũi họng, tiết niệu",
    sideEffects: ["Tiêu chảy", "Buồn nôn", "Phát ban"],
    contraindications: ["Dị ứng penicillin", "Bệnh gan nặng"],
  },
  {
    id: "M003",
    name: "Omeprazole 20mg",
    genericName: "Omeprazole",
    category: "Thuốc dạ dày",
    dosage: "20-40mg/ngày trước bữa ăn",
    usage: "Trào ngược dạ dày, loét dạ dày, tá tràng",
    sideEffects: ["Đau đầu", "Tiêu chảy", "Đau bụng"],
    contraindications: ["Dị ứng omeprazole", "Phụ nữ có thai (thận trọng)"],
  },
];

const mockSymptoms: Symptom[] = [
  {
    id: "S001",
    name: "Đau đầu",
    description: "Cảm giác đau hoặc khó chịu ở vùng đầu, có thể kèm theo buồn nôn",
    possibleCauses: ["Căng thẳng", "Mất nước", "Thiếu ngủ", "Đau nửa đầu", "Cảm cúm"],
    recommendations: [
      "Nghỉ ngơi trong phòng tối, yên tĩnh",
      "Uống đủ nước",
      "Dùng paracetamol theo chỉ dẫn",
      "Chườm lạnh/ấm lên trán",
    ],
    severity: "low",
  },
  {
    id: "S002",
    name: "Sốt cao",
    description: "Nhiệt độ cơ thể trên 38.5°C, kèm theo mệt mỏi, ớn lạnh",
    possibleCauses: ["Nhiễm virus", "Nhiễm khuẩn", "Viêm", "Phản ứng thuốc"],
    recommendations: [
      "Hạ sốt bằng paracetamol",
      "Uống nhiều nước",
      "Chườm mát",
      "Đến cơ sở y tế nếu sốt trên 39°C hoặc kéo dài",
    ],
    severity: "medium",
  },
  {
    id: "S003",
    name: "Khó thở",
    description: "Cảm giác không thể hít thở sâu, thiếu không khí",
    possibleCauses: ["Hen suyễn", "Viêm phổi", "COVID-19", "Bệnh tim", "Lo âu"],
    recommendations: [
      "Ngồi thẳng, thở chậm và sâu",
      "Mở cửa sổ lấy không khí",
      "ĐẾN CƠ SỞ Y TẾ NGAY NẾU KHÓ THỞ NẶNG",
    ],
    severity: "high",
  },
];

export default function MedicalLookup() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("medicines");

  const filteredMedicines = mockMedicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSymptoms = mockSymptoms.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityBadge = (severity: Symptom["severity"]) => {
    switch (severity) {
      case "low":
        return <Badge className="bg-success/10 text-success">Nhẹ</Badge>;
      case "medium":
        return <Badge className="bg-warning/10 text-warning">Trung bình</Badge>;
      case "high":
        return <Badge className="bg-destructive/10 text-destructive">Nghiêm trọng</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Tra cứu y khoa"
        description="Cơ sở dữ liệu thuốc, triệu chứng và hướng dẫn điều trị"
        icon={<Stethoscope className="w-6 h-6" />}
      />

      <div className="space-y-6">
        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm thuốc, triệu chứng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-lg h-12"
            />
          </div>
        </Card>

        {/* Disclaimer */}
        <Card className="p-4 bg-warning/10 border-warning/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-warning">Lưu ý quan trọng</p>
              <p className="text-sm text-muted-foreground">
                Thông tin này chỉ mang tính chất tham khảo. Vui lòng tham khảo ý kiến bác sĩ 
                trước khi sử dụng bất kỳ loại thuốc nào hoặc khi có triệu chứng bất thường.
              </p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="medicines" className="flex items-center gap-2">
              <Pill className="w-4 h-4" />
              Thuốc
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Triệu chứng
            </TabsTrigger>
          </TabsList>

          {/* Medicines Tab */}
          <TabsContent value="medicines" className="mt-4 space-y-4">
            {filteredMedicines.length === 0 ? (
              <Card className="p-8 text-center">
                <Pill className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Không tìm thấy thuốc nào</p>
              </Card>
            ) : (
              filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{medicine.name}</h3>
                      <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
                    </div>
                    <Badge variant="outline">{medicine.category}</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4 text-primary" />
                        Liều dùng
                      </h4>
                      <p className="text-sm text-muted-foreground">{medicine.dosage}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-success" />
                        Công dụng
                      </h4>
                      <p className="text-sm text-muted-foreground">{medicine.usage}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-warning">Tác dụng phụ</h4>
                      <div className="flex flex-wrap gap-2">
                        {medicine.sideEffects.map((effect, i) => (
                          <Badge key={i} variant="outline" className="bg-warning/5">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-destructive">Chống chỉ định</h4>
                      <div className="flex flex-wrap gap-2">
                        {medicine.contraindications.map((item, i) => (
                          <Badge key={i} variant="outline" className="bg-destructive/5">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Symptoms Tab */}
          <TabsContent value="symptoms" className="mt-4 space-y-4">
            {filteredSymptoms.length === 0 ? (
              <Card className="p-8 text-center">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Không tìm thấy triệu chứng nào</p>
              </Card>
            ) : (
              filteredSymptoms.map((symptom) => (
                <Card key={symptom.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{symptom.name}</h3>
                      <p className="text-sm text-muted-foreground">{symptom.description}</p>
                    </div>
                    {getSeverityBadge(symptom.severity)}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Nguyên nhân có thể</h4>
                      <div className="flex flex-wrap gap-2">
                        {symptom.possibleCauses.map((cause, i) => (
                          <Badge key={i} variant="outline">
                            {cause}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Khuyến nghị xử lý</h4>
                      <ul className="space-y-1">
                        {symptom.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className={rec.includes("ĐẾN CƠ SỞ") ? "text-destructive font-medium" : "text-muted-foreground"}>
                              {rec}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
