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

  const updateCourseProgress = (lessonId: string, isCompleted: boolean) => {
    if (!courseProgress) return;

    const updatedProgress = { ...courseProgress };

    if (updatedProgress.modulesProgress) {
      for (const moduleId in updatedProgress.modulesProgress) {
        if (updatedProgress.modulesProgress[moduleId][lessonId] !== undefined) {
          updatedProgress.modulesProgress[moduleId][lessonId] = isCompleted;
          break;
        }
      }
    }

    if (isCompleted) {
      updatedProgress.completedLessons += 1;
    }

    updatedProgress.progressPercentage = Math.round(
      (updatedProgress.completedLessons / updatedProgress.totalLessons) * 100,
    );

    setCourseProgress(updatedProgress);
  };

  const updateCourseSummary = (lessonId: string, isCompleted: boolean, points?: number) => {
    if (!course) return;

    const updatedCourse = { ...course };

    for (const module of updatedCourse.modules) {
      const lesson = module.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        if (isCompleted && lesson.expEarned === 0) {
          lesson.expEarned = points || 0;
        } else if (!isCompleted) {
          lesson.expEarned = 0;
        }
        break;
      }
    }

    for (const module of updatedCourse.modules) {
      module.isCompleted = module.lessons.every((lesson) => lesson.expEarned > 0);
    }

    setCourse(updatedCourse);
  };

  useEffect(() => {
    fetchCourseProgress();
  }, [courseId]);

  return {
    courseProgress,
    course,
    loading,
    updateCourseProgress,
    updateCourseSummary,
  };
};
