"use client";

import RankingCard from "@/components/ui/rankingCard";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRanking } from "@/api/rankingService";
import { RankingType } from "@/types/rankingTypes";
import { useTranslations } from "next-intl";

const Ranking = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [ranking, setRanking] = useState<RankingType>();
  const t = useTranslations("ranking");

  const getData = async () => {
    const data = await getRanking(activeTab);
    setRanking(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Tabs defaultValue="general" className="justify-start" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="general" className={`rounded-none`}>
            {t("general")}
          </TabsTrigger>
          <TabsTrigger value="weekly" className={`rounded-none`}>
            {t("weekly")}
            Geral
          </TabsTrigger>
          <TabsTrigger value="weekly" className={`rounded-none`}>
            Semanal
          </TabsTrigger>
        </TabsList>
        {activeTab === "general" && (
          <div className="bg-neutral-50 rounded-xl m-2 md:m-4 flex flex-col gap-2 p-5 md:p-6">
            {ranking?.ranking
              .sort((a, b) => b.xp - a.xp)
              .map((user, index) => (
                <RankingCard
                  key={user.userId}
                  points={user.xp}
                  profilePicture={user.picture!}
                  rankPosition={index + 1}
                  username={user.name}
                />
              ))}
          </div>
        )}
        {activeTab === "weekly" && (
          <div className="bg-neutral-50 rounded-xl m-2 md:m-4 flex flex-col gap-2 p-5 md:p-6">
            {ranking?.ranking
              .sort((a, b) => b.xp - a.xp)
              .map((user, index) => (
                <RankingCard
                  key={user.userId}
                  points={user.xp}
                  profilePicture={user.picture!}
                  rankPosition={index + 1}
                  username={user.name}
                />
              ))}
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default Ranking;
