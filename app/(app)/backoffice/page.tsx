"use client";

import { Button } from "@/components/ui/button";
import { courses, lessons } from "@/public/assets/images";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BackofficeHomePage = () => {
  const router = useRouter();
  const t = useTranslations("backoffice");

  return (
    <main className="max-w-7xl w-full">
      <h4 className="xl:mb-10 mb-6">{t("contentCreatorDashboard")}</h4>
      <div className="flex flex-col gap-y-6">
        <div className="bg-card flex flex-col xl:flex-row rounded-[3px] xl:py-16 xl:px-10 py-8 px-5 items-center">
          <Image src={lessons} width={380} height={240} alt="Lessons" data-cy="image-backoffice-lessons" />
          <div className="flex flex-col xl:ml-8 xl:mt-0 mt-4">
            <h6 className="mb-4">{t("lessonLibrary")}</h6>
            <p className="mb-6">{t("getStarted")}</p>
            <Button className="xl:w-fit" onClick={() => router.push("/backoffice/lessons")}>
              {t("accessLessonLibrary")}
            </Button>
          </div>
        </div>
        <div className="bg-card flex flex-col xl:flex-row rounded-[3px] xl:py-16 xl:px-10 py-8 px-5 items-center">
          <Image src={courses} width={380} height={240} alt="Courses" data-cy="image-backoffice-courses" />
          <div className="flex flex-col xl:ml-8 xl:mt-0 mt-4">
            <h6 className="mb-4">{t("myCourses")}</h6>
            <p className="mb-6">{t("structureYourCourse")}</p>
            <Button className="xl:w-fit">{t("goToMyCourses")}</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BackofficeHomePage;
