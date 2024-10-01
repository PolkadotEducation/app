import { ServerAxiosError, serverGet } from "./actions/api";
import { COURSE } from "./constants";

export const getCourses = async (id: string): Promise<any> => {
  const response = await serverGet<any>(`${COURSE}?lessonId=${id}`);
  if ((response as ServerAxiosError).message) throw response as ServerAxiosError;
  return response;
};
