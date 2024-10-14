import { setupDatabase } from "../cypress/support/db";

async function main() {
  await setupDatabase();
}

main();
