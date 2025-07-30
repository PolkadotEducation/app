import { Db, ObjectId } from "mongodb";
import { LessonType } from "@/types/lessonTypes";

export async function introductionToWeb3(db: Db, teamId: ObjectId, recordedLessons: LessonType[]) {
  const language = "portuguese";

  const modules = [
    {
      teamId,
      title: "Conceitos Básicos de Web3",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "arpanet")!._id,
        recordedLessons.find((lesson) => lesson.slug === "internet-web3")!._id,
      ],
    },
    {
      teamId,
      title: "Conceitos Básicos de Blockchain",
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
      title: "Introdução à Polkadot",
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
    title: "Introdução ao Web3: Blockchains e Polkadot",
    language,
    summary:
      "Este curso explica os conceitos básicos da tecnologia blockchain, com foco em como a Polkadot conecta diferentes blockchains para trabalhar juntos. Você vai mergulhar em conceitos como descentralização, criptografia e como a internet está evoluindo com o Web3. O curso explica a estrutura da Polkadot, especialmente a Relay Chain, que mantém todos os blockchains conectados seguros. Você também aprenderá sobre o token da Polkadot, DOT, e como ele é usado para governança, staking e expansão da rede. Finalmente, com casos de uso e exemplos práticos de áreas como DeFi, gaming, saúde e NFTs, o curso mostra como a Polkadot ajuda a construir projetos blockchain mais seguros, inteligentes e conectados.",
    modules: Object.values(recordedModules.insertedIds),
    createdAt: new Date(),
    updatedAt: new Date(),
    banner: "blackPink",
  };

  await db.collection("courses").insertOne(course);
}
