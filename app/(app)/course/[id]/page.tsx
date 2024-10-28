"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ModuleAccordion } from "@/components/ui/moduleAccordion";
import { ModuleType } from "@/types/moduleTypes";
import { useTranslations } from "next-intl";
import { useCourse } from "@/hooks/useCourse";
import { useUser } from "@/hooks/useUser";
import CourseCard from "@/components/ui/courseCard";
import Loading from "@/components/ui/loading";

const CoursePage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { selectedCourse, loading, error, fetchCourseById } = useCourse();
  const t = useTranslations("course");

  const { userLoading, user } = useUser();

  useEffect(() => {
    if (!id) return;

    if (!userLoading && user) fetchCourseById(id);
  }, [userLoading]);

  return (
    <div className="flex xl:pt-5 px-2 pt-8 flex-col w-full">
      {loading && (
        <div className="flex w-full justify-center">
          <Loading />
        </div>
      )}
      {error && <div>{error}</div>}
      {!loading && !selectedCourse && <div>course not found</div>}
      {selectedCourse && (
        <div>
          <div className="mb-5">
            <CourseCard
              banner="blackPink" // @TODO: allow the content creator to choose the banner style when creating the course
              title={selectedCourse.title}
            />
          </div>
          <div className="mb-5">
            <h6 className="text-primary mb-4">{t("summary")}</h6>
            <p>{selectedCourse.summary}</p>
          </div>
          <div className="mb-20">
            <h6 className="text-primary mb-4">{t("content")}</h6>
            {selectedCourse.modules?.map((module: ModuleType, index: number) => (
              <div>
                <ModuleAccordion key={index} index={index} title={module.title} lessons={module.lessons} />
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
