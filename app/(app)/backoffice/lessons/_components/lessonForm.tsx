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
import { lessonSchema, LessonFormData, markdownLessonTemplate } from "./lessonUtils";
import { slugify } from "@/lib/utils";
import { ChallengeSelector } from "./challengeSelector";

const Editor = dynamic(() => import("@/components/ui/editor"), {
  ssr: false,
});

const sampleChallenge = {
  teamId: "123",
  question: "Example question?",
  choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
  difficulty: "easy" as const,
  language: "english",
  correctChoice: 0,
};
interface LessonFormProps {
  lesson?: LessonType | null;
  onSubmit: (_data: LessonFormData) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
  title?: string;
}

export function LessonForm({ lesson, onSubmit, isLoading = false, submitButtonText }: LessonFormProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeType>(lesson?.challenge || sampleChallenge);
  const t = useTranslations("backoffice");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: lesson?.title || "",
      slug: lesson?.slug || "",
      language: lesson?.language || "",
      markdownBody: lesson?.body || markdownLessonTemplate,
      challenge: selectedChallenge,
    },
  });

  const watchedTitle = useWatch({
    control,
    name: "title",
  });

  useEffect(() => {
    if (watchedTitle) {
      setValue("slug", slugify(watchedTitle));
    } else if (!lesson) {
      setValue("slug", "");
    }
  }, [watchedTitle, setValue, lesson]);

  const handlePreview = (showPreview: boolean) => {
    setShowPreview(showPreview);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleFormSubmit = async (data: LessonFormData) => {
    await onSubmit(data);
  };

  if (showPreview) {
    const { markdownBody } = watch();
    return (
      <>
        <header className="absolute w-full max-w-7xl border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-500 rounded-lg shadow-md text-yellow-800 dark:text-yellow-200 p-4 flex justify-between items-center z-50">
          <div className="flex items-center gap-2">
            <svg
              className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h6 className="font-normal text-md">{t("previewingLesson")}</h6>
          </div>
          <Button type="button" onClick={() => handlePreview(false)}>
            {t("backToEditor")}
          </Button>
        </header>
        <div className="pt-20">
          <LessonRenderer markdown={markdownBody} challenge={selectedChallenge} preview={showPreview} />
        </div>
      </>
    );
  }

  return (
    <main className="mb-10 max-w-7xl w-full" key={lesson?._id}>
      <div className="flex w-full justify-between mb-6">
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
                    <SelectTrigger className="mb-5" data-cy="language-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(LOCALE_FEATURES).map((lang) => {
                          const value = LOCALE_LANGUAGES[lang.locale as keyof typeof LOCALE_LANGUAGES];
                          return (
                            <SelectItem value={value} key={lang.locale} data-cy={`language-option-${value}`}>
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
            name="challenge"
            control={control}
            render={({ field }) => (
              <ChallengeSelector
                value={field.value}
                onChange={(challenge) => {
                  field.onChange(challenge);
                  setSelectedChallenge(challenge);
                }}
                error={errors.challenge?.message}
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
