"use client";

import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Badge from "@/components/ui/badge";

interface LessonRendererProps {
  title: string;
  difficulty: string;
  markdown: string;
  question: string;
  choices: string[];
}

const LessonRenderer = ({ title, difficulty, markdown, question, choices }: LessonRendererProps) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

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
      <div className="flex flex-col max-w-[696px] mdxeditor">
        <h6>
          {title ? title : "Title not set"}
          <Badge className="align-middle ml-2">{difficulty ? difficulty : "Difficulty not set"}</Badge>
        </h6>
        {mdxSource ? <MDXRemote {...mdxSource} /> : "Loading..."}
        <h2>Challenge</h2>
        <h3>{question ? question : "Challenge not set"}</h3>
        <div>
          {choices.map((option, index) => (
            <div key={index} className="mb-2">
              <label className="flex items-center">
                <input type="radio" name="choices" value={option} className="mr-2" />
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LessonRenderer;
