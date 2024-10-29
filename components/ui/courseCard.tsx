"use client";

import Image, { StaticImageData } from "next/image";
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

const CourseCard = ({ banner, title }: { banner: string; title: string; link?: string }) => {
  const isBlackBanner = banner === "blackPink" || banner === "blackPurple";
  const selectedBanner = bannerImages[banner]?.src || blackPinkBanner.src;
  const selectedLogo = isBlackBanner ? whiteLogo : logo;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md bg-card flex flex-col">
      <div className="relative w-full">
        <div
          className="min-h-[204px] md:min-h-[440px] bg-cover bg-center relative flex-1 flex items-center"
          style={{
            backgroundImage: `url(${selectedBanner})`,
          }}
        >
          <div className="w-1/2 p-4 md:p-8">
            <h6 className={`${isBlackBanner ? "text-white" : ""} md:text-3xl text-sm`}>{title}</h6>
          </div>
          <Image
            src={selectedLogo}
            alt="Logo"
            className="absolute bottom-4 left-4 md:bottom-8 md:left-8 max-w-[69px] max-h-[20px] md:max-w-[150px] md:max-h-[44px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
