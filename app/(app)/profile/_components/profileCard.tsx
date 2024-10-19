"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const ProfileCard = () => {
  const { user } = useUser();
  const { picture, name, email } = user || {};
  const [progress, setProgress] = useState(0);
  const t = useTranslations("profile");
  const [level] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="bg-card flex flex-col max-w-7xl w-full xl:flex-row
      border-[1px] border-border-gray rounded-[8px] p-6 items-center xl:justify-between"
    >
      <div className="flex flex-col xl:flex-row items-center xl:mr-16">
        {picture ? (
          <Image
            src={picture}
            alt="Profile Picture"
            width={120}
            height={120}
            className="xl:w-[120px] xl:h-[120px] w-[80px] h-[80px] rounded-full"
          />
        ) : (
          <div
            className="xl:min-w-[120px] xl:min-h-[120px] w-[80px] h-[80px] mr-[14px]
            rounded-full bg-[#321D47] flex items-center justify-center"
          >
            <p className="unbound-font text-white font-bold text-3xl">{(name || "").charAt(0)}</p>
          </div>
        )}
        <div className="flex flex-col mt-4 xl:mt-0 xl:ml-6 w-full items-center xl:items-start truncate">
          <h5 className="mb-2 truncate">{name}</h5>
          <p className="text-text-secondary body1 mb-4 truncate">{email}</p>
          <Button variant="outline" onClick={() => router.push("/profile/edit")}>
            {t("editProfile")}
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-[34px] w-full xl:w-6/12 xl:mt-0">
        <h5 className="mb-[11px]">{t("level", { level })}</h5>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default ProfileCard;
