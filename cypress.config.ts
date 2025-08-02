import { defineConfig } from "cypress";
import { resetDatabase, connectToDatabase } from "./seed/db";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 20000,
    experimentalStudio: true,
    supportFile: "cypress/support/index.ts",
    supportFolder: "cypress/support",
    screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure: true,
    video: false,

    setupNodeEvents(on, config) {
      on("before:spec", async () => {
        await resetDatabase();
      });

      on("task", {
        async getUserVerificationToken(email: string): Promise<string | null> {
          const { client, db } = await connectToDatabase();
          try {
            const user = await db.collection("users").findOne({ email: email.toLowerCase() });
            await client.close();
            return user?.verify?.token || null;
          } catch (error) {
            await client.close();
            console.error("Error getting verification token:", error);
            return null;
          }
        },

        async deleteUser(email: string): Promise<boolean> {
          const { client, db } = await connectToDatabase();
          try {
            const user = await db.collection("users").findOne({ email: email.toLowerCase() });

            if (user) {
              await db.collection("progress").deleteMany({ userId: user._id });
              await db.collection("certificates").deleteMany({ userId: user._id });

              const result = await db.collection("users").deleteOne({ email: email.toLowerCase() });
              await client.close();
              return result.deletedCount > 0;
            } else {
              await client.close();
              return false;
            }
          } catch (error) {
            await client.close();
            console.error("Error deleting user:", error);
            return false;
          }
        },
      });

      return config;
    },

    experimentalInteractiveRunEvents: true,
  },
});
