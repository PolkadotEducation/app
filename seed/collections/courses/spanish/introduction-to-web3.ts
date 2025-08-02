import { Db, ObjectId } from "mongodb";
import { LessonType } from "@/types/lessonTypes";

export async function introductionToWeb3(db: Db, teamId: ObjectId, recordedLessons: LessonType[]) {
  const language = "spanish";

  const modules = [
    {
      teamId,
      title: "Conceptos Básicos de Web3",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "arpanet")!._id,
        recordedLessons.find((lesson) => lesson.slug === "internet-web3")!._id,
      ],
    },
    {
      teamId,
      title: "Conceptos Básicos de Blockchain",
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
      title: "Introducción a Polkadot",
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
    title: "Introducción a Web3: Blockchains y Polkadot",
    language,
    summary:
      "Este curso explica los conceptos básicos de la tecnología blockchain, enfocándose en cómo Polkadot conecta diferentes blockchains para trabajar juntas. Te sumergirás en conceptos como descentralización, criptografía y cómo internet está evolucionando con Web3. El curso explica la estructura de Polkadot, especialmente la Relay Chain, que mantiene todas las blockchains conectadas de forma segura. También aprenderás sobre el token de Polkadot, DOT, y cómo se usa para gobernanza, staking y expansión de la red. Finalmente, con casos de uso y ejemplos prácticos de áreas como DeFi, gaming, salud y NFTs, el curso muestra cómo Polkadot ayuda a construir proyectos blockchain más seguros, inteligentes y conectados.",
    modules: Object.values(recordedModules.insertedIds),
    createdAt: new Date(),
    updatedAt: new Date(),
    banner: "blackPink",
  };

  await db.collection("courses").insertOne(course);
}
