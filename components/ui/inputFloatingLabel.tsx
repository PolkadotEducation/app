"use client";
import React, { InputHTMLAttributes, useState } from "react";
import { Input } from "./input";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  additionalStyles?: string;
  value?: string;
  error?: string;
}

const InputFloatingLabel: React.FC<InputProps> = ({ label, id, additionalStyles, value, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputLabelStyles = () => {
    if (isFocused) {
      return `-top-2 text-xs ${error ? "text-[#BF2600]" : "text-[#E6007A]"}`;
    }

    if (value) {
      return `-top-2 text-xs ${error ? "text-[#BF2600]" : "text-[#1A1A1A]"}`;
    }

    return `top-2 text-base ${error ? "text-[#BF2600]" : "text-input"}`;
  };

  return (
    <div className="relative w-full">
      <Input
        {...props}
        id={id}
        className={`py-2 px-4 ${additionalStyles} ${isFocused && "border-transparent"}
        ${error && "text-[#BF2600] border-[#BF2600]"}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {label && (
        <label htmlFor={id} className={`absolute bg-background ml-1 transition-all ${handleInputLabelStyles()} px-1`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default InputFloatingLabel;
