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

interface DeleteEntityModalProps {
  open: boolean;
  onOpenChange: (_isOpen: boolean) => void;
  entityName: string;
  onSubmit: () => Promise<void>;
  variant: "lesson" | "course";
}

export const DeleteEntityModal = ({ open, onOpenChange, entityName, onSubmit, variant }: DeleteEntityModalProps) => {
  const t = useTranslations("backoffice");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">
            <h6>{t("deleteModalTitle", { variant })}</h6>
          </DialogTitle>
          <DialogDescription className="mb-4">{t("confirmDeleteEntity", { entityName })}</DialogDescription>
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
