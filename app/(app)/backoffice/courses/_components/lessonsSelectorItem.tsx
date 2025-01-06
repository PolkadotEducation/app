import { Button } from "@/components/ui/button";

const LessonsSelectorItem = ({
  lessonTitle,
  language,
  index,
  lessonId,
  isAdded,
  onToggle,
}: {
  lessonTitle: string;
  language: string;
  index: number;
  lessonId: string;
  isAdded: boolean;
  onToggle: (_lesson: { lessonId: string; lessonTitle: string; action: "add" | "remove" }) => void;
}) => {
  return (
    <div
      className={`w-full ${index % 2 !== 0 ? "bg-card" : "bg-primary/10"} flex justify-between items-center px-4 py-2`}
    >
      <p className="flex-1">{lessonTitle}</p>
      <p className="flex-[0.5]">{language}</p>
      <Button
        variant={isAdded ? "outline" : "default"}
        onClick={() =>
          onToggle({
            lessonId,
            lessonTitle,
            action: isAdded ? "remove" : "add",
          })
        }
      >
        {isAdded ? "Remover" : "Adicionar"}
      </Button>
    </div>
  );
};

export default LessonsSelectorItem;
