export type UserInfo = {
  id: string;
  email: string;
  name: string;
  company: string;
  picture: string;
  isAdmin: boolean;
  lastActivity: Date;
  verifyToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
