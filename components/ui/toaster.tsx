"use client";

import { useToast } from "@/hooks/useToast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { CircleCheck, CircleX } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} data-cy="toast">
            <div className="flex items-center gap-x-4">
              {variant === "default" ? (
                <CircleCheck className="stroke-success w-5 h-5" />
              ) : (
                <CircleX className="stroke-error w-5 h-5" />
              )}
              <div className="flex flex-col">
                {title && <ToastTitle data-cy="toast-title">{title}</ToastTitle>}
                {description && <ToastDescription data-cy="toast-description">{description}</ToastDescription>}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
