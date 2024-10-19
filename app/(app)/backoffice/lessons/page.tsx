"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const LessonsPage = () => {
  const router = useRouter();
  const t = useTranslations("backoffice");

  return (
    <main className="max-w-7xl w-full">
      <h4 className="xl:mb-10 mb-6">{t("lessonLibrary")}</h4>
      <div className="p-6 bg-card rounded-[3px] flex flex-col">
        <div className="flex xl:flex-row flex-col justify-between">
          <Input placeholder={t("searchLesson")} className="max-w-[500px]" />
          <div className="flex gap-x-4 mt-4 xl:mt-0">
            <Button variant="outline">{t("duplicateItem")}</Button>
            <Button onClick={() => router.push("/backoffice/lessons/new")}>{t("newLesson")}</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LessonsPage;
