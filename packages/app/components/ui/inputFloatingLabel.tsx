"use client";
import { InputHTMLAttributes, useState, forwardRef } from "react";
import { Input } from "./input";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  additionalStyles?: string;
  value?: string;
  error?: string;
}

const InputFloatingLabel = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, additionalStyles, value, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleInputLabelStyles = () => {
      if (isFocused) {
        return `-top-2 text-xs ${error ? "text-error" : "text-text-primary"}`;
      }

      if (value) {
        return `-top-2 text-xs ${error ? "text-error" : "text-text-primary"}`;
      }

      return `top-2 text-base ${error ? "text-error" : "text-text-primary"}`;
    };

    return (
      <div className="relative w-full">
        <Input
          {...props}
          id={id}
          value={value}
          ref={ref}
          className={`py-2 px-4 bg-transparent border-border-gray ${additionalStyles} ${
            isFocused ? "border-transparent" : ""
          } ${error ? "text-error border-error mb-0" : ""}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {label && (
          <label htmlFor={id} className={`absolute bg-card ml-1 transition-all ${handleInputLabelStyles()} px-1`}>
            {label}
          </label>
        )}
        {error && <p className="text-red-500 mt-1 mb-5 form-error">{error}</p>}
      </div>
    );
  },
);

InputFloatingLabel.displayName = "InputFloatingLabel";

export default InputFloatingLabel;
