"use client";

import { useEffect, useState } from "react";
import { LessonType } from "@/types/lessonTypes";
import LessonRenderer from "@/components/ui/renderer";
import { getLessonById } from "@/api/lessonService";
import Loading from "@/components/ui/loading";

interface Params {
  courseId: string;
  id: string;
}

const LessonPage = ({ params }: { params: Params }) => {
  const { courseId, id } = params;

  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId || !id) return;

    const fetchLesson = async () => {
      try {
        const response = await getLessonById(id as string);
        setLesson(response);
      } catch (err) {
        console.error("Failed to fetch lesson:", err);
        setError("Failed to fetch lesson");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading)
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div>
      <LessonRenderer
        lessonId={lesson._id}
        courseId={courseId}
        title={lesson.title}
        difficulty={lesson.difficulty}
        question={lesson.challenge.question}
        choices={lesson.challenge.choices}
        markdown={lesson.body}
      />
    </div>
  );
};

export default LessonPage;
