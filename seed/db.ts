/* eslint-disable no-console */
import { Db, MongoClient } from "mongodb";
import { seedUsers } from "./collections/users";
import { seedTeams } from "./collections/teams";
import { seedCourses } from "./collections/courses";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
console.info("Environment:", process.env.NODE_ENV);
const dbName = (process.env.NODE_ENV && `doteducation-${process.env.NODE_ENV}`) || "doteducation-development";

export async function connectToDatabase() {
  const client: MongoClient = new MongoClient(uri);

  await client.connect();
  console.info(`Connected to: ${uri}`);

  const db: Db = client.db(dbName);
  console.info(`Database: ${dbName}`);

  return { client, db };
}

export async function resetDatabase() {
  const { client, db } = await connectToDatabase();
  await dropDatabase(db);
  await seedAll(db);
  await client.close();
}

export async function dropDatabase(db: Db) {
  try {
    await db.dropDatabase();
    console.info("Database dropped.");
  } catch (error) {
    console.error("Error while dropping database:", error);
  }
}

export async function dropCourses(db: Db) {
  try {
    await db.collection("courses").deleteMany({});
    await db.collection("modules").deleteMany({});
    await db.collection("lessons").deleteMany({});
    console.info("Dropped existing course data.");
  } catch (error) {
    console.error("Error while dropping course data:", error);
  }
}

export async function seedAll(db: Db) {
  try {
    console.info("Seeding users...");
    await seedUsers(db);
    console.info("Users seeded.");

    console.info("Seeding team...");
    const teamId = await seedTeams(db);
    console.info("Team seeded.");

    console.info("Seeding courses...");
    await seedCourses(db, teamId);
    console.info("Courses seeded.");

    await seedCorrectChoices(db);
  } catch (error) {
    console.error("Error while seeding:", error);
  }
}

export async function seedCoursesOnly(db: Db) {
  try {
    console.info("Seeding courses...");
    const teamId = await seedTeams(db);
    await seedCourses(db, teamId);
    console.info("Courses seeded.");

    seedCorrectChoices(db);
  } catch (error) {
    console.error("Error while seeding courses:", error);
  }
}

export async function seedCorrectChoices(db: Db) {
  try {
    const { updateCorrectChoices } = await import("./collections/lessons/choices" as never);
    await updateCorrectChoices(db);
    console.info("Updated correct choices.");
  } catch (e) {
    console.error(e);
    console.info("No correct choices file found, skipping...");
  }
}
