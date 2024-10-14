"use client";

import "../globals.css";
import AppHeader from "@/components/ui/appHeader";
import Breadcrumb from "@/components/ui/breadcrumb";
import { UserProvider } from "@/context/user/userProvider";
import Footer from "@/components/ui/footer";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}
