import { Db } from "mongodb";
import { ObjectId } from "mongodb";

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createRandomProgress(userId: ObjectId) {
  const challenges = [new ObjectId(), new ObjectId(), new ObjectId()];
  const lessons = [new ObjectId(), new ObjectId(), new ObjectId()];
  const courses = [new ObjectId(), new ObjectId(), new ObjectId()];
  const choices = [0, 1, 2, 3];
  const difficulties = ["easy", "medium", "hard"];

  return {
    challengeId: getRandomElement(challenges),
    lessonId: getRandomElement(lessons),
    courseId: getRandomElement(courses),
    userId,
    choice: getRandomElement(choices),
    difficulty: getRandomElement(difficulties),
    isCorrect: Math.random() < 0.5,
  };
}

export async function seedProgress(db: Db) {
  const users = await db.collection("users").find().toArray();

  const progressEntries = users.flatMap((user) => {
    const numberOfEntries = Math.floor(Math.random() * 200) + 50;
    return Array.from({ length: numberOfEntries }, () => createRandomProgress(user._id));
  });

  await db.collection("progress").insertMany(progressEntries);
}
