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

const CourseCardPreview = ({
  banner,
  title,
  link,
  onClickAction,
}: {
  banner: string;
  title: string;
  link?: string;
  onClickAction?: () => Promise<void> | void;
}) => {
  const router = useRouter();

  const isBlackBanner = banner === "blackPink" || banner === "blackPurple";
  const selectedBanner = bannerImages[banner]?.src || blackPinkBanner.src;
  const selectedLogo = isBlackBanner ? whiteLogo : logo;

  const handleClick = async () => {
    if (onClickAction) {
      try {
        await onClickAction();
      } catch {
        return;
      }
    }
    if (link) {
      router.push(link);
    }
  };

  return (
    <div
      className={`w-full rounded-lg overflow-hidden shadow-md bg-card flex transition-transform duration-500 hover:scale-105 ${
        link || onClickAction ? "cursor-pointer" : ""
      }`}
      onClick={handleClick}
    >
      <div className="relative w-full">
        <div
          className="min-w-[378px] min-h-[204px] bg-cover bg-center relative flex-1 flex items-center"
          style={{
            backgroundImage: `url(${selectedBanner})`,
          }}
        >
          <div className="w-1/2 p-4">
            <h6 className={`${isBlackBanner ? "text-white" : ""} text-sm`}>{title}</h6>
          </div>
          <Image src={selectedLogo} alt="Logo" height="20" className="absolute bottom-4 left-4" />
        </div>
      </div>
    </div>
  );
};

export default CourseCardPreview;
