"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { recoverProfile } from "@/api/profileService";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const t = useTranslations("forgotPassword");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email) {
      try {
        await recoverProfile(email);
      } catch (error) {
        console.error(JSON.stringify(error));
      }
      router.push("/forgot-password/email-sent");
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h4 className="mb-4 max-w-[330px] text-center fluid-h1">{t("title")}</h4>
        <p className="mb-8 text-center paragraph">{t("instructionMessage")}</p>
        <InputFloatingLabel
          type="email"
          id="emailInput"
          value={email}
          onChange={handleEmailChange}
          label={t("emailPlaceholder")}
          additionalStyles="mb-10"
        />
        <Button type="submit" className="w-full">
          {t("sendLinkButton")}
        </Button>
      </form>
    </main>
  );
};

export default ForgotPasswordPage;
