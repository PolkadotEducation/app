"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { XpAndLevel } from "@/types/progressTypes";

const ProfileCard = ({ level, xp, xpToNextLevel }: XpAndLevel) => {
  const { user } = useUser();
  const { picture, name, email } = user || {};
  const [progress, setProgress] = useState(0);
  const t = useTranslations("profile");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setProgress((xp / (xp + xpToNextLevel)) * 100), 500);
    return () => clearTimeout(timer);
  }, [xp, xpToNextLevel]);

  return (
    <div
      className="bg-card flex flex-col max-w-7xl w-full xl:flex-row
      border-[1px] border-border-gray rounded-[8px] p-6 items-center xl:justify-between"
    >
      <div className="flex flex-col xl:flex-row items-center xl:mr-16">
        {picture ? (
          <div
            className="xl:min-w-[120px] xl:min-h-[120px] w-[80px] h-[80px]
            rounded-full flex items-center justify-center"
          >
            <Image
              src={picture}
              alt="Profile Picture"
              width={120}
              height={120}
              className="w-[80px] h-[80px] rounded-full xl:w-[120px] xl:h-[120px]"
            />
          </div>
        ) : (
          <div
            className="xl:min-w-[120px] xl:min-h-[120px] w-[80px] h-[80px] mr-[14px]
            rounded-full bg-[#321D47] flex items-center justify-center"
          >
            <p className="unbound-font text-white font-bold text-3xl">{(name || "").charAt(0)}</p>
          </div>
        )}
        <div className="flex flex-col mt-4 xl:mt-0 xl:ml-6 w-full items-center xl:items-start py-1 truncate">
          <h5 className="mb-2 truncate">{name}</h5>
          <p className="text-text-secondary body1 mb-4 truncate">{email}</p>
          <Button variant="outline" onClick={() => router.push("/profile/edit")}>
            {t("editProfile")}
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-[34px] w-full xl:w-6/12 xl:mt-0">
        <h5 className="text-primary mb-[11px]">{t("level", { level })}</h5>
        <Progress value={progress} />
        <span className="inline-flex self-end items-end mt-3">
          <p className="text-body2 mr-1">{t("xpToNextLevel", { xpToNextLevel })}</p>
          <h5 className="text-primary">{t("level", { level: level + 1 })}</h5>
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
