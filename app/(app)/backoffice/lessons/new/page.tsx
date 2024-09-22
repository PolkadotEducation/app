"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import ChoicesInputComponent from "@/components/ui/choices";
import LessonRenderer from "@/components/ui/renderer";
import { createLesson } from "@/api/lessonService";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

function MainPage() {
  const markdownLessonTemplate: string =
    '<iframe\n    width="696"\n    height="400"\n    className="self-center"\n    src="https://www.youtube.com/embed/GhvUs0amvCc"\n    title="Me at the zoo"\n    frameborder="0"\n    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"\n    referrerpolicy="strict-origin-when-cross-origin"\n    allowfullscreen\n  ></iframe>\n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n ## Summary\n\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  const [showPreview, setShowPreview] = useState(false);
  const t = useTranslations("backoffice");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      difficulty: "",
      markdownBody: markdownLessonTemplate,
      question: "",
      choices: ["", "", "", "", ""],
      correctChoice: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    const lessonData = {
      title: data.title,
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
      const response = await createLesson(lessonData);
      if (response) {
        // this will be removed soon
        // eslint-disable-next-line no-console
        console.log("Lesson created successfully!");
      } else {
        console.error("Failed to create lesson");
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
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

  return (
    <main className="px-[20px] my-10 xl:mt-16 max-w-[1000px] w-full">
      <h4 className="xl:mb-[30px] mb-4">{t("newLesson")}</h4>
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
              <InputFloatingLabel
                {...field}
                type="text"
                id="difficultyInput"
                label={t("difficulty")}
                additionalStyles="mb-5"
                error={errors.difficulty?.message}
              />
            )}
          />
        </div>

        <div className="flex justify-between mb-4">
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
        {errors.markdownBody && <p className="text-red-500">{errors.markdownBody.message}</p>}

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
              onChoicesChange={(choices, correctChoice) => {
                field.onChange(choices);
                setValue("correctChoice", correctChoice);
              }}
              initialChoices={field.value}
              initialCorrectChoice={watch("correctChoice")}
            />
          )}
        />
        {errors.choices && <p className="text-red-500">{errors.choices.message}</p>}
        {errors.correctChoice && <p className="text-red-500">{errors.correctChoice.message}</p>}

        <div className="pt-6 mt-6 pb-6 flex w-full justify-end border-t-[1px] border-t-border-gray">
          <Button type="submit">{t("createLesson")}</Button>
        </div>
      </form>
    </main>
  );
}

export default MainPage;
