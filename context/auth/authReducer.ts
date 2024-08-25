import { AuthState, AuthAction } from "@/types/authTypes";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "SIGN_UP_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSignedIn: true,
        userToken: action.payload.token,
        error: null,
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        isLoading: false,
        email: action.payload.email,
        error: null,
      };
    case "LOGIN_FAILURE":
    case "SIGN_UP_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        userToken: null,
      };
    case "CLEAR_AUTH_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
