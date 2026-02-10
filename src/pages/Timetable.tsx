import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Plus, Pencil, Trash2, Download, Eye } from "lucide-react";
import { toast } from "sonner";

const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const SESSIONS = ["Sáng", "Chiều", "Tối"];
const SESSION_TIMES: Record<string, string> = {
  "Sáng": "07:00 – 11:30",
  "Chiều": "13:00 – 17:00",
  "Tối": "18:00 – 21:00",
};

const SUBJECT_COLORS: Record<string, string> = {
  "Toán": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "Lý": "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  "Hóa": "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  "Tin học": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  "Ôn tập": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "Anh văn": "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  "Văn": "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  "Sử": "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  "Địa": "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
  "Sinh": "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300",
};

const DEFAULT_COLOR = "bg-muted text-muted-foreground";

interface TimetableEntry {
  id: string;
  day: string;
  session: string;
  subject: string;
  note: string;
}

const DEFAULT_DATA: TimetableEntry[] = [
  { id: "1", day: "Thứ 2", session: "Sáng", subject: "Toán", note: "" },
  { id: "2", day: "Thứ 3", session: "Chiều", subject: "Lý", note: "" },
  { id: "3", day: "Thứ 4", session: "Sáng", subject: "Hóa", note: "" },
  { id: "4", day: "Thứ 5", session: "Tối", subject: "Ôn tập", note: "" },
  { id: "5", day: "Thứ 6", session: "Chiều", subject: "Tin học", note: "" },
];

const STORAGE_KEY = "kma-res-timetable";

function getColorClass(subject: string) {
  return SUBJECT_COLORS[subject] || DEFAULT_COLOR;
}

export default function Timetable() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [viewMode, setViewMode] = useState<"week" | "day">("week");
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<TimetableEntry | null>(null);
  const [form, setForm] = useState({ day: DAYS[0], session: SESSIONS[0], subject: "", note: "" });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setEntries(JSON.parse(stored)); } catch { setEntries(DEFAULT_DATA); }
    } else {
      setEntries(DEFAULT_DATA);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (entries.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const openAdd = () => {
    setEditEntry(null);
    setForm({ day: selectedDay !== "all" ? selectedDay : DAYS[0], session: SESSIONS[0], subject: "", note: "" });
    setDialogOpen(true);
  };

  const openEdit = (entry: TimetableEntry) => {
    setEditEntry(entry);
    setForm({ day: entry.day, session: entry.session, subject: entry.subject, note: entry.note });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.subject.trim()) { toast.error("Vui lòng nhập tên môn học"); return; }
    if (editEntry) {
      setEntries(prev => prev.map(e => e.id === editEntry.id ? { ...e, ...form } : e));
      toast.success("Đã cập nhật môn học");
    } else {
      setEntries(prev => [...prev, { id: Date.now().toString(), ...form }]);
      toast.success("Đã thêm môn học");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    toast.success("Đã xóa môn học");
  };

  const exportPDF = useCallback(() => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) { toast.error("Không thể mở cửa sổ in"); return; }

    const displayEntries = viewMode === "day" ? entries.filter(e => e.day === selectedDay) : entries;
    const sorted = [...displayEntries].sort((a, b) => {
      const dayDiff = DAYS.indexOf(a.day) - DAYS.indexOf(b.day);
      if (dayDiff !== 0) return dayDiff;
      return SESSIONS.indexOf(a.session) - SESSIONS.indexOf(b.session);
    });

    printWindow.document.write(`<!DOCTYPE html><html><head><title>Thời khóa biểu - KMA-RES EduAI</title>
      <style>
        body{font-family:system-ui,sans-serif;padding:40px;color:#222}
        h1{text-align:center;margin-bottom:8px}
        p.sub{text-align:center;color:#666;margin-bottom:24px}
        table{width:100%;border-collapse:collapse}
        th,td{border:1px solid #ddd;padding:10px 14px;text-align:left}
        th{background:#f5f5f5;font-weight:600}
        tr:nth-child(even){background:#fafafa}
      </style></head><body>
      <h1>📅 Thời khóa biểu</h1>
      <p class="sub">KMA-RES EduAI • ${viewMode === "day" ? selectedDay : "Cả tuần"}</p>
      <table><thead><tr><th>Thứ</th><th>Buổi</th><th>Thời gian</th><th>Môn học</th><th>Ghi chú</th></tr></thead><tbody>
      ${sorted.map(e => `<tr><td>${e.day}</td><td>${e.session}</td><td>${SESSION_TIMES[e.session]}</td><td>${e.subject}</td><td>${e.note || "—"}</td></tr>`).join("")}
      </tbody></table></body></html>`);
    printWindow.document.close();
    printWindow.print();
  }, [entries, viewMode, selectedDay]);

  const displayEntries = viewMode === "day" ? entries.filter(e => e.day === selectedDay) : entries;
  const sorted = [...displayEntries].sort((a, b) => {
    const dayDiff = DAYS.indexOf(a.day) - DAYS.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return SESSIONS.indexOf(a.session) - SESSIONS.indexOf(b.session);
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Thời khóa biểu"
        description="Quản lý lịch học trong tuần của bạn"
        icon={<CalendarDays className="w-6 h-6" />}
      />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "week" | "day")}>
            <TabsList className="liquid-glass">
              <TabsTrigger value="week" className="gap-2">
                <Eye className="w-4 h-4" /> Cả tuần
              </TabsTrigger>
              <TabsTrigger value="day" className="gap-2">
                <CalendarDays className="w-4 h-4" /> Theo ngày
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {viewMode === "day" && (
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={exportPDF} className="gap-2">
            <Download className="w-4 h-4" /> Xuất PDF
          </Button>
          <Button variant="gradient" onClick={openAdd} className="gap-2">
            <Plus className="w-4 h-4" /> Thêm môn
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Thứ</TableHead>
              <TableHead className="w-20">Buổi</TableHead>
              <TableHead className="w-32">Thời gian</TableHead>
              <TableHead>Môn học</TableHead>
              <TableHead>Ghi chú</TableHead>
              <TableHead className="w-24 text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  Chưa có môn học nào. Bấm "Thêm môn" để bắt đầu.
                </TableCell>
              </TableRow>
            ) : (
              sorted.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.day}</TableCell>
                  <TableCell>{entry.session}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{SESSION_TIMES[entry.session]}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getColorClass(entry.subject)}`}>
                      {entry.subject}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{entry.note || "—"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(entry)} className="h-8 w-8">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)} className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editEntry ? "Sửa môn học" : "Thêm môn học"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Thứ</Label>
                <Select value={form.day} onValueChange={(v) => setForm(f => ({ ...f, day: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {DAYS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Buổi</Label>
                <Select value={form.session} onValueChange={(v) => setForm(f => ({ ...f, session: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SESSIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Môn học</Label>
              <Input
                value={form.subject}
                onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder="VD: Toán, Lý, Hóa..."
              />
            </div>
            <div className="space-y-2">
              <Label>Ghi chú</Label>
              <Input
                value={form.note}
                onChange={(e) => setForm(f => ({ ...f, note: e.target.value }))}
                placeholder="Ghi chú thêm (không bắt buộc)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Hủy</Button>
            <Button variant="gradient" onClick={handleSave}>
              {editEntry ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
