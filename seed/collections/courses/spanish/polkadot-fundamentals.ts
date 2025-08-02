import { Db, ObjectId } from "mongodb";
import { LessonType } from "@/types/lessonTypes";

export async function polkadotFundamentals(db: Db, teamId: ObjectId, _recordedLessons: LessonType[]) {
  const language = "spanish";

  const course = {
    teamId,
    title: "Fundamentos de Polkadot",
    language,
    summary:
      "Un curso integral que cubre los fundamentos de Polkadot, desde conceptos básicos de Web3 hasta conceptos avanzados como Substrate y Polkadot 2.0.",
    modules: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    banner: "blackPurple",
  };

  await db.collection("courses").insertOne(course);
}
