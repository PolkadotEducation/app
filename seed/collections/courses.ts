/* eslint-disable no-console */
import { Db } from "mongodb";
import { englishCourse } from "./courses/english";
import { portugueseCourse } from "./courses/portuguese";
import { spanishCourse } from "./courses/spanish";

export async function seedCourses(db: Db) {
  await englishCourse(db);
  await portugueseCourse(db);
  await spanishCourse(db);
}
