import React from "react";
import Image from "next/image";
import greenCheck from "../../public/assets/icons/greenCheck.svg";
import Link from "next/link";

export interface CourseLessonProps {
  courseId: string;
  lessonId: string;
  lessonName: string;
  completed?: boolean;
  expAmount: number;
}

const CourseLesson = ({ courseId, lessonId, lessonName, completed, expAmount }: CourseLessonProps) => {
  return (
    <li className="flex items-center justify-start gap-2">
      <div className={`flex flex-col items-center justify-center gap-1 ${completed ? "flex" : "hidden"}`}>
        <span>
          <Image src={greenCheck} alt="green check" />
        </span>
        <span className="font-bold text-xs text-neutral-700 whitespace-nowrap">+{expAmount} XP</span>
      </div>
      <Link href={`/lesson/${courseId}/${lessonId}`}>
        <span className={`${!completed && "font-bold"}`}>{lessonName}</span>
      </Link>
    </li>
  );
};

export default CourseLesson;
