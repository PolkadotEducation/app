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
import Link from "next/link";

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
    <main>
      <form onSubmit={handleSubmit} className="flex flex-col items-center fluid-gap">
        <h4 className="text-center">
          {t.rich("title", {
            br: () => <br />,
          })}
        </h4>
        <p className="text-center">{t("welcomeMessage")}</p>
        <InputFloatingLabel
          type="email"
          id="emailInput"
          value={email}
          onChange={handleEmailChange}
          label={t("emailPlaceholder")}
        />
        <InputFloatingLabel
          type="password"
          id="passwordInput"
          value={password}
          onChange={handlePasswordChange}
          label={t("passwordPlaceholder")}
        />
        <Button type="button" onClick={handleForgotPassword} className="font-semibold" variant="link" shadow={false}>
          {t("forgotPassword")}
        </Button>
        <Button type="submit" className="w-full" disabled={isAuthenticating} data-cy="button-login-submit">
          {t(isAuthenticating ? "loading" : "signInButton")}
        </Button>
        {state.error && (
          <p className="text-xs text-error mt-2" data-cy="text-login-error">
            {state.error}
          </p>
        )}
        <div className="flex w-full px-3 justify-between items-center">
          <p>{t("noAccount")}</p>
          <Link href={"/sign-up"} className="font-bold" data-cy="button-login-signup">
            {t("createAccount")}
          </Link>
        </div>
        <hr />
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
        <p className="text-center caption mt-2">
          {t.rich("loginAgreement", {
            br: () => <br />,
            policies: (children) => (
              <a className="text-primary caption" href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            terms: (children) => (
              <a className="text-primary caption" href="/terms-of-service" target="_blank" rel="noopener noreferrer">
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
