"use client";

import Loading from "@/components/ui/loading";
import { useUser } from "@/hooks/useUser";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { userLoading, user } = useUser();

  if (userLoading || !user) {
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
}
