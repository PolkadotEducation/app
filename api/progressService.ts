import { ProgressRequest, ProgressResponse } from "@/types/progressTypes";
import { ServerAxiosError, serverGet, serverPost } from "./actions/api";
import { PROGRESS } from "./constants";

export const submitAnswer = async (progressData: ProgressRequest): Promise<ProgressResponse> => {
  const response = await serverPost<ProgressResponse>(PROGRESS, progressData);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ProgressResponse;
};

export const getCourseProgress = async (request: ProgressRequest): Promise<ProgressResponse> => {
  const response = await serverGet<ProgressRequest>(`${PROGRESS}/course/${request.userId}/${request.courseId}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ProgressResponse;
};

export const getLessonProgress = async (request: ProgressRequest): Promise<ProgressResponse> => {
  const response = await serverGet<ProgressRequest>(
    `${PROGRESS}/lesson/${request.userId}/${request.courseId}/${request.lessonId}`,
  );
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ProgressResponse;
};
