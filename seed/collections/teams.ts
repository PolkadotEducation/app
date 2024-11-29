import { Db } from "mongodb";

export async function seedTeams(db: Db) {
  const exists = await db.collection("teams").findOne({ owner: "admin@seed.com" });
  if (exists) return exists._id;
  const team = await db.collection("teams").insertOne({
    owner: "admin@seed.com",
    name: "Polkadot Education",
    description: "Polkadot Education Core Team",
    picture: "",
    lastActivity: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await db.collection("userteams").insertOne({
    email: "admin@seed.com",
    teamId: team.insertedId,
    lastActivity: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return team.insertedId;
}
