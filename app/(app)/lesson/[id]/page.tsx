"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LessonType } from "@/types/lessonTypes";
import LessonRenderer from "@/components/ui/renderer";
import { getLessonById } from "@/api/lessonService";
import Loading from "@/components/ui/loading";

const LessonPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

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
