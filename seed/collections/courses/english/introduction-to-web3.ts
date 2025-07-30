import { Db, ObjectId } from "mongodb";
import { LessonType } from "@/types/lessonTypes";

export async function introductionToWeb3(db: Db, teamId: ObjectId, recordedLessons: LessonType[]) {
  const language = "english";

  const modules = [
    {
      teamId,
      title: "Basic Web3 Concepts",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "arpanet")!._id,
        recordedLessons.find((lesson) => lesson.slug === "internet-web3")!._id,
      ],
    },
    {
      teamId,
      title: "Basic Blockchain Concepts",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "blockchain-how-it-works")!._id,
        recordedLessons.find((lesson) => lesson.slug === "blockchain-terms")!._id,
        recordedLessons.find((lesson) => lesson.slug === "private-blockchains")!._id,
        recordedLessons.find((lesson) => lesson.slug === "data-ownership")!._id,
        recordedLessons.find((lesson) => lesson.slug === "bitcoin-ethereum-others")!._id,
      ],
    },
    {
      teamId,
      title: "Introduction to Polkadot",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "gavin-wood-w3f-parity")!._id,
        recordedLessons.find((lesson) => lesson.slug === "shared-security")!._id,
        recordedLessons.find((lesson) => lesson.slug === "polkadot-solutions")!._id,
        recordedLessons.find((lesson) => lesson.slug === "dot-token")!._id,
        recordedLessons.find((lesson) => lesson.slug === "polkadot-use-cases")!._id,
      ],
    },
  ];

  const recordedModules = await db.collection("modules").insertMany(modules);

  const course = {
    teamId,
    title: "Introduction to Web3: Blockchains and Polkadot",
    language,
    summary: `This course breaks down the basics of blockchain technology, focusing on how Polkadot connects different blockchains to work together. You'll dive into concepts like decentralization, cryptography, and how the internet is evolving with Web3. The course explains Polkadot's structure, especially the Relay Chain, which keeps all the connected blockchains secure. You'll also learn about Polkadot's token, DOT, and how it's used for governance, staking, and expanding the network. Finally, with use cases and practical examples from areas like DeFi, gaming, healthcare, and NFTs, the course shows how Polkadot helps build safer, smarter and more connected blockchain projects.`,
    modules: Object.values(recordedModules.insertedIds),
    createdAt: new Date(),
    updatedAt: new Date(),
    banner: "blackPink",
  };

  await db.collection("courses").insertOne(course);
}
