"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";
import React, { useState } from "react";
import victor from "../../../public/assets/icons/victor-img.svg";
import goldCrown from "../../../public/assets/icons/gold-crown.svg";

const Ranking = () => {
  const [selectedRank, setSelectedRAnk] = useState<string>("geral");

  return (
    <div className="flex flex-col w-full border border-red-500">
      <ToggleGroup type="single" className="" onValueChange={(value) => setSelectedRAnk(value)}>
        <ToggleGroupItem value="geral" className="border-b-2 border-red-500 rounded-none">
          Geral
        </ToggleGroupItem>
        <ToggleGroupItem value="semanal">Semanal</ToggleGroupItem>
      </ToggleGroup>
      <div className="bg-neutral-50 rounded-lg p-2 flex justify-between">
        <div className="flex items-center gap-4">
          <span className="border border-neutral-600 rounded-full w-6 h-6 flex items-center justify-center">1</span>
          <div className="flex items-center gap-4">
            <Image src={victor} alt="Foto do perfil" height={40} width={40} />
            <div className="flex flex-col">
              <p>Victor Carvalho</p>
              <p className="text-sm font-bold">1.548 pontos</p>
            </div>
          </div>
        </div>
        <Image src={goldCrown} alt="gold crown" />
      </div>
    </div>
  );
};

export default Ranking;
