export type ReferenceType = {
  title: string;
  link: string;
};

export type ChallengeType = {
  question: string;
  choices: string[];
  correctChoice: number;
};

export type LessonType = {
  _id?: string;
  teamId: string;
  title: string;
  language: string;
  difficulty: string;
  body: string;
  challenge: ChallengeType;
  references?: ReferenceType[];
};

export type LessonSummary = {
  _id: string;
  title: string;
  language: string;
};

export type LessonResponse = {
  lessonId: string;
};

export type SimplifiedLessonType = Omit<LessonType, "teamId" | "language" | "difficulty" | "body" | "challenge">;
