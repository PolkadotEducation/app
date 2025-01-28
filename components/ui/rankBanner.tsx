import React from "react";
import Image from "next/image";
import rankStar from "../../public/assets/icons/level-star.svg";
import globalRank from "../../public/assets/icons/global-rank.svg";
import weeklyRank from "../../public/assets/icons/weekly-rank.svg";
import Link from "next/link";
import { UserInfo } from "@/types/userTypes";

interface RankBannerProps {
  user: UserInfo | null;
}
const menuItems = [
  {
    id: 0,
    title: "Level",
    icon: rankStar,
    rank: 6,
    styles: "flex flex-col items-center justify-center text-neutral-50 px-9 md:px-10 gap-1",
    alt: "Level star",
  },
  {
    id: 1,
    title: "Rank Geral",
    icon: globalRank,
    rank: 162,
    styles:
      "flex flex-col items-center justify-center text-neutral-50 px-4 md:px-10 border-r border-l border-neutral-300 gap-1",
    alt: "Global Rank",
  },
  {
    id: 2,
    title: "Rank Sem.",
    icon: weeklyRank,
    rank: 16,
    styles: "flex flex-col items-center justify-center text-neutral-50 px-4 md:px-10 gap-1",
    alt: "Weekly rank",
  },
];
const RankBanner = ({ user }: RankBannerProps) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 justify-center md:flex-row">
        <h5>{user?.name}</h5>
        {user?.picture ? (
          <Image src={user?.picture!} alt={user?.name!} />
        ) : (
          <div
            className="xl:min-w-[120px] xl:min-h-[120px] w-[80px] h-[80px] mr-[14px]
            rounded-full bg-[#321D47] flex items-center justify-center"
          >
            <p className="unbound-font text-white font-bold text-3xl">{(user?.name || "").charAt(0).toUpperCase()}</p>
          </div>
        )}
      </div>
      <ul className="flex md:gap-4 items-center justify-center bg-secondary-main w-[max-content] py-2 md:px-4 rounded-xl">
        {menuItems.map((item) => {
          return (
            <Link href={"/ranking"} key={item.title}>
              <li className={item.styles}>
                <Image src={item.icon} alt="Level star" /> <p>{item.title}</p> <p>#{item.rank}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default RankBanner;
