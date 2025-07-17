import { Db, ObjectId } from "mongodb";
import fs from "fs";
import path from "path";

export async function englishCourse(db: Db, teamId: ObjectId) {
  const lessonsDir = path.join(__dirname, "../lessons/english");

  const lessons = [
    {
      teamId,
      title: "Arpanet",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "arpanet.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "In which historical period was ARPANET developed?",
        choices: ["During World War I", "During the Cold War", "During the Great Depression", "During World War II"],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId,
      title: "Internet (The Evolution to Web3)",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "internet-web3.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "What is the main function of the internet as a global network?",
        choices: [
          "Connect devices to allow communication and sharing of information",
          "Serve as a platform for online games",
          "Control the activities of companies around the world",
          "Provide exclusive access to restricted content",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId,
      title: "Blockchain: what is it and how does it work?",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "blockchain-o-que-e-como-funciona.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "What is the main characteristic of blockchain that makes it secure and immutable?",
        choices: [
          "Centralized data storage",
          "Encryption and distributed ledger",
          "Restricted access to a single organization",
          "Use of intermediaries in all transactions",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId,
      title: "Blockchain Terms and Concepts",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "blockchain-termos-conceitos.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "In symmetric cryptography, what is used to encrypt and decrypt a message?",
        choices: [
          "Two different keys, one public and one private",
          "A public key",
          "A single key used both for encryption and decryption",
          "A unique hash generated for each message",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId,
      title: "Public and Private Networks and Blockchains",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "redes-blockchains-publicas-privadas.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "What is the main characteristic of a centralized network?",
        choices: [
          "Resources and processing power equally distributed among several nodes",
          "Control and communication managed by a central point, like a main server",
          "Absence of a central control point, with power distributed among nodes",
          "Open and participative access for any user",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId,
      title: "Data Ownership",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "propriedade-dos-dados.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "What defines the concept of data ownership?",
        choices: [
          "Who creates the laws for the use of personal data.",
          "Who controls, has access to, and is responsible for the information generated or stored.",
          "Only the government controls the personal data of all citizens.",
          "Who owns the most information in digital systems.",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId,
      title: "Bitcoin, Ethereum, and Other Blockchains",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "bitcoin-ethereum-outras-blockchains.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "What is the main objective of Bitcoin?",
        choices: [
          "Facilitate quick transactions between banks",
          "Be a form of decentralized digital currency",
          "Create smart contracts for business applications",
          "Improve Ethereum’s scalability",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId,
      title: "Gavin Wood, Web3 Foundation, and Parity Technologies",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "gavin-wood-w3f-parity.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "What was Gavin Wood's contribution to the world of cryptocurrencies after his work with Ethereum?",
        choices: [
          "Founded Bitcoin",
          "Founded Polkadot, Parity Technologies, and the Web3 Foundation",
          "Created the first decentralized exchange",
          "Developed the Ripple network",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId,
      title: "Relay Chain and Shared Security",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "relay-chain-seguranca-compartilhada.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "What is the main role of the Relay Chain in the Polkadot network?",
        choices: [
          "Act as an independent cryptocurrency",
          "Manage financial transactions",
          "Connect and coordinate parachains, ensuring they communicate efficiently",
          "Monitor market prices of blockchains",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId,
      title: "The Problem Polkadot Solves",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "problema-polkadot-resolve.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "What is the main problem Polkadot solves?",
        choices: [
          "Network stability",
          "Lack of shared security and communication between blockchains",
          "Blockchain identity",
          "Transaction speed",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId,
      title: "The DOT Token and Its Functions",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "token-dot-funcoes.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "Which of the following is NOT one of the main functions of the DOT token in the Polkadot network?",
        choices: ["Governance", "Staking", "Fees", "Mining"],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId,
      title: "Polkadot Use Cases",
      language: "english",
      body: fs.readFileSync(path.join(lessonsDir, "casos-de-uso-polkadot.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "What is the main advantage of using Polkadot for Decentralized Finance (DeFi) applications?",
        choices: [
          "Prevents communication between different blockchains, increasing security.",
          "Allows assets from various networks to be used on a single DeFi platform, increasing liquidity.",
          "Requires intermediaries such as banks or brokers to operate.",
          "Reduces transaction speed to improve user experience.",
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
  ];

  const recordedModules = await db.collection("modules").insertMany(modules);

  const course = {
    teamId,
    title: "Introduction to Web3: Blockchains and Polkadot",
    language: "english",
    summary: `This course breaks down the basics of blockchain technology, focusing on how Polkadot connects different blockchains to work together. You'll dive into concepts like decentralization, cryptography, and how the internet is evolving with Web3. The course explains Polkadot’s structure, especially the Relay Chain, which keeps all the connected blockchains secure. You'll also learn about Polkadot's token, DOT, and how it’s used for governance, staking, and expanding the network. Finally, with use cases and practical examples from areas like DeFi, gaming, healthcare, and NFTs, the course shows how Polkadot helps build safer, smarter and more connected blockchain projects.`,
    modules: Object.values(recordedModules.insertedIds),
    createdAt: new Date(),
    updatedAt: new Date(),
    banner: "blackPink",
  };

  await db.collection("courses").insertOne(course);
}
