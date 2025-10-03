import React, { useState, useEffect } from "react";
import tutorialIllustration from "../../public/assets/images/tutorial-illustration.svg";
import Image from "next/image";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogFooter } from "./dialog";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Button } from "./button";
import successImage from "../../public/assets/images/success-daily-challenge.svg";
import errorImage from "../../public/assets/images/error-daily-challenge.svg";
import { useTranslations } from "next-intl";
import { useDailyChallenge } from "@/hooks/useDailyChallenge";

type DailyChallengeBannerProps = {
  challenge: { _id?: string; question: string; choices: string[]; difficulty: string } | null;
  isSubmitted: boolean;
  isCorrect: boolean | null;
};

const DailyChallengeBanner = ({ challenge, isSubmitted, isCorrect }: DailyChallengeBannerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [earnedXP, setEarnedXP] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedState, setIsSubmittedState] = useState(isSubmitted);
  const [isCorrectState, setIsCorrectState] = useState(isCorrect);
  const t = useTranslations("components");
  const { submitAnswer } = useDailyChallenge();

  useEffect(() => {
    setIsSubmittedState(isSubmitted);
  }, [isSubmitted]);

  useEffect(() => {
    setIsCorrectState(isCorrect);
  }, [isCorrect]);

  if (!challenge) return null;

  const handleSubmit = async () => {
    if (selectedOption === null || !challenge._id) return;

    setIsSubmitting(true);
    try {
      const result = await submitAnswer(challenge._id, selectedOption);

      const isResultCorrect = result.points > 0;
      setIsCorrectState(isResultCorrect);
      if (isResultCorrect) {
        setEarnedXP(result.points);
      }
    } finally {
      setIsSubmitting(false);
      setIsSubmittedState(true);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="flex flex-1 rounded-lg bg-secondary-light p-4 md:p-5 items-stretch cursor-pointer"
      >
        <div className="flex flex-col self-stretch">
          <div className="flex flex-col justify-center flex-1">
            <h4 className="text-xl md:text-4xl mb-2 text-black">{t("dailyChallenge.banner.title")}</h4>
            <p className="text-black">{t("dailyChallenge.banner.subtitle")}</p>
          </div>
          <p className="text-black text-xs">{t("dailyChallenge.reset")}</p>
        </div>
        <Image
          src={tutorialIllustration}
          alt="Tutorial image"
          className="ml-auto w-[160px] h-[160px] md:w-[240px] md:h-[240px]"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent showCloseButton style={{ width: "90%" }}>
          {!isSubmittedState && (
            <>
              <DialogHeader className="flex flex-col items-center">
                <DialogTitle>{t("dailyChallenge.dialog.title")}</DialogTitle>
              </DialogHeader>
              <div className="bg-[#552BBF] rounded-lg p-4 ">
                <h6 className="text-neutral-50 text-sm md:text-lg xl:text-2xl">{challenge.question}</h6>
              </div>
              <RadioGroup onValueChange={(value) => setSelectedOption(Number(value))}>
                {challenge.choices.map((option, index) => {
                  return (
                    <div className="flex items-center gap-2" key={index}>
                      <RadioGroupItem value={String(index)} id={`option-${index}`} />
                      <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                  );
                })}
              </RadioGroup>
              <DialogFooter className="mx-auto border">
                <Button
                  variant="default"
                  className="mx-auto"
                  onClick={handleSubmit}
                  disabled={selectedOption === null || isSubmitting}
                  loading={isSubmitting}
                >
                  {t("submitAnswer")}
                </Button>
              </DialogFooter>
            </>
          )}

          {isSubmittedState && isCorrectState && (
            <div className="flex flex-col items-center text-center gap-4">
              <DialogTitle>{t("dailyChallenge.dialog.title")}</DialogTitle>
              <Image src={successImage} alt={"success image"} />
              <div className="flex gap-4 items-center">
                <DialogTitle>{t("dailyChallenge.success.title")}</DialogTitle>
                <span className="bg-success rounded-full px-2 py-1 text-neutral-100 text-sm">+ {earnedXP} XP</span>
              </div>
              <p className="mt-2">{t("dailyChallenge.success.message")}</p>
            </div>
          )}

          {isSubmittedState && isCorrectState === false && (
            <div className="flex flex-col items-center text-center gap-4">
              <DialogTitle>{t("dailyChallenge.dialog.title")}</DialogTitle>
              <Image src={errorImage} alt={"success image"} />
              <div className="flex gap-4 items-center">
                <DialogTitle>{t("dailyChallenge.error.title")}</DialogTitle>
              </div>
              <p className="mt-2">{t("dailyChallenge.error.message")}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DailyChallengeBanner;
