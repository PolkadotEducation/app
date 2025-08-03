import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CourseProgress, CourseSummary } from "@/types/progressTypes";
import { getCourseProgress, getCourseSummary } from "@/api/progressService";

export const useCourseProgress = () => {
  const { courseId } = useParams();
  const [courseProgress, setCourseProgress] = useState<CourseProgress>();
  const [course, setCourse] = useState<CourseSummary>();
  const [loading, setLoading] = useState(false);

  const fetchCourseProgress = async () => {
    if (!courseId) return;
    try {
      setLoading(true);
      const progress = await getCourseProgress({ courseId: courseId as string });
      setCourseProgress(progress);
      const response = await getCourseSummary({ courseId: courseId as string });
      setCourse(response);
    } catch (error) {
      console.error("Failed to fetch course progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshProgress = () => {
    fetchCourseProgress();
  };

  useEffect(() => {
    fetchCourseProgress();
  }, [courseId]);

  return {
    courseProgress,
    course,
    loading,
    refreshProgress,
  };
};
