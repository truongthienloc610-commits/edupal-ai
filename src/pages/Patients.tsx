import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  FileText,
  MoreVertical,
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  lastVisit: string;
  status: "active" | "inactive";
  condition: string;
}

const mockPatients: Patient[] = [
  {
    id: "BN001",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    email: "nguyenvana@email.com",
    dob: "1985-05-15",
    gender: "Nam",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    lastVisit: "2024-01-15",
    status: "active",
    condition: "Tiểu đường type 2",
  },
  {
    id: "BN002",
    name: "Trần Thị B",
    phone: "0912345678",
    email: "tranthib@email.com",
    dob: "1990-08-20",
    gender: "Nữ",
    address: "456 Đường XYZ, Quận 3, TP.HCM",
    lastVisit: "2024-01-18",
    status: "active",
    condition: "Cao huyết áp",
  },
  {
    id: "BN003",
    name: "Lê Văn C",
    phone: "0923456789",
    email: "levanc@email.com",
    dob: "1978-12-01",
    gender: "Nam",
    address: "789 Đường DEF, Quận 7, TP.HCM",
    lastVisit: "2024-01-10",
    status: "active",
    condition: "Viêm khớp",
  },
  {
    id: "BN004",
    name: "Phạm Thị D",
    phone: "0934567890",
    email: "phamthid@email.com",
    dob: "1995-03-25",
    gender: "Nữ",
    address: "321 Đường GHI, Quận 5, TP.HCM",
    lastVisit: "2024-01-20",
    status: "active",
    condition: "Thai kỳ",
  },
  {
    id: "BN005",
    name: "Hoàng Văn E",
    phone: "0945678901",
    email: "hoangvane@email.com",
    dob: "1982-07-10",
    gender: "Nam",
    address: "654 Đường JKL, Quận 10, TP.HCM",
    lastVisit: "2023-12-28",
    status: "inactive",
    condition: "Dạ dày",
  },
];

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients] = useState<Patient[]>(mockPatients);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="Quản lý bệnh nhân"
        description="Xem và quản lý thông tin bệnh nhân của phòng khám"
        icon={<Users className="w-6 h-6" />}
      />

      <div className="space-y-6">
        {/* Search and Actions */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên, mã BN hoặc SĐT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient">
                  <Plus className="w-4 h-4" />
                  Thêm bệnh nhân
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Thêm bệnh nhân mới</DialogTitle>
                  <DialogDescription>
                    Nhập thông tin bệnh nhân để tạo hồ sơ mới
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên *</Label>
                      <Input id="name" placeholder="Nguyễn Văn A" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input id="phone" placeholder="0901234567" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Ngày sinh *</Label>
                      <Input id="dob" type="date" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Giới tính</Label>
                      <Input id="gender" placeholder="Nam/Nữ" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Tình trạng bệnh</Label>
                      <Input id="condition" placeholder="Mô tả tình trạng" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Textarea id="address" placeholder="Nhập địa chỉ đầy đủ" />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button variant="gradient" onClick={() => setIsAddDialogOpen(false)}>
                    Lưu bệnh nhân
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-primary">{patients.length}</div>
            <p className="text-sm text-muted-foreground">Tổng bệnh nhân</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-success">
              {patients.filter((p) => p.status === "active").length}
            </div>
            <p className="text-sm text-muted-foreground">Đang theo dõi</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-accent">12</div>
            <p className="text-sm text-muted-foreground">Khám hôm nay</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-wellness">3</div>
            <p className="text-sm text-muted-foreground">Bệnh nhân mới</p>
          </Card>
        </div>

        {/* Patients Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã BN</TableHead>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Ngày sinh</TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead>Lần khám cuối</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {patient.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.gender}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {patient.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      {new Date(patient.dob).toLocaleDateString("vi-VN")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.condition}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(patient.lastVisit).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={patient.status === "active" ? "default" : "secondary"}
                    >
                      {patient.status === "active" ? "Đang theo dõi" : "Ngừng theo dõi"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
