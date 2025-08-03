"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import LessonRenderer from "@/components/ui/renderer";
import Loading from "@/components/ui/loading";
import { useCourse } from "@/hooks/useCourse";
import { useUser } from "@/hooks/useUser";
import { useCourseProgressContext } from "@/context/course/courseProgressContext";

const LessonPage = () => {
  const { courseId, id } = useParams();
  const {
    selectedLesson,
    selectedLessonProgress,
    selectedCourse,
    loading,
    error,
    fetchLessonById,
    updateLessonOnly,
    nextLesson,
    previousLesson,
  } = useCourse();
  const { userLoading, user } = useUser();
  const { refreshProgress } = useCourseProgressContext();

  useEffect(() => {
    if (!courseId || !id) return;
    if (!userLoading && user) {
      if (selectedCourse && selectedCourse._id === courseId) {
        updateLessonOnly(id as string, courseId as string);
      } else {
        fetchLessonById(id as string, courseId as string);
      }
    }
  }, [id, courseId, userLoading, user, selectedCourse]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (loading || userLoading) {
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  }

  if (error) return <div>{error}</div>;
  if (!selectedLesson) return <div>Lesson not found</div>;

  return (
    <LessonRenderer
      lessonId={selectedLesson._id}
      courseId={courseId as string}
      title={selectedLesson.title}
      markdown={selectedLesson.body}
      challenge={selectedLesson.challenge}
      nextLesson={nextLesson}
      previousLesson={previousLesson}
      progress={selectedLessonProgress}
      onAnswerSubmitted={refreshProgress}
    />
  );
};

export default LessonPage;
