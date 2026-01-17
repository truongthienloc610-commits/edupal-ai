import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Sparkles,
  Loader2,
  Target,
  TrendingUp,
  MessageCircle,
  FileText,
  Send,
  User,
  Star,
} from "lucide-react";
import { suggestCareers, generateCV, streamChat, type CareerSuggestion } from "@/lib/ai";
import { toast } from "sonner";

const sampleInterests = ["Công nghệ", "Sáng tạo", "Kinh doanh", "Nghiên cứu", "Giảng dạy", "Thiết kế"];
const sampleSkills = ["Giao tiếp", "Làm việc nhóm", "Phân tích", "Sáng tạo", "Lập trình", "Tiếng Anh"];

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Career() {
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<CareerSuggestion[]>([]);
  
  // CV Generator
  const [cvInfo, setCvInfo] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: "",
  });
  const [generatedCV, setGeneratedCV] = useState("");
  const [cvLoading, setCvLoading] = useState(false);

  // Chatbot
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Xin chào! Mình là trợ lý tư vấn nghề nghiệp AI sử dụng Gemini. Bạn có thể hỏi mình về lương, kinh nghiệm, CV, phỏng vấn hoặc bất kỳ vấn đề gì về nghề nghiệp!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleSkill = (skill: string) => {
    setSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSuggest = async () => {
    if (interests.length === 0 || skills.length === 0) return;
    
    setLoading(true);
    try {
      const result = await suggestCareers(interests, skills);
      setSuggestions(result);
    } catch (error) {
      console.error(error);
      toast.error("Không thể lấy gợi ý nghề nghiệp. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCV = async () => {
    if (!cvInfo.name || !cvInfo.email) return;
    
    setCvLoading(true);
    try {
      const cv = await generateCV(cvInfo);
      setGeneratedCV(cv);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tạo CV. Vui lòng thử lại.");
    } finally {
      setCvLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    
    const userMessage: ChatMessage = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setChatLoading(true);

    let assistantContent = "";
    
    // Add empty assistant message that will be updated
    setChatMessages(prev => [...prev, { role: "assistant", content: "" }]);

    await streamChat({
      messages: [...chatMessages, userMessage],
      onDelta: (chunk) => {
        assistantContent += chunk;
        setChatMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: "assistant", content: assistantContent };
          return newMessages;
        });
      },
      onDone: () => {
        setChatLoading(false);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
        setChatLoading(false);
      },
    });
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Định hướng nghề nghiệp"
        description="Khám phá ngành nghề phù hợp và phát triển kỹ năng với AI Gemini"
        icon={<Briefcase className="w-6 h-6" />}
      />

      <Tabs defaultValue="explore" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="explore" className="gap-2">
            <Target className="w-4 h-4" />
            Khám phá nghề nghiệp
          </TabsTrigger>
          <TabsTrigger value="cv" className="gap-2">
            <FileText className="w-4 h-4" />
            Tạo CV
          </TabsTrigger>
          <TabsTrigger value="chat" className="gap-2">
            <MessageCircle className="w-4 h-4" />
            Hỏi đáp AI
          </TabsTrigger>
        </TabsList>

        {/* Career Explorer */}
        <TabsContent value="explore">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <AIAvatar size="sm" />
                <div>
                  <h3 className="font-semibold">Nhập thông tin của bạn</h3>
                  <p className="text-sm text-muted-foreground">Chọn sở thích và kỹ năng</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Sở thích của bạn</Label>
                  <div className="flex flex-wrap gap-2">
                    {sampleInterests.map(interest => (
                      <Button
                        key={interest}
                        variant={interests.includes(interest) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Kỹ năng nổi bật</Label>
                  <div className="flex flex-wrap gap-2">
                    {sampleSkills.map(skill => (
                      <Button
                        key={skill}
                        variant={skills.includes(skill) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSuggest}
                  disabled={interests.length === 0 || skills.length === 0 || loading}
                  variant="gradient"
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Đang phân tích...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Gợi ý nghề nghiệp
                    </>
                  )}
                </Button>
              </div>
            </Card>

            <div className="space-y-4">
              {suggestions.length === 0 && !loading && (
                <Card className="p-8 text-center">
                  <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Chưa có gợi ý</h3>
                  <p className="text-muted-foreground">
                    Chọn sở thích và kỹ năng để AI gợi ý nghề nghiệp phù hợp
                  </p>
                </Card>
              )}

              {suggestions.map((career, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{career.career}</h3>
                      <p className="text-sm text-muted-foreground">{career.description}</p>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-success/10">
                      <Star className="w-4 h-4 text-success" />
                      <span className="font-semibold text-success">{career.matchScore}%</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Kỹ năng cần có:</p>
                    <div className="flex flex-wrap gap-1">
                      {career.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-muted text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Lộ trình phát triển:
                    </p>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {career.path.map((step, i) => (
                        <div key={i} className="flex items-center gap-2 shrink-0">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                            {step}
                          </span>
                          {i < career.path.length - 1 && (
                            <span className="text-muted-foreground">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* CV Generator */}
        <TabsContent value="cv">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Thông tin cá nhân
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    value={cvInfo.name}
                    onChange={(e) => setCvInfo({ ...cvInfo, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={cvInfo.email}
                      onChange={(e) => setCvInfo({ ...cvInfo, email: e.target.value })}
                      placeholder="email@example.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={cvInfo.phone}
                      onChange={(e) => setCvInfo({ ...cvInfo, phone: e.target.value })}
                      placeholder="0123 456 789"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="education">Học vấn</Label>
                  <Input
                    id="education"
                    value={cvInfo.education}
                    onChange={(e) => setCvInfo({ ...cvInfo, education: e.target.value })}
                    placeholder="Đại học ABC - Ngành XYZ"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="skills">Kỹ năng</Label>
                  <Input
                    id="skills"
                    value={cvInfo.skills}
                    onChange={(e) => setCvInfo({ ...cvInfo, skills: e.target.value })}
                    placeholder="React, TypeScript, Teamwork..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Kinh nghiệm</Label>
                  <Textarea
                    id="experience"
                    value={cvInfo.experience}
                    onChange={(e) => setCvInfo({ ...cvInfo, experience: e.target.value })}
                    placeholder="Mô tả ngắn gọn kinh nghiệm làm việc, dự án..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleGenerateCV}
                  disabled={!cvInfo.name || !cvInfo.email || cvLoading}
                  variant="gradient"
                  className="w-full"
                >
                  {cvLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Đang tạo CV...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      Tạo CV
                    </>
                  )}
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">CV của bạn</h3>
              {generatedCV ? (
                <pre className="p-4 bg-muted rounded-lg font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                  {generatedCV}
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center text-center p-8">
                  <div>
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Điền thông tin và nhấn "Tạo CV" để xem kết quả
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Career Chatbot */}
        <TabsContent value="chat">
          <Card className="max-w-3xl mx-auto">
            <div className="p-4 border-b flex items-center gap-3">
              <AIAvatar size="sm" />
              <div>
                <h3 className="font-semibold">Trợ lý tư vấn nghề nghiệp AI</h3>
                <p className="text-xs text-muted-foreground">Powered by Gemini - Hỏi bất kỳ điều gì về nghề nghiệp</p>
              </div>
            </div>

            <div ref={chatContainerRef} className="h-[400px] overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.content || (chatLoading ? "..." : "")}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleChat()}
                  placeholder="Hỏi về lương, kinh nghiệm, CV, phỏng vấn..."
                  className="flex-1"
                  disabled={chatLoading}
                />
                <Button onClick={handleChat} disabled={!chatInput.trim() || chatLoading}>
                  {chatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
