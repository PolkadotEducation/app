"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.info("submit");
};

const Editor = dynamic(() => import("@/components/ui/editor"), {
  ssr: false,
});

function LessonPage() {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [markdownPreview, setMarkdownPreview] = useState(
    "# Hello World!\n\nlorem ipsum\n## First Lesson\n```tsx\nteste\n```",
  );

  const markdown = "";

  const reset = () => {
    setTitle("");
    setDifficulty("");
  };

  useEffect(() => {
    reset();
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDifficulty(event.target.value);
  };

  return (
    <div className="p-2 mt-20 w-full">
      <form onSubmit={handleSubmit}>
        <div className="w-[49%]">
          <InputFloatingLabel
            type="text"
            id="titleInput"
            value={title}
            onChange={handleTitleChange}
            label="Title"
            additionalStyles="mb-5"
          />
          <InputFloatingLabel
            type="text"
            id="difficultyInput"
            label="Difficulty"
            value={difficulty}
            onChange={handleDifficultyChange}
            additionalStyles="mb-5"
          />
        </div>
        <div className="flex justify-between mb-4">
          <div className="border rounded-[7px] border-[#e0e0e0] w-[49%]">
            <Suspense fallback={null}>
              <Editor
                markdown={markdown}
                onChange={(markdown) => {
                  console.info(markdown);
                  setMarkdownPreview(markdown);
                }}
              />
            </Suspense>
          </div>
          <div className="border rounded-[7px] border-[#e0e0e0] w-[49%]">
            <Suspense fallback={null}>
              <Editor
                markdown={markdownPreview}
                readOnly
                key={markdownPreview}
              />
            </Suspense>
          </div>
        </div>
        <Button type="submit" className="mb-4 xl:mb-20">
          Create Lesson
        </Button>
      </form>
    </div>
  );
}

export default LessonPage;
