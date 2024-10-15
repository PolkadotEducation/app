import { CourseType } from "@/types/courseTypes";
import { ServerAxiosError, serverGet } from "./actions/api";
import { COURSE, COURSES } from "./constants";

export const getCoursesByLanguage = async (language: string): Promise<CourseType[]> => {
  const response = await serverGet<CourseType[]>(`${COURSES}?language=${language}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CourseType[];
};

export const getCourse = async (id: string): Promise<CourseType> => {
  const response = await serverGet<CourseType>(`${COURSE}?courseId=${id}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CourseType;
};
