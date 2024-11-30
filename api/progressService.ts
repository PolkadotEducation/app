import { CompletedCourse, ProgressRequest, ProgressResponse } from "@/types/progressTypes";
import { ServerAxiosError, serverGet, serverPost } from "./actions/api";
import { PROGRESS } from "./constants";

export const submitAnswer = async (progressData: ProgressRequest): Promise<ProgressResponse> => {
  const response = await serverPost<ProgressResponse>(PROGRESS, progressData);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ProgressResponse;
};

export const getCourseProgress = async (request: ProgressRequest): Promise<ProgressResponse> => {
  const response = await serverGet<ProgressRequest>(`${PROGRESS}/course/${request.courseId}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ProgressResponse;
};

export const getLessonProgress = async (request: ProgressRequest): Promise<ProgressResponse[]> => {
  const response = await serverGet<ProgressResponse[]>(`${PROGRESS}/lesson/${request.courseId}/${request.lessonId}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ProgressResponse[];
};

export const getUserCompletedCourses = async (): Promise<CompletedCourse[]> => {
  const response = await serverGet<CompletedCourse[]>(`${PROGRESS}/courses`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CompletedCourse[];
};
