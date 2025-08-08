import React from "react";
import InputFloatingLabel from "./inputFloatingLabel";
import { useTranslations } from "next-intl";

interface ChoicesInputComponentProps {
  onChoicesChange: (_choices: string[], _correctChoice: number) => void;
  choices: string[];
  correctChoice: number;
}

const ChoicesInputComponent: React.FC<ChoicesInputComponentProps> = ({
  onChoicesChange,
  choices = ["", "", "", "", ""],
  correctChoice = 0,
}) => {
  const t = useTranslations("backoffice");

  const handleChoiceChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = event.target.value;
    onChoicesChange(updatedChoices, correctChoice);
  };

  const handleRadioChange = (index: number) => {
    onChoicesChange(choices, index);
  };

  return (
    <div className="flex flex-col">
      {choices.map((choice, index) => (
        <div key={index} className="flex items-center mb-4 w-[49%]">
          <InputFloatingLabel
            type="text"
            id={`Choice${index + 1}`}
            value={choice}
            onChange={handleChoiceChange(index)}
            label={`${t("choice")} ${index + 1} ${index >= 2 ? "(Optional)" : ""}`}
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
