import React from "react";
import Image from "next/image";
import rankStar from "../../public/assets/icons/level-star.svg";
import globalRank from "../../public/assets/icons/global-rank.svg";
import weeklyRank from "../../public/assets/icons/weekly-rank.svg";
import victor from "../../public/assets/icons/victor-img.svg";

const menuItems = [
  {
    id: 0,
    title: "Level",
    icon: rankStar,
    rank: 6,
    styles: "flex flex-col items-center justify-center text-neutral-50 px-10 gap-1",
    alt: "Level star",
  },
  {
    id: 1,
    title: "Rank Geral",
    icon: globalRank,
    rank: 162,
    styles:
      "flex flex-col items-center justify-center text-neutral-50 px-10 border-r border-l border-neutral-300 gap-1",
    alt: "Global Rank",
  },
  {
    id: 2,
    title: "Rank Sem.",
    icon: weeklyRank,
    rank: 16,
    styles: "flex flex-col items-center justify-center text-neutral-50 px-10 gap-1",
    alt: "Weekly rank",
  },
];
const RankBanner = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 justify-center md:flex-row">
        <h5>Victor Carvalho</h5>
        <Image src={victor} alt="Victor" />
      </div>
      <ul className="flex gap-4 items-center justify-center bg-secondary-main w-[max-content] py-2 px-4 rounded-xl">
        {menuItems.map((item) => {
          return (
            <li className={item.styles}>
              <Image src={item.icon} alt="Level star" /> <p>{item.title}</p> <p>#{item.rank}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RankBanner;
