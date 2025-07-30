import { Db, ObjectId } from "mongodb";
import { LessonType } from "@/types/lessonTypes";

export async function polkadotFundamentals(db: Db, teamId: ObjectId, _recordedLessons: LessonType[]) {
  const language = "portuguese";

  const course = {
    teamId,
    title: "Fundamentos de Polkadot",
    language,
    summary:
      "Um curso abrangente cobrindo os fundamentos da Polkadot, desde conceitos básicos de Web3 até conceitos avançados como Substrate e Polkadot 2.0.",
    modules: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    banner: "blackPurple",
  };

  await db.collection("courses").insertOne(course);
}
