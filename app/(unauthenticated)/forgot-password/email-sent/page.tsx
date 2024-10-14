"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/public/assets/images";
import { useRouter } from "next/navigation";
import success from "@/public/assets/icons/success.svg";
import Logo from "@/components/ui/logo";
import { useTranslations } from "next-intl";

const EmailSentPage = () => {
  const router = useRouter();
  const t = useTranslations("emailSent");

  const pushToLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/login");
  };

  return (
    <main className="flex flex-col xl:flex-row xl:justify-evenly w-full">
      <div
        className="flex flex-1 xl:flex-initial flex-col
        px-2 justify-center xl:justify-start mt-[-40px]
        xl:mt-20 items-center xl:items-start"
      >
        <Logo width={208} height={60} pathToRedirect="/login" />
        <div className="flex flex-col justify-center xl:mt-40 mt-10">
          <div
            className="flex flex-col w-fit-content px-4
            xl:py-10 xl:px-12 xl:border border-solid
            border-border-gray rounded-3xl items-center xl:bg-card"
          >
            <Image src={success} width={67} height={67} alt="Success check mark" className="mb-[30px]" />
            <h4 className="mb-4 max-w-[330px] text-center">{t("title")}</h4>
            <p className="mb-8 max-w-[330px] text-center">{t("instructionMessage")}</p>
            <Button type="button" onClick={pushToLogin} variant="link" className="w-full">
              {t("returnToLogin")}
            </Button>
          </div>
        </div>
      </div>
      <Image
        src={forgotPassword}
        alt="Forgot Password"
        className="hidden xl:block w-[244px] h-[244px] xl:w-[500px] xl:h-[500px] self-center"
      />
    </main>
  );
};

export default EmailSentPage;
