import React from "react";
import Image from "next/image";
import greenCheck from "../../public/assets/icons/greenCheck.svg";

export interface CourseLessonProps {
  lessonName: string;
  completed?: boolean;
  expAmount: number;
}

const CourseLesson = ({ lessonName, completed, expAmount }: CourseLessonProps) => {
  return (
    <li className="flex items-center justify-center gap-2">
      <div className={`flex flex-col items-center justify-center gap-1 ${completed ? "visible" : "invisible"}`}>
        <span>
          <Image src={greenCheck} alt="green check" />
        </span>
        <span className="font-bold text-xs text-neutral-700 whitespace-nowrap">+{expAmount} XP</span>
      </div>
      <span className={`${!completed && "font-bold"}`}>{lessonName}</span>
    </li>
  );
};

export default CourseLesson;
