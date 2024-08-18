"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.isSignedIn) {
      router.push("/login");
    }
  }, [state.isSignedIn, router]);

  return (
    <div className="m-5">
      <h1>Polkadot Education Homescreen</h1>
    </div>
  );
};

export default Home;
