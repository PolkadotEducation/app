"use client";

import Image from "next/image";
import logo from "@/public/assets/icons/logo.svg";
import whiteLogo from "@/public/assets/icons/whiteLogo.svg";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/theme/themeProvider";

const Logo = ({
  pathToRedirect,
  theme,
}: {
  pathToRedirect?: string | undefined;
  theme?: "light" | "dark" | undefined;
}) => {
  const router = useRouter();
  const { theme: appTheme } = useTheme();
  const isLightTheme = appTheme === "light";
  let src = "";

  if (!theme) {
    src = isLightTheme ? logo : whiteLogo;
  } else {
    src = theme === "dark" ? whiteLogo : logo;
  }

  return (
    <Image
      src={src}
      alt="Logo"
      onClick={() => {
        if (pathToRedirect) return router.push(pathToRedirect);
      }}
      className="w-auto cursor-pointer"
      data-cy="image-logo"
    />
  );
};

export default Logo;
