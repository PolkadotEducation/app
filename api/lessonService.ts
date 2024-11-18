import { ServerAxiosError, serverDelete, serverGet, serverPost } from "./actions/api";
import { LESSON, LESSONS_SUMMARY } from "./constants";
import { LessonResponse, LessonSummary, LessonType } from "@/types/lessonTypes";

export const createLesson = async (lessonData: LessonType): Promise<LessonResponse> => {
  const response = await serverPost<LessonResponse>(LESSON, lessonData);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as LessonResponse;
};

export const getLessonById = async (id: string): Promise<LessonType> => {
  const response = await serverGet<LessonType>(`${LESSON}?lessonId=${id}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as LessonType;
};

export const getLessonsSummary = async (): Promise<LessonSummary[]> => {
  const response = await serverGet<LessonSummary[]>(LESSONS_SUMMARY);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as LessonSummary[];
};

export const deleteLessonById = async (lessonId: string): Promise<Boolean> => {
  const response = await serverDelete<Boolean>(`${LESSON}/${lessonId}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as Boolean;
};
