"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import LessonRenderer from "@/components/ui/renderer";
import Loading from "@/components/ui/loading";
import { useCourse } from "@/hooks/useCourse";
import { useUser } from "@/hooks/useUser";

const LessonPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { selectedLesson, loading, error, fetchLessonById, nextLesson, previousLesson } = useCourse();

  const { userLoading, user } = useUser();

  useEffect(() => {
    if (!id) return;

    if (!userLoading && user) fetchLessonById(id);
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
        title={selectedLesson.title}
        difficulty={selectedLesson.difficulty}
        question={selectedLesson.challenge.question}
        choices={selectedLesson.challenge.choices}
        markdown={selectedLesson.body}
        nextLesson={nextLesson}
        previousLesson={previousLesson}
      />
    </div>
  );
};

export default LessonPage;
