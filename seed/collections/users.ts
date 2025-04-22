import { Db } from "mongodb";
import { seedProgress } from "./progress";

function createUser(email: string, name: string, language: string, isAdmin: boolean = false) {
  return {
    email,
    password: "43e03e54352a95fbe19a7a1b6e1d076ef170f6dc3be5a5eebe8ccc23d4ead11d",
    name,
    company: "Polkadot Education",
    language,
    isAdmin,
    verifyToken: "11796407f2d34450d955184cf66544b4",
    lastActivity: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function seedUsers(db: Db) {
  const users = [
    createUser("admin@seed.com", "Seeded Admin", "english", true),
    createUser("regular@seed.com", "Regular User", "english"),
    createUser("user1@seed.com", "User One", "english"),
    createUser("user2@seed.com", "User Two", "english"),
    createUser("user3@seed.com", "User Three", "english"),
    createUser("user4@seed.com", "User Four", "spanish"),
    createUser("user5@seed.com", "User Five", "spanish"),
    createUser("user6@seed.com", "User Six", "spanish"),
    createUser("user7@seed.com", "User Seven", "portuguese"),
    createUser("user8@seed.com", "User Eight", "portuguese"),
    createUser("user9@seed.com", "User Nine", "portuguese"),
  ];

  await db.collection("users").insertMany(users);
  await seedProgress(db);
}
