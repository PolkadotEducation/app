import { UserInfo } from "@/types/userTypes";
import { ServerAxiosError, serverDelete, serverGet, serverPost, serverPut } from "./actions/api";
import { PROFILE, PROFILE_RECOVER, PROFILE_VERIFY } from "./constants";

export const getProfile = async (id: string): Promise<UserInfo> => {
  const r = await serverGet<UserInfo>(PROFILE(id));
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as UserInfo;
};

export const updateProfile = async (id: string, data: UserInfo): Promise<Boolean> => {
  const r = await serverPut<Boolean>(PROFILE(id), data);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return true;
};

export const deleteProfile = async (id: string): Promise<Boolean> => {
  const r = await serverDelete<Boolean>(PROFILE(id));
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return true;
};

export const verifyProfile = async (email: string, token: string): Promise<UserInfo> => {
  const r = await serverPost<UserInfo>(PROFILE_VERIFY, { email, token });
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as UserInfo;
};

export const recoverProfile = async (email: string, token?: string, password?: string): Promise<Boolean> => {
  const r = await serverPost<Boolean>(PROFILE_RECOVER, { email, token, password });
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return true;
};
