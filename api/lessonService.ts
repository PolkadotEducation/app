import { ServerAxiosError, serverDelete, serverGet, serverPost, serverPut } from "./actions/api";
import { LESSON, LESSONS_DUPLICATE, LESSONS_SUMMARY } from "./constants";
import { LessonResponse, LessonSummary, LessonType } from "@/types/lessonTypes";

export const createLesson = async (teamId: string, lessonData: LessonType): Promise<LessonResponse> => {
  const response = await serverPost<LessonResponse>(`${LESSON}/${teamId}`, lessonData);
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

export const deleteLessonById = async (teamId: string, lessonId: string): Promise<Boolean> => {
  const response = await serverDelete<Boolean>(`${LESSON}/${teamId}/${lessonId}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as Boolean;
};

export const duplicateLessons = async (teamId: string, lessons: string[]): Promise<string[]> => {
  const response = await serverPost<string[]>(`${LESSONS_DUPLICATE}/${teamId}`, { lessons });
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as string[];
};

export const updateLessonById = async (
  teamId: string,
  lessonId: string,
  lessonData: LessonType,
): Promise<LessonResponse> => {
  const response = await serverPut<LessonResponse>(`${LESSON}/${teamId}/${lessonId}`, lessonData);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as LessonResponse;
};
