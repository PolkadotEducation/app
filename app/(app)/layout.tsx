"use client";

import "../globals.css";
import AppHeader from "@/components/ui/appHeader";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUserByToken, state } = useAuth();

  useEffect(() => {
    if (!state.userToken || Object.keys(state.userInfo || {}).length < 1) {
      const token = Cookies.get("token");
      if (token) {
        setUserByToken(token);
      }
    }
  }, [state.userToken]);

  return (
    <main>
      <div className="flex flex-col items-center bg-white">
        <AppHeader />
        <div className="flex justify-center max-w-[1440px] w-full">{children}</div>
      </div>
    </main>
  );
}
