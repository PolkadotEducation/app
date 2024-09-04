"use server";

import { OAuth2Client } from "google-auth-library";

export type GoogleOAuthPayload = {
  email: string;
  name: string;
  picture: string;
};

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
);

export async function serverGoogleOAuthURL(): Promise<string> {
  try {
    const url = client.generateAuthUrl({
      access_type: "offline",
      scope: ["profile", "email"],
    });
    return url;
  } catch (error) {
    console.log(`[ERROR][serverGoogleOAuth]: ${error}`);
    return "";
  }
}

export async function serverGoogleOAuthPayload(code: string): Promise<GoogleOAuthPayload> {
  try {
    const { tokens } = await client.getToken(code);
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token ?? "",
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (payload) {
      return {
        email: payload.email!,
        name: payload.name!,
        picture: payload.picture!,
      };
    }
  } catch (error) {
    console.log(`[ERROR][serverGoogleOAuthPayload]: ${error}`);
  }
  return {
    email: "error",
    name: "error",
    picture: "error",
  };
}
