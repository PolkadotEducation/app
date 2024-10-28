import { defineConfig } from "cypress";
import { resetDatabase } from "./seed/db";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    experimentalStudio: true,
    supportFile: "cypress/support/index.ts",
    supportFolder: "cypress/support",
    screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      on("before:run", async () => {
        await resetDatabase();
      });

      return config;
    },
    experimentalInteractiveRunEvents: true,
  },
});
