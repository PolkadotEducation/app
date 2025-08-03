"use client";

import { createLesson } from "@/api/lessonService";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { LessonFormData } from "../_components/lessonUtils";
import { LessonForm } from "../_components/lessonForm";

function CreateLessonPage() {
  const { user } = useUser();
  const t = useTranslations("backoffice");
  const { toast } = useToast();
  const router = useRouter();

  // @TODO: Get teamId from selector
  const selectedTeamId = user?.teams?.length ? user?.teams[0].id : "";

  const handleSubmit = async (data: LessonFormData) => {
    const lessonData = {
      teamId: selectedTeamId,
      title: data.title,
      slug: data.slug,
      language: data.language,
      body: data.markdownBody,
      difficulty: data.difficulty,
      challenge: data.challenge,
      references: [],
    };

    try {
      const response = await createLesson(selectedTeamId, lessonData);
      if (response) {
        router.push("/backoffice/lessons");
      } else {
        toast({
          title: t("lessonCreationFailure"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
      toast({
        title: t("lessonCreationFailure"),
        variant: "destructive",
      });
    }
  };

  return <LessonForm onSubmit={handleSubmit} />;
}

export default CreateLessonPage;
