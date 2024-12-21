"use client";

import RankingCard, { RankingCardProps } from "@/components/ui/rankingCard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useState } from "react";
import victor from "../../../public/assets/icons/victor-img.svg";

const Ranking = () => {
  const [selectedRank, setSelectedRank] = useState<string>("geral");

  const mockedRankingData: RankingCardProps[] = [
    {
      profilePicture: victor,
      rankPosition: 1,
      username: "TopPlayer",
      points: 1500,
    },
    {
      profilePicture: victor,
      rankPosition: 2,
      username: "SilverStar",
      points: 1400,
    },
    {
      profilePicture: victor,
      rankPosition: 3,
      username: "BronzeAce",
      points: 1300,
    },
    {
      profilePicture: victor,
      rankPosition: 4,
      username: "CompetitiveCat",
      points: 1200,
    },
    {
      profilePicture: victor,
      rankPosition: 5,
      username: "GameGuru",
      points: 1100,
    },
    {
      profilePicture: victor,
      rankPosition: 6,
      username: "StrategySage",
      points: 1000,
    },
    {
      profilePicture: victor,
      rankPosition: 7,
      username: "QuickThinker",
      points: 900,
    },
    {
      profilePicture: victor,
      rankPosition: 8,
      username: "LastLegend",
      points: 800,
    },
  ];

  const mixedRankingData: RankingCardProps[] = [
    {
      profilePicture: victor,
      rankPosition: 1,
      username: "CompetitiveCat",
      points: 1500,
    },
    {
      profilePicture: victor,
      rankPosition: 2,
      username: "QuickThinker",
      points: 1400,
    },
    {
      profilePicture: victor,
      rankPosition: 3,
      username: "GameGuru",
      points: 1300,
    },
    {
      profilePicture: victor,
      rankPosition: 4,
      username: "TopPlayer",
      points: 1200,
    },
    {
      profilePicture: victor,
      rankPosition: 5,
      username: "LastLegend",
      points: 1100,
    },
    {
      profilePicture: victor,
      rankPosition: 6,
      username: "SilverStar",
      points: 1000,
    },
    {
      profilePicture: victor,
      rankPosition: 7,
      username: "BronzeAce",
      points: 900,
    },
    {
      profilePicture: victor,
      rankPosition: 8,
      username: "StrategySage",
      points: 800,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <ToggleGroup
        type="single"
        className="justify-start"
        onValueChange={(value) => setSelectedRank(value)}
        value={selectedRank}
      >
        <ToggleGroupItem
          value="geral"
          className={`${selectedRank === "geral" && "border-b-2 border-primary"} rounded-none`}
        >
          Geral
        </ToggleGroupItem>
        <ToggleGroupItem
          value="semanal"
          className={`${selectedRank === "semanal" && "border-b-2 border-primary"} rounded-none`}
        >
          Semanal
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="bg-neutral-50 rounded-xl m-2 md:m-4 flex flex-col gap-2 p-5 md:p-6">
        {selectedRank === "geral"
          ? mockedRankingData.map((user) => (
              <RankingCard
                key={user.rankPosition}
                points={user.points}
                profilePicture={user.profilePicture}
                rankPosition={user.rankPosition}
                username={user.username}
              />
            ))
          : mixedRankingData.map((user) => (
              <RankingCard
                key={user.rankPosition}
                points={user.points}
                profilePicture={user.profilePicture}
                rankPosition={user.rankPosition}
                username={user.username}
              />
            ))}
      </div>
    </div>
  );
};

export default Ranking;
