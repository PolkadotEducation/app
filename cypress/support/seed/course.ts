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
    summary: `
This course breaks down the basics of blockchain technology, focusing on how Polkadot connects different blockchains to work together. You'll dive into concepts like decentralization, cryptography, and how the internet is evolving with Web3. The course explains Polkadot’s structure, especially the Relay Chain, which keeps all the connected blockchains secure. You'll also learn about Polkadot's token, DOT, and how it’s used for governance, staking, and expanding the network. Finally, with use cases and practical examples from areas like DeFi, gaming, healthcare, and NFTs, the course shows how Polkadot helps build smarter and more connected blockchain projects.`,
    modules: [recordedModule.insertedId],
  };

  await db.collection("courses").insertOne(course);
}
