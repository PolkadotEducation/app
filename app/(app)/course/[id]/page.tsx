"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ModuleAccordion } from "@/components/ui/moduleAccordion";
import { ModuleType } from "@/types/moduleTypes";
import { useTranslations } from "next-intl";
import Loading from "@/components/ui/loading";
import { useCourse } from "@/hooks/useCourse";
import { useUser } from "@/hooks/useUser";

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
          <div>
            <h2 className="mb-5" data-cy="text-home-courses">
              {selectedCourse.title}
            </h2>
            <Image
              src={"https://placehold.co/1280x440.png"}
              alt={""}
              width="1280"
              height="440"
              className="border rounded-xl mb-10"
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
