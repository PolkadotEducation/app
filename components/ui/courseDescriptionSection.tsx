import React, { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import xMark from "../../public/assets/icons/CloseFilled.svg";
import CourseChapterAccordion from "./courseChapterAccordion";
import CourseLesson from "./courseLesson";
import { CourseType } from "@/types/courseTypes";
import { CourseProgress } from "@/types/progressTypes";

interface CourseDescriptionSectionProps {
  courseModules?: CourseType;
  classname?: string;
  courseProgress?: CourseProgress;
}
const CourseDescriptionSection = ({ courseModules, classname, courseProgress }: CourseDescriptionSectionProps) => {
  const [isMobile] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleAccordionChange = (value: string | null) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

  // console.log(courseProgress?.modulesProgress["678fe9755920e561f197f692"]);
  console.log(courseModules);
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
            <Accordion type="single" onValueChange={handleAccordionChange}>
              {courseModules?.modules?.map((module, index) => {
                return (
                  <AccordionItem value={`item${index}`} className="px-6" key={module._id}>
                    <AccordionTrigger className="text-sm flex flex-row-reverse justify-between w-full pr-8">
                      <CourseChapterAccordion
                        chapterName={`Module ${index + 1}`}
                        completed={module.completed}
                        moduleTitle={module?.title}
                      />
                    </AccordionTrigger>
                    <AccordionContent className="mx-12 pl-4 border-l-2 border-neutral-300 rounded-sm">
                      <ul className="pt-4 flex flex-col gap-4">
                        {module.lessons.map((lesson, index) => {
                          return (
                            <CourseLesson
                              key={lesson._id}
                              lessonName={lesson.title}
                              expAmount={lesson.expAmount}
                              completed={courseProgress?.modulesProgress[index]}
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
        <div
          className={`h-screen w-[400px] rounded-tr-[8px] rounded-br-[8px] rounded-tl-none flex flex-col items-start ${classname}`}
        >
          <div className="flex items-center justify-center pt-14">
            <h6>Resumo do curso</h6>
          </div>
          <Accordion type="single" className="w-full">
            {courseModules?.modules?.map((module, index) => {
              return (
                <AccordionItem value={`item${index}`}>
                  <AccordionTrigger className="text-sm flex flex-row-reverse justify-between w-full pr-8">
                    <CourseChapterAccordion
                      chapterName={`Module ${index + 1}`}
                      completed={module.completed}
                      moduleTitle={module?.title}
                    />
                  </AccordionTrigger>
                  <AccordionContent className="mx-12 pl-4 border-l-2 border-neutral-300 rounded-sm">
                    <ul className="pt-4 flex flex-col gap-4">
                      {module.lessons.map((lesson) => {
                        return (
                          <CourseLesson
                            key={lesson._id}
                            lessonName={lesson.title}
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
