"use client";

import Image from "next/image";
import logo from "@/public/assets/icons/logo.svg";
import whiteLogo from "@/public/assets/icons/whiteLogo.svg";
import { useRouter } from "next/navigation";

const Logo = ({
  width,
  height,
  pathToRedirect,
  theme,
}: {
  width: number;
  height: number;
  pathToRedirect?: string | undefined;
  theme?: "light" | "dark" | undefined;
}) => {
  const router = useRouter();

  return (
    <Image
      src={theme === "dark" ? whiteLogo : logo}
      width={width}
      height={height}
      alt="Logo"
      onClick={() => {
        if (pathToRedirect) return router.push(pathToRedirect);
      }}
      className="cursor-pointer"
      data-cy="image-logo"
    />
  );
};

export default Logo;
