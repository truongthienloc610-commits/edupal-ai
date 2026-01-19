import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { streamChat } from "@/lib/ai";
import { toast } from "sonner";
import {
  MessageCircle,
  Send,
  AlertTriangle,
  Sparkles,
  User,
  Loader2,
} from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "Triệu chứng đau đầu kéo dài nên làm gì?",
  "Thuốc giảm đau nào an toàn nhất?",
  "Cách kiểm soát huyết áp cao?",
  "Khi nào cần đi khám bác sĩ ngay?",
];

export default function AIConsult() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Xin chào! Tôi là MediCare AI, trợ lý tư vấn sức khỏe của bạn. Tôi có thể giúp bạn tìm hiểu về triệu chứng, thuốc, và các vấn đề sức khỏe thông thường.\n\n⚠️ **Lưu ý**: Tôi chỉ cung cấp thông tin tham khảo, không thay thế tư vấn y tế chuyên nghiệp. Nếu có triệu chứng nghiêm trọng, hãy đến cơ sở y tế ngay.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";
    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && assistantContent.length > 0) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        if (last?.role === "user") {
          return [...prev, { role: "assistant", content: assistantContent }];
        }
        return prev;
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        })),
        onDelta: updateAssistant,
        onDone: () => setIsLoading(false),
        onError: (error) => {
          toast.error("Lỗi: " + error.message);
          setIsLoading(false);
        },
      });
    } catch {
      toast.error("Không thể kết nối với AI. Vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Tư vấn AI"
        description="Chatbot AI hỗ trợ tư vấn sức khỏe 24/7"
        icon={<MessageCircle className="w-6 h-6" />}
      />

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Disclaimer */}
          <Card className="p-4 bg-warning/10 border-warning/30">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Lưu ý quan trọng</p>
                <p className="text-xs text-muted-foreground">
                  AI chỉ cung cấp thông tin tham khảo, không thay thế chẩn đoán y khoa.
                </p>
              </div>
            </div>
          </Card>

          {/* Suggested Questions */}
          <Card className="p-4">
            <h4 className="font-medium mb-3">Câu hỏi gợi ý</h4>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2 px-3"
                  onClick={() => handleSend(question)}
                  disabled={isLoading}
                >
                  <Sparkles className="w-3 h-3 mr-2 shrink-0 text-primary" />
                  <span className="truncate text-xs">{question}</span>
                </Button>
              ))}
            </div>
          </Card>

          {/* Topics */}
          <Card className="p-4">
            <h4 className="font-medium mb-3">Chủ đề hỗ trợ</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Triệu chứng</Badge>
              <Badge variant="outline">Thuốc</Badge>
              <Badge variant="outline">Dinh dưỡng</Badge>
              <Badge variant="outline">Phòng bệnh</Badge>
              <Badge variant="outline">Sơ cứu</Badge>
              <Badge variant="outline">Sức khỏe tâm thần</Badge>
            </div>
          </Card>
        </div>

        {/* Chat Area */}
        <Card className="lg:col-span-3 flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {message.role === "assistant" ? (
                    <AIAvatar size="sm" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-start gap-3">
                  <AIAvatar size="sm" />
                  <div className="bg-muted rounded-2xl p-4">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập câu hỏi về sức khỏe..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} variant="gradient">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
