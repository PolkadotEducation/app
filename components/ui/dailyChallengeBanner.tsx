import React, { useState } from "react";
import tutorialIllustration from "../../public/assets/images/tutorial-illustration.svg";
import Image from "next/image";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogFooter } from "./dialog";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Button } from "./button";
import successImage from "../../public/assets/images/success-daily-challenge.svg";
import errorImage from "../../public/assets/images/error-daily-challenge.svg";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const DailyChallengeBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>();
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);

  const question: Question = {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  };

  const handleSubmit = () => {
    if (selectedOption === question.correctAnswer) {
      setFeedback("success");
    } else {
      setFeedback("error");
    }
  };

  const resetChallenge = () => {
    setFeedback(null);
    setSelectedOption(null);
  };

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(true);
          resetChallenge();
        }}
        className="flex flex-1 rounded-lg bg-secondary-light p-4 md:p-5 items-center my-4 cursor-pointer"
      >
        <div className="flex gap-6 flex-col">
          <h4 className="text-xl md:text-4xl">Desafio do dia</h4>
          <p>Complete o desafio, ganhe pontos e avance no ranking!</p>
        </div>
        <Image
          src={tutorialIllustration}
          alt="Tutorial image"
          className="ml-auto w-[160px] h-[160px] md:w-[240px] md:h-[240px]"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent showCloseButton style={{ width: "90%" }}>
          {feedback === null && (
            <>
              <DialogHeader className="flex flex-col items-center">
                <DialogTitle>Desafio do dia</DialogTitle>
              </DialogHeader>
              <h6>Pergunta 21</h6>
              <div className="bg-[#552BBF] rounded-lg min-h-[272px] p-4 ">
                <h6 className="text-neutral-50 text-sm md:text-lg xl:text-2xl">{question.question}</h6>
              </div>
              <RadioGroup onValueChange={(value) => setSelectedOption(value)}>
                {question.options.map((option) => {
                  return (
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value={option} id={option} />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  );
                })}
              </RadioGroup>
              <DialogFooter className="mx-auto border">
                <Button variant="default" className="mx-auto" onClick={handleSubmit} disabled={!selectedOption}>
                  Responder
                </Button>
              </DialogFooter>{" "}
            </>
          )}

          {feedback === "success" && (
            <div className="flex flex-col items-center text-center gap-4">
              <DialogTitle>Desafio do dia</DialogTitle>
              <Image src={successImage} alt={"success image"} />
              <div className="flex gap-4 items-center">
                <DialogTitle>Você acertou!</DialogTitle>
                <span className="bg-success rounded-full px-2 py-1 text-neutral-100 text-sm">+ 50 XP</span>
              </div>
              <p className="mt-2">Parabéns! Você completou o desafio do dia. Continue assim e mostre sua evolução!</p>
              <Button variant="default" className="mt-4" onClick={() => setIsOpen(false)}>
                Ver ranking
              </Button>
            </div>
          )}

          {feedback === "error" && (
            <div className="flex flex-col items-center text-center gap-4">
              <DialogTitle>Desafio do dia</DialogTitle>
              <Image src={errorImage} alt={"success image"} />
              <div className="flex gap-4 items-center">
                <DialogTitle>Não foi dessa vez!</DialogTitle>
              </div>
              <p className="mt-2">Errar faz parte do aprendizado! Respire fundo, revise e tente novamente amanhã.</p>
              <Button variant="default" className="mt-4" onClick={() => setIsOpen(false)}>
                Ver ranking
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DailyChallengeBanner;
