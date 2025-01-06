import Image from "next/image";
import React from "react";
import checkWhite from "../../public/assets/icons/check-white.svg";

export interface CourseChapterAccordionProps {
  chapterName: string;
  completed?: boolean;
}

const CourseChapterAccordion = ({ chapterName, completed }: CourseChapterAccordionProps) => {
  return (
    <div className="flex flex-row-reverse gap-2 items-center">
      <span>{chapterName}</span>
      <div
        className={`h-6 w-6 flex items-center justify-center ${completed ? "rounded-full border border-green-500 bg-green-500" : "border-2 border-primary rounded-full"}`}
      >
        {completed && <Image alt="check white" src={checkWhite} />}
      </div>
    </div>
  );
};

export default CourseChapterAccordion;
