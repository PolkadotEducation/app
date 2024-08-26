"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import LessonPage from "@/app/lesson/page";

const Editor = dynamic(() => import("@/components/ui/editor"), {
  ssr: false,
});

function MainPage() {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const markdownLessonTemplate =
    // eslint-disable-next-line max-len
    '<iframe\n    width="696"\n    height="400"\n    className="self-center"\n    src="https://www.youtube.com/embed/GhvUs0amvCc"\n    title="Me at the zoo"\n    frameborder="0"\n    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"\n    referrerpolicy="strict-origin-when-cross-origin"\n    allowfullscreen\n  ></iframe>\n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n ## Resumo\n\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  const reset = () => {
    setTitle("");
    setDifficulty("");
  };

  useEffect(() => {
    reset();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.info("submit");
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDifficulty(event.target.value);
  };

  const handlePreview = (showPreview: boolean) => {
    setShowPreview(showPreview);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (showPreview) {
    return (
      <>
        <header className="fixed w-full bg-primary text-white shadow-md p-4 flex justify-between items-center z-50">
          <h1 className="text-xl font-bold">You are previewing a lesson</h1>
          <Button
            className="bg-white text-primary font-semibold py-2 px-4"
            onClick={() => handlePreview(false)}
          >
            Back to Editor
          </Button>
        </header>
        <div className="pt-20">
          <LessonPage
            title={title}
            difficulty={difficulty}
            markdown={markdownLessonTemplate}
          />
        </div>
      </>
    );
  }

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
          <div className="border rounded-[7px] border-[#e0e0e0] w-full">
            <Suspense fallback={null}>
              <Editor markdown={markdownLessonTemplate} />
            </Suspense>
          </div>
        </div>
        <Button type="submit" className="mb-4 xl:mb-20">
          Create Lesson
        </Button>
        <Button
          type="button"
          variant="outline"
          className="mb-4 ml-2 xl:mb-20"
          onClick={() => handlePreview(true)}
        >
          Preview
        </Button>
      </form>
    </div>
  );
}

export default MainPage;
