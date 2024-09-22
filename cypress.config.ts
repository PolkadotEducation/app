import { defineConfig } from "cypress";
import { setupDatabase } from "./cypress/support/db";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    experimentalStudio: true,
    supportFile: "cypress/support/index.ts",
    supportFolder: "cypress/support",
    setupNodeEvents(on, config) {
      on("before:run", async () => {
        await setupDatabase();
      });

      return config;
    },
    experimentalInteractiveRunEvents: true,
  },
});
