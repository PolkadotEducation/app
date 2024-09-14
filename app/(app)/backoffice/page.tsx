"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import ChoicesInputComponent from "@/components/ui/choices";
import LessonRenderer from "@/components/ui/renderer";
import { createLesson } from "@/api/lessonService";

const Editor = dynamic(() => import("@/components/ui/editor"), {
  ssr: false,
});

function MainPage() {
  const markdownLessonTemplate: string =
    '<iframe\n    width="696"\n    height="400"\n    className="self-center"\n    src="https://www.youtube.com/embed/GhvUs0amvCc"\n    title="Me at the zoo"\n    frameborder="0"\n    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"\n    referrerpolicy="strict-origin-when-cross-origin"\n    allowfullscreen\n  ></iframe>\n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n ## Summary\n\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [markdownBody, setMarkdownBody] = useState(markdownLessonTemplate);
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState<string[]>(["", "", "", "", ""]);
  const [correctChoice, setCorrectChoice] = useState<number>(0);

  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lessonData = {
      title,
      body: markdownBody,
      difficulty,
      challenge: {
        question: question,
        choices: choices,
        correctChoice: correctChoice,
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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty(event.target.value);
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleChoicesChange = (updatedChoices: string[], selectedCorrectChoice: number) => {
    setChoices(updatedChoices);
    setCorrectChoice(selectedCorrectChoice);
  };

  const handleEditorChange = (newMarkdownBody: string) => {
    setMarkdownBody(newMarkdownBody);
  };

  const handlePreview = (showPreview: boolean) => {
    setShowPreview(showPreview);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (showPreview) {
    return (
      <>
        <header className="absolute w-full bg-primary text-white shadow-md p-4 flex justify-between items-center z-50">
          <h6>You are previewing a lesson</h6>
          <Button className="bg-white text-primary font-semibold py-2 px-4" onClick={() => handlePreview(false)}>
            Back to Editor
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
          <div className="border rounded-[7px] border-border-gray w-full">
            <Suspense fallback={null}>
              <Editor markdown={markdownBody} onChange={handleEditorChange} />
            </Suspense>
          </div>
        </div>

        <div className="w-[49%]">
          <InputFloatingLabel
            type="text"
            id="questionInput"
            value={question}
            onChange={handleQuestionChange}
            label="Question"
            additionalStyles="mb-5"
          />
        </div>

        <ChoicesInputComponent
          onChoicesChange={handleChoicesChange}
          initialChoices={choices}
          initialCorrectChoice={correctChoice}
        />

        <Button type="submit" className="my-10">
          Create Lesson
        </Button>

        <Button type="button" variant="outline" className="my-10 ml-2" onClick={() => handlePreview(true)}>
          Preview
        </Button>
      </form>
    </div>
  );
}

export default MainPage;
