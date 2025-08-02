const challenges = [
  {
    question: "What is the main difference between Parachains and Rollups?",
    choices: [
      "Parachains are connected to Polkadot's Relay Chain, while Rollups are scaling solutions for Ethereum",
      "Parachains use Layer-2 scaling, while Rollups rely on Polkadot's security model",
      "Parachains have delayed finality, while Rollups offer fast finality",
      "Parachains process transactions on-chain, while Rollups process off-chain",
    ],
    correctChoice: 0,
    difficulty: "medium",
  },
  {
    question: "Which security model is used by ZK Rollups?",
    choices: [
      "Mathematical proofs",
      "Game-theoretic incentives",
      "Cynical verification with validator subsets",
      "Slashing",
    ],
    correctChoice: 0,
    difficulty: "medium",
  },
  {
    question: "What is a key advantage of Parachains?",
    choices: ["Low transaction fees", "High scalability", "Shared security", "Limited interoperability"],
    correctChoice: 0,
    difficulty: "easy",
  },
  {
    question: "Which type of Rollup is limited by prover capacity?",
    choices: ["ZK Rollups", "Optimistic Rollups", "Both types", "Neither type"],
    correctChoice: 0,
    difficulty: "easy",
  },
  {
    question: "What may be a challenge for Parachains?",
    choices: ["Low transaction fees", "High customization", "Development complexity", "Fast finality"],
    correctChoice: 0,
    difficulty: "hard",
  },
];

export { challenges };
