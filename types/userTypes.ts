export type UserInfo = {
  id: string;
  email: string;
  name: string;
  company: string;
  picture: string;
  isAdmin: boolean;
  lastActivity: Date;
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
