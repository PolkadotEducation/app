"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { webinar } from "@/public/assets/images";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";
import { PASSWORD_REQUIREMENTS } from "./constants";

const SignUpPage = () => {
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

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

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (errorMessage) {
      if (checkIfPasswordsMatches(passwordRepeated, event.target.value)) {
        setErrorMessage("");
      }
    }
  };

  const handleRepeatedPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
              <h4 className="text-[34px] font-bold mb-4 unbound-font max-w-[330px] text-center">
                Pronto para começar?
              </h4>
              <p className="mb-8 max-w-[330px] text-center">
                Crie sua conta em segundos e faça parte da comunidade Polkadot
                Education.
              </p>
              <InputFloatingLabel
                id="nameInput"
                value={name}
                onChange={handleNameChange}
                label="Name"
                additionalStyles="mb-5"
              />
              <InputFloatingLabel
                type="email"
                id="emailInput"
                value={email}
                onChange={handleEmailChange}
                label="Email"
                additionalStyles="mb-5"
              />
              <InputFloatingLabel
                type="password"
                id="passwordInput"
                value={password}
                onChange={handlePasswordChange}
                label="Password"
                additionalStyles="mb-[4px]"
              />
              <div className="mb-4 flex justify-start w-full pl-5">
                <ul className="text-xs list-disc">
                  {PASSWORD_REQUIREMENTS.map((i: string) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
              <InputFloatingLabel
                type="password"
                id="passwordRepeatedInput"
                value={passwordRepeated}
                onChange={handleRepeatedPasswordChange}
                label="Repeat password"
                error={errorMessage}
                additionalStyles={`${errorMessage ? "mb-1" : "mb-4 xl:mb-6"}`}
              />
              <div
                className={`${!errorMessage ? "hidden" : "flex mb-4 xl:mb-6 w-full justify-start"}`}
              >
                <p className="text-xs text-[#BF2600]">{errorMessage}</p>
              </div>
              <Button type="submit" className="w-full">
                Começar a aprender
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

export default SignUpPage;
