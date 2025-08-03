"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import LessonRenderer from "@/components/ui/renderer";
import { useTranslations } from "next-intl";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LOCALE_FEATURES, LOCALE_LANGUAGES } from "@/components/constants";
import Image from "next/image";
import { ChallengeType, LessonType } from "@/types/lessonTypes";
import { slugify, lessonSchema, LessonFormData, markdownLessonTemplate } from "./lessonUtils";
import { ChallengeSelector } from "./challengeSelector";
import { getChallengeById } from "@/api/challengeService";

const Editor = dynamic(() => import("@/components/ui/editor"), {
  ssr: false,
});

interface LessonFormProps {
  lesson?: LessonType | null;
  onSubmit: (_data: LessonFormData) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
  title?: string;
}

export function LessonForm({ lesson, onSubmit, isLoading = false, submitButtonText }: LessonFormProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [challenge, setChallenge] = useState<ChallengeType | null>(null);
  const t = useTranslations("backoffice");

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
      markdownBody: markdownLessonTemplate,
      challenge: "",
    },
  });

  const watchedTitle = useWatch({
    control,
    name: "title",
  });

  useEffect(() => {
    if (lesson) {
      const existingSlug = "slug" in lesson ? (lesson as { slug?: string }).slug : undefined;
      const challenge = "challenge" in lesson ? (lesson as { challenge?: string }).challenge : "";
      reset({
        title: lesson.title,
        slug: existingSlug || slugify(lesson.title),
        language: lesson.language,
        markdownBody: lesson.body,
        challenge: challenge,
      });
    }
  }, [lesson, reset]);

  useEffect(() => {
    if (watchedTitle) {
      setValue("slug", slugify(watchedTitle));
    } else if (!lesson) {
      setValue("slug", "");
    }
  }, [watchedTitle, setValue, lesson]);

  useEffect(() => {
    const getChallenge = async () => {
      if (watch("challengeId")) {
        const challenge = await getChallengeById(watch("challengeId"));
        setChallenge(challenge);
      }
    };
    getChallenge();
  }, [watch("challengeId")]);

  const handlePreview = (showPreview: boolean) => {
    setShowPreview(showPreview);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleFormSubmit = async (data: LessonFormData) => {
    await onSubmit(data);
  };

  if (showPreview) {
    const { title: previewTitle, markdownBody } = watch();
    return (
      <>
        <header className="absolute w-full bg-primary text-white shadow-md p-4 flex justify-evenly items-center z-50">
          <h6>{t("previewingLesson")}</h6>
          <Button className="bg-background text-primary font-semibold py-2 px-4" onClick={() => handlePreview(false)}>
            {t("backToEditor")}
          </Button>
        </header>
        <div className="pt-20">
          <LessonRenderer title={previewTitle} markdown={markdownBody} challenge={challenge} />
        </div>
      </>
    );
  }

  return (
    <main className="mb-10 max-w-7xl w-full" key={lesson?._id}>
      <div className="flex w-full justify-end mb-6">
        <h4 className="xl:mb-[30px] mb-4">{lesson ? t("updateLesson") : t("newLesson")}</h4>
        <Button type="button" onClick={() => handlePreview(true)}>
          {t("preview")}
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-card rounded-[3px] p-6">
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
        </div>

        <div
          className={`flex justify-between ${errors.markdownBody ? "rounded-lg border text-error border-error mb-0" : "mb-5"}`}
        >
          <div className="border rounded-[7px] border-border-gray w-full">
            <Suspense fallback={null}>
              <Controller
                name="markdownBody"
                control={control}
                render={({ field }) => <Editor markdown={field.value} onChange={field.onChange} />}
              />
            </Suspense>
          </div>
        </div>
        {errors.markdownBody && <p className="text-red-500 mb-5">{errors.markdownBody.message}</p>}

        <div className="w-[49%]">
          <Controller
            name="challengeId"
            control={control}
            render={({ field }) => (
              <ChallengeSelector
                value={field.value}
                onChange={field.onChange}
                error={errors.challengeId?.message}
                language={watch("language")}
              />
            )}
          />
        </div>

        <div className="pt-6 mt-6 pb-6 flex w-full justify-end border-t-[1px] border-t-border-gray">
          <Button type="submit" data-cy="button-lesson-submit" disabled={isLoading}>
            {submitButtonText || (lesson ? t("updateLesson") : t("createLesson"))}
          </Button>
        </div>
      </form>
    </main>
  );
}
