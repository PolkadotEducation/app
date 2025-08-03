import * as z from "zod";

export const challengeSchema = z.object({
  question: z.string().nonempty("Question is required").max(200, "Question must be 200 characters or less"),
  choices: z
    .array(z.string())
    .refine((choices) => choices.slice(0, 2).every((choice) => choice.trim() !== ""), "First 2 choices are required"),
  correctChoice: z.number().min(0).max(4),
  difficulty: z.enum(["easy", "medium", "hard"], {
    errorMap: () => ({ message: "Difficulty must be easy, medium, or hard" }),
  }),
  language: z.string().nonempty("Language is required"),
});

export type ChallengeFormData = z.infer<typeof challengeSchema>;
