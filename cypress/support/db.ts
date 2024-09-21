/* eslint-disable no-console */
import { MongoClient } from "mongodb";

async function dropDatabase() {
  const uri = "mongodb://localhost:27117";
  const client = new MongoClient(uri);

  try {
    console.info("Connecting to MongoDB at:", uri);
    await client.connect();
    const db = client.db("doteducation");
    await db.dropDatabase();
    console.info("Database dropped.");
  } catch (error) {
    console.error("Error dropping database:", error);
  } finally {
    await client.close();
  }
}

export { dropDatabase };
