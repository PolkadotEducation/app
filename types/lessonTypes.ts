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
  title: string;
  difficulty: string;
  body: string;
  challenge: ChallengeType;
  references?: ReferenceType[];
};
