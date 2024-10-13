"use client";

import "../globals.css";
import AppHeader from "@/components/ui/appHeader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import Breadcrumb from "@/components/ui/breadcrumb";
import Footer from "@/components/ui/footer";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { setUserByToken, state } = useAuth();

  useEffect(() => {
    if (!state.userToken || Object.keys(state.userInfo || {}).length < 1) {
      const token = Cookies.get("token");
      if (token) {
        (async () => {
          const success = await setUserByToken(token);
          if (!success) router.push("/login");
        })();
      }
    }
  }, [state.userToken]);

  return (
    <main>
      <div className="flex flex-col items-center bg-background">
        <AppHeader />
        <div className="w-full max-w-7xl flex justify-between px-6 py-4 items-center">
          <Breadcrumb />
        </div>
        <div className="flex justify-center max-w-7xl w-full min-h-screen">{children}</div>
        <Footer />
      </div>
    </main>
  );
}
