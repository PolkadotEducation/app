import React, { createContext, useReducer, ReactNode } from "react";
import { authReducer } from "./authReducer";
import { AuthState } from "@/types/authTypes";
import { login, signUp, signOut } from "./authActions";

type AuthContextType = {
  state: AuthState;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  signUp: (newUser: { email: string; password: string; name: string }) => Promise<boolean>;
  signOut: () => void;
};

const initialAuthState: AuthState = {
  isLoading: false,
  isSignedIn: false,
  userToken: null,
  error: null,
  email: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const handlelogin = async (credentials: { email: string; password: string }) => {
    return await login(dispatch, credentials);
  };

  const handleSignUp = async (newUser: { email: string; password: string; name: string }) => {
    return await signUp(dispatch, newUser);
  };

  const handleSignOut = () => {
    signOut(dispatch);
  };

  const value: AuthContextType = {
    state,
    login: handlelogin,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
