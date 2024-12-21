import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LessonSummary, SimplifiedLessonType } from "@/types/lessonTypes";
import { DialogClose } from "@radix-ui/react-dialog";
import LessonsSelectorItem from "./lessonsSelectorItem";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface LessonsSelectorProps {
  open: boolean;
  onOpenChange: (_isOpen: boolean) => void;
  lessons: LessonSummary[];
  moduleTitle: string;
  onLessonToggle: (_lesson: { lessonId: string; lessonTitle: string; action: "add" | "remove" }) => void;
  addedLessons: SimplifiedLessonType[];
}

const LessonsSelector = ({
  open,
  onOpenChange,
  lessons,
  moduleTitle,
  onLessonToggle,
  addedLessons,
}: LessonsSelectorProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lessonNameFilter, setLessonNameFilter] = useState("");
  const itemsPerPage = 6;
  const t = useTranslations("backoffice");

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(lessonNameFilter.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
  const currentLessons = filteredLessons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLessonNameFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle className="mb-4">
            {t("addLesson")} - {moduleTitle}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>{t("selectLessons")}</DialogDescription>
        <div className="h-[480px]">
          <div className="mb-6">
            <Input
              className="rounded-3xl"
              value={lessonNameFilter}
              onChange={handleFilterChange}
              placeholder="Buscar aula"
            />
          </div>
          {currentLessons.map((lesson, index) => {
            const isAdded = addedLessons.some((l) => l._id === lesson._id);
            return (
              <LessonsSelectorItem
                key={lesson._id}
                lessonId={lesson._id}
                lessonTitle={lesson.title}
                language={lesson.language}
                index={index + (currentPage - 1) * itemsPerPage}
                isAdded={isAdded}
                onToggle={onLessonToggle}
              />
            );
          })}
          {filteredLessons.length > itemsPerPage && (
            <div className="flex items-center gap-2 mt-6">
              <Button type="button" variant="link" disabled={currentPage === 1} onClick={handlePreviousPage}>
                <ChevronLeft />
              </Button>
              <span>{t("pagination", { currentPage, totalPages })}</span>
              <Button type="button" variant="link" disabled={currentPage === totalPages} onClick={handleNextPage}>
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
        <DialogFooter className="justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {t("cancel")}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button">{t("continue")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LessonsSelector;
