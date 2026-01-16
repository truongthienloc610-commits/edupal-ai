import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
import { suggestCareers, generateCV, type CareerSuggestion } from "@/lib/mockAI";

const sampleInterests = ["Công nghệ", "Sáng tạo", "Kinh doanh", "Nghiên cứu", "Giảng dạy", "Thiết kế"];
const sampleSkills = ["Giao tiếp", "Làm việc nhóm", "Phân tích", "Sáng tạo", "Lập trình", "Tiếng Anh"];

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

const careerChatResponses: Record<string, string> = {
  "lương": "Mức lương trong ngành công nghệ thông tin tại Việt Nam khá hấp dẫn. Fresher: 8-15 triệu/tháng, Junior (1-2 năm): 15-25 triệu, Middle (3-5 năm): 25-40 triệu, Senior (5+ năm): 40-80+ triệu. Tuy nhiên, mức lương còn phụ thuộc vào công ty và kỹ năng cá nhân.",
  "kinh nghiệm": "Để có kinh nghiệm khi chưa đi làm, bạn có thể: 1) Tham gia dự án nhóm ở trường, 2) Làm freelance, 3) Thực tập sớm từ năm 2-3, 4) Xây dựng portfolio cá nhân, 5) Đóng góp cho dự án mã nguồn mở, 6) Tham gia các cuộc thi lập trình/hackathon.",
  "cv": "Một CV tốt cần có: 1) Thông tin liên lạc rõ ràng, 2) Mục tiêu nghề nghiệp ngắn gọn, 3) Học vấn và chứng chỉ, 4) Kinh nghiệm (nếu có), 5) Kỹ năng cứng và mềm, 6) Dự án đã làm. Hãy giữ CV trong 1 trang và tùy chỉnh cho từng vị trí.",
  "phỏng vấn": "Để chuẩn bị phỏng vấn tốt: 1) Nghiên cứu kỹ về công ty, 2) Chuẩn bị câu trả lời cho các câu hỏi phổ biến, 3) Chuẩn bị câu hỏi để hỏi nhà tuyển dụng, 4) Ăn mặc phù hợp, 5) Đến sớm 10-15 phút, 6) Mang theo CV và portfolio.",
};

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
    { role: "ai", content: "Xin chào! Mình là trợ lý tư vấn nghề nghiệp. Bạn có thể hỏi mình về lương, kinh nghiệm, CV, phỏng vấn hoặc bất kỳ vấn đề gì về nghề nghiệp!" }
  ]);
  const [chatInput, setChatInput] = useState("");

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
    } finally {
      setCvLoading(false);
    }
  };

  const handleChat = () => {
    if (!chatInput.trim()) return;
    
    const userMessage: ChatMessage = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Simple keyword matching for demo
    setTimeout(() => {
      let response = "Cảm ơn câu hỏi của bạn! Để tư vấn chính xác hơn, bạn có thể cung cấp thêm thông tin về lĩnh vực bạn quan tâm không?";
      
      const lowerInput = chatInput.toLowerCase();
      for (const [keyword, answer] of Object.entries(careerChatResponses)) {
        if (lowerInput.includes(keyword)) {
          response = answer;
          break;
        }
      }
      
      const aiMessage: ChatMessage = { role: "ai", content: response };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
    
    setChatInput("");
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Định hướng nghề nghiệp"
        description="Khám phá ngành nghề phù hợp và phát triển kỹ năng"
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
            Hỏi đáp
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
                <pre className="p-4 bg-muted rounded-lg font-mono text-sm whitespace-pre overflow-x-auto">
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
                <h3 className="font-semibold">Trợ lý tư vấn nghề nghiệp</h3>
                <p className="text-xs text-muted-foreground">Hỏi bất kỳ điều gì về nghề nghiệp</p>
              </div>
            </div>

            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
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
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
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
                />
                <Button onClick={handleChat} disabled={!chatInput.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
