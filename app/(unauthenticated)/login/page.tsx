"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { webinar } from "@/public/assets/images";
import google from "@/public/assets/icons/google.svg";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/ui/logo";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { serverGoogleOAuthURL, serverGoogleOAuthPayload, GoogleOAuthPayload } from "@/api/actions/google";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const t = useTranslations("login");
  const { login, loginWithGoogle, state, clearAuthError } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const searchParams = useSearchParams();

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

  const handleGoogleLogin = async () => {
    try {
      setIsAuthenticating(true);
      const url = await serverGoogleOAuthURL();
      router.push(url);
    } catch (error) {
      setIsAuthenticating(false);
      console.error("Error during Google authentication", error);
    }
  };

  useEffect(() => {
    clearAuthError();
    const code = searchParams.get("code");
    if (code) {
      (async () => {
        const payload: GoogleOAuthPayload = await serverGoogleOAuthPayload(code);
        if (payload.email) {
          setIsAuthenticating(true);
          const success = await loginWithGoogle(payload);
          setIsAuthenticating(false);
          if (success) router.push("/");
        }
      })();
    }
  }, [searchParams, router]);

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
              xl:border border-solid border-border-gray rounded-3xl
              items-center"
            >
              <h4 className="mb-4">{t("title")}</h4>
              <p className="mb-8 max-w-[330px] text-center">{t("welcomeMessage")}</p>
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
                additionalStyles="mb-4 xl:mb-6"
              />
              <Button type="button" onClick={handleForgotPassword} className="mb-6" variant="link">
                {t("forgotPassword")}
              </Button>
              <Button type="submit" className="w-full mb-4 xl:mb-6" disabled={isAuthenticating}>
                {t(isAuthenticating ? "loading" : "signInButton")}
              </Button>
              {state.error && <p className="text-xs text-error mt-3">{state.error}</p>}
              <Button type="button" onClick={() => router.push("/sign-up")} variant="link" className="mb-4 xl:mb-6">
                {t("requestAccount")}
              </Button>
              <Button
                onClick={handleGoogleLogin}
                disabled={isAuthenticating}
                className="w-full bg-transparent hover:bg-transparent
                hover:opacity-70 text-text-secondary hover:text-text-secondary border-border-gray border-[1px]"
              >
                <Image unoptimized src={google} width={20} height={20} className="mr-2" alt="Google Icon" />
                {t(isAuthenticating ? "loading" : "google")}
              </Button>
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

export default function SuspenseLogin() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
