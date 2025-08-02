"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import ChoicesInputComponent from "@/components/ui/choices";
import LessonRenderer from "@/components/ui/renderer";
import { getLessonById, updateLessonById } from "@/api/lessonService";
import { useTranslations } from "next-intl";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/useToast";
import { LessonType } from "@/types/lessonTypes";
import Loading from "@/components/ui/loading";
import { useUser } from "@/hooks/useUser";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LOCALE_FEATURES, LOCALE_LANGUAGES } from "@/components/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { slugify, lessonSchema, LessonFormData } from "../_components/lessonUtils";

const Editor = dynamic(() => import("@/components/ui/editor"), {
  ssr: false,
});

function EditLessonPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [originalLesson, setOriginalLesson] = useState<LessonType | null>();
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
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

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      slug: "",
      language: "",
      difficulty: "",
      markdownBody: "",
      question: "",
      choices: ["", "", "", "", ""],
      correctChoice: 0,
    },
  });

  const watchedTitle = useWatch({
    control,
    name: "title",
  });

  useEffect(() => {
    if (originalLesson) {
      const existingSlug = "slug" in originalLesson ? (originalLesson as { slug?: string }).slug : undefined;
      reset({
        title: originalLesson.title,
        slug: existingSlug || slugify(originalLesson.title),
        language: originalLesson.language,
        difficulty: originalLesson.difficulty,
        markdownBody: originalLesson.body,
        question: originalLesson.challenge.question,
        choices: originalLesson.challenge.choices,
        correctChoice: originalLesson.challenge.correctChoice,
      });
    }
  }, [originalLesson, reset]);

  useEffect(() => {
    if (watchedTitle) {
      setValue("slug", slugify(watchedTitle));
    }
  }, [watchedTitle, setValue]);

  // @TODO: Get teamId from selector
  const selectedTeamId = user?.teams?.length ? user?.teams[0].id : "";

  const onSubmit = async (data: LessonFormData) => {
    const lessonData = {
      teamId: selectedTeamId,
      title: data.title,
      slug: data.slug,
      language: data.language,
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
        <div className="flex gap-x-4 w-full">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputFloatingLabel
                {...field}
                type="text"
                id="titleInput"
                label={t("title")}
                additionalStyles="mb-5 w-full"
                error={errors.title?.message}
              />
            )}
          />
          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <InputFloatingLabel
                {...field}
                type="text"
                id="slugInput"
                label="Slug"
                additionalStyles="mb-5 w-full"
                disabled={true}
                error={errors.slug?.message}
              />
            )}
          />
        </div>

        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <p className="text-xs mb-2">Language</p>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="mb-5" data-testid="language-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(LOCALE_FEATURES).map((lang) => {
                          const value = LOCALE_LANGUAGES[lang.locale as keyof typeof LOCALE_LANGUAGES];
                          return (
                            <SelectItem value={value} key={lang.locale} data-testid={`language-option-${value}`}>
                              <div className="flex items-center">
                                <Image src={lang.icon} alt={lang.title} width={20} height={20} className="mr-2" />
                                <span>{lang.title}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.language?.message && (
                    <p className="text-red-500 mt-1 mb-5 form-error">{errors.language?.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="w-full">
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <p className="text-xs mb-2">{t("difficulty")}</p>
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
