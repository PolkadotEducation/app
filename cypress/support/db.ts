/* eslint-disable no-console */
import { Db, MongoClient } from "mongodb";

const uri = "mongodb://localhost:27117";
const dbName = "doteducation";

async function connectToDatabase() {
  const client = new MongoClient(uri);
  console.info("Connecting to MongoDB at:", uri);
  await client.connect();
  const db = client.db(dbName);
  return { client, db };
}

async function dropDatabase(db: Db) {
  try {
    await db.dropDatabase();
    console.info("Database dropped.");
  } catch (error) {
    console.error("Error dropping database:", error);
  }
}

async function seedDatabase(db: Db) {
  try {
    const adminUser = {
      email: "admin@seed.com",
      password: "43e03e54352a95fbe19a7a1b6e1d076ef170f6dc3be5a5eebe8ccc23d4ead11d",
      name: "Seeded Admin",
      company: "Polkadot Education",
      isAdmin: true,
      verifyToken: "11796407f2d34450d955184cf66544b4",
      lastActivity: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("users").insertOne(adminUser);
    console.info("Database seeded.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

async function setupDatabase() {
  const { client, db } = await connectToDatabase();

  try {
    await dropDatabase(db);
    await seedDatabase(db);
  } finally {
    await client.close();
  }
}

export { dropDatabase, seedDatabase, setupDatabase };
