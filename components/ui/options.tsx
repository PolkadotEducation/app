import React, { useState, useEffect } from "react";

interface OptionsInputComponentProps {
  onOptionsChange: (_options: string[]) => void;
}

const OptionsInputComponent: React.FC<OptionsInputComponentProps> = ({ onOptionsChange }) => {
  const [option1, setOption1] = useState<string>("");
  const [option2, setOption2] = useState<string>("");
  const [option3, setOption3] = useState<string>("");

  const handleOption1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption2(event.target.value);
  };

  const handleOption3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption3(event.target.value);
  };

  useEffect(() => {
    const updatedOptions = [option1, option2, option3].filter((option) => option !== "");
    onOptionsChange(updatedOptions);
  }, [option1, option2, option3]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={option1}
          onChange={handleOption1Change}
          placeholder="Option 1"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={option2}
          onChange={handleOption2Change}
          placeholder="Option 2"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={option3}
          onChange={handleOption3Change}
          placeholder="Option 3"
          className="border p-2"
        />
      </div>
    </div>
  );
};

export default OptionsInputComponent;
