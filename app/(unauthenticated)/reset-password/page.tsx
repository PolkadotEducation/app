"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/public/assets/images";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";
import { useTranslations } from "next-intl";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const t = useTranslations("resetPassword");

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || !passwordRepeated) {
      return;
    }

    if (!checkIfPasswordsMatches(password, passwordRepeated)) {
      setErrorMessage("Password doesn’t match.");
    } else {
      router.push("/reset-password/success");
    }
  };

  return (
    <main className="flex flex-col xl:flex-row xl:justify-evenly w-full">
      <div
        className="flex flex-1 xl:flex-initial flex-col px-2 justify-center
        xl:justify-start mt-[-40px] xl:mt-20 items-center xl:items-start"
      >
        <Logo width={208} height={60} pathToRedirect="/login" />
        <div className="flex flex-col justify-center xl:mt-40 mt-10">
          <form onSubmit={handleSubmit}>
            <div
              className="flex flex-col w-full px-4 xl:py-10 xl:px-12
              xl:border border-solid border-border-gray rounded-3xl items-center xl:bg-card"
            >
              <h4 className="mb-4">{t("title")}</h4>
              <p className="mb-8">{t("instructionMessage")}</p>
              <InputFloatingLabel
                type="password"
                id="passwordInput"
                value={password}
                onChange={handlePasswordChange}
                label={t("passwordPlaceholder")}
                additionalStyles="mb-4 xl:mb-6"
              />
              <InputFloatingLabel
                type="password"
                id="passwordRepeatedInput"
                value={passwordRepeated}
                onChange={handleRepeatedPasswordChange}
                label={t("repeatPasswordPlaceholder")}
                error={errorMessage}
                additionalStyles={`${errorMessage ? "mb-1" : "mb-4 xl:mb-6"}`}
              />
              <div className={`${!errorMessage ? "hidden" : "flex mb-4 xl:mb-6 w-full justify-start"}`}>
                <p className="text-xs text-error">{errorMessage}</p>
              </div>
              <Button type="submit" className="w-full">
                {t("resetButton")}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Image
        src={resetPassword}
        alt="Reset Password"
        className="hidden xl:block w-[244px] h-[244px] xl:w-[500px] xl:h-[500px] self-center"
      />
    </main>
  );
};

export default ResetPasswordPage;
