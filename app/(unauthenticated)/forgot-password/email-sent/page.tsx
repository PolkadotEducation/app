"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import success from "@/public/assets/icons/success.svg";
import { useTranslations } from "next-intl";

const EmailSentPage = () => {
  const router = useRouter();
  const t = useTranslations("emailSent");

  const pushToLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/login");
  };

  return (
    <main>
      <div className="flex flex-col items-center">
        <Image src={success} width={67} height={67} alt="Success check mark" className="mb-[30px]" />
        <h4 className="mb-4 max-w-[330px] text-center">{t("title")}</h4>
        <p className="mb-8 text-center">{t("instructionMessage")}</p>
        <Button type="button" onClick={pushToLogin} variant="link" className="w-full">
          {t("returnToLogin")}
        </Button>
      </div>
    </main>
  );
};

export default EmailSentPage;
