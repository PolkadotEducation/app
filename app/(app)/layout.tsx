"use client";

import "../globals.css";
import AppHeader from "@/components/ui/appHeader";
import Breadcrumb from "@/components/ui/breadcrumb";
import { UserProvider } from "@/context/user/userProvider";
import Footer from "@/components/ui/footer";
import { CourseProvider } from "@/context/course/courseProvider";
import UserLayout from "@/components/ui/userLayout";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <CourseProvider>
        <div className="flex flex-col items-center bg-background">
          <AppHeader />
          <UserLayout>
            <div className="w-full max-w-7xl flex justify-between px-6 py-4 xl:px-0 items-center">
              <Breadcrumb />
            </div>
            <div className="flex justify-center max-w-7xl px-6 xl:px-0 w-full min-h-screen">{children}</div>
          </UserLayout>
          <Footer />
        </div>
      </CourseProvider>
    </UserProvider>
  );
}
