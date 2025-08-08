"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import LessonRenderer from "@/components/ui/renderer";
import { useCourse } from "@/hooks/useCourse";
import { useUser } from "@/hooks/useUser";
import { useCourseProgressContext } from "@/context/course/courseProgressContext";
import { SubmitAnswerResponse } from "@/types/progressTypes";

const LessonPage = () => {
  const { courseId, id } = useParams();
  const {
    selectedLesson,
    selectedLessonProgress,
    selectedCourse,
    loading,
    error,
    fetchLessonById,
    updateLesson,
    updateLessonProgress,
    nextLesson,
    previousLesson,
  } = useCourse();
  const { userLoading, user } = useUser();
  const { updateCourseProgress, updateCourseSummary } = useCourseProgressContext();

  useEffect(() => {
    if (!courseId || !id) return;
    if (!userLoading && user) {
      if (selectedCourse && selectedCourse._id === courseId) {
        updateLesson(id as string, courseId as string);
      } else {
        fetchLessonById(id as string, courseId as string);
      }
    }
  }, [id, courseId, userLoading, user, selectedCourse?._id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleAnswerSubmitted = async (result: SubmitAnswerResponse) => {
    try {
      updateLessonProgress(result.progress);
      updateCourseProgress(id as string, result.progress.isCorrect);
      updateCourseSummary(id as string, result.progress.isCorrect, result.points);
    } catch (error) {
      console.error("Failed to update progress :", error);
    }
  };

  if (error) return <div>{error}</div>;
  if (!selectedLesson && !loading) return <div>Lesson not found</div>;

  return (
    <LessonRenderer
      lessonId={selectedLesson?._id}
      courseId={courseId as string}
      markdown={selectedLesson?.body || ""}
      challenge={selectedLesson?.challenge}
      nextLesson={nextLesson}
      previousLesson={previousLesson}
      progress={selectedLessonProgress}
      onAnswerSubmitted={handleAnswerSubmitted}
      loading={loading}
    />
  );
};

export default LessonPage;
