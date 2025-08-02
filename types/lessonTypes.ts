export type ReferenceType = {
  title: string;
  link: string;
};

export type ChallengeType = {
  question: string;
  choices: string[];
  correctChoice: number;
  difficulty?: string;
};

export type LessonType = {
  _id?: string;
  teamId: string;
  title: string;
  language: string;
  slug?: string;
  difficulty: string;
  body: string;
  challenge: ChallengeType;
  references?: ReferenceType[];
  createdAt?: Date;
  updatedAt?: Date;
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
