import { User } from "./userTypes";

export type AuthState = {
  isLoading: boolean;
  userToken: string | null;
  email: string | null;
  error: string | null;
  userInfo?: User;
};

export type AuthAction =
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: { token: string } }
  | { type: "LOGIN_FAILURE"; payload: { error: string } }
  | { type: "SIGN_UP_REQUEST" }
  | { type: "SIGN_UP_SUCCESS"; payload: { email: string } }
  | { type: "SIGN_UP_FAILURE"; payload: { error: string } }
  | { type: "CLEAR_AUTH_ERROR" }
  | { type: "SIGN_OUT" }
  | { type: "SET_USER"; payload: { user: User } }
  | { type: "SET_TOKEN"; payload: { token: string } };
