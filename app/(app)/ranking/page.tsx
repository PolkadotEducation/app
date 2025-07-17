"use client";

import RankingCard, { RankingCardProps } from "@/components/ui/rankingCard";
import React, { useEffect, useState } from "react";
import victor from "../../../public/assets/icons/victor-img.svg";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRanking } from "@/api/rankingService";
import { RankingType } from "@/types/rankingTypes";

const Ranking = () => {
  const [activeTab, setActiveTab] = useState("geral");
  const [, setRanking] = useState<RankingType>();

  const getData = async () => {
    // TODO type should be "weekly" or "general"
    const data = await getRanking("general");
    setRanking(data);
  };

  useEffect(() => {
    getData();
  }, []);

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
      <Tabs defaultValue="geral" className="justify-start" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="geral" className={`rounded-none`}>
            Geral
          </TabsTrigger>
          <TabsTrigger value="semanal" className={`rounded-none`}>
            Semanal
          </TabsTrigger>
        </TabsList>
        {activeTab === "geral" && (
          <div className="bg-neutral-50 rounded-xl m-2 md:m-4 flex flex-col gap-2 p-5 md:p-6">
            {mockedRankingData.map((user) => (
              <RankingCard
                key={user.rankPosition}
                points={user.points}
                profilePicture={user.profilePicture}
                rankPosition={user.rankPosition}
                username={user.username}
              />
            ))}
          </div>
        )}
        {activeTab === "semanal" && (
          <div className="bg-neutral-50 rounded-xl m-2 md:m-4 flex flex-col gap-2 p-5 md:p-6">
            {mixedRankingData.map((user) => (
              <RankingCard
                key={user.rankPosition}
                points={user.points}
                profilePicture={user.profilePicture}
                rankPosition={user.rankPosition}
                username={user.username}
              />
            ))}
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default Ranking;
