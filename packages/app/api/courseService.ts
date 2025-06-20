import { CourseType } from "@/types/courseTypes";
import { ServerAxiosError, serverDelete, serverGet, serverPost, serverPut } from "./actions/api";
import { COURSE, COURSES, COURSES_DUPLICATE, COURSES_SUMMARY } from "./constants";

export const getCourses = async (teamId?: string, language?: string): Promise<CourseType[]> => {
  let params = {};
  if (teamId) params = { teamId };
  if (language) params = { ...params, language };
  const response = await serverGet<CourseType[]>(COURSES, { params });
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CourseType[];
};

export const getCoursesSummary = async (teamId: string): Promise<CourseType[]> => {
  let params = {};
  if (teamId) params = { teamId };

  const response = await serverGet<CourseType[]>(COURSES_SUMMARY, { params });
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CourseType[];
};

export const getCourse = async (id: string): Promise<CourseType> => {
  const response = await serverGet<CourseType>(`${COURSE}?courseId=${id}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CourseType;
};

export const duplicateCourses = async (teamId: string, courses: string[]): Promise<string[]> => {
  const response = await serverPost<string[]>(`${COURSES_DUPLICATE}/${teamId}`, { courses });
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as string[];
};

export const deleteCourseById = async (teamId: string, courseId: string): Promise<Boolean> => {
  const response = await serverDelete<Boolean>(`${COURSE}/${teamId}/${courseId}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as Boolean;
};

export const createCourse = async (teamId: string, courseData: CourseType): Promise<CourseType> => {
  const response = await serverPost<CourseType>(`${COURSE}/${teamId}`, courseData);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CourseType;
};

export const updateCourse = async (teamId: string, courseId: string, courseData: CourseType): Promise<CourseType> => {
  const response = await serverPut<CourseType>(`${COURSE}/${teamId}/${courseId}`, courseData);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CourseType;
};
