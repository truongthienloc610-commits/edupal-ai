// Simulated AI responses for the EduLife AI platform

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface LearningPlan {
  subject: string;
  weeklyGoals: string[];
  dailyTasks: { day: string; tasks: string[] }[];
  weakPointExplanation: string;
  tips: string[];
}

export const generateLearningPlan = async (
  subject: string,
  score: number,
  weakPoints: string
): Promise<LearningPlan> => {
  await delay(1500);

  const plans: Record<string, LearningPlan> = {
    default: {
      subject,
      weeklyGoals: [
        `Hoàn thành 3 bài tập ${subject} cơ bản`,
        `Xem lại lý thuyết về ${weakPoints}`,
        "Làm 1 đề thi thử cuối tuần",
        "Ghi chú các công thức quan trọng",
      ],
      dailyTasks: [
        { day: "Thứ 2", tasks: ["Ôn lại kiến thức cơ bản (30 phút)", "Làm 5 bài tập dễ"] },
        { day: "Thứ 3", tasks: ["Học lý thuyết mới (45 phút)", "Xem video giải thích"] },
        { day: "Thứ 4", tasks: ["Làm bài tập nâng cao", "Hỏi thầy cô về phần chưa hiểu"] },
        { day: "Thứ 5", tasks: ["Ôn tập tổng hợp", "Làm flashcard"] },
        { day: "Thứ 6", tasks: ["Làm đề thi thử", "Phân tích lỗi sai"] },
        { day: "Thứ 7", tasks: ["Nghỉ ngơi + xem tài liệu bổ sung"] },
        { day: "Chủ nhật", tasks: ["Chuẩn bị cho tuần mới", "Lập kế hoạch học"] },
      ],
      weakPointExplanation: `Để cải thiện phần "${weakPoints}", bạn cần:
      
1. **Hiểu bản chất**: Đừng chỉ học thuộc công thức, hãy hiểu tại sao nó hoạt động
2. **Làm từ dễ đến khó**: Bắt đầu với bài tập cơ bản, sau đó tăng dần độ khó
3. **Ghi chú theo cách riêng**: Viết lại kiến thức bằng ngôn ngữ của bạn
4. **Thực hành thường xuyên**: Mỗi ngày dành 15-20 phút luyện tập

Điểm hiện tại: ${score}/10 → Mục tiêu: ${Math.min(score + 2, 10)}/10 trong 4 tuần`,
      tips: [
        "💡 Học vào buổi sáng khi đầu óc còn minh mẫn",
        "📝 Ghi chép bằng tay giúp nhớ lâu hơn",
        "🎯 Chia nhỏ mục tiêu để dễ đạt được",
        "⏰ Nghỉ 5-10 phút sau mỗi 25 phút học (Pomodoro)",
      ],
    },
  };

  return plans.default;
};

export interface SummaryResult {
  mainPoints: string[];
  simpleExplanation: string;
  mindMap: string;
  keyTerms: { term: string; definition: string }[];
}

export const summarizeContent = async (content: string): Promise<SummaryResult> => {
  await delay(2000);

  return {
    mainPoints: [
      "Khái niệm chính được giới thiệu trong bài",
      "Các nguyên lý cơ bản và cách áp dụng",
      "Mối quan hệ giữa các yếu tố được đề cập",
      "Ví dụ thực tế và ứng dụng",
      "Kết luận và điểm cần ghi nhớ",
    ],
    simpleExplanation: `Bài học này giải thích về chủ đề quan trọng thông qua các ví dụ dễ hiểu. 
    
Hãy tưởng tượng như việc xây một ngôi nhà - bạn cần có nền móng vững chắc (kiến thức cơ bản) trước khi xây các tầng cao hơn (ứng dụng nâng cao).

Điểm mấu chốt là hiểu "tại sao" chứ không chỉ "cái gì". Khi bạn hiểu lý do, việc ghi nhớ sẽ trở nên dễ dàng hơn nhiều.`,
    mindMap: `📚 CHỦ ĐỀ CHÍNH
    │
    ├── 🔹 Khái niệm 1
    │   ├── Định nghĩa
    │   └── Ví dụ
    │
    ├── 🔹 Khái niệm 2
    │   ├── Đặc điểm
    │   └── Ứng dụng
    │
    ├── 🔹 Mối quan hệ
    │   └── Liên kết các khái niệm
    │
    └── 🎯 KẾT LUẬN
        └── Điểm cần nhớ`,
    keyTerms: [
      { term: "Khái niệm cốt lõi", definition: "Nền tảng để hiểu toàn bộ bài học" },
      { term: "Nguyên lý chính", definition: "Quy tắc cơ bản chi phối chủ đề" },
      { term: "Ứng dụng thực tế", definition: "Cách áp dụng vào đời sống" },
    ],
  };
};

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Trong phương trình bậc hai ax² + bx + c = 0, điều kiện để phương trình có 2 nghiệm phân biệt là gì?",
    options: ["Δ > 0", "Δ = 0", "Δ < 0", "a = 0"],
    correctAnswer: 0,
    explanation: "Khi Δ = b² - 4ac > 0, phương trình có 2 nghiệm phân biệt. Đây là kiến thức cơ bản về phương trình bậc hai.",
    category: "Toán học",
  },
  {
    id: 2,
    question: "Nước sôi ở nhiệt độ bao nhiêu trong điều kiện áp suất tiêu chuẩn?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctAnswer: 1,
    explanation: "Ở áp suất 1 atm (áp suất tiêu chuẩn), nước sôi ở 100°C. Điểm sôi thay đổi theo áp suất.",
    category: "Vật lý",
  },
  {
    id: 3,
    question: "Thủ đô của Việt Nam là thành phố nào?",
    options: ["TP. Hồ Chí Minh", "Đà Nẵng", "Hà Nội", "Huế"],
    correctAnswer: 2,
    explanation: "Hà Nội là thủ đô của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam từ năm 1976.",
    category: "Địa lý",
  },
  {
    id: 4,
    question: "Công thức hóa học của nước là gì?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: 0,
    explanation: "H2O gồm 2 nguyên tử Hydrogen và 1 nguyên tử Oxygen. Đây là hợp chất phổ biến nhất trên Trái Đất.",
    category: "Hóa học",
  },
  {
    id: 5,
    question: "Động từ 'to be' ở thì hiện tại đơn với chủ ngữ 'She' là gì?",
    options: ["am", "is", "are", "be"],
    correctAnswer: 1,
    explanation: "'She' là ngôi thứ 3 số ít, dùng với 'is'. I → am, He/She/It → is, We/You/They → are.",
    category: "Tiếng Anh",
  },
];

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

export const analyzeWellness = async (checkIn: WellnessCheckIn): Promise<WellnessAdvice> => {
  await delay(1000);

  const recommendations: string[] = [];
  const warnings: string[] = [];
  const activities: string[] = [];

  // Sleep analysis
  if (checkIn.sleepHours < 6) {
    warnings.push("⚠️ Bạn đang ngủ ít hơn mức khuyến nghị. Thiếu ngủ ảnh hưởng đến khả năng tập trung và ghi nhớ.");
    recommendations.push("Cố gắng đi ngủ sớm hơn 30 phút mỗi tối");
    recommendations.push("Tránh dùng điện thoại 1 giờ trước khi ngủ");
  } else if (checkIn.sleepHours >= 7 && checkIn.sleepHours <= 9) {
    recommendations.push("✅ Giờ ngủ của bạn rất tốt! Hãy duy trì thói quen này");
  }

  // Stress analysis
  if (checkIn.stressLevel >= 7) {
    warnings.push("⚠️ Mức căng thẳng của bạn khá cao. Hãy dành thời gian nghỉ ngơi.");
    activities.push("🧘 Thử thiền 5-10 phút mỗi ngày");
    activities.push("🚶 Đi bộ nhẹ nhàng 15 phút");
    activities.push("🎵 Nghe nhạc thư giãn");
  } else if (checkIn.stressLevel >= 4) {
    activities.push("📖 Đọc sách nhẹ nhàng trước khi ngủ");
    activities.push("💬 Trò chuyện với bạn bè hoặc gia đình");
  } else {
    recommendations.push("✅ Mức căng thẳng trong tầm kiểm soát tốt!");
  }

  // Mood-based suggestions
  const moodActivities: Record<string, string[]> = {
    happy: ["Chia sẻ niềm vui với người thân", "Ghi lại những điều tích cực trong ngày"],
    neutral: ["Thử một hoạt động mới", "Kết nối với bạn bè"],
    sad: ["Tâm sự với người tin tưởng", "Làm điều bạn thích", "Ra ngoài hít thở không khí trong lành"],
    anxious: ["Hít thở sâu 4-7-8", "Viết ra những lo lắng của bạn", "Tập thể dục nhẹ"],
    tired: ["Nghỉ ngơi ngắn 20 phút", "Uống nước đủ", "Tránh caffeine sau 2h chiều"],
  };

  if (moodActivities[checkIn.mood]) {
    activities.push(...moodActivities[checkIn.mood]);
  }

  return {
    summary: `Dựa trên thông tin bạn cung cấp: Ngủ ${checkIn.sleepHours} tiếng, mức căng thẳng ${checkIn.stressLevel}/10, tâm trạng "${checkIn.mood}". AI đã phân tích và đưa ra gợi ý phù hợp.`,
    recommendations,
    warnings,
    activities,
  };
};

export interface CareerSuggestion {
  career: string;
  matchScore: number;
  description: string;
  skills: string[];
  path: string[];
}

export const suggestCareers = async (
  interests: string[],
  skills: string[]
): Promise<CareerSuggestion[]> => {
  await delay(1500);

  const allCareers: CareerSuggestion[] = [
    {
      career: "Kỹ sư phần mềm",
      matchScore: 92,
      description: "Thiết kế và phát triển các ứng dụng, hệ thống phần mềm",
      skills: ["Lập trình", "Tư duy logic", "Giải quyết vấn đề", "Làm việc nhóm"],
      path: ["Học lập trình cơ bản", "Thực hành với dự án nhỏ", "Học ngôn ngữ chuyên sâu", "Thực tập", "Làm việc chính thức"],
    },
    {
      career: "Nhà khoa học dữ liệu",
      matchScore: 88,
      description: "Phân tích và trích xuất thông tin từ dữ liệu lớn",
      skills: ["Thống kê", "Machine Learning", "Python/R", "Trực quan hóa dữ liệu"],
      path: ["Học toán và thống kê", "Học Python/R", "Thực hành với datasets", "Xây dựng portfolio", "Ứng tuyển"],
    },
    {
      career: "Thiết kế đồ họa",
      matchScore: 85,
      description: "Tạo ra các thiết kế trực quan cho thương hiệu và sản phẩm",
      skills: ["Sáng tạo", "Adobe Creative Suite", "Thẩm mỹ", "Giao tiếp"],
      path: ["Học các phần mềm thiết kế", "Xây dựng portfolio", "Nhận freelance", "Làm tại agency", "Mở studio riêng"],
    },
    {
      career: "Giáo viên / Giảng viên",
      matchScore: 82,
      description: "Truyền đạt kiến thức và kỹ năng cho học sinh, sinh viên",
      skills: ["Giao tiếp", "Kiên nhẫn", "Kiến thức chuyên môn", "Tổ chức"],
      path: ["Học sư phạm", "Thực tập giảng dạy", "Lấy chứng chỉ", "Giảng dạy", "Phát triển chuyên môn"],
    },
    {
      career: "Chuyên viên Marketing",
      matchScore: 78,
      description: "Xây dựng chiến lược tiếp thị và quảng bá sản phẩm",
      skills: ["Sáng tạo", "Phân tích", "Giao tiếp", "Digital Marketing"],
      path: ["Học marketing cơ bản", "Thực tập tại agency", "Chạy chiến dịch thực tế", "Chuyên sâu một lĩnh vực"],
    },
  ];

  return allCareers.slice(0, 4);
};

export const generateCV = async (info: {
  name: string;
  email: string;
  phone: string;
  education: string;
  skills: string;
  experience: string;
}): Promise<string> => {
  await delay(1000);

  return `
╔══════════════════════════════════════════╗
║           CURRICULUM VITAE               ║
╠══════════════════════════════════════════╣
║  ${info.name.toUpperCase().padEnd(38)} ║
╠══════════════════════════════════════════╣
║  📧 ${info.email.padEnd(35)} ║
║  📱 ${info.phone.padEnd(35)} ║
╠══════════════════════════════════════════╣
║  📚 HỌC VẤN                              ║
║  ${info.education.padEnd(38)} ║
╠══════════════════════════════════════════╣
║  💡 KỸ NĂNG                              ║
║  ${info.skills.padEnd(38)} ║
╠══════════════════════════════════════════╣
║  💼 KINH NGHIỆM                          ║
║  ${info.experience.padEnd(38)} ║
╚══════════════════════════════════════════╝
  `.trim();
};
