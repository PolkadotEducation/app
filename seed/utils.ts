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

// Deterministic PRNG helpers for seeded randomness
function fnv1a32(str: string): number {
  // FNV-1a 32-bit hash
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    // 32-bit FNV prime: 16777619
    hash = (hash >>> 0) * 16777619;
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function getDeterministicIndex(arrayLength: number, seedKey: string): number {
  if (arrayLength <= 0) return 0;
  const seed = fnv1a32(seedKey);
  const random = mulberry32(seed)();
  return Math.floor(random * arrayLength);
}

function getTitleFromMarkdown(body: string, folder: string): string {
  const firstLine = body.split("\n")[0].trim();
  if (!firstLine.startsWith("# ")) {
    throw new Error(`The first line of ${folder}.mdx must start with '# '`);
  }
  return firstLine.replace(/^#\s*/, "").trim();
}

export async function seedLessonsByLanguage(db: Db, teamId: ObjectId, language: string) {
  const lessonsDir = path.join(__dirname, `./content/lessons/${language}`);

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
        challenge.teamId = teamId as unknown as string;
        challenge.difficulty = challenge.difficulty.toLowerCase() as Difficulty;
        challenge.language = language.toLowerCase();
        challenge.createdAt = new Date();
        challenge.updatedAt = new Date();
      });
      const insertedChallenges = await db.collection("challenges").insertMany(challenges);
      const insertedIdsArray = Object.values(insertedChallenges.insertedIds) as ObjectId[];
      const seedKey = `${teamId.toString()}-${slug}-${language}`;
      const deterministicIndex = getDeterministicIndex(insertedIdsArray.length, seedKey);
      const randomChallengeId = insertedIdsArray[deterministicIndex];

      return {
        teamId,
        title,
        language,
        slug,
        body,
        challenge: randomChallengeId,
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

export async function seedContent(db: Db, teamId: ObjectId) {
  const languages = ["english", "portuguese", "spanish"];

  for (const language of languages) {
    const recordedLessons = await seedLessonsByLanguage(db, teamId, language);

    const courseDir = path.join(__dirname, `./content/courses/${language}`);
    if (!fs.existsSync(courseDir)) {
      console.error(`Content directory not found: ${courseDir}`);
      continue;
    }

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
