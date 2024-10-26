"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import whiteLogo from "@/public/assets/icons/whiteLogo.svg";
import blackPinkBanner from "@/public/assets/banners/blackPink.svg";

const Course = ({ banner, title, link }: { banner: string; title: string; link: string }) => {
  const router = useRouter();

  return (
    <div
      className="max-w-[378px] w-full max-h-[408px] rounded-lg overflow-hidden shadow-md bg-card flex flex-col transition-transform duration-500 hover:scale-105 cursor-pointer"
      onClick={() => {
        return router.push(link);
      }}
    >
      <div className="relative w-full">
        <div
          className="min-w-[378px] min-h-[204px] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${blackPinkBanner.src})`,
          }}
        >
          <div className="p-4 flex-1">
            <h6 className="text-white">{title}</h6>
          </div>
          <Image src={whiteLogo} alt={""} height="24" className="absolute bottom-4 left-4" />
        </div>
      </div>
    </div>
  );
};

export default Course;
