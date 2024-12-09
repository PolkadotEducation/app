"use client";

import CourseCardPreview from "@/components/ui/courseCardPreview";
import Loading from "@/components/ui/loading";
import { useCourse } from "@/hooks/useCourse";
import { useUser } from "@/hooks/useUser";
import { CourseType } from "@/types/courseTypes";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import CourseDescriptionSection from "@/components/ui/courseDescriptionSection";

const Home = () => {
  const { courses, loading, error, fetchCourses } = useCourse();
  const t = useTranslations("home");
  const { userLoading, user } = useUser();

  useEffect(() => {
    if (!userLoading && user) fetchCourses();
  }, [userLoading]);

  return (
    <div className="flex xl:pt-10 px-2 pt-5 flex-col w-full mb-20">
      <CourseDescriptionSection />
      <h4 className="mb-5" data-cy="text-home-courses">
        {t("courses")}
      </h4>
      <p className="text-body1 mb-10 xl:mb-16">{t("description")}</p>
      {loading && (
        <div className="flex w-full justify-center">
          <Loading />
        </div>
      )}
      {error && <div>{error}</div>}
      {!loading && !courses && <div>Courses not found</div>}
      {!loading && (
        <div className="flex flex-row flex-wrap w-full">
          {courses &&
            courses.map((course: CourseType) => (
              <div className="pb-4 pr-4 w-full md:w-1/2 lg:w-1/3" key={course._id} data-cy="link-course-home">
                <CourseCardPreview
                  banner="blackPink" // @TODO: allow the content creator to choose the banner style when creating the course
                  title={course.title}
                  link={`course/${course._id}`}
                  key={course._id}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
