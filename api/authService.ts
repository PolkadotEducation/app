import { serverPost, ServerAxiosError } from "./actions/api";
import { GoogleOAuthPayload } from "./actions/google";
import { SIGN_UP, LOGIN, LOGIN_WITH_GOOGLE, LOGIN_WITH_WALLET } from "./constants";
import { LoginResponse, SignUpResponse } from "@/types/authTypes";

export const authLogin = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
  const r = await serverPost<LoginResponse>(LOGIN, credentials);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as LoginResponse;
};

export const authLoginWithGoogle = async (credentials: GoogleOAuthPayload): Promise<LoginResponse> => {
  const r = await serverPost<LoginResponse>(LOGIN_WITH_GOOGLE, credentials);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as LoginResponse;
};

export const authLoginWithWallet = async (credentials: {
  address: string;
  name?: string;
  signature: Uint8Array;
}): Promise<LoginResponse> => {
  const r = await serverPost<LoginResponse>(LOGIN_WITH_WALLET, credentials);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as LoginResponse;
};

export const authSignUp = async (credentials: {
  email: string;
  password: string;
  name: string;
  company: string;
  language: string;
}): Promise<SignUpResponse> => {
  const r = await serverPost<SignUpResponse>(SIGN_UP, credentials);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as SignUpResponse;
};
