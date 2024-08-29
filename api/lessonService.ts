import { ServerAxiosError, serverGet, serverPost } from "./actions/api";
import { LESSON } from "./constants";
import { LessonResponse, LessonType } from "@/types/lessonTypes";

export const createLesson = async (lessonData: LessonType): Promise<LessonResponse> => {
  const response = await serverPost<LessonResponse>(LESSON, lessonData);
  if ((response as ServerAxiosError).message) throw response as ServerAxiosError;
  return response as LessonResponse;
};

export const getLessonById = async (id: string): Promise<LessonType> => {
  const response = await serverGet<LessonType>(`${LESSON}?lessonId=${id}`);
  if ((response as ServerAxiosError).message) throw response as ServerAxiosError;
  return response as LessonType;
};
