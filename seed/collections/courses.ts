import { Db, ObjectId } from "mongodb";
import { englishCourse } from "./courses/english";
import { portugueseCourse } from "./courses/portuguese";
import { spanishCourse } from "./courses/spanish";

export async function seedCourses(db: Db, teamId: ObjectId) {
  await englishCourse(db, teamId);
  await portugueseCourse(db, teamId);
  await spanishCourse(db, teamId);
}
