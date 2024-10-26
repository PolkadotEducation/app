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

interface LessonRendererProps {
  title: string;
  difficulty: string;
  markdown: string;
  question: string;
  choices: string[];
  onSubmitAnswer?: () => Promise<void>;
  nextLesson: string | null;
  previousLesson: string | null;
}

const LessonRenderer = ({
  title,
  difficulty,
  markdown,
  question,
  choices,
  onSubmitAnswer,
  nextLesson,
  previousLesson,
}: LessonRendererProps) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const t = useTranslations("components");
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

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

  const handleSubmitAndswer = () => {
    if (isOnCooldown) return;
    if (onSubmitAnswer) {
      // TODO add submission logic (does the function needs to be a prop?)
      onSubmitAnswer();
    }
    setIsOnCooldown(true);
    setCooldownTime(10);
  };

  return (
    <main className="w-full flex justify-center">
      <div className="flex flex-col max-w-7xl mdxeditor pb-8">
        <h1>
          {title ? title : "Title not set"}
          <Badge className="align-middle ml-2">{difficulty ? difficulty : "Difficulty not set"}</Badge>
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
                    <input type="radio" name="choices" value={option} className="mr-2 accent-primary w-4 h-4" />
                    {option}
                  </label>
                </div>
              ))}
            <Button className={`w-fit mt-4 ${isOnCooldown ? "mb-0" : "mb-4"}`} onClick={() => handleSubmitAndswer()}>
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
              <Link href={`/lesson/${previousLesson}`}>
                <Button variant="link" className="p-0 hover:bg-transparent">
                  <ChevronLeft className="mr-2" />
                  {t("previousLesson")}
                </Button>
              </Link>
            )}
            {nextLesson && (
              <Link href={`/lesson/${nextLesson}`}>
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
