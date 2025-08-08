export type ReferenceType = {
  title: string;
  link: string;
};

export type ChallengeType = {
  _id?: string;
  teamId?: string;
  question: string;
  choices: string[];
  correctChoice: number;
  difficulty: "easy" | "medium" | "hard";
  language: string;
};

export type LessonType = {
  _id?: string;
  teamId: string;
  title: string;
  language: string;
  slug?: string;
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
  updatedAt?: Date;
};

export type LessonResponse = {
  lessonId: string;
};

export type SimplifiedLessonType = Omit<LessonType, "teamId" | "language" | "body" | "challenge">;
