export type ChallengeType = {
  _id?: string;
  teamId: string;
  question: string;
  choices: string[];
  correctChoice: number;
  difficulty: "easy" | "medium" | "hard";
  language: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ChallengeSummary = {
  _id: string;
  question: string;
  difficulty: string;
  language: string;
  updatedAt?: Date;
};

export type ChallengeResponse = {
  challengeId: string;
};

export type SimplifiedChallengeType = {
  _id: string;
  title: string;
  question: string;
};
