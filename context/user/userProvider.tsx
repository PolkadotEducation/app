// UserContext.js
"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getProfile } from "@/api/profileService";
import { UserInfo } from "@/types/userTypes";
import { useAuth } from "@/hooks/useAuth";
import jwt from "jsonwebtoken";

type UserContextType = {
  user: UserInfo | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: UserInfo) => void;
  loadUserProfile: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const { state } = useAuth();

  const loadUserProfile = async () => {
    if (state.userToken) {
      try {
        const decodedToken = jwt.decode(state.userToken) as { user: UserInfo } | null;
        const profile = await getProfile(decodedToken?.user.id || "");
        setUser(profile);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    }
  };

  useEffect(() => {
    if (state.userToken) {
      loadUserProfile();
    }
  }, [state.userToken]);

  const value: UserContextType = {
    user,
    setUser,
    loadUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
