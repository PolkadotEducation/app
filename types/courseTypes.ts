import { ModuleType } from "./moduleTypes";

export type CourseType = {
  _id?: string;
  title: string;
  language: string;
  summary: string;
  modules?: ModuleType[];
};
