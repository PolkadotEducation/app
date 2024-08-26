"use client";

import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Badge from "@/components/ui/badge";

interface LessonPageProps {
  title: string;
  difficulty: string;
  markdown: string;
}

const LessonPage = ({ title, difficulty, markdown }: LessonPageProps) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null,
  );

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
        <h1>
          {title ? title : "Title not set"}
          <Badge className="align-middle ml-2">
            {difficulty ? difficulty : "Difficulty not set"}
          </Badge>
        </h1>
        {mdxSource ? <MDXRemote {...mdxSource} /> : "Loading..."}
      </div>
    </main>
  );
};

export default LessonPage;
