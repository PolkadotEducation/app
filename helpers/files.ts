"use server";

import fs from "fs";
import path from "path";

export async function getPrivacyPolicy(policyMarkdown: string) {
  const filePath = path.join(process.cwd(), "policies", policyMarkdown);
  return fs.readFileSync(filePath, "utf8");
}
