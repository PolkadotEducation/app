import React, { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import xMark from "../../public/assets/icons/CloseFilled.svg";
import CourseChapterAccordion from "./courseChapterAccordion";
import CourseLesson, { CourseLessonProps } from "./courseLesson";

type ModuleData = {
  chapterName: string;
  completed: boolean;
  chapterLessons: CourseLessonProps[];
};

interface CourseDescriptionSectionProps {
  courseModules?: ModuleData[];
}
const CourseDescriptionSection = ({
  courseModules = [
    {
      chapterName: "Introduction to Blockchain",
      completed: true,
      chapterLessons: [
        { lessonName: "What is Blockchain?", completed: true, expAmount: 50 },
        { lessonName: "History of Blockchain", completed: true, expAmount: 50 },
        { lessonName: "How Blockchain Works", completed: true, expAmount: 50 },
      ],
    },
    {
      chapterName: "Smart Contracts Basics",
      completed: false,
      chapterLessons: [
        { lessonName: "What are Smart Contracts?", completed: false, expAmount: 75 },
        { lessonName: "Implementing Smart Contracts", completed: true, expAmount: 100 },
        { lessonName: "Smart Contracts in Action", completed: true, expAmount: 100 },
      ],
    },
    {
      chapterName: "Decentralized Finance (DeFi)",
      completed: true,
      chapterLessons: [
        { lessonName: "Introduction to DeFi", completed: true, expAmount: 100 },
        { lessonName: "Use Cases of DeFi", completed: true, expAmount: 100 },
        { lessonName: "Risks and Challenges in DeFi", completed: true, expAmount: 75 },
      ],
    },
    {
      chapterName: "Blockchain Security",
      completed: false,
      chapterLessons: [
        { lessonName: "Common Blockchain Security Issues", completed: false, expAmount: 50 },
        { lessonName: "Best Practices for Blockchain Security", completed: false, expAmount: 75 },
        { lessonName: "Case Studies in Blockchain Security", completed: true, expAmount: 100 },
      ],
    },
  ],
}: CourseDescriptionSectionProps) => {
  const [isMobile] = useState(true);
  return (
    <>
      {isMobile ? (
        <Drawer direction="left">
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent className="h-screen w-[300px] rounded-tr-[8px] rounded-br-[8px] rounded-tl-none">
            <DrawerClose className="w-[max-content] absolute right-4 top-4">
              <Image src={xMark} alt="close button" />
            </DrawerClose>
            <DrawerHeader className="flex items-center justify-center pt-14">
              <DrawerTitle>Resumo do curso</DrawerTitle>
            </DrawerHeader>
            <Accordion type="multiple">
              {courseModules.map((module, index) => {
                return (
                  <AccordionItem value={`item${index}`} className="px-6">
                    <AccordionTrigger className="text-sm flex flex-row-reverse justify-between w-full pr-8">
                      <CourseChapterAccordion chapterName={`Module ${index + 1}`} completed={module.completed} />
                    </AccordionTrigger>
                    <AccordionContent className="mx-12 pl-4 border-l-2 border-neutral-300 rounded-sm">
                      <p>{module.chapterName}</p>
                      <ul className="pt-4 flex flex-col gap-4">
                        {module.chapterLessons.map((lesson) => {
                          return (
                            <CourseLesson
                              lessonName={lesson.lessonName}
                              expAmount={lesson.expAmount}
                              completed={lesson.completed}
                            />
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </DrawerContent>
        </Drawer>
      ) : (
        <div className="h-screen w-[300px] rounded-tr-[8px] rounded-br-[8px] rounded-tl-none flex flex-col items-start">
          <div className="flex items-center justify-center pt-14">
            <h6>Resumo do curso</h6>
          </div>
          <Accordion type="multiple" className="w-full">
            {courseModules.map((module, index) => {
              return (
                <AccordionItem value={`item${index}`}>
                  <AccordionTrigger className="text-sm flex flex-row-reverse justify-between w-full pr-8">
                    <CourseChapterAccordion chapterName={`Module ${index + 1}`} completed={module.completed} />
                  </AccordionTrigger>
                  <AccordionContent className="mx-12 pl-4 border-l-2 border-neutral-300 rounded-sm">
                    <p>{module.chapterName}</p>
                    <ul className="pt-4 flex flex-col gap-4">
                      {module.chapterLessons.map((lesson) => {
                        return (
                          <CourseLesson
                            lessonName={lesson.lessonName}
                            expAmount={lesson.expAmount}
                            completed={lesson.completed}
                          />
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      )}
    </>
  );
};

export default CourseDescriptionSection;
