import { Db, ObjectId } from "mongodb";
import { LessonType } from "@/types/lessonTypes";

export async function polkadotFundamentals(db: Db, teamId: ObjectId, recordedLessons: LessonType[]) {
  const language = "english";

  const modules = [
    {
      teamId,
      title: "Basic Concepts of Web3",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "introduction-to-arpanet")!._id,
        recordedLessons.find((lesson) => lesson.slug === "evolution-of-the-internet")!._id,
        recordedLessons.find((lesson) => lesson.slug === "web1-the-read-only-web")!._id,
        recordedLessons.find((lesson) => lesson.slug === "web2-read-and-write")!._id,
        recordedLessons.find((lesson) => lesson.slug === "web3-read-write-and-own")!._id,
        recordedLessons.find((lesson) => lesson.slug === "data-ownership")!._id,
        recordedLessons.find((lesson) => lesson.slug === "importance-of-decentralization")!._id,
        recordedLessons.find((lesson) => lesson.slug === "difference-between-decentralization-and-distribution")!._id,
      ],
    },
    {
      teamId,
      title: "Introduction to Polkadot",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "what-is-polkadot")!._id,
        recordedLessons.find((lesson) => lesson.slug === "key-components-of-polkadot-relay-chain-and-parachains")!._id,
        recordedLessons.find((lesson) => lesson.slug === "dot-token-and-its-functions")!._id,
        recordedLessons.find((lesson) => lesson.slug === "web3-foundation-and-parity")!._id,
        recordedLessons.find((lesson) => lesson.slug === "ecosystem-overview-key-parachains")!._id,
        recordedLessons.find((lesson) => lesson.slug === "canary-network-kusama")!._id,
        recordedLessons.find((lesson) => lesson.slug === "important-use-cases")!._id,
      ],
    },
    {
      teamId,
      title: "Wallets",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "wallets")!._id,
        recordedLessons.find((lesson) => lesson.slug === "security-best-practices")!._id,
        recordedLessons.find((lesson) => lesson.slug === "wallet-options")!._id,
        recordedLessons.find((lesson) => lesson.slug === "account-management")!._id,
      ],
    },
    {
      teamId,
      title: "Staking",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "importance-and-role-of-dot-staking")!._id,
        recordedLessons.find((lesson) => lesson.slug === "polkadots-consensus-nominated-proof-of-stake-npos")!._id,
        recordedLessons.find((lesson) => lesson.slug === "validators-and-nominators")!._id,
        recordedLessons.find((lesson) => lesson.slug === "nomination-pools")!._id,
        recordedLessons.find((lesson) => lesson.slug === "slashing")!._id,
      ],
    },
    {
      teamId,
      title: "Polkadot Basic Architecture",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "deep-dive-into-the-relay-chain")!._id,
        recordedLessons.find((lesson) => lesson.slug === "what-are-extrinsics")!._id,
        recordedLessons.find((lesson) => lesson.slug === "block-explorers")!._id,
        recordedLessons.find((lesson) => lesson.slug === "parachains-vs-rollups")!._id,
        recordedLessons.find((lesson) => lesson.slug === "bridges-and-their-risks")!._id,
        recordedLessons.find((lesson) => lesson.slug === "shared-security")!._id,
        recordedLessons.find((lesson) => lesson.slug === "xcm-and-interoperability")!._id,
      ],
    },
    {
      teamId,
      title: "Substrate (Polkadot SDK)",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "introduction-to-substrate")!._id,
        recordedLessons.find((lesson) => lesson.slug === "substrate-use-cases")!._id,
        recordedLessons.find((lesson) => lesson.slug === "substrate-use-cases-for-private-networks")!._id,
        recordedLessons.find((lesson) => lesson.slug === "frame-and-pallets")!._id,
        recordedLessons.find((lesson) => lesson.slug === "runtime-upgrades")!._id,
        recordedLessons.find((lesson) => lesson.slug === "zombienets")!._id,
      ],
    },
    {
      teamId,
      title: "Polkadot 2.0",
      lessons: [
        recordedLessons.find((lesson) => lesson.slug === "light-clients")!._id,
        recordedLessons.find((lesson) => lesson.slug === "asynchronous-backing")!._id,
        recordedLessons.find((lesson) => lesson.slug === "agile-coretime")!._id,
        recordedLessons.find((lesson) => lesson.slug === "plaza-and-smart-contracts")!._id,
      ],
    },
  ];

  const recordedModules = await db.collection("modules").insertMany(modules);

  const course = {
    teamId,
    title: "Polkadot Fundamentals",
    language,
    summary:
      "A comprehensive course covering the fundamentals of Polkadot, from Web3 basics to advanced concepts like Substrate and Polkadot 2.0.",
    modules: Object.values(recordedModules.insertedIds),
    createdAt: new Date(),
    updatedAt: new Date(),
    banner: "blackPurple",
  };

  await db.collection("courses").insertOne(course);
}
