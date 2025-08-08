import { Db, ObjectId } from "mongodb";
import fs from "fs";
import path from "path";
import { seedLessonsByLanguage } from "@/seed/utils";

export async function seedCourses(db: Db, teamId: ObjectId) {
  const languages = ["english", "portuguese", "spanish"];

  for (const language of languages) {
    const recordedLessons = await seedLessonsByLanguage(db, teamId, language);

    const courseDir = path.join(__dirname, `./courses/${language}`);
    const courseFiles = fs.readdirSync(courseDir).filter((file) => file.endsWith(".ts"));

    for (const file of courseFiles) {
      const courseModule = await import(path.join(courseDir, file));
      const functionName = path.basename(file, ".ts").replace(/-/g, "_");

      if (typeof courseModule[functionName] === "function") {
        await courseModule[functionName](db, teamId, recordedLessons);
      } else {
        const camelCaseFunctionName = functionName.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        if (typeof courseModule[camelCaseFunctionName] === "function") {
          await courseModule[camelCaseFunctionName](db, teamId, recordedLessons);
        } else {
          console.error(`No matching course function found in ${file}`);
        }
      }
    }
  }
}

export async function seedIntroductionCourse(db: Db, teamId: ObjectId) {
  const languages = ["english", "portuguese", "spanish"];

  for (const language of languages) {
    const recordedLessons = await seedLessonsByLanguage(db, teamId, language);

    const courseDir = path.join(__dirname, `./courses/${language}`);
    const courseFiles = fs.readdirSync(courseDir).filter((file) => file === "introduction-to-web3.ts");

    for (const file of courseFiles) {
      const courseModule = await import(path.join(courseDir, file));
      const functionName = path.basename(file, ".ts").replace(/-/g, "_");

      if (typeof courseModule[functionName] === "function") {
        await courseModule[functionName](db, teamId, recordedLessons);
      } else {
        const camelCaseFunctionName = functionName.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        if (typeof courseModule[camelCaseFunctionName] === "function") {
          await courseModule[camelCaseFunctionName](db, teamId, recordedLessons);
        } else {
          console.error(`No matching course function found in ${file}`);
        }
      }
    }
  }
}
