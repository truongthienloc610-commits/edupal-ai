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
  Sparkles,
  User,
  Loader2,
  BookOpen,
  Brain,
  Target,
  Briefcase,
} from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "Giải thích định lý Pytago dễ hiểu",
  "Cách học từ vựng tiếng Anh hiệu quả?",
  "Tóm tắt bài Chiến tranh thế giới thứ 2",
  "Làm sao để tập trung học tốt hơn?",
];

export default function AIConsult() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Xin chào! Tôi là KMA-RES AI, trợ lý học tập thông minh của bạn. Tôi có thể giúp bạn:\n\n📚 Giải thích bài học khó hiểu\n🧠 Tạo tóm tắt và sơ đồ tư duy\n🎯 Gợi ý phương pháp học hiệu quả\n💼 Định hướng nghề nghiệp\n\nBạn cần hỗ trợ gì hôm nay?",
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
        title="Hỏi AI"
        description="Trợ lý AI giải đáp mọi thắc mắc về học tập"
        icon={<MessageCircle className="w-6 h-6" />}
      />

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Features */}
          <Card className="p-4">
            <h4 className="font-medium mb-3">AI có thể giúp bạn</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>Giải thích bài học</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="w-4 h-4 text-accent" />
                <span>Tóm tắt nội dung</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="w-4 h-4 text-success" />
                <span>Phương pháp học</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="w-4 h-4 text-wellness" />
                <span>Hướng nghiệp</span>
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
            <h4 className="font-medium mb-3">Chủ đề</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Toán học</Badge>
              <Badge variant="outline">Tiếng Anh</Badge>
              <Badge variant="outline">Vật lý</Badge>
              <Badge variant="outline">Hóa học</Badge>
              <Badge variant="outline">Lịch sử</Badge>
              <Badge variant="outline">Văn học</Badge>
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
                placeholder="Nhập câu hỏi về bài học..."
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
