"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import ChoicesInputComponent from "@/components/ui/choices";
import LessonRenderer from "@/components/ui/renderer";
import { getLessonById, updateLessonById } from "@/api/lessonService";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/useToast";
import { LessonType } from "@/types/lessonTypes";
import Loading from "@/components/ui/loading";
import { useUser } from "@/hooks/useUser";

const Editor = dynamic(() => import("@/components/ui/editor"), {
  ssr: false,
});

const schema = z.object({
  title: z.string().nonempty("Title is required").max(100, "Title must be 100 characters or less"),
  difficulty: z.string().nonempty("Difficulty is required"),
  markdownBody: z.string().nonempty("Body is required").max(10000, "Body must be 10000 characters or less"),
  question: z.string().nonempty("Question is required").max(100, "Question must be 100 characters or less"),
  choices: z
    .array(z.string())
    .refine((choices) => choices.slice(0, 3).every((choice) => choice.trim() !== ""), "First 3 choices are required"),
  correctChoice: z.number().min(0).max(4),
});

type FormData = z.infer<typeof schema>;

function EditLessonPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [originalLesson, setOriginalLesson] = useState<LessonType | null>();
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const { user } = useUser();
  const t = useTranslations("backoffice");
  const { toast } = useToast();

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

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      difficulty: "",
      markdownBody: "",
      question: "",
      choices: ["", "", "", "", ""],
      correctChoice: 0,
    },
  });

  useEffect(() => {
    if (originalLesson) {
      reset({
        title: originalLesson.title,
        difficulty: originalLesson.difficulty,
        markdownBody: originalLesson.body,
        question: originalLesson.challenge.question,
        choices: originalLesson.challenge.choices,
        correctChoice: originalLesson.challenge.correctChoice,
      });
    }
  }, [originalLesson, reset]);

  // @TODO: Get teamId from selector
  const selectedTeamId = user?.teams?.length ? user?.teams[0].id : "";

  const onSubmit = async (data: FormData) => {
    const lessonData = {
      teamId: selectedTeamId,
      title: data.title,
      language: originalLesson?.language || "english",
      body: data.markdownBody,
      difficulty: data.difficulty,
      challenge: {
        question: data.question,
        choices: data.choices,
        correctChoice: data.correctChoice,
      },
      references: [],
    };

    try {
      const response = await updateLessonById(selectedTeamId, id, lessonData);
      if (response) {
        toast({
          title: t("lessonUpdated"),
          variant: "default",
        });
      } else {
        toast({
          title: t("lessonUpdateFailure"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating lesson:", error);
    }
  };

  const handlePreview = (showPreview: boolean) => {
    setShowPreview(showPreview);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (showPreview) {
    const { title, difficulty, markdownBody, question, choices } = watch();
    return (
      <>
        <header className="absolute w-full bg-primary text-white shadow-md p-4 flex justify-evenly items-center z-50">
          <h6>{t("previewingLesson")}</h6>
          <Button className="bg-background text-primary font-semibold py-2 px-4" onClick={() => handlePreview(false)}>
            {t("backToEditor")}
          </Button>
        </header>
        <div className="pt-20">
          <LessonRenderer
            title={title}
            difficulty={difficulty}
            markdown={markdownBody}
            question={question}
            choices={choices}
          />
        </div>
      </>
    );
  }

  if (loading)
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );

  if (!originalLesson) {
    return <div>{t("errorLoadingLesson")}</div>;
  }

  return (
    <main className="mb-10 max-w-7xl w-full" key={originalLesson?._id || id}>
      <h4 className="xl:mb-[30px] mb-4">
        {t("updateLesson")} - {originalLesson?.title}
      </h4>
      <div className="flex w-full justify-end mb-6">
        <Button type="button" onClick={() => handlePreview(true)}>
          {t("preview")}
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-[3px] p-6">
        <div className="w-[49%]">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputFloatingLabel
                {...field}
                type="text"
                id="titleInput"
                label={t("title")}
                additionalStyles="mb-5"
                error={errors.title?.message}
              />
            )}
          />
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <p>{t("difficulty")}</p>
                <RadioGroup
                  {...field}
                  onValueChange={field.onChange}
                  className={`flex gap-x-4 ${errors.difficulty?.message ? "mb-0" : "mb-5"}`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="easy" id="easyRadioButton" />
                    <label htmlFor="easyRadioButton">{t("easy")}</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="mediumRadioButton" />
                    <label htmlFor="mediumRadioButton">{t("medium")}</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hard" id="hardRadioButton" />
                    <label htmlFor="hardRadioButton">{t("hard")}</label>
                  </div>
                </RadioGroup>
                {errors.difficulty?.message && (
                  <p className="text-red-500 mt-1 mb-5 form-error">{errors.difficulty?.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div
          className={`flex justify-between ${errors.markdownBody ? "rounded-lg border text-error border-error mb-0" : "mb-5"}`}
        >
          <div className="border rounded-[7px] border-border-gray w-full">
            <Suspense fallback={null}>
              <Controller
                name="markdownBody"
                control={control}
                render={({ field }) => <Editor markdown={watch("markdownBody")} onChange={field.onChange} />}
              />
            </Suspense>
          </div>
        </div>
        {errors.markdownBody && <p className="text-red-500 mb-5">{errors.markdownBody.message}</p>}

        <div className="w-[49%]">
          <Controller
            name="question"
            control={control}
            render={({ field }) => (
              <InputFloatingLabel
                {...field}
                type="text"
                id="questionInput"
                label={t("question")}
                additionalStyles="mb-5"
                error={errors.question?.message}
              />
            )}
          />
        </div>

        <Controller
          name="choices"
          control={control}
          render={({ field }) => (
            <ChoicesInputComponent
              choices={field.value}
              correctChoice={watch("correctChoice")}
              onChoicesChange={(updatedChoices, updatedCorrectChoice) => {
                field.onChange(updatedChoices);
                setValue("correctChoice", updatedCorrectChoice);
              }}
            />
          )}
        />
        {errors.choices && <p className="text-red-500 form-error">{errors.choices.message}</p>}
        {errors.correctChoice && <p className="text-red-500 form-error">{errors.correctChoice.message}</p>}

        <div className="pt-6 mt-6 pb-6 flex w-full justify-end border-t-[1px] border-t-border-gray">
          <Button type="submit" data-cy="button-lesson-submit">
            {t("updateLesson")}
          </Button>
        </div>
      </form>
    </main>
  );
}

export default EditLessonPage;
