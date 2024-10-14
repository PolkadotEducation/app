import { seed } from "../cypress/support/db";

async function main() {
  await seed();
}

main();
