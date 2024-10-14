/* eslint-disable no-console */
import { Db, MongoClient } from "mongodb";
import { seedUsers } from "./seed/user";
import { seedCourses } from "./seed/course";

const uri = "mongodb://localhost:27117";
const dbName = "doteducation";

async function connectToDatabase() {
  const client: MongoClient = new MongoClient(uri);
  await client.connect();
  const db: Db = client.db(dbName);
  return { client, db };
}

async function seed() {
  console.info("Connecting to MongoDB at:", uri);
  const { client, db } = await connectToDatabase();

  try {
    await db.dropDatabase();
    console.info("Database dropped.");
    await seedUsers(db);
    console.info("Users seeded.");
    await seedCourses(db);
    console.info("Courses seeded.");
  } catch (error) {
    console.error("Error while seeding:", error);
  } finally {
    await client.close();
  }
}

export { seedUsers, seedCourses, seed };
