"use client";

import { Button } from "@/components/ui/button";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

const SignUpEmailSentInnerPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const t = useTranslations("emailConfirmation");
  const router = useRouter();

  const backToLoginScreen = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/login");
  };

  return (
    <main>
      <div className="flex flex-col items-center">
        <h4 className="mb-4 max-w-[330px] text-center">{t("title")}</h4>
        <p className="mb-20 text-center">
          {t("instructionMessageFirstPart")}
          <span className="text-primary">{email}</span>
          {t("instructionMessageSecondPart")}
        </p>
        <Button type="button" onClick={backToLoginScreen} variant="outline" className="w-full">
          {t("backToLogin")}
        </Button>
      </div>
    </main>
  );
};

// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
const SignUpEmailSentPage = () => {
  return (
    <Suspense>
      <SignUpEmailSentInnerPage />
    </Suspense>
  );
};

export default SignUpEmailSentPage;
