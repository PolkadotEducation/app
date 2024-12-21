import { LessonType, SimplifiedLessonType } from "./lessonTypes";

export type ModuleType = {
  _id: string;
  title: string;
  lessons: LessonType[];
};

export type SimplifiedModuleType = {
  id: string;
  title: string;
  lessons: SimplifiedLessonType[];
};
