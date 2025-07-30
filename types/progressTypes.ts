export type ProgressRequest = {
  lessonId?: string;
  courseId?: string;
  choice?: number;
};

export type ProgressResponse = {
  _id: string;
  lessonId: string;
  courseId: string;
  choice: number;
  isCorrect: boolean;
  difficulty: string;
};

export type CourseSummaryResponse = {
  courseSummary: CourseSummary;
};

export type CourseProgress = {
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  modulesProgress: Record<string, Record<string, boolean>>;
};

export type CourseSummary = {
  id: string;
  modules: {
    isCompleted: boolean;
    lessons: {
      id: string;
      difficulty: "easy" | "medium" | "hard";
      expEarned: number;
      title: string;
    }[];
    title: string;
  }[];
  title: string;
};

export type CompletedCourse = {
  courseId: string;
  courseTitle: string;
  courseBanner: "blackPink" | "blackPurple" | "tetris" | "gradient";
};

export type XpAndLevel = {
  level: number;
  xp: number;
  xpToNextLevel: number;
};
