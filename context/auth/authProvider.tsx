"use client";

import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { authReducer } from "./authReducer";
import { AuthState } from "@/types/authTypes";
import { login, loginWithGoogle, loginWithWallet, signUp, signOut } from "./authActions";
import { GoogleOAuthPayload } from "@/api/actions/google";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type AuthContextType = {
  state: AuthState;
  login: (_credentials: { email: string; password: string }) => Promise<boolean>;
  loginWithGoogle: (_credentials: GoogleOAuthPayload) => Promise<boolean>;
  loginWithWallet: (_credentials: { address: string; name?: string; signature: Uint8Array }) => Promise<boolean>;
  signUp: (_newUser: {
    email: string;
    password: string;
    name: string;
    company: string;
    language: string;
  }) => Promise<boolean>;
  signOut: () => void;
  clearAuthError: () => void;
};

export const initialAuthState: AuthState = {
  isLoading: false,
  userToken: null,
  error: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token },
      });
    } else {
      handleSignOut();
    }
  }, []);

  const handlelogin = async (credentials: { email: string; password: string }) => {
    return await login(dispatch, credentials);
  };

  const handleloginWithGoogle = async (credentials: GoogleOAuthPayload) => {
    return await loginWithGoogle(dispatch, credentials);
  };

  const handleloginWithWallet = async (credentials: { address: string; signature: Uint8Array }) => {
    return await loginWithWallet(dispatch, credentials);
  };

  const handleSignUp = async (newUser: {
    email: string;
    password: string;
    name: string;
    company: string;
    language: string;
  }) => {
    return await signUp(dispatch, newUser);
  };

  const handleSignOut = () => {
    signOut(dispatch);
    router.push("/login");
  };

  const handleClearAuthError = () => {
    dispatch({ type: "CLEAR_AUTH_ERROR" });
  };

  const value: AuthContextType = {
    state,
    login: handlelogin,
    loginWithGoogle: handleloginWithGoogle,
    loginWithWallet: handleloginWithWallet,
    signUp: handleSignUp,
    signOut: handleSignOut,
    clearAuthError: handleClearAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
