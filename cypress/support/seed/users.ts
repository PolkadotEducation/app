import { Db } from "mongodb";

export async function seedUsers(db: Db) {
  const adminUser = {
    email: "admin@seed.com",
    password: "43e03e54352a95fbe19a7a1b6e1d076ef170f6dc3be5a5eebe8ccc23d4ead11d",
    name: "Seeded Admin",
    company: "Polkadot Education",
    language: "english",
    isAdmin: true,
    verifyToken: "11796407f2d34450d955184cf66544b4",
    lastActivity: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const regularUser = {
    email: "regular@seed.com",
    password: "43e03e54352a95fbe19a7a1b6e1d076ef170f6dc3be5a5eebe8ccc23d4ead11d",
    name: "Regular User",
    company: "Polkadot Education",
    language: "english",
    isAdmin: false,
    verifyToken: "11796407f2d34450d955184cf66544b4",
    lastActivity: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.collection("users").insertMany([adminUser, regularUser]);
}
