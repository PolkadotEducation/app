"use client";

import RankingCard from "@/components/ui/rankingCard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useState } from "react";
import victor from "../../../public/assets/icons/victor-img.svg";

const Ranking = () => {
  const [selectedRank, setSelectedRAnk] = useState<string>("geral");

  return (
    <div className="flex flex-col w-full">
      <ToggleGroup
        type="single"
        className="justify-start"
        onValueChange={(value) => setSelectedRAnk(value)}
        value={selectedRank}
      >
        <ToggleGroupItem
          value="geral"
          className={`${selectedRank === "geral" && "border-b-2 border-red-500"} rounded-none`}
        >
          Geral
        </ToggleGroupItem>
        <ToggleGroupItem
          value="semanal"
          className={`${selectedRank === "semanal" && "border-b-2 border-red-500"} rounded-none`}
        >
          Semanal
        </ToggleGroupItem>
        <RankingCard points={1538} profilePicture={victor} rankPosition={1} username="Victor Carvalho" />
      </ToggleGroup>
    </div>
  );
};

export default Ranking;
