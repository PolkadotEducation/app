import { Db, ObjectId } from "mongodb"
import { seedLessonsByLanguage } from "../../utils"

export async function englishCourse(db: Db, teamId: ObjectId) {
  const language = "english"
  const recordedLessons = await seedLessonsByLanguage(db, teamId, language)

  const modules = [
    {
      teamId,
      title: "Basic Web3 Concepts",
      lessons: [recordedLessons.insertedIds[0], recordedLessons.insertedIds[1]],
    },
    {
      teamId,
      title: "Basic Blockchain Concepts",
      lessons: [
        recordedLessons.insertedIds[2],
        recordedLessons.insertedIds[3],
        recordedLessons.insertedIds[4],
        recordedLessons.insertedIds[5],
        recordedLessons.insertedIds[6],
      ],
    },
    {
      teamId,
      title: "Introduction to Polkadot",
      lessons: [
        recordedLessons.insertedIds[7],
        recordedLessons.insertedIds[8],
        recordedLessons.insertedIds[9],
        recordedLessons.insertedIds[10],
        recordedLessons.insertedIds[11],
      ],
    },
  ]

  const recordedModules = await db.collection("modules").insertMany(modules)

  const course = {
    teamId,
    title: "Introduction to Web3: Blockchains and Polkadot",
    language,
    summary: `This course breaks down the basics of blockchain technology, focusing on how Polkadot connects different blockchains to work together. You'll dive into concepts like decentralization, cryptography, and how the internet is evolving with Web3. The course explains Polkadot's structure, especially the Relay Chain, which keeps all the connected blockchains secure. You'll also learn about Polkadot's token, DOT, and how it's used for governance, staking, and expanding the network. Finally, with use cases and practical examples from areas like DeFi, gaming, healthcare, and NFTs, the course shows how Polkadot helps build safer, smarter and more connected blockchain projects.`,
    modules: Object.values(recordedModules.insertedIds),
    createdAt: new Date(),
    updatedAt: new Date(),
    banner: "blackPink",
  }

  await db.collection("courses").insertOne(course)
}
