import React from "react";
import goldCrown from "../../public/assets/icons/gold-crown.svg";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import silverCrown from "../../public/assets/icons/silver-crown.svg";
import bronzeCrown from "../../public/assets/icons/bronze-crown.svg";

export interface RankingCardProps {
  profilePicture: string | StaticImport;
  rankPosition: number;
  username: string;
  points: number;
}

const RankingCard = ({ profilePicture, rankPosition, username, points }: RankingCardProps) => {
  const currentUser = "TopPlayer";
  return (
    <div
      className={`
        bg-neutral-50 rounded-lg p-3.5 flex justify-between
        ${rankPosition <= 3 ? "border border-neutral-300" : "border-b-2 border-neutral-300 rounded-none"}
        ${currentUser === username ? "border-primary" : "border-neutral-300"}
      `}
    >
      <div className="flex items-center gap-4">
        <span
          className={`border ${currentUser === username ? "border-primary" : "border-neutral-600"} rounded-full w-6 h-6 flex items-center justify-center ${currentUser === username && "text-primary"}`}
        >
          {rankPosition}
        </span>
        <div className="flex items-center gap-4">
          <Image src={profilePicture} alt="Foto do perfil" height={40} width={40} />
          <div className="flex flex-col">
            <p className={`${currentUser === username && "text-primary"}`}>{username}</p>
            <p
              className={`text-sm ${rankPosition <= 3 ? "font-bold" : ""} ${currentUser === username ? "text-primary" : "text-neutral-600"}`}
            >
              {points} pontos
            </p>
          </div>
        </div>
      </div>
      {rankPosition <= 3 && (
        <Image
          src={rankPosition === 3 ? bronzeCrown : rankPosition === 2 ? silverCrown : goldCrown}
          alt="gold crown"
          className="h-10 w-10 md:h-15 md:w-15 lg:h-15 lg:w-15"
        />
      )}
    </div>
  );
};

export default RankingCard;
