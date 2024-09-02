import { serverPost, ServerAxiosError } from "./actions/api";
import { GoogleOAuthPayload } from "./actions/google";
import { SIGN_UP, LOGIN, LOGIN_WITH_GOOGLE } from "./constants";

type SignUpResponse = {
  userId?: string;
  email?: string;
  name?: string;
  lastActivity?: string;
};

type LoginResponse = {
  jwt: string;
};

export const authLogin = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
  const r = await serverPost<LoginResponse>(LOGIN, credentials);
  if ((r as ServerAxiosError).message) throw r as ServerAxiosError;
  return r as LoginResponse;
};

export const authLoginWithGoogle = async (credentials: GoogleOAuthPayload): Promise<LoginResponse> => {
  const r = await serverPost<LoginResponse>(LOGIN_WITH_GOOGLE, credentials);
  if ((r as ServerAxiosError).message) throw r as ServerAxiosError;
  return r as LoginResponse;
};

export const authSignUp = async (credentials: {
  email: string;
  password: string;
  name: string;
  company: string;
}): Promise<SignUpResponse> => {
  const r = await serverPost<SignUpResponse>(SIGN_UP, credentials);
  if ((r as ServerAxiosError).message) throw r as ServerAxiosError;
  return r as SignUpResponse;
};
