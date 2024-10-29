import { Db } from "mongodb";
import { connectToDatabase, dropCourses, dropDatabase, resetDatabase, seedAll, seedCoursesOnly } from "./db";

async function executeWithDb(command: string, callback: (_db: Db) => Promise<void>) {
  const { client, db } = await connectToDatabase();
  try {
    await callback(db);
  } finally {
    await client.close();
  }
}

async function main() {
  const command = process.argv[2];

  try {
    switch (command) {
      case "drop:all":
        await executeWithDb(command, dropDatabase);
        break;
      case "drop:courses":
        await executeWithDb(command, dropCourses);
        break;
      case "seed:all":
        await executeWithDb(command, seedAll);
        break;
      case "seed:courses":
        await executeWithDb(command, seedCoursesOnly);
        break;
      case "reset":
        await resetDatabase();
        break;
      default:
        console.error("Invalid command.");
    }
  } catch (error) {
    console.error("Error executing command:", error);
  }
}

main();
