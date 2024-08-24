"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { webinar } from "@/public/assets/images";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";
import { PASSWORD_REQUIREMENTS } from "./constants";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";

const SignUpPage = () => {
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { signUp, state } = useAuth();
  const t = useTranslations("signUp");

  const reset = () => {
    setPassword("");
    setPasswordRepeated("");
    setEmail("");
    setName("");
  };

  useEffect(() => {
    reset();
  }, []);

  const checkIfPasswordsMatches = (p: string, rp: string) => p === rp;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (errorMessage) {
      if (checkIfPasswordsMatches(passwordRepeated, event.target.value)) {
        setErrorMessage("");
      } else {
        setErrorMessage(passwordRegex.test(event.target.value) ? "" : "Invalid Password");
      }
    }
  };

  const handleRepeatedPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordRepeated(event.target.value);
    if (errorMessage) {
      if (checkIfPasswordsMatches(password, event.target.value)) {
        setErrorMessage("");
      } else {
        setErrorMessage(passwordRegex.test(event.target.value) ? "" : "Invalid Password");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || !passwordRepeated) {
      return;
    }

    if (!checkIfPasswordsMatches(password, passwordRepeated)) {
      setErrorMessage("Password doesn’t match.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage("Invalid Password");
      return;
    }

    const success = await signUp({ email, password, name });

    if (success) {
      const queryParams = new URLSearchParams({ email }).toString();
      router.push(`/sign-up/email-sent?${queryParams}`);
    }
  };

  return (
    <main className="flex flex-col xl:flex-row xl:justify-evenly w-full">
      <div
        className="flex flex-1 xl:flex-initial flex-col px-2
        justify-center xl:justify-start xl:mt-20 items-center
        xl:items-start"
      >
        <Logo width={395} height={47} pathToRedirect="/login" />
        <div className="flex flex-col justify-center mt-20">
          <form onSubmit={handleSubmit}>
            <div
              className="flex flex-col w-full xl:py-10 xl:px-12
              xl:border border-solid border-[#E0E0E0] rounded-3xl
              items-center"
            >
              <h4 className="text-[34px] font-bold mb-4 unbound-font max-w-[330px] text-center">{t("title")}</h4>
              <p className="mb-8 max-w-[330px] text-center">{t("subtitle")}</p>
              <InputFloatingLabel
                id="nameInput"
                value={name}
                onChange={handleNameChange}
                label={t("namePlaceholder")}
                additionalStyles="mb-5"
              />
              <InputFloatingLabel
                type="email"
                id="emailInput"
                value={email}
                onChange={handleEmailChange}
                label={t("emailPlaceholder")}
                additionalStyles="mb-5"
              />
              <InputFloatingLabel
                type="password"
                id="passwordInput"
                value={password}
                onChange={handlePasswordChange}
                label={t("passwordPlaceholder")}
                additionalStyles="mb-[4px]"
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
              <div className={`${!errorMessage ? "hidden" : "flex mb-4 xl:mb-6 w-full justify-start"}`}>
                <p className="text-xs text-[#BF2600]">{errorMessage}</p>
              </div>
              <Button type="submit" className="w-full" disabled={state.isLoading}>
                {t("signUpButton")}
              </Button>
              {state.error && <p className="text-xs text-[#BF2600] mt-3">{state.error}</p>}
            </div>
          </form>
        </div>
      </div>
      <Image
        unoptimized
        src={webinar}
        alt="Webinar"
        className="hidden xl:block w-[244px] h-[244px] xl:w-[500px] xl:h-[500px] self-center"
      />
    </main>
  );
};

export default SignUpPage;
