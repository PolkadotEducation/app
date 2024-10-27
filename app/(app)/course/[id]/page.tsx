"use client";

import Image from "next/image";
import { getCourse } from "@/api/courseService";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModuleAccordion } from "@/components/ui/moduleAccordion";
import { CourseType } from "@/types/courseTypes";
import { ModuleType } from "@/types/moduleTypes";
import { useTranslations } from "next-intl";
import Loading from "@/components/ui/loading";
import CourseCard from "@/components/ui/courseCard";

const CoursePage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("course");

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const response = await getCourse(id);
        setCourse(response);
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setError("Failed to fetch course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  return (
    <div className="flex xl:pt-5 px-2 pt-8 flex-col w-full">
      {loading && (
        <div className="flex w-full justify-center">
          <Loading />
        </div>
      )}
      {error && <div>{error}</div>}
      {!loading && !course && <div>course not found</div>}
      {course && (
        <div>
          <div className="mb-5">
            <CourseCard banner="blackPink" title={course.title} key={course._id} variant="full" />
          </div>
          <div className="mb-5">
            <h6 className="text-primary mb-4">{t("summary")}</h6>
            <p>{course.summary}</p>
          </div>
          <div className="mb-20">
            <h6 className="text-primary mb-4">{t("content")}</h6>
            {course.modules?.map((module: ModuleType, index: number) => (
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
