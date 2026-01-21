import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  Plus,
  Clock,
  User,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctor: string;
  date: string;
  time: string;
  type: string;
  status: "confirmed" | "waiting" | "completed" | "cancelled";
  notes?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "LH001",
    patientName: "Nguyễn Văn A",
    patientId: "BN001",
    doctor: "BS. Trần Văn X",
    date: "2024-01-20",
    time: "09:00",
    type: "Khám tổng quát",
    status: "confirmed",
  },
  {
    id: "LH002",
    patientName: "Trần Thị B",
    patientId: "BN002",
    doctor: "BS. Nguyễn Thị Y",
    date: "2024-01-20",
    time: "09:30",
    type: "Tái khám",
    status: "waiting",
  },
  {
    id: "LH003",
    patientName: "Lê Văn C",
    patientId: "BN003",
    doctor: "BS. Trần Văn X",
    date: "2024-01-20",
    time: "10:00",
    type: "Xét nghiệm",
    status: "completed",
  },
  {
    id: "LH004",
    patientName: "Phạm Thị D",
    patientId: "BN004",
    doctor: "BS. Lê Thị Z",
    date: "2024-01-20",
    time: "10:30",
    type: "Siêu âm thai",
    status: "confirmed",
  },
  {
    id: "LH005",
    patientName: "Hoàng Văn E",
    patientId: "BN005",
    doctor: "BS. Trần Văn X",
    date: "2024-01-20",
    time: "11:00",
    type: "Nội soi",
    status: "cancelled",
    notes: "Bệnh nhân hủy do bận việc",
  },
];

const getStatusBadge = (status: Appointment["status"]) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-success/10 text-success border-success/20">Đã xác nhận</Badge>;
    case "waiting":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Chờ xác nhận</Badge>;
    case "completed":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Hoàn thành</Badge>;
    case "cancelled":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Đã hủy</Badge>;
  }
};

const getStatusIcon = (status: Appointment["status"]) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="w-4 h-4 text-success" />;
    case "waiting":
      return <AlertCircle className="w-4 h-4 text-warning" />;
    case "completed":
      return <CheckCircle className="w-4 h-4 text-primary" />;
    case "cancelled":
      return <XCircle className="w-4 h-4 text-destructive" />;
  }
};

export default function Appointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const selectedDateStr = date?.toISOString().split("T")[0];
  const filteredAppointments = appointments.filter((apt) => apt.date === selectedDateStr);

  return (
    <DashboardLayout>
      <PageHeader
        title="Đặt lịch khám"
        description="Quản lý lịch hẹn khám bệnh của phòng khám"
        icon={<CalendarDays className="w-6 h-6" />}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="p-4 w-fit">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md w-full"
          />
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span>Đã xác nhận</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span>Chờ xác nhận</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span>Hoàn thành</span>
            </div>
          </div>
        </Card>

        {/* Appointments List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                Lịch hẹn ngày {date?.toLocaleDateString("vi-VN")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {filteredAppointments.length} lịch hẹn
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient">
                  <Plus className="w-4 h-4" />
                  Thêm lịch hẹn
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Đặt lịch hẹn mới</DialogTitle>
                  <DialogDescription>
                    Tạo lịch hẹn khám bệnh cho bệnh nhân
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Bệnh nhân *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn bệnh nhân" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BN001">Nguyễn Văn A</SelectItem>
                        <SelectItem value="BN002">Trần Thị B</SelectItem>
                        <SelectItem value="BN003">Lê Văn C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Bác sĩ *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn bác sĩ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BS001">BS. Trần Văn X</SelectItem>
                        <SelectItem value="BS002">BS. Nguyễn Thị Y</SelectItem>
                        <SelectItem value="BS003">BS. Lê Thị Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Ngày khám *</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Giờ khám *</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Loại khám</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại khám" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Khám tổng quát</SelectItem>
                        <SelectItem value="followup">Tái khám</SelectItem>
                        <SelectItem value="test">Xét nghiệm</SelectItem>
                        <SelectItem value="ultrasound">Siêu âm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button variant="gradient" onClick={() => setIsAddDialogOpen(false)}>
                    Đặt lịch
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {filteredAppointments.length === 0 ? (
            <Card className="p-8 text-center">
              <CalendarDays className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Không có lịch hẹn nào trong ngày này</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-lg">{appointment.time}</span>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {appointment.patientName}
                          </div>
                          <div className="flex items-center gap-1">
                            <Stethoscope className="w-4 h-4" />
                            {appointment.doctor}
                          </div>
                        </div>
                        <Badge variant="outline" className="mt-2">
                          {appointment.type}
                        </Badge>
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Ghi chú: {appointment.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(appointment.status)}
                      {appointment.status === "waiting" && (
                        <Button size="sm" variant="outline">
                          Xác nhận
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
