import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { AIAvatar } from "@/components/shared/AIAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Target,
  Brain,
  Lightbulb,
} from "lucide-react";
import { sampleQuestions, type QuizQuestion } from "@/lib/mockAI";
import { cn } from "@/lib/utils";

export default function Practice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: number; selected: number; correct: boolean }[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    setAnswers([...answers, { questionId: question.id, selected: selectedAnswer, correct: isCorrect }]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setQuizComplete(false);
  };

  const correctCount = answers.filter(a => a.correct).length;
  const wrongCount = answers.filter(a => !a.correct).length;

  if (quizComplete) {
    const score = (correctCount / sampleQuestions.length) * 100;
    
    return (
      <DashboardLayout>
        <PageHeader
          title="Luyện thi"
          description="Kết quả bài luyện tập của bạn"
          icon={<GraduationCap className="w-6 h-6" />}
        />

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
              score >= 80 ? "bg-success/20" : score >= 60 ? "bg-warning/20" : "bg-destructive/20"
            )}>
              <Trophy className={cn(
                "w-10 h-10",
                score >= 80 ? "text-success" : score >= 60 ? "text-warning" : "text-destructive"
              )} />
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {score >= 80 ? "Xuất sắc! 🎉" : score >= 60 ? "Khá tốt! 👍" : "Cần cố gắng hơn 💪"}
            </h2>
            <p className="text-muted-foreground mb-6">
              Bạn đã hoàn thành bài luyện tập
            </p>

            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-success">{correctCount}</div>
                <div className="text-sm text-muted-foreground">Đúng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-destructive">{wrongCount}</div>
                <div className="text-sm text-muted-foreground">Sai</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{Math.round(score)}%</div>
                <div className="text-sm text-muted-foreground">Điểm</div>
              </div>
            </div>

            {/* AI Analysis */}
            <Card className="p-6 bg-muted/50 text-left mb-6">
              <div className="flex items-start gap-3 mb-4">
                <AIAvatar size="sm" />
                <div>
                  <h3 className="font-semibold">Phân tích từ AI</h3>
                  <p className="text-sm text-muted-foreground">Dựa trên kết quả bài làm</p>
                </div>
              </div>
              <div className="space-y-3">
                {wrongCount > 0 && (
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium">Cần ôn tập thêm:</p>
                      <p className="text-sm text-muted-foreground">
                        {answers.filter(a => !a.correct).map(a => {
                          const q = sampleQuestions.find(sq => sq.id === a.questionId);
                          return q?.category;
                        }).filter((v, i, a) => a.indexOf(v) === i).join(", ")}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Gợi ý:</p>
                    <p className="text-sm text-muted-foreground">
                      {score >= 80
                        ? "Hãy thử các bài tập nâng cao hơn!"
                        : "Xem lại lý thuyết và làm thêm bài tập cơ bản trước khi thử lại."}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Button onClick={handleRestart} variant="gradient" size="lg">
              <RotateCcw className="w-4 h-4" />
              Làm lại
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Luyện thi"
        description="Câu hỏi luyện tập và phân tích lỗi sai chi tiết"
        icon={<GraduationCap className="w-6 h-6" />}
      />

      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Câu {currentQuestion + 1} / {sampleQuestions.length}</span>
            <span className="text-primary font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {question.category}
            </span>
          </div>

          <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              
              let optionStyle = "border-border hover:border-primary/50 hover:bg-muted/50";
              if (showResult) {
                if (isCorrect) {
                  optionStyle = "border-success bg-success/10";
                } else if (isSelected && !isCorrect) {
                  optionStyle = "border-destructive bg-destructive/10";
                }
              } else if (isSelected) {
                optionStyle = "border-primary bg-primary/10";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showResult}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3",
                    optionStyle
                  )}
                >
                  <span className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium shrink-0",
                    isSelected && !showResult ? "border-primary text-primary" : "border-muted-foreground/50"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-destructive shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Explanation */}
        {showResult && (
          <Card className="p-6 mb-6 animate-fade-in">
            <div className="flex items-start gap-3">
              <AIAvatar size="sm" />
              <div>
                <h3 className="font-semibold mb-2">
                  {selectedAnswer === question.correctAnswer ? (
                    <span className="text-success">Chính xác! 🎉</span>
                  ) : (
                    <span className="text-destructive">Chưa đúng 😅</span>
                  )}
                </h3>
                <p className="text-muted-foreground">{question.explanation}</p>
                {selectedAnswer !== question.correctAnswer && (
                  <div className="mt-3 p-3 rounded-lg bg-wellness/10 border border-wellness/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-4 h-4 text-wellness" />
                      <span className="font-medium text-sm">Phân tích lỗi:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Đây là lỗi về kiến thức cơ bản. Hãy xem lại phần lý thuyết liên quan đến "{question.category}".
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <span className="px-3 py-2 rounded-lg bg-success/10 text-success text-sm font-medium">
              ✓ {correctCount}
            </span>
            <span className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
              ✗ {wrongCount}
            </span>
          </div>

          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              variant="gradient"
            >
              Kiểm tra
            </Button>
          ) : (
            <Button onClick={handleNext} variant="gradient">
              {currentQuestion < sampleQuestions.length - 1 ? (
                <>
                  Câu tiếp theo
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                "Xem kết quả"
              )}
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
