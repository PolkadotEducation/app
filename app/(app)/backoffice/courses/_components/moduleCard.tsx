import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { SimplifiedLessonType } from "@/types/lessonTypes";
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

interface ModuleCardProps {
  id?: string;
  index: number;
  title: string;
  lessons: SimplifiedLessonType[];
  onChange: (_updatedData: Partial<{ title: string; lessons: SimplifiedLessonType[] }>) => void;
}

// eslint-disable-next-line no-unused-vars
const ModuleCard = ({ id, index, title, lessons, onChange }: ModuleCardProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
      <h5>Modulo {index + 1}</h5>
      <InputFloatingLabel
        id="moduleTitleInput"
        value={title}
        onChange={(e) => onChange({ title: e.target.value })}
        label={`Modulo ${index + 1}`}
        additionalStyles="mb-5"
      />
      <h5>Aulas</h5>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={lessons.map((lesson) => lesson._id as string)} strategy={verticalListSortingStrategy}>
          <div className="space-y-[1px] bg-background py-[1px]">
            {lessons.map((lesson) => (
              <SortableItem id={lesson._id as string} key={lesson._id as string}>
                {
                  <div key={lesson._id as string} id={lesson._id as string} className="p-4 bg-card">
                    {lesson.title}
                  </div>
                }
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button
        onClick={() => {
          onChange({
            lessons: [
              ...lessons,
              {
                _id: `lesson-${lessons.length + 1}`,
                title: `Lesson ${lessons.length + 1}`,
              },
            ],
          });
        }}
        className="w-fit"
      >
        Add Lesson
      </Button>
    </div>
  );
};

export default ModuleCard;
