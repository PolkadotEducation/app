"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { verifyProfile } from "@/api/profileService";
import Logo from "@/components/ui/logo";
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
    <main className="flex flex-col xl:flex-row xl:justify-evenly w-full">
      <div
        className="flex flex-1 xl:flex-initial flex-col px-2
        justify-center xl:justify-start mt-[-40px] xl:mt-20
        items-center xl:items-start"
      >
        <Logo width={395} height={47} pathToRedirect="/login" />
        <div className="flex flex-col justify-center xl:mt-40 mt-10">
          <div
            className="flex flex-col w-fit-content px-4 xl:py-10
            xl:px-12 xl:border border-solid border-border-gray
            rounded-3xl items-center text-center xl:bg-card"
          >
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
        </div>
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
