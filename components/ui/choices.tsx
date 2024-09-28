import React, { useState, useEffect } from "react";
import InputFloatingLabel from "./inputFloatingLabel";
import { useTranslations } from "next-intl";

interface ChoicesInputComponentProps {
  onChoicesChange: (_choices: string[], _correctChoice: number) => void;
  initialChoices: Array<string>;
  initialCorrectChoice: number;
}

const ChoicesInputComponent: React.FC<ChoicesInputComponentProps> = ({
  onChoicesChange,
  initialChoices = ["", "", "", "", ""],
  initialCorrectChoice = 0,
}) => {
  const [choices, setChoices] = useState<string[]>(initialChoices);
  const [correctChoice, setCorrectChoice] = useState<number>(initialCorrectChoice);
  const t = useTranslations("backoffice");

  const handleChoiceChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = event.target.value;
    setChoices(updatedChoices);
  };

  const handleRadioChange = (index: number) => {
    setCorrectChoice(index);
  };

  useEffect(() => {
    onChoicesChange(choices, correctChoice);
  }, [choices, correctChoice]);

  return (
    <div className="flex flex-col">
      {choices.map((choice, index) => (
        <div key={index} className="flex items-center mb-4 w-[49%]">
          <InputFloatingLabel
            type="text"
            id={`Choice${index + 1}`}
            value={choice}
            onChange={handleChoiceChange(index)}
            label={`${t("choice")} ${index + 1} ${index >= 3 ? "(Optional)" : ""}`}
          />
          <label className="flex items-center ml-3">
            <input
              type="radio"
              name="correctChoice"
              checked={correctChoice === index}
              onChange={() => handleRadioChange(index)}
              className="accent-primary w-4 h-4"
            />
            <span className="ml-1">{t("correct")}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default ChoicesInputComponent;
