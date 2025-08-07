import { Db, ObjectId } from "mongodb";
import fs from "fs";
import path from "path";
import { ChallengeType } from "@/types/challengeTypes";
import { Difficulty } from "@/lib/experience";

function importChallenge(folderPath: string) {
  const challengePath = path.join(folderPath, "challenge.ts");
  const file = require(challengePath);
  return file.challenges;
}

function getTitleFromMarkdown(body: string, folder: string): string {
  const firstLine = body.split("\n")[0].trim();
  if (!firstLine.startsWith("## ")) {
    throw new Error(`The first line of ${folder}.mdx must start with '## '`);
  }
  return firstLine.replace(/^##\s*/, "").trim();
}

export async function seedLessonsByLanguage(db: Db, teamId: ObjectId, language: string) {
  const lessonsDir = path.join(__dirname, `./collections/lessons/${language}`);

  const lessonFolders = fs
    .readdirSync(lessonsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  lessonFolders.sort();

  const lessons = await Promise.all(
    lessonFolders.map(async (folder) => {
      const folderPath = path.join(lessonsDir, folder);
      const bodyFile = fs.readdirSync(folderPath).find((file) => file.endsWith(".mdx"));

      if (!bodyFile) {
        throw new Error(`Missing .mdx file in ${folderPath}`);
      }

      const bodyPath = path.join(folderPath, bodyFile);
      const body = fs.readFileSync(bodyPath, "utf-8");
      const title = getTitleFromMarkdown(body, folder);
      const slug = folder;
      const challenges = importChallenge(folderPath);

      challenges.map((challenge: ChallengeType) => {
        challenge.difficulty = challenge.difficulty.toLowerCase() as Difficulty;
        challenge.language = language.toLowerCase();
        challenge.createdAt = new Date();
        challenge.updatedAt = new Date();
      });
      const insertedChallenges = await db.collection("challenges").insertMany(challenges);

      return {
        teamId,
        title,
        language,
        slug,
        body,
        challenge: insertedChallenges.insertedIds[0],
        references: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),
  );

  const result = await db.collection("lessons").insertMany(lessons);

  const recordedLessons = lessons.map((lesson, index) => ({
    ...lesson,
    _id: result.insertedIds[index],
  }));

  return recordedLessons;
}
