import { User } from "@/types/userTypes";
import { ServerAxiosError, serverDelete, serverGet, serverPut } from "./actions/api";
import { PROFILE } from "./constants";

export const getProfile = async (id: string): Promise<User> => {
  const r = await serverGet<User>(PROFILE(id));
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as User;
};

export const updateProfile = async (id: string, data: User): Promise<Boolean> => {
  const r = await serverPut<Boolean>(PROFILE(id), data);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return true;
};

export const deleteProfile = async (id: string): Promise<Boolean> => {
  const r = await serverDelete<Boolean>(PROFILE(id));
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return true;
};
