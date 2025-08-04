"use client";

import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import Badge from "@/components/ui/badge";
import { Button } from "./button";
import { useTranslations } from "next-intl";
import Loading from "./loading";

import { ChevronLeft, ChevronRight, CircleCheckBig } from "lucide-react";
import { getUserCompletedCourses, submitAnswer } from "@/api/progressService";
import { toast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { ProgressResponse, SubmitAnswerResponse } from "@/types/progressTypes";
import { useRouter } from "next/navigation";
import { ResponsiveIframe } from "./responsiveIframe";
import { ChallengeType } from "@/types/lessonTypes";
import { calculateExperience } from "@/lib/experience";

interface LessonRendererProps {
  lessonId?: string;
  courseId?: string;
  challenge?: ChallengeType;
  markdown: string;
  nextLesson?: string | null;
  previousLesson?: string | null;
  progress?: ProgressResponse[] | null;
  onAnswerSubmitted?: (_result: SubmitAnswerResponse) => void;
  loading?: boolean;
}

const LessonRenderer = ({
  lessonId,
  courseId,
  challenge,
  markdown,
  nextLesson,
  previousLesson,
  progress,
  onAnswerSubmitted,
  loading = false,
}: LessonRendererProps) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [isFirstTry, setIsFirstTry] = useState(true);
  const [points, setPoints] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const { user } = useUser();
  const t = useTranslations("components");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const compileMDX = async () => {
      if (markdown) {
        const source = await serialize(markdown, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        });
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
  }, [progress]);

  useEffect(() => {
    if (!challenge) return;

    const points = calculateExperience(challenge.difficulty, isFirstTry);
    setPoints(points);
  }, [isFirstTry, challenge]);

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
      courseId: courseId,
      lessonId: lessonId,
      choice: selectedChoice,
    };

    setIsFirstTry(false);

    try {
      const response = await submitAnswer(progressData);
      if (response.progress.isCorrect) {
        setIsLessonCompleted(true);
        toast({
          title: t("rightAnswer"),
          variant: "default",
        });
      } else {
        toast({
          title: t("wrongAnswer"),
          description: t("wrongAnswerDescription"),
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
      if (onAnswerSubmitted) {
        onAnswerSubmitted(response);
      }
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

  const handleOnCompleteCourse = async () => {
    if (!isLessonCompleted) {
      toast({
        title: t("notCompletedTitle"),
        variant: "destructive",
      });
      return;
    }

    const completedCourses = await getUserCompletedCourses();

    if (!completedCourses.find((i) => i.courseId === courseId)) {
      toast({
        title: t("notCompletedTitle"),
        description: t("notCompletedDescription"),
        variant: "destructive",
      });
      return;
    }

    router.push(`/course/${courseId}/congratulations`);
  };

  if (loading) {
    return (
      <main className="w-full flex justify-center">
        <div className="flex flex-col max-w-7xl mdxeditor pb-8">
          <div className="flex w-full justify-center">
            <Loading />
          </div>
        </div>
      </main>
    );
  }

  if (!challenge) {
    return (
      <main className="w-full flex justify-center">
        <div className="flex flex-col max-w-7xl mdxeditor pb-8">
          <div className="flex w-full justify-center">
            <Loading />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full flex justify-center">
      <div className="flex flex-col max-w-7xl mdxeditor pb-8">
        {mdxSource ? (
          <MDXRemote
            {...mdxSource}
            components={{
              ResponsiveIframe,
            }}
          />
        ) : (
          <div className="flex w-full justify-center">
            <Loading />
          </div>
        )}
        <div className="border-t-2 border-t-border-gray my-4"></div>
        <div>
          <div className="flex flex-row items-center">
            <h2>{t("challenge")}</h2>
            <Badge className="ml-4">
              {challenge.difficulty ? t(challenge.difficulty.toLowerCase()) : "Difficulty not set"}
            </Badge>
            {isLessonCompleted && (
              <Badge color="bg-green-500" className="ml-2">
                {t("completed")}
              </Badge>
            )}
          </div>
          <div className={isLessonCompleted ? "opacity-50" : ""}>
            <p className="text-body1">{challenge.question ? challenge.question : "Challenge not set"}</p>
            {challenge.choices.some((c) => !!c) && (
              <div>
                {challenge.choices
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
                          data-cy={`input-choice-${index}`}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                <div className="flex flex-col">
                  <Button
                    className="w-fit mt-4 mb-4"
                    onClick={() => handleSubmitAnswer()}
                    disabled={
                      isOnCooldown || isLessonCompleted || (!selectedChoice && selectedChoice != 0) || isSubmitting
                    }
                    loading={isSubmitting}
                    data-cy="button-submit-answer"
                  >
                    {isLessonCompleted ? (
                      <span className="inline-flex items-center gap-x-2">
                        <CircleCheckBig />
                        {t("lessonCompleted")}
                      </span>
                    ) : (
                      t("submitAnswer") + (isOnCooldown ? "" : ` (+${points}XP)`)
                    )}
                  </Button>
                  {isFirstTry && !isLessonCompleted && <h5 className="text-primary mb-3">{t("attention")}</h5>}
                  {!isLessonCompleted && isOnCooldown && !isSubmitting && (
                    <span className="text-body2 text-text-secondary ml-3 mb-3">
                      <span className="text-primary mr-2">{t("wrongAnswer")}.</span>
                      {t("submitCooldown", { cooldown: cooldownTime })}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {(nextLesson || previousLesson) && (
          <div
            className={`flex w-full py-6 border-t-2 border-t-border-gray ${
              previousLesson && nextLesson ? "justify-between" : previousLesson ? "justify-between" : "justify-end"
            }`}
          >
            {previousLesson && (
              <Button
                variant="link"
                className="p-0 hover:bg-transparent"
                onClick={() => router.push(`/lesson/${courseId}/${previousLesson}`)}
                data-cy="button-previous-lesson"
              >
                <ChevronLeft className="mr-2" />
                {t("previousLesson")}
              </Button>
            )}
            {nextLesson && (
              <Button
                variant="link"
                className="p-0 hover:bg-transparent"
                onClick={() => router.push(`/lesson/${courseId}/${nextLesson}`)}
                data-cy="button-next-lesson"
              >
                {t("nextLesson")}
                <ChevronRight className="ml-2" />
              </Button>
            )}
            {!nextLesson && (
              <Button
                variant="link"
                className="p-0 hover:bg-transparent"
                onClick={handleOnCompleteCourse}
                data-cy="button-finish-course"
              >
                {t("finish")}
                <ChevronRight className="ml-2" />
              </Button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default LessonRenderer;
