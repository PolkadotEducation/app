import { UserInfo } from "@/types/userTypes";
import { ServerAxiosError, serverDelete, serverGet, serverPost, serverPut } from "./actions/api";
import { USERS, USERS_RECOVER, USERS_VERIFY } from "./constants";

export const getProfile = async (): Promise<UserInfo> => {
  const r = await serverGet<UserInfo>(USERS);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as UserInfo;
};

export const updateProfile = async (data: UserInfo): Promise<Boolean> => {
  const r = await serverPut<Boolean>(USERS, data);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return true;
};

export const deleteProfile = async (): Promise<Boolean> => {
  const r = await serverDelete<Boolean>(USERS);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return true;
};

export const verifyProfile = async (email: string, token: string): Promise<UserInfo> => {
  const r = await serverPost<UserInfo>(USERS_VERIFY, { email, token });
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as UserInfo;
};

export const recoverProfile = async (email: string, token?: string, password?: string): Promise<Boolean> => {
  const r = await serverPost<Boolean>(USERS_RECOVER, { email, token, password });
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return true;
};
