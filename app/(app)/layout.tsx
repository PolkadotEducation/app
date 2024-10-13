"use client";

import "../globals.css";
import AppHeader from "@/components/ui/appHeader";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex flex-col items-center bg-background">
        <AppHeader />
        <div className="w-full max-w-7xl flex justify-between px-6 py-4 items-center">
          <Breadcrumb />
        </div>
        <div className="flex justify-center max-w-7xl w-full">{children}</div>
      </div>
    </main>
  );
}
