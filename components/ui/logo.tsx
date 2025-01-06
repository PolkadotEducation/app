"use client";

import Image from "next/image";
import logo from "@/public/assets/icons/logo.svg";
import whiteLogo from "@/public/assets/icons/whiteLogo.svg";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/theme/themeProvider";
import clsx from "clsx";

const Logo = ({
  pathToRedirect,
  theme,
  responsive,
}: {
  pathToRedirect?: string | undefined;
  theme?: "light" | "dark" | undefined;
  responsive?: boolean;
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

  const className = clsx("cursor-pointer w-auto", {
    "h-[8vh] max-h-14 min-h-10": responsive,
    "h-[40px]": !responsive,
  });

  return (
    <Image
      src={src}
      alt="Logo"
      onClick={() => {
        if (pathToRedirect) return router.push(pathToRedirect);
      }}
      className={className}
      data-cy="image-logo"
    />
  );
};

export default Logo;
