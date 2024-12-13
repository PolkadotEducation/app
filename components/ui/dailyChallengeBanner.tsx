import React, { useState } from "react";
import tutorialIllustration from "../../public/assets/images/tutorial-illustration.svg";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

const DailyChallengeBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDailyChallenge = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={() => handleOpenDailyChallenge()}
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
      <Dialog open={isOpen}>
        <DialogContent className="pointer-events-none">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailyChallengeBanner;
