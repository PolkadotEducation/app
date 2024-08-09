"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/public/assets/images";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email) {
      router.push("/forgot-password/email-sent");
    }
  };

  return (
    <main className="flex flex-col xl:flex-row xl:justify-evenly w-full">
      <div
        className="flex flex-1 xl:flex-initial flex-col px-2
        justify-center xl:justify-start mt-[-40px] xl:mt-20
        items-center xl:items-start"
      >
        <Logo width={395} height={47} pathToRedirect="/login" />
        <div className="flex flex-col justify-center xl:mt-40 mt-10">
          <form onSubmit={handleSubmit} className="mt-5 xl:mt-0">
            <div
              className="flex flex-col w-full px-4 xl:py-10 xl:px-12
              xl:border border-solid border-[#E0E0E0] rounded-3xl
              items-center"
            >
              <h4 className="text-[34px] font-bold mb-4 unbound-font max-w-[330px] text-center">
                Forgot password
              </h4>
              <p className="mb-8 max-w-[330px] text-center">
                Don’t worry, an email with instructions to reset your password
                will be send to your email.
              </p>
              <InputFloatingLabel
                type="email"
                id="emailInput"
                value={email}
                onChange={handleEmailChange}
                label="Email"
                additionalStyles="mb-10"
              />
              <Button type="submit" className="w-full">
                Send link to email
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Image
        unoptimized
        src={forgotPassword}
        alt="Forgot Password"
        className="hidden xl:block w-[244px] h-[244px] xl:w-[500px] xl:h-[500px] self-center"
      />
    </main>
  );
};

export default ForgotPasswordPage;
