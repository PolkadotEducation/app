import { Db, ObjectId } from "mongodb";
import fs from "fs";
import path from "path";

function importChallenge(folderPath: string) {
  const challengePath = path.join(folderPath, "challenge.ts");

  return require(challengePath).challenges;
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

  const lessons = lessonFolders.map((folder) => {
    const folderPath = path.join(lessonsDir, folder);
    const bodyFile = fs.readdirSync(folderPath).find((file) => file.endsWith(".mdx"));

    if (!bodyFile) {
      throw new Error(`Missing .mdx file in ${folderPath}`);
    }

    const bodyPath = path.join(folderPath, bodyFile);
    const body = fs.readFileSync(bodyPath, "utf-8");
    const title = getTitleFromMarkdown(body, folder);
    const challenges = importChallenge(folderPath);

    return {
      teamId,
      title,
      language,
      folder,
      body,
      difficulty: challenges[0].difficulty,
      challenge: challenges[0],
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  const recordedLessons = await db.collection("lessons").insertMany(lessons);
  return recordedLessons;
}
