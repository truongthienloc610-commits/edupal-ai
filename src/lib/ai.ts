// AI service functions using Lovable AI Gateway via Edge Functions
import { supabase } from "@/integrations/supabase/client";

const AI_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`;

interface AIResponse<T> {
  data?: T;
  error?: string;
}

async function callAI<T>(body: Record<string, unknown>): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error("Bạn cần đăng nhập để sử dụng tính năng AI.");
  }

  const response = await fetch(AI_FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  const result: AIResponse<T> = await response.json();
  if (result.error) {
    throw new Error(result.error);
  }
  
  return result.data as T;
}

// Types
export interface LearningPlan {
  subject: string;
  weeklyGoals: string[];
  dailyTasks: { day: string; tasks: string[] }[];
  weakPointExplanation: string;
  tips: string[];
}

export interface SummaryResult {
  mainPoints: string[];
  simpleExplanation: string;
  mindMap: string;
  keyTerms: { term: string; definition: string }[];
}

export interface WellnessCheckIn {
  sleepHours: number;
  stressLevel: number;
  mood: string;
}

export interface WellnessAdvice {
  summary: string;
  recommendations: string[];
  warnings: string[];
  activities: string[];
}

export interface CareerSuggestion {
  career: string;
  matchScore: number;
  description: string;
  skills: string[];
  path: string[];
}

// AI Functions
export async function generateLearningPlan(
  subject: string,
  score: number,
  weakPoints: string
): Promise<LearningPlan> {
  return callAI<LearningPlan>({
    type: "learning-plan",
    data: { subject, score, weakPoints },
  });
}

export async function summarizeContent(content: string): Promise<SummaryResult> {
  return callAI<SummaryResult>({
    type: "summary",
    data: { content },
  });
}

export async function analyzeWellness(checkIn: WellnessCheckIn): Promise<WellnessAdvice> {
  return callAI<WellnessAdvice>({
    type: "wellness",
    data: checkIn,
  });
}

export async function suggestCareers(
  interests: string[],
  skills: string[]
): Promise<CareerSuggestion[]> {
  return callAI<CareerSuggestion[]>({
    type: "career",
    data: { interests, skills },
  });
}

export async function generateCV(info: {
  name: string;
  email: string;
  phone: string;
  education: string;
  skills: string;
  experience: string;
}): Promise<string> {
  return callAI<string>({
    type: "cv",
    data: info,
  });
}

// Streaming chat function for Career chatbot
type ChatMessage = { role: "user" | "assistant"; content: string };

export async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: ChatMessage[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError?: (error: Error) => void;
}) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error("Bạn cần đăng nhập để sử dụng tính năng AI.");
    }

    const response = await fetch(AI_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        type: "chat",
        messages: messages.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content,
        })),
      }),
    });

    if (!response.ok || !response.body) {
      const error = await response.json().catch(() => ({ error: "Failed to start stream" }));
      throw new Error(error.error || "Failed to start stream");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          /* ignore partial leftovers */
        }
      }
    }

    onDone();
  } catch (error) {
    console.error("Chat stream error:", error);
    onError?.(error instanceof Error ? error : new Error("Unknown error"));
    onDone();
  }
}

// Re-export quiz questions (these don't need AI)
export { sampleQuestions, type QuizQuestion } from "./mockAI";
