import { Db, ObjectId } from "mongodb";

type LessonSeed = {
  teamId: ObjectId;
  title: string;
  language: string;
  slug: string;
  body: string;
  challenge: ObjectId;
  references: unknown[];
  createdAt: Date;
  updatedAt: Date;
};

const difficulties = ["easy", "medium", "hard"] as const;
type Difficulty = (typeof difficulties)[number];

function loremIpsum(paragraphs: number = 1): string {
  const p =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.";
  return Array.from({ length: paragraphs })
    .map(() => p)
    .join("\n\n");
}

export async function seedCourses(db: Db, teamId: ObjectId) {
  const languages = ["english", "portuguese", "spanish"];
  const banners = ["blackPink", "blackPurple", "tetris", "gradient"];

  for (const language of languages) {
    for (let courseIndex = 1; courseIndex <= 2; courseIndex++) {
      const moduleIds: ObjectId[] = [];
      const now = new Date();

      for (let moduleIndex = 1; moduleIndex <= 3; moduleIndex++) {
        const lessonsToInsert: LessonSeed[] = [];

        for (let lessonIndex = 1; lessonIndex <= 4; lessonIndex++) {
          const difficulty: Difficulty = difficulties[(lessonIndex - 1) % difficulties.length];

          const challengeResult = await db.collection("challenges").insertOne({
            teamId,
            question: `(${language}) Course ${courseIndex} • Module ${moduleIndex} • Lesson ${lessonIndex}: Choose the correct option`,
            choices: ["Option A", "Option B", "Option C", "Option D"],
            correctChoice: 0,
            difficulty,
            language,
            createdAt: now,
            updatedAt: now,
          });

          const slug = `course-${courseIndex}-module-${moduleIndex}-lesson-${lessonIndex}`;
          lessonsToInsert.push({
            teamId,
            title: `Lesson ${lessonIndex}`,
            language,
            slug,
            body: loremIpsum(3),
            challenge: challengeResult.insertedId,
            references: [],
            createdAt: now,
            updatedAt: now,
          });
        }

        const insertedLessons = await db.collection("lessons").insertMany(lessonsToInsert);
        const lessonIds = Object.values(insertedLessons.insertedIds);

        const moduleInsert = await db.collection("modules").insertOne({
          teamId,
          title: `Module ${moduleIndex}`,
          lessons: lessonIds,
          createdAt: now,
          updatedAt: now,
        });
        moduleIds.push(moduleInsert.insertedId);
      }

      await db.collection("courses").insertOne({
        teamId,
        title: `Sample Course ${courseIndex} (${language})`,
        language,
        summary: loremIpsum(2),
        modules: moduleIds,
        banner: banners[(courseIndex - 1) % banners.length],
        createdAt: now,
        updatedAt: now,
      });
    }
  }
}
