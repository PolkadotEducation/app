"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { verifyProfile } from "@/api/profileService";
import { Button } from "@/components/ui/button";

function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("verify");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");

  const backToLoginScreen = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/login");
  };

  useEffect(() => {
    setError(t("invalid"));
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    setUserEmail(email || "");
    if (email && token) {
      (async () => {
        try {
          const user = await verifyProfile(email, token);
          if (user) {
            // User is verified, there is no user.verify data anymore
            if (!user.verify) {
              setUserEmail(user.email);
              setError("");
            } else {
              // User has an old verify.token (>=24h)
              setError(t("expired"));
            }
          }
        } catch {
          setUserEmail("");
        }
      })();
    }
  }, [searchParams, router, t]);

  return (
    <main>
      <div className="flex flex-col items-center">
        <h4 className="mb-4 max-w-[330px] text-center">{t("title")}</h4>
        {userEmail && (
          <p className="mb-10 max-w-[330px] text-center">
            {t("verified")}
            <span className="text-primary">{userEmail}</span>
          </p>
        )}
        {error && <p className="mb-4 max-w-[330px] text-center">{error}</p>}
        <Button type="button" onClick={backToLoginScreen} variant="outline" className="w-full">
          {t("backToLogin")}
        </Button>
      </div>
    </main>
  );
}

export default function SuspenseVerifyPage() {
  return (
    <Suspense>
      <VerifyPage />
    </Suspense>
  );
}
