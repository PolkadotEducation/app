import React, { createContext, useReducer, ReactNode } from "react";
import { authReducer } from "./authReducer";
import { AuthState } from "@/types/authTypes";
import { signIn, signUp, signOut } from "./authActions";

type AuthContextType = {
  state: AuthState;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (newUser: {
    email: string;
    password: string;
    name: string;
  }) => Promise<boolean>;
  signOut: () => void;
};

const initialAuthState: AuthState = {
  isLoading: false,
  isSignedIn: false,
  userToken: null,
  error: null,
  email: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const handleSignIn = async (credentials: {
    email: string;
    password: string;
  }) => {
    await signIn(dispatch, credentials);
  };

  const handleSignUp = async (newUser: {
    email: string;
    password: string;
    name: string;
  }) => {
    return await signUp(dispatch, newUser);
  };

  const handleSignOut = () => {
    signOut(dispatch);
  };

  const value: AuthContextType = {
    state,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
