import Image from "next/image";
import { maintenanceDesktop, maintenanceMobile } from "@/public/assets/images";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("home");
  return (
    <div className="flex xl:pt-10 px-2 pt-16 flex-col w-full">
      <div className="flex w-full items-center justify-evenly">
        <div className="flex flex-col w-full max-w-[475px]">
          <Image
            unoptimized
            src={maintenanceMobile}
            alt="Maintenance"
            className="block xl:hidden w-[244px] h-[244px] self-center mb-4"
          />
          <h5 className="text-2xl text-[#1A1A1A] xl:font-bold xl:text-[34px] unbound-font mb-4">{t("title")}</h5>
          <p>{t("description")}</p>
        </div>
        <Image unoptimized src={maintenanceDesktop} alt="Maintenance" className="hidden xl:block w-[520px] h-[436px]" />
      </div>
    </div>
  );
};

export default Home;
