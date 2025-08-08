export const EXP_POINTS = {
  hard: { perfect: 200, withMistakes: 100 },
  medium: { perfect: 100, withMistakes: 50 },
  easy: { perfect: 50, withMistakes: 25 },
};

export type Difficulty = keyof typeof EXP_POINTS;

export const calculateExperience = (difficulty: Difficulty, correctAtFirstTry: boolean) => {
  const normalizedDifficulty = difficulty.toLowerCase() as Difficulty;
  return correctAtFirstTry ? EXP_POINTS[normalizedDifficulty].perfect : EXP_POINTS[normalizedDifficulty].withMistakes;
};
