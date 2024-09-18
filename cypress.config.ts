import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
