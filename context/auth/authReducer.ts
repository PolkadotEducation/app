import { AuthState, AuthAction } from "@/types/authTypes";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SIGN_IN_REQUEST":
    case "SIGN_UP_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSignedIn: true,
        email: action.payload.email,
        error: null,
      };
    case "SIGN_IN_FAILURE":
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
