"use client";

import React, { createContext, useReducer, ReactNode } from "react";
import { authReducer } from "./authReducer";
import { AuthState } from "@/types/authTypes";
import { login, signUp, signOut, setUser } from "./authActions";
import { useRouter } from "next/navigation";

type AuthContextType = {
  state: AuthState;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  signUp: (newUser: { email: string; password: string; name: string; company: string }) => Promise<boolean>;
  signOut: () => void;
  setUserByToken: (token: string) => void;
};

export const initialAuthState: AuthState = {
  isLoading: false,
  userToken: null,
  error: null,
  email: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const router = useRouter();

  const handlelogin = async (credentials: { email: string; password: string }) => {
    return await login(dispatch, credentials);
  };

  const handleSignUp = async (newUser: { email: string; password: string; name: string; company: string }) => {
    return await signUp(dispatch, newUser);
  };

  const handleSignOut = () => {
    signOut(dispatch);
    router.push("/login");
  };

  const handleSetUserByToken = (token: string) => {
    return setUser(dispatch, token);
  };

  const value: AuthContextType = {
    state,
    login: handlelogin,
    signUp: handleSignUp,
    signOut: handleSignOut,
    setUserByToken: handleSetUserByToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
