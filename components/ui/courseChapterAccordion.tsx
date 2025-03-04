import Image from "next/image";
import React from "react";
import checkWhite from "../../public/assets/icons/check-white.svg";

export interface CourseChapterAccordionProps {
  chapterName: string;
  completed?: boolean;
  moduleTitle?: string;
}

const CourseChapterAccordion = ({ chapterName, completed, moduleTitle }: CourseChapterAccordionProps) => {
  return (
    <div className="flex flex-row-reverse gap-2 items-center">
      <div className="flex flex-col items-start">
        <span>{chapterName}</span>
        <p className="font-normal font-montserrat text-left text-p text-neutral-500">{moduleTitle}</p>
      </div>
      <div
        className={`h-6 w-6 flex items-center justify-center ${completed ? "rounded-full border border-green-500 bg-green-500" : "border-2 border-primary rounded-full"}`}
      >
        {completed && <Image alt="check white" src={checkWhite} />}
      </div>
    </div>
  );
};

export default CourseChapterAccordion;
