import { Db } from "mongodb";

export async function updateCorrectChoices(db: Db) {
  const updates = [
    { correctChoice: 1 },
    { correctChoice: 0 },
    { correctChoice: 1 },
    { correctChoice: 2 },
    { correctChoice: 1 },
    { correctChoice: 1 },
    { correctChoice: 1 },
    { correctChoice: 1 },
    { correctChoice: 2 },
    { correctChoice: 1 },
    { correctChoice: 3 },
    { correctChoice: 1 },
  ];

  const updateLessonsByLanguage = async (language: string) => {
    const lessons = await db.collection("lessons").find({ language }).sort({ createdAt: 1 }).toArray();

    await Promise.all(
      lessons.map((lesson, index) => {
        if (updates[index]) {
          return db
            .collection("lessons")
            .updateOne({ _id: lesson._id }, { $set: { "challenge.correctChoice": updates[index].correctChoice } });
        }
        return null;
      }),
    );
  };

  const languages = ["english", "spanish", "portuguese"];
  for (const language of languages) {
    await updateLessonsByLanguage(language);
  }
}
