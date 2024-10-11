import { UserInfo } from "@/types/userTypes";
import { ServerAxiosError, serverDelete, serverGet, serverPut } from "./actions/api";
import { PROFILE } from "./constants";

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
