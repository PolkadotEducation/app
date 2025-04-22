import { Db, ObjectId } from "mongodb";
import { seedLessonsByLanguage } from "@/seed/utils";

export async function portugueseCourse(db: Db, teamId: ObjectId) {
  const language = "english";
  const recordedLessons = await seedLessonsByLanguage(db, teamId, language);

  const modules = [
    {
      teamId,
      title: "Conceitos Básicos de Web3",
      lessons: [recordedLessons.insertedIds[0], recordedLessons.insertedIds[1]],
    },
    {
      teamId,
      title: "Conceitos Básicos de Blockchain",
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
      title: "Introdução à Polkadot",
      lessons: [
        recordedLessons.insertedIds[7],
        recordedLessons.insertedIds[8],
        recordedLessons.insertedIds[9],
        recordedLessons.insertedIds[10],
        recordedLessons.insertedIds[11],
      ],
    },
  ];

  const recordedModules = await db.collection("modules").insertMany(modules);

  const course = {
    teamId,
    title: "Introdução à Web3: Blockchains e Polkadot",
    language: "portuguese",
    summary: `Este curso explica os fundamentos da tecnologia blockchain em detalhe, com foco em Polkadot e como ela conecta diferentes blockchains para trabalharem juntas. Você vai mergulhar em conceitos como descentralização, criptografia e como a internet está evoluindo com a Web3. O curso explica a estrutura da Polkadot, especialmente a Relay Chain, que mantém todas as blockchains conectadas de forma segura. Você também aprenderá sobre o token da Polkadot, DOT, e como ele é usado para governança, staking e expansão da rede. Finalmente, com casos de uso e exemplos práticos de áreas como DeFi, jogos, saúde e NFTs, o curso mostra como a Polkadot ajuda a construir projetos de blockchain mais seguros, inteligentes e conectados.`,
    modules: Object.values(recordedModules.insertedIds),
    createdAt: new Date(),
    updatedAt: new Date(),
    banner: "blackPink",
  };

  await db.collection("courses").insertOne(course);
}
