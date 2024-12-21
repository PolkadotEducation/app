"use client";

import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { LessonSummary, SimplifiedLessonType } from "@/types/lessonTypes";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortableItem";
import LessonsSelector from "./lessonsSelector";
import { useState } from "react";
import { GripVertical, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface ModuleCardProps {
  id?: string;
  index: number;
  title: string;
  lessons: SimplifiedLessonType[];
  onChange: (_updatedData: Partial<{ title: string; lessons: SimplifiedLessonType[] }>) => void;
  lessonsData: LessonSummary[];
}

const ModuleCard = ({ index, title, lessons, onChange, lessonsData }: ModuleCardProps) => {
  const [selectLessonModalOpen, setSelectLessonModalOpen] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const t = useTranslations("backoffice");

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = lessons.findIndex((lesson) => lesson._id === active.id);
      const newIndex = lessons.findIndex((lesson) => lesson._id === over?.id);
      const updatedLessons = arrayMove(lessons, oldIndex, newIndex);

      onChange({ lessons: updatedLessons });
    }
  };

  return (
    <div className="p-6 flex flex-col gap-y-4 bg-card rounded-lg">
      <h5>
        {t("module")} {index + 1}
      </h5>
      <InputFloatingLabel
        id="moduleTitleInput"
        value={title}
        onChange={(e) => onChange({ title: e.target.value })}
        label="Módulo"
        additionalStyles="mb-5"
      />
      <h5>{t("lessons")}</h5>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={lessons.map((lesson) => lesson._id as string)} strategy={verticalListSortingStrategy}>
          <div className="space-y-[1px] bg-background py-[1px]">
            {lessons.map((lesson) => (
              <SortableItem id={lesson._id as string} key={lesson._id as string}>
                {
                  <div
                    key={lesson._id as string}
                    id={lesson._id as string}
                    className="flex justify-between p-4 bg-card"
                  >
                    <div className="flex items-center gap-x-3">
                      <GripVertical />
                      {lesson.title}
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => {
                        onChange({ lessons: lessons.filter((l) => l._id !== lesson._id) });
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                }
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button type="button" variant="outline" onClick={() => setSelectLessonModalOpen(true)} className="w-fit">
        {t("addLesson")}
      </Button>
      <LessonsSelector
        lessons={lessonsData}
        open={selectLessonModalOpen}
        onOpenChange={setSelectLessonModalOpen}
        moduleTitle={title}
        addedLessons={lessons}
        onLessonToggle={({ lessonId, lessonTitle, action }) => {
          if (action === "add") {
            onChange({
              lessons: [
                ...lessons,
                {
                  _id: lessonId,
                  title: lessonTitle,
                },
              ],
            });
          } else if (action === "remove") {
            onChange({
              lessons: lessons.filter((lesson) => lesson._id !== lessonId),
            });
          }
        }}
      />
    </div>
  );
};

export default ModuleCard;
