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

export type CompletedCourse = {
  courseId: string;
  courseTitle: string;
};
