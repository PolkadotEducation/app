import { ServerAxiosError, serverGet } from "./actions/api";
import { COURSES } from "./constants";

export const getCoursesByLanguage = async (language: string): Promise<any> => {
  const response = await serverGet<any>(`${COURSES}?language=${language}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response;
};
