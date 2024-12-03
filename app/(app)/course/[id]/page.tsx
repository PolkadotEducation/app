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
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  if (loading)
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="flex xl:pt-5 px-2 flex-col w-full">
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
          <div className="flex justify-end mb-5">
            {selectedCourse.modules &&
              selectedCourse.modules.length > 0 &&
              selectedCourse.modules[0]?.lessons.length > 0 && (
                <Link href={`/lesson/${selectedCourse._id}/${selectedCourse.modules[0]?.lessons[0]?._id}`}>
                  <Button data-cy="button-start-course">{t("startCourse")}</Button>
                </Link>
              )}
          </div>
          <div className="mb-5">
            <h6 className="text-primary mb-4">{t("summary")}</h6>
            <p>{selectedCourse.summary}</p>
          </div>
          <div className="mb-20">
            <h6 className="text-primary mb-4">{t("content")}</h6>
            {selectedCourse.modules?.map((module: ModuleType, index: number) => (
              <div key={index}>
                <ModuleAccordion
                  key={index}
                  index={index}
                  title={module.title}
                  lessons={module.lessons}
                  course={selectedCourse}
                />
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
