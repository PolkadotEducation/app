"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getProfile } from "@/api/profileService";
import { UserInfo } from "@/types/userTypes";
import { useAuth } from "@/hooks/useAuth";
import { LOCALE_FEATURES } from "@/components/constants";
import { setUserLocale } from "@/api/actions/userLocale";

type UserContextType = {
  user: UserInfo | null;
  setUser: (_user: UserInfo) => void;
  loadUserProfile: () => Promise<void>;
  userLoading: boolean;
  setUserLoading: (_loading: boolean) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const { state, signOut } = useAuth();
  const [userLoading, setUserLoading] = useState(false);

  const loadUserProfile = async () => {
    if (state.userToken) {
      try {
        setUserLoading(true);
        const profile = await getProfile();
        setUser(profile);
        const userLocale = LOCALE_FEATURES[profile.language];
        await setUserLocale(userLocale.locale);
        setUserLoading(false);
      } catch (error) {
        setUserLoading(false);
        signOut();
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
    userLoading,
    setUserLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
