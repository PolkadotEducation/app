import { AuthState, AuthAction } from "@/types/authTypes";
import { initialAuthState } from "./authProvider";

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
        userToken: action.payload.token,
        error: null,
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        isLoading: false,
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
      return initialAuthState;
    case "CLEAR_AUTH_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_TOKEN":
      return {
        ...state,
        userToken: action.payload.token,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload.loading,
      };
    default:
      return state;
  }
};
