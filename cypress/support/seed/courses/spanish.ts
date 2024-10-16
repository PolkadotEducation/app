import { Db } from "mongodb";
import fs from "fs";
import path from "path";

export async function spanishCourse(db: Db) {
  const lessonsDir = path.join(__dirname, "../lessons/spanish");

  const lessons = [
    {
      title: "Arpanet",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "arpanet.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "¿En qué período histórico se desarrolló ARPANET?",
        choices: [
          "Durante la Primera Guerra Mundial",
          "Durante la Guerra Fría",
          "Durante la Gran Depresión",
          "Durante la Segunda Guerra Mundial",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Internet (La evolución hacia Web3)",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "internet-web3.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "¿Cuál es la función principal de Internet como red global?",
        choices: [
          "Conectar dispositivos para permitir la comunicación y el intercambio de información",
          "Servir como una plataforma para juegos en línea",
          "Controlar las actividades de las empresas en todo el mundo",
          "Proporcionar acceso exclusivo a contenidos restringidos",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Blockchain: ¿Qué es y cómo funciona?",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "blockchain-o-que-e-como-funciona.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "¿Cuál es la característica principal de blockchain que la hace segura e inmutable?",
        choices: [
          "Almacenamiento centralizado de datos",
          "Cifrado y registro distribuido",
          "Acceso restringido a una única organización",
          "Uso de intermediarios en todas las transacciones",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Términos y Conceptos de Blockchain",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "blockchain-termos-conceitos.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "En la criptografía simétrica, ¿qué se utiliza para cifrar y descifrar un mensaje?",
        choices: [
          "Dos claves diferentes, una pública y una privada",
          "Una clave pública",
          "Una única clave, utilizada tanto para cifrar como para descifrar",
          "Un hash único generado para cada mensaje",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Redes y Blockchains Públicas y Privadas",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "redes-blockchains-publicas-privadas.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "¿Cuál es la principal característica de una red centralizada?",
        choices: [
          "Recursos y capacidad de procesamiento distribuidos equitativamente entre varios nodos",
          "Control y comunicación gestionados por un punto central, como un servidor principal",
          "Ausencia de un punto central de control, con distribución de poder entre los nodos",
          "Acceso abierto y participativo para cualquier usuario",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Propiedad de los Datos",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "propriedade-dos-dados.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "¿Qué define el concepto de propiedad de los datos?",
        choices: [
          "Quién crea las leyes para el uso de datos personales.",
          "Quién controla, tiene acceso y es responsable de la información generada o almacenada.",
          "Solo el gobierno controla los datos personales de todos los ciudadanos.",
          "Quién posee la mayor cantidad de información en los sistemas digitales.",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Bitcoin, Ethereum y otras blockchains",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "bitcoin-ethereum-outras-blockchains.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "¿Cuál es el principal objetivo de Bitcoin?",
        choices: [
          "Facilitar transacciones rápidas entre bancos",
          "Ser una forma de dinero digital descentralizado",
          "Crear contratos inteligentes para aplicaciones empresariales",
          "Mejorar la escalabilidad de Ethereum",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Gavin Wood, Web3 Foundation y Parity Technologies",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "gavin-wood-w3f-parity.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question:
          "¿Cuál fue la contribución de Gavin Wood al mundo de las criptomonedas después de su trabajo con Ethereum?",
        choices: [
          "Fundó Bitcoin",
          "Fundó Polkadot, Parity Technologies y la Web3 Foundation",
          "Creó el primer exchange descentralizado",
          "Desarrolló la red Ripple",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Relay Chain y Seguridad Compartida",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "relay-chain-seguranca-compartilhada.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "¿Cuál es el principal papel de la Relay Chain en la red Polkadot?",
        choices: [
          "Funcionar como una criptomoneda independiente",
          "Gestionar las transacciones financieras",
          "Conectar y coordinar las parachains, asegurando que se comuniquen de manera eficiente",
          "Monitorear los precios de mercado de las blockchains",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "El problema que Polkadot resuelve",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "problema-polkadot-resolve.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "¿Cuál es el principal problema que Polkadot resuelve?",
        choices: [
          "Estabilidad de las redes",
          "Falta de seguridad compartida y comunicación entre blockchains",
          "La identidad de las blockchains",
          "La velocidad de las transacciones",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "El Token DOT y sus funciones",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "token-dot-funcoes.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "¿Cuál de las siguientes NO es una de las principales funciones del token DOT en la red Polkadot?",
        choices: ["Gobernanza", "Staking", "Tasas", "Minería"],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Casos de uso de Polkadot",
      language: "spanish",
      body: fs.readFileSync(path.join(lessonsDir, "casos-de-uso-polkadot.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question:
          "¿Cuál es la principal ventaja de usar Polkadot para aplicaciones de Finanzas Descentralizadas (DeFi)?",
        choices: [
          "Impide la comunicación entre diferentes blockchains, aumentando la seguridad.",
          "Permite que los activos de varias redes se utilicen en una sola plataforma DeFi, aumentando la liquidez.",
          "Exige intermediarios como bancos o corredores para funcionar.",
          "Reduce la velocidad de las transacciones para mejorar la experiencia del usuario.",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const recordedLessons = await db.collection("lessons").insertMany(lessons);

  const modules = [
    {
      title: "Conceptos Básicos de Web3",
      lessons: [recordedLessons.insertedIds[0], recordedLessons.insertedIds[1]],
    },
    {
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
    title: "Introducción a Web3: Blockchains y Polkadot",
    language: "spanish",
    summary: `Este curso explica los fundamentos de la tecnología blockchain en detalle, con un enfoque en Polkadot y cómo conecta diferentes blockchains para que trabajen juntas. Profundizarás en conceptos como descentralización, criptografía y cómo Internet está evolucionando con Web3. El curso explica la estructura de Polkadot, especialmente la Relay Chain, que mantiene conectadas de forma segura todas las blockchains. También aprenderás sobre el token de Polkadot, DOT, y cómo se utiliza para la gobernanza, staking y expansión de la red. Finalmente, con casos de uso y ejemplos prácticos en áreas como DeFi, juegos, salud y NFTs, el curso muestra cómo Polkadot ayuda a construir proyectos de blockchain más seguros, inteligentes y conectados.`,
    modules: Object.values(recordedModules.insertedIds),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.collection("courses").insertOne(course);
}
