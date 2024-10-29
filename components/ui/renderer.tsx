"use client";

import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Badge from "@/components/ui/badge";
import { Button } from "./button";
import { useTranslations } from "next-intl";
import Loading from "./loading";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { submitAnswer } from "@/api/progressService";
import { toast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { ProgressResponse } from "@/types/progressTypes";

const EXP_POINTS = {
  hard: 100,
  medium: 50,
  easy: 25,
};

type Difficulty = keyof typeof EXP_POINTS;

interface LessonRendererProps {
  lessonId?: string;
  courseId?: string;
  title: string;
  difficulty: string;
  markdown: string;
  question: string;
  choices: string[];
  nextLesson?: string | null;
  previousLesson?: string | null;
  progress?: ProgressResponse[] | null;
}

const LessonRenderer = ({
  lessonId,
  courseId,
  title,
  difficulty,
  markdown,
  question,
  choices,
  nextLesson,
  previousLesson,
  progress,
}: LessonRendererProps) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [isLessonCompleted, setIsLessonCompleted] = useState(true);
  const [isFirstTry, setIsFirstTry] = useState(true);
  const [points, setPoints] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const { user } = useUser();
  const t = useTranslations("components");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const compileMDX = async () => {
      if (markdown) {
        const source = await serialize(markdown);
        setMdxSource(source);
      }
    };

    compileMDX();
  }, [markdown]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOnCooldown) {
      timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsOnCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isOnCooldown]);

  useEffect(() => {
    if (!progress) return;

    setIsFirstTry(progress?.length === 0);
    setIsLessonCompleted(progress?.some((answer: ProgressResponse) => answer.isCorrect === true));
  }, []);

  useEffect(() => {
    const doublePoints = EXP_POINTS[difficulty as Difficulty] * 2;
    const normalPoints = EXP_POINTS[difficulty as Difficulty];

    setPoints(isFirstTry ? doublePoints : normalPoints);
  }, [isFirstTry]);

  const onSubmitAnswer = async () => {
    if (!selectedChoice && selectedChoice != 0) {
      toast({
        title: t("selectChoice"),
        variant: "destructive",
      });
      return;
    }

    if (!user?.id || !courseId || !lessonId || (!selectedChoice && selectedChoice != 0)) {
      toast({
        title: "Error: missing data",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const progressData = {
      userId: user?.id,
      courseId: courseId,
      lessonId: lessonId,
      choice: selectedChoice,
    };

    setIsFirstTry(false);

    try {
      const response = await submitAnswer(progressData);
      if (response.isCorrect) {
        setIsLessonCompleted(true);
        toast({
          title: t("rightAnswer"),
          variant: "default",
        });
      } else {
        toast({
          title: t("wrongAnswer"),
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error submitting answer:", error);
      if (error?.error && error?.error?.message.includes("E11000")) {
        toast({
          title: t("duplicatedAnswer"),
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error submitting answer",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnswer = () => {
    if (isOnCooldown) return;

    onSubmitAnswer();

    setIsOnCooldown(true);
    setCooldownTime(10);
  };

  const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChoice(Number(event.target.value));
  };

  return (
    <main className="w-full flex justify-center">
      <div className="flex flex-col max-w-7xl mdxeditor pb-8">
        <h1>
          {title ? title : "Title not set"}
          <Badge className="align-middle ml-2">{difficulty ? t(difficulty) : "Difficulty not set"}</Badge>
        </h1>
        {mdxSource ? (
          <MDXRemote {...mdxSource} />
        ) : (
          <div className="flex w-full justify-center">
            <Loading />
          </div>
        )}
        <div className="border-t-2 border-t-border-gray my-4"></div>
        <h2>{t("challenge")}</h2>
        <p>{question ? question : "Challenge not set"}</p>
        {choices.some((c) => !!c) && (
          <div>
            {choices
              .filter((c) => !!c)
              .map((option, index) => (
                <div key={index} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="choices"
                      value={index}
                      className="mr-2 accent-primary w-4 h-4"
                      onChange={handleChoiceChange}
                      disabled={isLessonCompleted}
                    />
                    {option}
                  </label>
                </div>
              ))}
            <div className="flex flex-col">
              <Button
                className="w-fit mt-4 mb-4"
                onClick={() => handleSubmitAnswer()}
                disabled={isOnCooldown || isLessonCompleted || (!selectedChoice && selectedChoice != 0) || isSubmitting}
                loading={isSubmitting}
              >
                {isLessonCompleted ? `${t("lessonCompleted")} ✅` : t("submitAnswer") + ` (+${points}XP)`}
              </Button>
              {isFirstTry && !isLessonCompleted && <h5 className="text-primary mb-3">{t("attention")}</h5>}
              {!isLessonCompleted && isOnCooldown && !isSubmitting && (
                <p className="text-body2 text-text-secondary ml-3">
                  <span className="text-primary mr-2">{t("wrongAnswer")}.</span>
                  {t("submitCooldown", { cooldown: cooldownTime })}
                </p>
              )}
            </div>
          </div>
        )}
        {/* TODO should we show this navigation if the user has not yet answered the question */}
        {(nextLesson || previousLesson) && (
          <div
            className={`flex w-full py-6 border-t-2 border-t-border-gray ${
              previousLesson && nextLesson ? "justify-between" : previousLesson ? "justify-start" : "justify-end"
            }`}
          >
            {previousLesson && (
              <Link href={`/lesson/${courseId}/${previousLesson}`}>
                <Button variant="link" className="p-0 hover:bg-transparent">
                  <ChevronLeft className="mr-2" />
                  {t("previousLesson")}
                </Button>
              </Link>
            )}
            {nextLesson && (
              <Link href={`/lesson/${courseId}/${nextLesson}`}>
                <Button variant="link" className="p-0 hover:bg-transparent">
                  {t("nextLesson")}
                  <ChevronRight className="ml-2" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default LessonRenderer;
