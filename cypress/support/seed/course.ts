import { Db } from "mongodb";
import fs from "fs";
import path from "path";

export async function seedCourses(db: Db) {
  const lessonBody = fs.readFileSync(path.join(__dirname, "../../../lessons/portuguese/arpanet.mdx"), "utf-8");
  const lesson = {
    title: "Arpanet",
    language: "english",
    body: lessonBody,
    difficulty: "medium",
    challenge: {
      question: "Em qual período histórico a ARPANET foi desenvolvida?",
      choices: [
        "Durante a Primeira Guerra Mundial",
        "Durante a Guerra Fria",
        "Durante a Grande Depressão",
        "Durante a Segunda Guerra Mundial",
      ],
      correctChoice: 1,
    },
    references: [
      {
        title: "ARPANET Wikipedia Article",
        link: "https://en.wikipedia.org/wiki/ARPANET",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const recordedLesson = await db.collection("lessons").insertOne(lesson);

  const module = {
    title: "Web3 basics",
    lessons: [recordedLesson.insertedId],
  };

  const recordedModule = await db.collection("modules").insertOne(module);

  const course = {
    title: "Introduction to Web3",
    language: "english",
    summary: "TODO: create course summary",
    modules: [recordedModule.insertedId],
  };

  await db.collection("courses").insertOne(course);
}
