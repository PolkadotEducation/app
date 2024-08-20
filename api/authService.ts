"use server";

import api from "./api";
import { SIGN_UP } from "./constants";

type SignUpResponse = {
  userId?: string;
  email?: string;
  name?: string;
  lastActivity?: string;
  error?: { message: string };
};

// export const authLogin = async (credentials: {
//     email: string;
//     password: string;
//   }): Promise<void> {
//     try {
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

// We can not pass throw exception upstream here, as it came from server side.
export const authSignUp = async (credentials: {
  email: string;
  password: string;
  name: string;
}): Promise<SignUpResponse> => {
  try {
    const r = await api.post<SignUpResponse>(SIGN_UP, credentials);
    return r.data;
  } catch (e: any) {
    return { error: e };
  }
};
