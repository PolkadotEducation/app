"use client";

import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { recoverProfile } from "@/api/profileService";
import { PASSWORD_REQUIREMENTS } from "../sign-up/constants";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("resetPassword");

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const checkIfPasswordsMatches = (p: string, rp: string) => p === rp;

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (errorMessage) {
      if (checkIfPasswordsMatches(passwordRepeated, event.target.value)) {
        setErrorMessage("");
      }
    }
  };

  const handleRepeatedPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordRepeated(event.target.value);
    if (errorMessage) {
      if (checkIfPasswordsMatches(password, event.target.value)) {
        setErrorMessage("");
      }
    }
  };

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || !passwordRepeated) {
      return;
    }

    if (!checkIfPasswordsMatches(password, passwordRepeated)) {
      setErrorMessage("Password doesn’t match.");
    } else if (!passwordRegex.test(password)) {
      setErrorMessage("Invalid Password");
    } else {
      if (email && token && password) {
        try {
          const ok = await recoverProfile(email, token, password);
          if (ok) router.push("/reset-password/success");
        } catch (error) {
          console.error(JSON.stringify(error));
          router.push("/login");
        }
      }
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h4 className="mb-4">{t("title")}</h4>
        <p className="mb-8">{t("instructionMessage")}</p>
        <InputFloatingLabel
          type="password"
          id="passwordInput"
          value={password}
          onChange={handlePasswordChange}
          label={t("passwordPlaceholder")}
          additionalStyles="mb-2"
        />
        <div className="mb-4 flex justify-start w-full pl-5">
          <ul className="text-xs list-disc">
            {PASSWORD_REQUIREMENTS.map((i: string) => (
              <li key={i}>{t(i)}</li>
            ))}
          </ul>
        </div>
        <InputFloatingLabel
          type="password"
          id="passwordRepeatedInput"
          value={passwordRepeated}
          onChange={handleRepeatedPasswordChange}
          label={t("repeatPasswordPlaceholder")}
          error={errorMessage}
          additionalStyles={`${errorMessage ? "mb-1" : "mb-4 xl:mb-6"}`}
        />
        <Button type="submit" className="w-full">
          {t("resetButton")}
        </Button>
      </form>
    </main>
  );
};

export default function SuspenseVerifyPage() {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  );
}
