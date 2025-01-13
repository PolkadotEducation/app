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

export type CourseProgress = {
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
};

export type CompletedCourse = {
  courseId: string;
  courseTitle: string;
};

export type XpAndLevel = {
  level: number;
  xp: number;
  xpToNextLevel: number;
};
