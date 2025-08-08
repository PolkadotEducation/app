"use client";
import React from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import xMark from "../../public/assets/icons/CloseFilled.svg";
import CourseChapterAccordion from "./courseChapterAccordion";
import CourseLesson from "./courseLesson";
import { CourseSummary } from "@/types/progressTypes";
import chevronRight from "../../public/assets/icons/chevronRight.svg";
import useIsMobile from "@/hooks/useIsMobile";
import { useTranslations } from "next-intl";

interface CourseDescriptionSectionProps {
  courseSummary?: CourseSummary;
  classname?: string;
}

const CourseDescriptionSection = ({ courseSummary, classname }: CourseDescriptionSectionProps) => {
  const isMobile = useIsMobile();
  const t = useTranslations("components");

  return (
    <div>
      <h6 className="mt-4">{t("courseSummary")}</h6>
      {isMobile ? (
        <Drawer direction="left" data-cy="aside-course-progress-details">
          <DrawerTrigger className="h-[max-content] text-body2 text-primary flex items-center gap-4">
            {t("viewProgress")}
            <Image src={chevronRight} alt="chevron down" width={8} className="text-primary" />
          </DrawerTrigger>
          <DrawerContent className="h-screen w-[300px] rounded-tr-[8px] rounded-br-[8px] rounded-tl-none">
            <DrawerClose className="w-[max-content] absolute right-4 top-4">
              <Image src={xMark} alt="close button" />
            </DrawerClose>
            <DrawerHeader className="flex items-center justify-center pt-14">
              <DrawerTitle>{t("courseSummary")}</DrawerTitle>
            </DrawerHeader>
            <Accordion type="single" collapsible>
              {courseSummary?.modules.map((module, index) => {
                return (
                  <AccordionItem
                    value={`item${index}`}
                    className="px-6"
                    key={module.title}
                    data-cy={`aside-module-${index + 1}`}
                  >
                    <AccordionTrigger className="text-sm flex flex-row-reverse justify-between w-full pr-8">
                      <CourseChapterAccordion
                        chapterName={`Module ${index + 1}`}
                        completed={module.isCompleted}
                        moduleTitle={module?.title}
                      />
                    </AccordionTrigger>
                    <AccordionContent className="mx-12 pl-4 border-l-2 border-neutral-300 rounded-sm">
                      <ul className="pt-4 flex flex-col gap-4">
                        {module.lessons.map((lesson, index) => {
                          return (
                            <CourseLesson
                              key={index}
                              courseId={courseSummary.id}
                              lessonId={lesson.id}
                              lessonName={lesson.title}
                              expAmount={lesson.expEarned}
                              completed={lesson.expEarned > 0}
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
          data-cy="aside-course-progress-details"
          className={`h-screen min-w-[340px] max-w-[400px] rounded-tr-[8px] rounded-br-[8px] rounded-tl-none flex flex-col items-start ${classname}`}
        >
          <div className="flex justify-center pt-2"></div>
          <Accordion type="single" collapsible className="w-full">
            {courseSummary?.modules.map((module, index) => {
              return (
                <AccordionItem value={`item${index}`} data-cy={`aside-module-${index + 1}`}>
                  <AccordionTrigger className="text-sm flex flex-row-reverse justify-between w-full">
                    <CourseChapterAccordion
                      chapterName={`Module ${index + 1}`}
                      completed={module.isCompleted}
                      moduleTitle={module?.title}
                    />
                  </AccordionTrigger>
                  <AccordionContent className="mx-12 pl-4 border-l-2 border-neutral-300 rounded-sm">
                    <ul className="pt-4 flex flex-col gap-4">
                      {module.lessons.map((lesson: { id: string; title: string; expEarned: number }) => {
                        return (
                          <CourseLesson
                            key={index}
                            courseId={courseSummary.id}
                            lessonId={lesson.id}
                            lessonName={lesson.title}
                            expAmount={lesson.expEarned}
                            completed={lesson.expEarned > 0}
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
    </div>
  );
};

export default CourseDescriptionSection;
