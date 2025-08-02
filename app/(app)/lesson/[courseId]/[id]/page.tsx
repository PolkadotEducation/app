"use client";

import { useEffect, useState } from "react";
import LessonRenderer from "@/components/ui/renderer";
import Loading from "@/components/ui/loading";
import { useCourse } from "@/hooks/useCourse";
import { useUser } from "@/hooks/useUser";
import { CourseProgress, CourseSummary } from "@/types/progressTypes";
import { getCourseProgress, getCourseSummary } from "@/api/progressService";
import CourseProgressTracker from "@/components/ui/courseProgressTracker";
import CourseDescriptionSection from "@/components/ui/courseDescriptionSection";

interface Params {
  courseId: string;
  id: string;
}

const LessonPage = ({ params }: { params: Params }) => {
  const { courseId, id } = params;

  const { selectedLesson, selectedLessonProgress, loading, error, fetchLessonById, nextLesson, previousLesson } =
    useCourse();

  const { userLoading, user } = useUser();
  const [courseProgress, setCourseProgress] = useState<CourseProgress>();
  const [course, setCourse] = useState<CourseSummary>();
  const fetchCourseProgress = async () => {
    const progress = await getCourseProgress({ courseId });
    setCourseProgress(progress);
    const response = await getCourseSummary({ courseId });
    setCourse(response);
  };

  useEffect(() => {
    if (!courseId || !id) return;
    if (!userLoading && user) {
      fetchLessonById(id, courseId);
      fetchCourseProgress();
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
    <div className="pt-4 flex md:gap-11 flex-col md:flex-row">
      <CourseDescriptionSection classname="sticky top-0" courseSummary={course} />
      <div className="pt-4">
        {courseProgress && <CourseProgressTracker {...courseProgress} />}
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
          onAnswerSubmitted={() => fetchCourseProgress()}
        />
      </div>
    </div>
  );
};

export default LessonPage;
