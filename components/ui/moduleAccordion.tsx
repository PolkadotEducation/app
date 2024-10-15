"use client";

import { useRouter } from "next/navigation";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { LessonType } from "@/types/lessonTypes";

export const ModuleAccordion = ({ index, title, lessons }: { index: number; title: string; lessons: LessonType[] }) => {
  const router = useRouter();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`module-${index}`}>
        <AccordionTrigger>
          <h6>{`Module ${index + 1}: ${title}`}</h6>
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {lessons.map((lesson: LessonType, lessonIndex: number) => (
              <li
                key={lessonIndex}
                onClick={() => router.push(`/lesson/${lesson._id}`)}
                className="hover:underline cursor-pointer py-2 ml-5"
              >
                {`Lesson ${index + 1}.${lessonIndex + 1}: ${lesson.title}`}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
