"use client";

import { useRouter } from "next/navigation";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { LessonType } from "@/types/lessonTypes";
import { useTranslations } from "next-intl";
import { CourseType } from "@/types/courseTypes";

export const ModuleAccordion = ({
  index,
  title,
  lessons,
  course,
}: {
  index: number;
  title: string;
  lessons: LessonType[];
  course: CourseType;
}) => {
  const router = useRouter();
  const t = useTranslations("components");

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`module-${index}`}>
        <AccordionTrigger>
          <h6 className="text-start">{`${t("module")} ${index + 1}: ${title}`}</h6>
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {lessons.map((lesson: LessonType, lessonIndex: number) => (
              <li
                key={lessonIndex}
                onClick={() => router.push(`/lesson/${course._id}/${lesson._id}`)}
                className="hover:underline cursor-pointer py-2 ml-5"
              >
                {`${t("lesson")} ${index + 1}.${lessonIndex + 1}: ${lesson.title}`}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
