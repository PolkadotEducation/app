"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCourse } from "@/hooks/useCourse";
import { useUser } from "@/hooks/useUser";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import CourseProgressTracker from "@/components/ui/courseProgressTracker";
import CourseDescriptionSection from "@/components/ui/courseDescriptionSection";
import Loading from "@/components/ui/loading";
import { CourseProgressProvider } from "@/context/course/courseProgressContext";

interface LessonLayoutProps {
  children: React.ReactNode;
}

const LessonLayout = ({ children }: LessonLayoutProps) => {
  const { courseId } = useParams();
  const { selectedCourse, fetchCourseById } = useCourse();
  const { userLoading, user } = useUser();
  const { courseProgress, course, loading: progressLoading, refreshProgress } = useCourseProgress();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId || userLoading || !user) return;

    const initializeCourse = async () => {
      setLoading(true);
      try {
        await fetchCourseById(courseId as string);
      } catch (error) {
        console.error("Failed to initialize course:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeCourse();
  }, [courseId, userLoading, user]);

  if (loading || userLoading || progressLoading) {
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  }

  if (!selectedCourse) {
    return <div>Course not found</div>;
  }

  return (
    <div className="w-full pt-4 flex md:gap-11 flex-col md:flex-row">
      <CourseDescriptionSection classname="sticky top-0" courseSummary={course} />
      <div className="pt-4">
        {courseProgress && <CourseProgressTracker {...courseProgress} />}
        <CourseProgressProvider refreshProgress={refreshProgress}>{children}</CourseProgressProvider>
      </div>
    </div>
  );
};

export default LessonLayout;
