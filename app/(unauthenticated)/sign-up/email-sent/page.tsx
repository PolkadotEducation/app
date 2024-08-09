"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { emailSent } from "@/public/assets/images";
import Logo from "@/components/ui/logo";
import { useSearchParams } from "next/navigation";

const SignUpEmailSentPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const resendEmail = (event: React.MouseEvent) => {
    event.preventDefault();
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
          <div
            className="flex flex-col w-fit-content px-4 xl:py-10
            xl:px-12 xl:border border-solid border-[#E0E0E0]
            rounded-3xl items-center text-center"
          >
            <h4 className="text-[34px] font-bold mb-4 unbound-font max-w-[330px] text-center">
              Confirmação de e-mail
            </h4>
            <p className="mb-20 max-w-[330px] text-center">
              Enviamos um e-mail para
              <span className="text-[#E6007A]"> {email}</span> para validar o
              endereço de email. Siga o link enviado para completar o cadastro.
            </p>
            <Button
              type="button"
              onClick={resendEmail}
              variant="outline"
              className="w-full"
            >
              Reenviar confirmação
            </Button>
          </div>
        </div>
      </div>
      <Image
        unoptimized
        src={emailSent}
        alt="Email Sent"
        className="hidden xl:block w-[244px] h-[244px] xl:w-[500px] xl:h-[500px] self-center"
      />
    </main>
  );
};

export default SignUpEmailSentPage;
