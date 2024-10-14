import { ServerAxiosError, serverGet } from "./actions/api";
import { COURSE, COURSES } from "./constants";

export const getCoursesByLanguage = async (language: string): Promise<any> => {
  const response = await serverGet<any>(`${COURSES}?language=${language}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response;
};

export const getCourse = async (id: string): Promise<any> => {
  const response = await serverGet<any>(`${COURSE}?courseId=${id}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response;
};
