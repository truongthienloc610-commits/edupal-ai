import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  type: "chat" | "learning-plan" | "summary" | "wellness" | "career" | "cv";
  messages?: Array<{ role: string; content: string }>;
  data?: Record<string, unknown>;
}

const SYSTEM_PROMPTS: Record<string, string> = {
  chat: `Bạn là KMA-RES AI, trợ lý học tập thông minh dành cho học sinh, sinh viên Việt Nam. Hãy trả lời các câu hỏi về bài học, phương pháp học, giải thích khái niệm một cách dễ hiểu bằng tiếng Việt. Sử dụng ví dụ thực tế và ngôn ngữ thân thiện. Giữ câu trả lời ngắn gọn nhưng đầy đủ thông tin.`,
  
  "learning-plan": `Bạn là trợ lý học tập AI của KMA-RES. Hãy tạo lộ trình học cá nhân hóa dựa trên thông tin người dùng cung cấp. Trả lời bằng tiếng Việt và định dạng JSON với cấu trúc:
{
  "subject": "tên môn học",
  "weeklyGoals": ["mục tiêu 1", "mục tiêu 2", "mục tiêu 3", "mục tiêu 4"],
  "dailyTasks": [
    {"day": "Thứ 2", "tasks": ["nhiệm vụ 1", "nhiệm vụ 2"]},
    {"day": "Thứ 3", "tasks": ["nhiệm vụ 1", "nhiệm vụ 2"]},
    {"day": "Thứ 4", "tasks": ["nhiệm vụ 1", "nhiệm vụ 2"]},
    {"day": "Thứ 5", "tasks": ["nhiệm vụ 1", "nhiệm vụ 2"]},
    {"day": "Thứ 6", "tasks": ["nhiệm vụ 1", "nhiệm vụ 2"]},
    {"day": "Thứ 7", "tasks": ["nhiệm vụ 1"]},
    {"day": "Chủ nhật", "tasks": ["nhiệm vụ 1"]}
  ],
  "weakPointExplanation": "giải thích chi tiết cách cải thiện phần yếu",
  "tips": ["mẹo 1", "mẹo 2", "mẹo 3", "mẹo 4"]
}`,

  summary: `Bạn là trợ lý tóm tắt bài học AI của KMA-RES. Hãy phân tích và tóm tắt nội dung được cung cấp. Trả lời bằng tiếng Việt và định dạng JSON với cấu trúc:
{
  "mainPoints": ["ý chính 1", "ý chính 2", "ý chính 3", "ý chính 4", "ý chính 5"],
  "simpleExplanation": "giải thích đơn giản, dễ hiểu cho học sinh",
  "mindMap": "sơ đồ tư duy dạng text với ký tự unicode như ├── └── │",
  "keyTerms": [
    {"term": "thuật ngữ 1", "definition": "định nghĩa 1"},
    {"term": "thuật ngữ 2", "definition": "định nghĩa 2"},
    {"term": "thuật ngữ 3", "definition": "định nghĩa 3"}
  ]
}`,

  wellness: `Bạn là trợ lý sức khỏe tinh thần AI của KMA-RES. Hãy phân tích tình trạng sức khỏe tinh thần và đưa ra lời khuyên phù hợp. Lưu ý: Đây không phải tư vấn y tế chuyên nghiệp. Trả lời bằng tiếng Việt và định dạng JSON với cấu trúc:
{
  "summary": "tóm tắt tình trạng",
  "recommendations": ["gợi ý cải thiện 1", "gợi ý 2"],
  "warnings": ["cảnh báo nếu có"],
  "activities": ["hoạt động đề xuất 1", "hoạt động 2", "hoạt động 3"]
}`,

  career: `Bạn là trợ lý định hướng nghề nghiệp AI của KMA-RES. Hãy gợi ý các nghề nghiệp phù hợp dựa trên sở thích và kỹ năng. Trả lời bằng tiếng Việt và định dạng JSON với cấu trúc:
[
  {
    "career": "tên nghề nghiệp",
    "matchScore": 92,
    "description": "mô tả ngắn gọn",
    "skills": ["kỹ năng 1", "kỹ năng 2", "kỹ năng 3", "kỹ năng 4"],
    "path": ["bước 1", "bước 2", "bước 3", "bước 4", "bước 5"]
  }
]
Trả về 4 nghề nghiệp phù hợp nhất.`,

  cv: `Bạn là trợ lý tạo CV AI của KMA-RES. Hãy tạo CV chuyên nghiệp dựa trên thông tin được cung cấp. Trả về CV dạng text với định dạng đẹp mắt sử dụng các ký tự unicode để tạo khung và bố cục. CV phải bằng tiếng Việt.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, messages, data } = (await req.json()) as RequestBody;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`[ai-assistant] Processing request type: ${type}`);

    let userContent = "";
    let conversationMessages: Array<{ role: string; content: string }> = [];

    switch (type) {
      case "chat":
        if (messages && messages.length > 0) {
          conversationMessages = messages;
        }
        break;
      
      case "learning-plan":
        userContent = `Tạo lộ trình học cho môn: ${data?.subject}
Điểm hiện tại: ${data?.score}/10
Phần yếu cần cải thiện: ${data?.weakPoints}`;
        break;
      
      case "summary":
        userContent = `Tóm tắt nội dung bài học sau:\n\n${data?.content}`;
        break;
      
      case "wellness":
        userContent = `Phân tích tình trạng sức khỏe tinh thần:
- Số giờ ngủ: ${data?.sleepHours} giờ
- Mức căng thẳng: ${data?.stressLevel}/10
- Tâm trạng: ${data?.mood}`;
        break;
      
      case "career":
        userContent = `Gợi ý nghề nghiệp phù hợp dựa trên:
- Sở thích: ${(data?.interests as string[])?.join(", ")}
- Kỹ năng: ${(data?.skills as string[])?.join(", ")}`;
        break;
      
      case "cv":
        userContent = `Tạo CV chuyên nghiệp với thông tin:
- Họ tên: ${data?.name}
- Email: ${data?.email}
- Điện thoại: ${data?.phone}
- Học vấn: ${data?.education}
- Kỹ năng: ${data?.skills}
- Kinh nghiệm: ${data?.experience}`;
        break;
      
      default:
        throw new Error(`Unknown request type: ${type}`);
    }

    const systemPrompt = SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.chat;
    
    const apiMessages = type === "chat" && conversationMessages.length > 0
      ? [
          { role: "system", content: systemPrompt },
          ...conversationMessages,
        ]
      : [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ];

    console.log(`[ai-assistant] Calling AI gateway with ${apiMessages.length} messages`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: apiMessages,
        stream: type === "chat",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ai-assistant] AI gateway error: ${response.status}`, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Đã vượt quá giới hạn yêu cầu, vui lòng thử lại sau." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Vui lòng nạp thêm credits để tiếp tục sử dụng AI." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    // For chat, return streaming response
    if (type === "chat") {
      return new Response(response.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    // For other types, parse JSON response
    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "";
    
    console.log(`[ai-assistant] Got response for type: ${type}`);
    
    // Try to extract JSON from the response
    let parsedContent = content;
    try {
      // Find JSON in the response (it might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                        content.match(/```\s*([\s\S]*?)\s*```/) ||
                        [null, content];
      const jsonStr = jsonMatch[1] || content;
      parsedContent = JSON.parse(jsonStr.trim());
    } catch {
      // If not JSON, return as plain text
      console.log(`[ai-assistant] Response is not JSON, returning as text`);
    }

    return new Response(
      JSON.stringify({ data: parsedContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("[ai-assistant] Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
