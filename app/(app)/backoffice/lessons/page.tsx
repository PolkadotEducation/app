"use client";

import { deleteLessonById, getLessonsSummary } from "@/api/lessonService";
import { LessonSummary } from "@/types/lessonTypes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { DataTable } from "./_components/dataTable";
import { COLUMNS } from "./_components/columns";
import { useToast } from "@/hooks/useToast";

const LessonsPage = () => {
  const t = useTranslations("backoffice");
  const [lessons, setLessons] = useState<LessonSummary[]>([]);
  const { toast } = useToast();

  const getLessons = async () => {
    const response = await getLessonsSummary();
    setLessons(response);
  };

  const deleteLesson = async (id: string) => {
    const response = await deleteLessonById(id);
    if (response) {
      await getLessons();
      toast({
        title: t("lessonDeletedSuccess"),
        variant: "default",
      });
      return;
    }
    toast({
      title: t("lessonDeleteError"),
      variant: "destructive",
    });
  };

  useEffect(() => {
    getLessons();
  }, []);

  return (
    <main className="max-w-7xl w-full pb-10">
      <h4 className="xl:mb-10 mb-6">{t("lessonLibrary")}</h4>
      <div className="p-6 bg-card rounded-[3px] flex flex-col">
        <DataTable columns={COLUMNS({ deleteHandler: deleteLesson })} data={lessons} />
      </div>
    </main>
  );
};

export default LessonsPage;
