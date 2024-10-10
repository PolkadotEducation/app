"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Course = ({ banner, title, link }: { banner: string; title: string; link: string }) => {
  const router = useRouter();

  return (
    <div
      className="p-10 border rounded-lg bg-white w-fit card transition-transform duration-500 hover:scale-105 cursor-pointer"
      onClick={() => {
        return router.push(link);
      }}
    >
      <Image src={banner} alt={""} width="272" height="150" className="border rounded-xl mb-5" />
      <h6>{title}</h6>
    </div>
  );
};

export default Course;
