import { defineConfig } from "cypress";
import { dropDatabase } from "./cypress/support/db";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    experimentalStudio: true,
    supportFile: "cypress/support/index.ts",
    supportFolder: "cypress/support",
    setupNodeEvents(on, config) {
      on("task", {
        async dropDatabase() {
          await dropDatabase();
          return null;
        },
      });

      return config;
    },
  },
});
