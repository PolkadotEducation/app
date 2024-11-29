import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface DeleteLessonModalProps {
  open: boolean;
  onOpenChange: (_isOpen: boolean) => void;
  lessonName: string;
  onSubmit: () => Promise<void>;
}

export const DeleteLessonModal = ({ open, onOpenChange, lessonName, onSubmit }: DeleteLessonModalProps) => {
  const t = useTranslations("backoffice");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">
            <h6>{t("deleteLesson")}</h6>
          </DialogTitle>
          <DialogDescription className="mb-4">{t("confirmDeleteLesson", { lessonName })}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onSubmit().catch(() => {
                console.error("Error during deletion");
              });
            }}
          >
            {t("submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
