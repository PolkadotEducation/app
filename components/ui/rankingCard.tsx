import React from "react";
import goldCrown from "../../public/assets/icons/gold-crown.svg";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface RankingCardProps {
  profilePicture: string | StaticImport;
  rankPosition: number;
  username: string;
  points: number;
}

const RankingCard = ({ profilePicture, rankPosition, username, points }: RankingCardProps) => {
  return (
    <div className="bg-neutral-50 rounded-lg p-2 flex justify-between">
      <div className="flex items-center gap-4">
        <span className="border border-neutral-600 rounded-full w-6 h-6 flex items-center justify-center">
          {rankPosition}
        </span>
        <div className="flex items-center gap-4">
          <Image src={profilePicture} alt="Foto do perfil" height={40} width={40} />
          <div className="flex flex-col">
            <p>{username}</p>
            <p className="text-sm font-bold">{points}</p>
          </div>
        </div>
      </div>
      <Image src={goldCrown} alt="gold crown" />
    </div>
  );
};

export default RankingCard;
