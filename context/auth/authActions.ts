import { authSignUp } from "@/api/authService";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const signIn = async (dispatch: React.Dispatch<any>, credentials: { email: string; password: string }) => {
  dispatch({ type: "SIGN_IN_REQUEST" });
  console.log(credentials);
};

export const signUp = async (
  dispatch: React.Dispatch<any>,
  newUser: { email: string; password: string; name: string },
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
};
