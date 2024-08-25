"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { webinar } from "@/public/assets/images";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, state } = useAuth();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 50) setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 50) setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await login({ email, password });
    if (success) {
      router.push("/");
    }
  };

  const handleForgotPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/forgot-password");
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
              <h4 className="text-[34px] font-bold mb-4 unbound-font">Login</h4>
              <p className="mb-8 max-w-[330px] text-center">
                Welcome to Polkadot Education, enter your account details to log in
              </p>
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
                additionalStyles="mb-4 xl:mb-6"
              />
              <Button
                disabled={state.isLoading}
                type="button"
                onClick={handleForgotPassword}
                className="mb-4"
                variant="link"
              >
                Forgot Password?
              </Button>
              <Button
                disabled={state.isLoading}
                type="submit"
                className={`w-full ${state.error ? "mb-3" : "mb-4 xl:mb-20"}`}
              >
                Sign In
              </Button>
              {state.error && <p className="text-xs text-[#BF2600] mb-3 xl:mb-16">{state.error}</p>}
              <Button disabled={state.isLoading} type="button" onClick={() => router.push("/sign-up")} variant="link">
                Don’t have an account? Request now
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

export default LoginPage;
