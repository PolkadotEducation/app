"use client";

import { useTheme } from "@/context/theme/themeProvider";
import { Sun, Moon } from "lucide-react";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  const isLightTheme = theme === "light";

  const handleSwitchClick = () => {
    toggleTheme();
  };

  return (
    <div
      className="flex w-[80px] rounded-full border border-border-gray p-1 cursor-pointer transition-colors duration-300 bg-background"
      onClick={handleSwitchClick}
    >
      <div
        className={`flex items-center justify-center w-6 h-6 rounded-full transform transition-transform duration-300 ease-in-out ${isLightTheme ? "translate-x-0" : "translate-x-[46px]"}`}
      >
        {isLightTheme ? (
          <Sun className="transition-transform duration-300 ease-in-out" />
        ) : (
          <Moon className="transition-transform duration-300 ease-in-out" />
        )}
      </div>
    </div>
  );
};

export default ThemeSwitch;
