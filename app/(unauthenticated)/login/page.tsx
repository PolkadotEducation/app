"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { webinar } from "@/public/assets/images";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { useDispatch } from "react-redux";
import { login } from "@/store/auth/reducers";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ email, password, navigation: router }));
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
                Welcome to Polkadot Education, enter your account details to log
                in
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
                type="button"
                onClick={handleForgotPassword}
                className="mb-4"
                variant="link"
              >
                Forgot Password?
              </Button>
              <Button type="submit" className="w-full mb-4 xl:mb-20">
                Sign In
              </Button>
              <Button
                type="button"
                onClick={() => router.push("/sign-up")}
                variant="link"
              >
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
