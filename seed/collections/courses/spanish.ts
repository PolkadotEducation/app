import { Db, ObjectId } from "mongodb";
import { seedLessonsByLanguage } from "@/seed/utils";

export async function spanishCourse(db: Db, teamId: ObjectId) {
  const language = "english";
  const recordedLessons = await seedLessonsByLanguage(db, teamId, language);

  const modules = [
    {
      teamId,
      title: "Conceptos Básicos de Web3",
      lessons: [recordedLessons.insertedIds[0], recordedLessons.insertedIds[1]],
    },
    {
      teamId,
      title: "Conceptos Básicos de Blockchain",
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
      title: "Introducción a Polkadot",
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
    title: "Introducción a Web3: Blockchains y Polkadot",
    language: "spanish",
    summary: `Este curso explica los fundamentos de la tecnología blockchain en detalle, con un enfoque en Polkadot y cómo conecta diferentes blockchains para que trabajen juntas. Profundizarás en conceptos como descentralización, criptografía y cómo Internet está evolucionando con Web3. El curso explica la estructura de Polkadot, especialmente la Relay Chain, que mantiene conectadas de forma segura todas las blockchains. También aprenderás sobre el token de Polkadot, DOT, y cómo se utiliza para la gobernanza, staking y expansión de la red. Finalmente, con casos de uso y ejemplos prácticos en áreas como DeFi, juegos, salud y NFTs, el curso muestra cómo Polkadot ayuda a construir proyectos de blockchain más seguros, inteligentes y conectados.`,
    modules: Object.values(recordedModules.insertedIds),
    createdAt: new Date(),
    updatedAt: new Date(),
    banner: "blackPink",
  };

  await db.collection("courses").insertOne(course);
}
