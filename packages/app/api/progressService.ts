import {
  CompletedCourse,
  CourseProgress,
  CourseSummary,
  CourseSummaryResponse,
  ProgressRequest,
  ProgressResponse,
  XpAndLevel,
} from "@/types/progressTypes";
import { ServerAxiosError, serverGet, serverPost } from "./actions/api";
import { PROGRESS } from "./constants";

export const submitAnswer = async (progressData: ProgressRequest): Promise<ProgressResponse> => {
  const response = await serverPost<ProgressResponse>(PROGRESS, progressData);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ProgressResponse;
};

export const getCourseProgress = async (request: ProgressRequest): Promise<CourseProgress> => {
  const response = await serverGet<ProgressRequest>(`${PROGRESS}/course/${request.courseId}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CourseProgress;
};

export const getCourseSummary = async (request: ProgressRequest): Promise<CourseSummary> => {
  const response = await serverGet<CourseSummaryResponse>(`${PROGRESS}/course/summary/${request.courseId}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  const courseSummaryResponse = response as CourseSummaryResponse;
  return courseSummaryResponse.courseSummary as CourseSummary;
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

export const getUserXpAndLevel = async (): Promise<XpAndLevel> => {
  const response = await serverGet<XpAndLevel>(`${PROGRESS}/level`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as XpAndLevel;
};
