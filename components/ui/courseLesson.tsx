import React from "react";
import Image from "next/image";
import greenCheck from "../../public/assets/icons/greenCheck.svg";
import { useRouter } from "next/navigation";

export interface CourseLessonProps {
  courseId: string;
  lessonId: string;
  lessonName: string;
  completed?: boolean;
  expAmount: number;
}

const CourseLesson = ({ courseId, lessonId, lessonName, completed, expAmount }: CourseLessonProps) => {
  const router = useRouter();

  const handleLessonClick = () => {
    router.push(`/lesson/${courseId}/${lessonId}`);
  };

  return (
    <li className="flex items-center justify-start gap-2">
      <div className={`flex flex-col items-center justify-center gap-1 ${completed ? "flex" : "hidden"}`}>
        <span>
          <Image src={greenCheck} alt="green check" />
        </span>
        <span className="font-bold text-xs text-neutral-700 whitespace-nowrap">+{expAmount} XP</span>
      </div>
      <button onClick={handleLessonClick} className="text-left hover:underline cursor-pointer">
        <span className={`${!completed && "font-bold"}`}>{lessonName}</span>
      </button>
    </li>
  );
};

export default CourseLesson;
