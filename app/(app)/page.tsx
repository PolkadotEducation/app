"use client";

import { getCoursesByLanguage } from "@/api/courseService";
import Course from "@/components/ui/course";
import { CourseType } from "@/types/courseTypes";
import { useEffect, useState } from "react";

const Home = () => {
  const [courses, setCourses] = useState<CourseType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCoursesByLanguage("english");
        setCourses(response);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // @TODO:
  // i18n
  // improve types
  // get language from user profile

  return (
    <div className="flex xl:pt-10 px-2 pt-16 flex-col w-full">
      <h5 className="mb-5" data-cy="text-home-courses">
        Courses
      </h5>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !courses && <div>courses not found</div>}
      {courses &&
        courses.map((course: CourseType) => (
          <Course banner="https://placehold.co/272x150.png" title={course.title} link={`course/${course._id}`}></Course>
        ))}
    </div>
  );
};

export default Home;
