import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  FileUp,
  FileText,
  Trash2,
  Sparkles,
  Loader2,
  Upload,
  MessageCircle,
  Send,
  X,
  File,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { streamChat } from "@/lib/ai";

interface Document {
  id: string;
  title: string;
  file_path: string;
  file_size: number | null;
  content_text: string | null;
  ai_summary: string | null;
  created_at: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Documents() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [summarizing, setSummarizing] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) fetchDocuments();
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching documents:", error);
      return;
    }
    setDocuments(data || []);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.type !== "application/pdf") {
      toast({ title: "Chỉ hỗ trợ file PDF", variant: "destructive" });
      return;
    }

    if (file.size > 1024 * 1024 * 1024) {
      toast({ title: "File quá lớn (tối đa 1GB)", variant: "destructive" });
      return;
    }

    setUploading(true);
    setUploadProgress(30);

    try {
      // Sanitize filename: remove special chars, replace spaces with underscores
      const sanitizedName = file.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .replace(/_+/g, "_");
      const filePath = `${user.id}/${Date.now()}_${sanitizedName}`;

      setUploadProgress(50);
      const { error: uploadError } = await supabase.storage
        .from("lesson-documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      setUploadProgress(80);

      const { error: dbError } = await supabase.from("documents").insert({
        user_id: user.id,
        title: file.name.replace(/\.pdf$/i, ""),
        file_path: filePath,
        file_size: file.size,
      });

      if (dbError) throw dbError;

      setUploadProgress(100);
      toast({ title: "Tải lên thành công!", description: file.name });
      await fetchDocuments();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Lỗi tải lên",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (doc: Document) => {
    try {
      await supabase.storage.from("lesson-documents").remove([doc.file_path]);
      await supabase.from("documents").delete().eq("id", doc.id);
      setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
      if (selectedDoc?.id === doc.id) {
        setSelectedDoc(null);
        setChatMessages([]);
      }
      toast({ title: "Đã xóa tài liệu" });
    } catch (error: any) {
      toast({ title: "Lỗi xóa", description: error.message, variant: "destructive" });
    }
  };

  const handleAISummarize = async (doc: Document) => {
    setSummarizing(doc.id);
    try {
      let assistantText = "";
      await streamChat({
        messages: [
          {
            role: "user",
            content: `Hãy tóm tắt nội dung bài học từ tài liệu "${doc.title}". Liệt kê các ý chính, thuật ngữ quan trọng, và giải thích đơn giản. ${doc.content_text ? `Nội dung: ${doc.content_text.slice(0, 4000)}` : "Tài liệu này chưa được trích xuất nội dung text. Hãy tóm tắt dựa trên tên tài liệu."}`,
          },
        ],
        onDelta: (chunk) => {
          assistantText += chunk;
        },
        onDone: () => {},
        onError: (err) => {
          throw err;
        },
      });

      await supabase
        .from("documents")
        .update({ ai_summary: assistantText })
        .eq("id", doc.id);

      setDocuments((prev) =>
        prev.map((d) => (d.id === doc.id ? { ...d, ai_summary: assistantText } : d))
      );
      if (selectedDoc?.id === doc.id) {
        setSelectedDoc({ ...doc, ai_summary: assistantText });
      }
      toast({ title: "Đã tóm tắt xong!" });
    } catch (error: any) {
      toast({ title: "Lỗi AI", description: error.message, variant: "destructive" });
    } finally {
      setSummarizing(null);
    }
  };

  const openChat = (doc: Document) => {
    setSelectedDoc(doc);
    setChatMessages([
      {
        role: "assistant",
        content: `Chào bạn! Tôi sẵn sàng giúp bạn tìm hiểu về tài liệu "${doc.title}". Hãy hỏi bất kỳ câu hỏi nào về nội dung bài học này!`,
      },
    ]);
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || !selectedDoc || chatLoading) return;

    const userMsg: ChatMessage = { role: "user", content: chatInput };
    const newMessages = [...chatMessages, userMsg];
    setChatMessages(newMessages);
    setChatInput("");
    setChatLoading(true);

    let assistantSoFar = "";
    const contextPrefix = `Bạn đang giúp học sinh tìm hiểu tài liệu "${selectedDoc.title}". ${selectedDoc.content_text ? `Nội dung tài liệu (trích): ${selectedDoc.content_text.slice(0, 3000)}` : ""} ${selectedDoc.ai_summary ? `Tóm tắt: ${selectedDoc.ai_summary.slice(0, 1000)}` : ""}\n\nCâu hỏi của học sinh: `;

    try {
      await streamChat({
        messages: [
          {
            role: "user",
            content: contextPrefix + chatInput,
          },
        ],
        onDelta: (chunk) => {
          assistantSoFar += chunk;
          setChatMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && prev.length > 1) {
              return prev.map((m, i) =>
                i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
              );
            }
            return [...prev, { role: "assistant", content: assistantSoFar }];
          });
        },
        onDone: () => setChatLoading(false),
        onError: (err) => {
          toast({ title: "Lỗi AI", description: err.message, variant: "destructive" });
          setChatLoading(false);
        },
      });
    } catch {
      setChatLoading(false);
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "N/A";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Tài liệu PDF"
        description="Tải lên bài học PDF và nhờ AI giảng giải nội dung"
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Upload & Document List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Upload Card */}
          <Card className="p-6">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              variant="gradient"
              className="w-full h-24 flex-col gap-2"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-sm">Đang tải lên...</span>
                </>
              ) : (
                <>
                  <FileUp className="w-6 h-6" />
                  <span className="text-sm">Tải lên PDF bài học</span>
                </>
              )}
            </Button>
            {uploading && (
              <Progress value={uploadProgress} className="mt-3 h-2" />
            )}
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Hỗ trợ PDF, tối đa 1GB
            </p>
          </Card>

          {/* Document List */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <File className="w-4 h-4" />
              Tài liệu ({documents.length})
            </h3>
            {documents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Upload className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Chưa có tài liệu nào</p>
              </div>
            ) : (
              <ScrollArea className="max-h-[400px]">
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer group ${
                        selectedDoc?.id === doc.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/30 hover:bg-muted/50"
                      }`}
                      onClick={() => openChat(doc)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{doc.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatFileSize(doc.file_size)} •{" "}
                            {new Date(doc.created_at).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAISummarize(doc);
                            }}
                            disabled={summarizing === doc.id}
                          >
                            {summarizing === doc.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 text-primary" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(doc);
                            }}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                      {doc.ai_summary && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          ✨ {doc.ai_summary.slice(0, 100)}...
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </Card>
        </div>

        {/* Right: Chat / AI Explanation */}
        <div className="lg:col-span-2">
          {!selectedDoc ? (
            <Card className="p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Hỏi AI về bài học</h3>
              <p className="text-muted-foreground max-w-sm">
                Tải lên file PDF bài học, sau đó chọn tài liệu để AI giảng giải và trả lời câu hỏi
              </p>
            </Card>
          ) : (
            <Card className="flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <AIAvatar size="sm" />
                  <div>
                    <h3 className="font-semibold text-sm">AI Giảng bài</h3>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {selectedDoc.title}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedDoc(null);
                    setChatMessages([]);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {chatLoading && chatMessages[chatMessages.length - 1]?.role === "user" && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChat();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Hỏi về nội dung bài học..."
                    disabled={chatLoading}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!chatInput.trim() || chatLoading}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
