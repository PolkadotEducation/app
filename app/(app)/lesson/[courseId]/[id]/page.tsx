"use client";

import { useEffect } from "react";
import LessonRenderer from "@/components/ui/renderer";
import Loading from "@/components/ui/loading";
import { useCourse } from "@/hooks/useCourse";
import { useUser } from "@/hooks/useUser";

interface Params {
  courseId: string;
  id: string;
}

const LessonPage = ({ params }: { params: Params }) => {
  const { courseId, id } = params;

  const { selectedLesson, selectedLessonProgress, loading, error, fetchLessonById, nextLesson, previousLesson } =
    useCourse();

  const { userLoading, user } = useUser();

  useEffect(() => {
    if (!courseId || !id) return;
    if (!userLoading && user) {
      fetchLessonById(id, courseId);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (loading)
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!selectedLesson) return <div>Lesson not found</div>;

  return (
    <div>
      <LessonRenderer
        lessonId={selectedLesson._id}
        courseId={courseId}
        title={selectedLesson.title}
        difficulty={selectedLesson.difficulty}
        question={selectedLesson.challenge.question}
        choices={selectedLesson.challenge.choices}
        markdown={selectedLesson.body}
        nextLesson={nextLesson}
        previousLesson={previousLesson}
        progress={selectedLessonProgress}
      />
    </div>
  );
};

export default LessonPage;
