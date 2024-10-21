/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleOAuthPayload } from "@/api/actions/google";
import { authLogin, authLoginWithGoogle, authLoginWithWallet, authSignUp } from "@/api/authService";
import Cookies from "js-cookie";

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

export const loginWithWallet = async (
  dispatch: React.Dispatch<any>,
  credentials: { address: string; name?: string; signature: Uint8Array },
) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const data = await authLoginWithWallet(credentials);
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
  newUser: { email: string; password: string; name: string; company: string; language: string },
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
