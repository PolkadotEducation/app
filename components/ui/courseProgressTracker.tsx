"use client";

import { CourseProgress } from "@/types/progressTypes";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import TrophyIcon from "./trophyIcon";
import classNames from "classnames";
import { useTranslations } from "next-intl";

const CourseProgressTracker = (props: CourseProgress) => {
  const { totalLessons, completedLessons, progressPercentage } = props;
  const [progress, setProgress] = useState(0);
  const t = useTranslations("components");

  useEffect(() => {
    const timer = setTimeout(() => setProgress(progressPercentage), 500);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  return (
    <div className="w-full flex flex-col">
      <p className="mb-[-18px]">{t("score", { completedLessons, totalLessons })}</p>
      <div className="flex items-center">
        <Progress value={progress} className="h-2" />
        <div
          className={classNames(
            "flex items-center justify-center border-8 rounded-full ml-[-8px] h-16 w-16 xl:h-20 xl:w-20 overflow-hidden bg-card",
            {
              "border-primary": progress === 100,
              "border-border-gray": progress < 100,
            },
          )}
        >
          <TrophyIcon color={progress === 100 ? "#FBC02D" : progress >= 50 ? "#E6007A" : "#E0E0E0"} />
        </div>
      </div>
    </div>
  );
};

export default CourseProgressTracker;
