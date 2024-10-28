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
}: LessonRendererProps) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const { user } = useUser();
  const t = useTranslations("components");

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

  const onSubmitAnswer = async () => {
    if (!user?.id || !courseId || !lessonId || (!selectedChoice && selectedChoice != 0)) {
      toast({
        title: "Error: missing data",
        variant: "destructive",
      });
      return;
    }

    const progressData = {
      userId: user?.id,
      courseId: courseId,
      lessonId: lessonId,
      choice: selectedChoice,
    };

    try {
      const response = await submitAnswer(progressData);
      if (response) {
        toast({
          title: "foi",
          variant: "default",
        });
      } else {
        toast({
          title: "não foi",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast({
        title: "deu erro",
        variant: "destructive",
      });
    }
  };

  const handleSubmitAndswer = () => {
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
                    />
                    {option}
                  </label>
                </div>
              ))}
            <Button
              className={`w-fit mt-4 ${isOnCooldown ? "mb-0" : "mb-4"}`}
              onClick={() => handleSubmitAndswer()}
              disabled={isOnCooldown}
            >
              {t("submitAnswer")}
            </Button>
            {isOnCooldown && (
              <p className="text-body2 text-text-secondary">{t("submitCooldown", { cooldown: cooldownTime })}</p>
            )}
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
