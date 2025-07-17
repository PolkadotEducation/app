import { TeamInfo } from "./teamTypes";

export type UserInfo = {
  id: string;
  email: string;
  name: string;
  company: string;
  picture: string;
  teams?: TeamInfo[];
  isAdmin: boolean;
  lastActivity: Date;
  achievementsTracker?: AchievementsTracker;
  verify?: VerifyUser;
  recover?: RecoverPassword;
  createdAt?: Date;
  updatedAt?: Date;
  language: "english" | "portuguese" | "spanish";
};

export type VerifyUser = {
  token: string;
  date: Date;
};

export type RecoverPassword = {
  token: string;
  date: Date;
};

export type AchievementsTracker = {
  loginCounter: number;
  lastLogin: Date;
  answerCounter: number;
  challengeCounter: number;
  finishOneCourse: boolean;
  finishOneCourseNoMistakes: boolean;
  totalFocus: boolean;
  profilePicture: boolean;
};
