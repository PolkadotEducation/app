import { useTranslations } from "next-intl";
import Logo from "./logo";
import Link from "next/link";
import { Github } from "lucide-react";

const Footer = () => {
  const t = useTranslations("components");

  return (
    <div className="min-h-40 md:min-h-60 px-5 w-full py-8 md:pt-16 bg-dark-purple flex justify-center">
      <div className="max-w-7xl w-full border-b-2 border-white flex xl:flex-row flex-col justify-between gap-y-2 pb-2 px-2">
        <div>
          <Logo width={282} height={81} theme="dark" />
        </div>
        <div className="flex flex-col text-white body1 gap-y-2">
          <Link href="/privacy-policy" target="_blank">
            {t("privacyPolicy")}
          </Link>
          <Link href="/terms-of-service" target="_blank">
            {t("termsOfService")}
          </Link>
        </div>
        <div>
          <Link href="https://github.com/PolkadotEducation/app" target="_blank">
            <Github height={32} width={32} stroke="white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
