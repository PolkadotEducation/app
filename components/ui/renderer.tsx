"use client";

import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Badge from "@/components/ui/badge";
import { Button } from "./button";
import { useTranslations } from "next-intl";

interface LessonRendererProps {
  title: string;
  difficulty: string;
  markdown: string;
  question: string;
  choices: string[];
}

const LessonRenderer = ({ title, difficulty, markdown, question, choices }: LessonRendererProps) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
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

  return (
    <main className="w-full flex justify-center">
      <div className="flex flex-col max-w-7xl mdxeditor pb-8">
        <h1>
          {title ? title : "Title not set"}
          <Badge className="align-middle ml-2">{difficulty ? difficulty : "Difficulty not set"}</Badge>
        </h1>
        {mdxSource ? <MDXRemote {...mdxSource} /> : "Loading..."}
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
            <Button className="w-fit mt-4">{t("submitAnswer")}</Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default LessonRenderer;
