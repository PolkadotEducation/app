"use server";

export const getAppBaseUrl = async () => {
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};
