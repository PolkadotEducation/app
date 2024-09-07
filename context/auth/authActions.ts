import { GoogleOAuthPayload } from "@/api/actions/google";
import { authLogin, authLoginWithGoogle, authSignUp, getProfile } from "@/api/authService";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { User } from "@/types/userTypes";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const login = async (dispatch: React.Dispatch<any>, credentials: { email: string; password: string }) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const data = await authLogin(credentials);
    Cookies.set("token", data.jwt);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { token: data.jwt },
    });
    dispatch({ type: "CLEAR_AUTH_ERROR" });
    return true;
  } catch (error) {
    const errorMessage = (error as Error).message;
    dispatch({ type: "LOGIN_FAILURE", payload: { error: errorMessage } });
    return false;
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const loginWithGoogle = async (dispatch: React.Dispatch<any>, credentials: GoogleOAuthPayload) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const data = await authLoginWithGoogle(credentials);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { token: data.jwt },
    });
    Cookies.set("token", data.jwt);
    dispatch({ type: "CLEAR_AUTH_ERROR" });
    return true;
  } catch (error) {
    const errorMessage = (error as Error).message;
    dispatch({ type: "LOGIN_FAILURE", payload: { error: errorMessage } });
    return false;
  }
};

export const signUp = async (
  dispatch: React.Dispatch<any>,
  newUser: { email: string; password: string; name: string; company: string },
): Promise<boolean> => {
  dispatch({ type: "SIGN_UP_REQUEST" });
  try {
    const data = await authSignUp(newUser);
    dispatch({
      type: "SIGN_UP_SUCCESS",
      payload: { email: data.email },
    });
    dispatch({ type: "CLEAR_AUTH_ERROR" });
    return true;
  } catch (error) {
    const errorMessage = (error as Error).message;
    dispatch({ type: "SIGN_UP_FAILURE", payload: { error: errorMessage } });
    return false;
  }
};

export const signOut = (dispatch: React.Dispatch<any>) => {
  dispatch({ type: "SIGN_OUT" });
  Cookies.remove("token");
};

export const setUser = async (dispatch: React.Dispatch<any>, token: string): Promise<boolean> => {
  try {
    const decodedToken = jwt.decode(token) as { user: User } | null;
    const profile = await getProfile(decodedToken?.user.id || "");
    dispatch({
      type: "SET_USER",
      payload: { user: profile },
    });
    dispatch({
      type: "SET_TOKEN",
      payload: { token },
    });
    return true;
  } catch {
    signOut(dispatch);
    return false;
  }
};
