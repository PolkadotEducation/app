"use client";

import { useRouter } from "next/navigation";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const ModuleAccordion = ({ index, title, lessons }: { index: any; title: string; lessons: any }) => {
  const router = useRouter();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`module-${index}`}>
        <AccordionTrigger>
          <h6>{`Module ${index + 1}: ${title}`}</h6>
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {lessons.map((lesson: string, lessonIndex: number) => (
              <li
                key={lessonIndex}
                onClick={() => router.push(`/lesson/${lesson}`)}
                className="hover:underline cursor-pointer py-2 ml-5"
              >
                {`Lesson ${index + 1}.${lessonIndex + 1}: ${lesson}`}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
