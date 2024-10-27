"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/assets/icons/logo.svg";
import whiteLogo from "@/public/assets/icons/whiteLogo.svg";
import blackPinkBanner from "@/public/assets/banners/blackPink.svg";
import blackPurpleBanner from "@/public/assets/banners/blackPurple.svg";
import tetrisBanner from "@/public/assets/banners/tetris.svg";
import gradientBanner from "@/public/assets/banners/gradient.svg";

const bannerImages: { [key: string]: StaticImageData } = {
  blackPink: blackPinkBanner,
  blackPurple: blackPurpleBanner,
  tetris: tetrisBanner,
  gradient: gradientBanner,
};

const CourseCard = ({
  banner,
  title,
  link,
  variant,
}: {
  banner: string;
  title: string;
  link?: string;
  variant: "full" | "preview";
}) => {
  const router = useRouter();

  const isBlackBanner = banner === "blackPink" || banner === "blackPurple";
  const selectedBanner = bannerImages[banner]?.src || blackPinkBanner.src;
  const selectedLogo = isBlackBanner ? whiteLogo : logo;

  return (
    <div
      className={`${variant === "full" ? "w-full" : "w-full md:w-1/2 lg:w-1/3"} rounded-lg overflow-hidden shadow-md bg-card flex flex-col transition-transform duration-500 hover:scale-105 ${
        link ? "cursor-pointer" : ""
      }`}
      onClick={() => {
        if (link) router.push(link);
      }}
    >
      <div className="relative w-full">
        <div
          className={`${variant === "full" ? "min-h-[204px] md:min-h-[440px]" : "min-h-[204px]"} bg-cover bg-center relative flex-1 flex items-center`}
          style={{
            backgroundImage: `url(${selectedBanner})`,
          }}
        >
          <div className="w-1/2 p-4">
            <h6
              className={`${isBlackBanner ? "text-white" : ""} ${variant === "preview" ? "text-sm" : "md:text-3xl text-sm"}`}
            >
              {title}
            </h6>
          </div>
          <Image src={selectedLogo} alt="Logo" height="20" className="absolute bottom-4 left-4" />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
