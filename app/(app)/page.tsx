"use client";

import { getCoursesByLanguage } from "@/api/courseService";
import Course from "@/components/ui/course";
import Loading from "@/components/ui/loading";
import { useUser } from "@/hooks/useUser";
import { CourseType } from "@/types/courseTypes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Home = () => {
  const [courses, setCourses] = useState<CourseType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const t = useTranslations("home");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCoursesByLanguage(user?.language || "english");
        setCourses(response);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  return (
    <div className="flex xl:pt-10 px-2 pt-5 flex-col w-full">
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
      {courses &&
        courses.map((course: CourseType) => (
          <Course
            banner="https://placehold.co/378x204.png"
            title={course.title}
            link={`course/${course._id}`}
            key={course._id}
          />
        ))}
    </div>
  );
};

export default Home;
