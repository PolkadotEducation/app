"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { useRouter } from "next/navigation";
import { PASSWORD_REQUIREMENTS } from "./constants";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/useToast";

const SignUpPage = () => {
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { signUp, state, clearAuthError } = useAuth();
  const t = useTranslations("signUp");
  const { toast } = useToast();

  const reset = () => {
    setPassword("");
    setPasswordRepeated("");
    setEmail("");
    setName("");
    clearAuthError();
  };

  useEffect(() => {
    reset();
  }, []);

  const checkIfPasswordsMatches = (p: string, rp: string) => p === rp;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 50) setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 50) setEmail(event.target.value);
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 50) setCompany(event.target.value);
  };

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 50) setPassword(event.target.value);
    if (errorMessage) {
      if (checkIfPasswordsMatches(passwordRepeated, event.target.value)) {
        setErrorMessage("");
      } else {
        setErrorMessage(passwordRegex.test(event.target.value) ? "" : "Invalid Password");
      }
    }
  };

  const handleRepeatedPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 50) setPasswordRepeated(event.target.value);
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

    const browserLanguage = navigator.language || navigator.languages?.[0] || "en";

    const languageMap: Record<string, string> = {
      en: "english",
      pt: "portuguese",
      es: "spanish",
    };

    const defaultLanguage = languageMap[browserLanguage.split("-")[0]] || "english";

    const success = await signUp({ email, password, name, company, language: defaultLanguage });

    if (success) {
      const queryParams = new URLSearchParams({ email }).toString();
      router.push(`/sign-up/email-sent?${queryParams}`);
      toast({
        title: t("signUpSuccess"),
        description: t("signUpSuccessDescription"),
        variant: "default",
      });
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex flex-col items-center fluid-gap">
        <h4 className="text-center fluid-h1">{t("title")}</h4>
        <p className="text-center paragraph">{t("subtitle")}</p>
        <InputFloatingLabel id="nameInput" value={name} onChange={handleNameChange} label={t("namePlaceholder")} />
        <InputFloatingLabel
          type="email"
          id="emailInput"
          value={email}
          onChange={handleEmailChange}
          label={t("emailPlaceholder")}
        />
        <InputFloatingLabel
          id="companyInput"
          value={company}
          onChange={handleCompanyChange}
          label={t("companyPlaceholder")}
        />
        <InputFloatingLabel
          type="password"
          id="passwordInput"
          value={password}
          onChange={handlePasswordChange}
          label={t("passwordPlaceholder")}
        />
        <div className="flex justify-start w-full pl-5">
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
          additionalStyles={`${errorMessage && "mb-1"}`}
        />
        <Button type="submit" className="w-full mt-3" disabled={state.isLoading} data-cy="button-signup-submit">
          {t("signUpButton")}
        </Button>
        {state.error && (
          <p className="text-xs text-error mt-3" data-cy="text-signup-error">
            {state.error}
          </p>
        )}
      </form>
    </main>
  );
};

export default SignUpPage;
