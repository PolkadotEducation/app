import React from "react";
import tutorialIllustration from "../../public/assets/images/tutorial-illustration.svg";
import Image from "next/image";

const DailyChallengeBanner = () => {
  return (
    <div className="flex flex-1 rounded-lg bg-secondary-light p-4 md:p-5 items-center my-4">
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
  );
};

export default DailyChallengeBanner;
