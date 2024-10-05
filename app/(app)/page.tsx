import Image from "next/image";
import { maintenanceDesktop, maintenanceMobile } from "@/public/assets/images";
import { useTranslations } from "next-intl";

export const metadata = {
  title: "Polkadot Education",
};

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
            data-cy="image-home-maintenance"
          />
          <h4 className="mb-4" data-cy="text-home-maintenance">
            {t("title")}
          </h4>
          <p>{t("description")}</p>
        </div>
        <Image
          unoptimized
          src={maintenanceDesktop}
          alt="Maintenance"
          className="hidden xl:block w-[520px] h-[436px]"
          data-cy="image-home-maintenance-desktop"
        />
      </div>
    </div>
  );
};

export default Home;
