"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import google from "@/public/assets/icons/google.svg";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import Web3Wallet from "@/components/ui/web3Wallet";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const t = useTranslations("login");
  const { login, state } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 50) setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 50) setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAuthenticating(true);
    const success = await login({ email, password });
    setIsAuthenticating(false);
    if (success) {
      router.push("/");
    }
  };

  const handleForgotPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/forgot-password");
  };
  return (
    <main className="scale-100 xl:scale-90 2xl:scale-100 transform-origin-top-center h-short:scale-80">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h4 className="mb-4 text-center h-short:scale-90">{t("title")}</h4>
        <p className="mb-6 text-center">{t("welcomeMessage")}</p>
        <InputFloatingLabel
          type="email"
          id="emailInput"
          value={email}
          onChange={handleEmailChange}
          label={t("emailPlaceholder")}
          additionalStyles="mb-4"
        />
        <InputFloatingLabel
          type="password"
          id="passwordInput"
          value={password}
          onChange={handlePasswordChange}
          label={t("passwordPlaceholder")}
          additionalStyles="mb-4"
        />
        <Button type="button" onClick={handleForgotPassword} className="mb-4" variant="link">
          {t("forgotPassword")}
        </Button>
        <Button
          type="submit"
          className={`w-full ${state.error ? "mb-0" : "mb-4"}`}
          disabled={isAuthenticating}
          data-cy="button-login-submit"
        >
          {t(isAuthenticating ? "loading" : "signInButton")}
        </Button>
        {state.error && (
          <p className="text-xs text-error mt-3" data-cy="text-login-error">
            {state.error}
          </p>
        )}
        <Button
          type="button"
          onClick={() => router.push("/sign-up")}
          variant="link"
          className="mb-4"
          data-cy="button-login-signup"
        >
          {t("requestAccount")}
        </Button>
        <Web3Wallet />
        <Button
          type="button"
          onClick={() => router.push("/login/google")}
          disabled={isAuthenticating}
          className="w-full bg-transparent hover:bg-transparent
                hover:opacity-70 text-text-secondary hover:text-text-secondary border-border-gray border-[1px]"
          data-cy="button-login-google"
        >
          <Image src={google} width={20} height={20} className="mr-2" alt="Google Icon" data-cy="image-login-google" />
          {t(isAuthenticating ? "loading" : "google")}
        </Button>
        <p className="text-center text-body2 mt-4">
          {t.rich("loginAgreement", {
            policies: (children) => (
              <a className="text-primary" href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            terms: (children) => (
              <a className="text-primary" href="/terms-of-service" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          })}
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
