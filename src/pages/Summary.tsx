import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Upload,
  Sparkles,
  Loader2,
  List,
  BookOpen,
  Network,
  Copy,
  Check,
} from "lucide-react";
import { summarizeContent, type SummaryResult } from "@/lib/ai";

export default function Summary() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!content) return;
    
    setLoading(true);
    try {
      const summary = await summarizeContent(content);
      setResult(summary);
    } catch (error) {
      console.error(error);
      const { toast } = await import("sonner");
      toast.error("Không thể tóm tắt nội dung. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleContent = `Nguyên lý cơ bản của động lực học là nghiên cứu về chuyển động của vật thể dưới tác dụng của lực. Ba định luật Newton là nền tảng của động lực học cổ điển.

Định luật 1 (Định luật quán tính): Một vật sẽ giữ nguyên trạng thái đứng yên hoặc chuyển động thẳng đều nếu không có lực nào tác dụng lên nó hoặc tổng các lực tác dụng bằng không.

Định luật 2: Gia tốc của một vật tỉ lệ thuận với tổng lực tác dụng lên nó và tỉ lệ nghịch với khối lượng của vật. Công thức: F = ma.

Định luật 3: Khi một vật tác dụng lên vật khác một lực, vật kia cũng tác dụng lại vật đó một phản lực có cùng độ lớn nhưng ngược chiều.`;

  return (
    <DashboardLayout>
      <PageHeader
        title="Tóm tắt bài học"
        description="Chuyển đổi nội dung dài thành ghi chú ngắn gọn, dễ hiểu"
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <AIAvatar size="sm" />
              <div>
                <h3 className="font-semibold">Nhập nội dung cần tóm tắt</h3>
                <p className="text-sm text-muted-foreground">
                  Dán văn bản hoặc tải file PDF
                </p>
              </div>
            </div>

            <Textarea
              placeholder="Dán nội dung bài học vào đây..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="mb-4 font-mono text-sm"
            />

            <div className="flex gap-3">
              <Button
                onClick={handleSummarize}
                disabled={!content || loading}
                className="flex-1"
                variant="gradient"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang tóm tắt...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Tóm tắt nội dung
                  </>
                )}
              </Button>
              <Button variant="outline" disabled>
                <Upload className="w-4 h-4" />
                Tải PDF
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-muted/50">
            <p className="text-sm text-muted-foreground mb-2">Thử với nội dung mẫu:</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setContent(sampleContent)}
              className="text-primary"
            >
              Định luật Newton (Vật lý)
            </Button>
          </Card>
        </div>

        {/* Result Section */}
        <div>
          {!result && !loading && (
            <Card className="p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Sẵn sàng tóm tắt</h3>
              <p className="text-muted-foreground max-w-sm">
                Nhập nội dung bài học và AI sẽ tạo bản tóm tắt với ý chính, giải thích đơn giản và sơ đồ tư duy
              </p>
            </Card>
          )}

          {loading && (
            <Card className="p-8 text-center h-full flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
              <h3 className="font-semibold text-lg mb-2">Đang phân tích...</h3>
              <p className="text-muted-foreground">
                AI đang đọc và tóm tắt nội dung
              </p>
            </Card>
          )}

          {result && !loading && (
            <Tabs defaultValue="points" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="points" className="gap-2">
                  <List className="w-4 h-4" />
                  Ý chính
                </TabsTrigger>
                <TabsTrigger value="explain" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Giải thích
                </TabsTrigger>
                <TabsTrigger value="mindmap" className="gap-2">
                  <Network className="w-4 h-4" />
                  Sơ đồ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="points" className="mt-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Các ý chính</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(result.mainPoints.join("\n"))}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <ul className="space-y-3">
                    {result.mainPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-3">Thuật ngữ quan trọng</h4>
                    <div className="space-y-2">
                      {result.keyTerms.map((term, index) => (
                        <div key={index} className="p-3 rounded-lg bg-muted/50">
                          <span className="font-medium text-primary">{term.term}:</span>{" "}
                          <span className="text-muted-foreground">{term.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="explain" className="mt-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Giải thích đơn giản</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(result.simpleExplanation)}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                    {result.simpleExplanation}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="mindmap" className="mt-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Sơ đồ tư duy</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(result.mindMap)}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="p-4 rounded-lg bg-muted/50 font-mono text-sm overflow-x-auto whitespace-pre">
                    {result.mindMap}
                  </pre>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
