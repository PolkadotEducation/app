"use client";

import { useEffect, useState } from "react";
import { getLessonById, updateLessonById } from "@/api/lessonService";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/useToast";
import { LessonType } from "@/types/lessonTypes";
import Loading from "@/components/ui/loading";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { LessonFormData } from "../_components/lessonUtils";
import { LessonForm } from "../_components/lessonForm";

function EditLessonPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [originalLesson, setOriginalLesson] = useState<LessonType | null>();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const t = useTranslations("backoffice");
  const { toast } = useToast();
  const router = useRouter();

  const getLessonData = async () => {
    try {
      const lesson = await getLessonById(id);
      setOriginalLesson(lesson);
    } catch (error) {
      console.error("Error fetching lesson data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getLessonData();
    }
  }, [id]);

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
      const response = await updateLessonById(selectedTeamId, id, lessonData);
      if (response) {
        router.push("/backoffice/lessons");
      } else {
        toast({
          title: t("lessonUpdateFailure"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating lesson:", error);
      toast({
        title: t("lessonUpdateFailure"),
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  }

  if (!originalLesson) {
    return <div>{t("errorLoadingLesson")}</div>;
  }

  return <LessonForm lesson={originalLesson} onSubmit={handleSubmit} />;
}

export default EditLessonPage;
