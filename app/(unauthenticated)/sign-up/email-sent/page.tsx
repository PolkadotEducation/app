"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { emailSent } from "@/public/assets/images";
import Logo from "@/components/ui/logo";

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
    <main className="flex flex-col xl:flex-row xl:justify-evenly w-full">
      <div
        className="flex flex-1 xl:flex-initial flex-col px-2
        justify-center xl:justify-start mt-[-40px] xl:mt-20
        items-center xl:items-start"
      >
        <Logo width={208} height={60} pathToRedirect="/login" />
        <div className="flex flex-col justify-center xl:mt-40 mt-10">
          <div
            className="flex flex-col w-fit-content px-4 xl:py-10
            xl:px-12 xl:border border-solid border-border-gray
            rounded-3xl items-center text-center xl:bg-card"
          >
            <h4 className="mb-4 max-w-[330px] text-center">{t("title")}</h4>
            <p className="mb-20 max-w-[330px] text-center">
              {t("instructionMessageFirstPart")}
              <span className="text-primary">{email}</span>
              {t("instructionMessageSecondPart")}
            </p>
            <Button type="button" onClick={backToLoginScreen} variant="outline" className="w-full">
              {t("backToLogin")}
            </Button>
          </div>
        </div>
      </div>
      <Image
        src={emailSent}
        alt="Email Sent"
        className="hidden xl:block w-[244px] h-[244px] xl:w-[500px] xl:h-[500px] self-center"
      />
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
