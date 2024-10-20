"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Course = ({ banner, title, link }: { banner: string; title: string; link: string }) => {
  const router = useRouter();

  return (
    <div
      className="max-w-[378px] w-full max-h-[408px] h-full rounded-lg overflow-hidden shadow-md bg-card flex flex-col transition-transform duration-500 hover:scale-105 cursor-pointer"
      onClick={() => {
        return router.push(link);
      }}
    >
      <div className="relative w-full h-1/2">
        <Image src={banner} alt={""} fill sizes="378px" />
      </div>
      <div className="p-8 flex-1">
        <h6 className="text-body1 mt-2">{title}</h6>
      </div>
    </div>
  );
};

export default Course;
