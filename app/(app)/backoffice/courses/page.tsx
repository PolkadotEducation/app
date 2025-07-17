"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { DataTable } from "./_components/dataTable";
import { COLUMNS } from "./_components/columns";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { CourseType } from "@/types/courseTypes";
import { deleteCourseById, getCoursesSummary } from "@/api/courseService";
import { DeleteEntityModal } from "@/components/ui/deleteEntityModal";

const CoursesPage = () => {
  const t = useTranslations("backoffice");
  const [courses, setCourses] = useState<CourseType[]>([]);
  const { toast } = useToast();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [triggeredRowId, setTriggeredRowId] = useState<string | undefined>();
  const { user } = useUser();

  // @TODO: Get teamId from selector
  const selectedTeamId = user?.teams?.length ? user?.teams[0].id : "";

  const getCourses = async () => {
    const response = await getCoursesSummary(selectedTeamId);
    setCourses(response);
  };

  const deleteCourse = async (id: string) => {
    const response = await deleteCourseById(selectedTeamId, id);
    if (response) {
      await getCourses();
      toast({
        title: t("entityDeletedSuccess"),
        variant: "default",
      });
      return;
    }
    toast({
      title: t("entityDeleteError"),
      variant: "destructive",
    });
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <main className="max-w-7xl w-full pb-10">
      <h4 className="xl:mb-10 mb-6">{t("myCourses")}</h4>
      <div className="p-6 bg-card rounded-[3px] flex flex-col">
        <DataTable
          columns={COLUMNS({
            deleteHandler: (id: string) => {
              setDeleteModalOpen(true);
              setTriggeredRowId(id);
            },
          })}
          data={courses}
          updateData={getCourses}
        />
      </div>
      <DeleteEntityModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        entityName={courses.find((course) => course._id === triggeredRowId)?.title || ""}
        onSubmit={async () => {
          if (triggeredRowId) {
            await deleteCourse(triggeredRowId);
            setDeleteModalOpen(false);
          }
        }}
        variant="course"
      />
    </main>
  );
};

export default CoursesPage;
