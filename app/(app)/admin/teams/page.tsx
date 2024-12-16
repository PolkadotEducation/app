"use client";

import { getTeam } from "@/api/teamService";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
// import { useTranslations } from "next-intl";
import { getAppBaseUrl } from "@/helpers/environment";
import { TeamInfo } from "@/types/teamTypes";
import TeamViewerPage from "../_components/teamViewer";

const TeamPageInner = () => {
  const searchParams = useSearchParams();
  const [team, setTeam] = useState<TeamInfo>();
  // const t = useTranslations("admin");

  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      (async () => {
        const team = await getTeam(id);
        setTeam(team);
        if (!baseUrl) {
          const baseUrlFromServer = await getAppBaseUrl();
          setBaseUrl(baseUrlFromServer);
        }
      })();
    }
  }, [searchParams]);

  if (!team) {
    return <></>;
  }

  return (
    <main className="max-w-7xl w-full pb-6">
      <h4 className="xl:mb-6 mb-4">Team: {team.name}</h4>
      <div className="mt-6 xl:bg-card rounded-sm flex flex-col items-center py-6">
        <TeamViewerPage
          id={team.id}
          owner={team.owner}
          name={team.name}
          description={team.description}
          picture={team.picture}
          changeTab={() => {}}
        />
      </div>
    </main>
  );
};

export default function TeamPage() {
  return (
    <Suspense>
      <TeamPageInner />
    </Suspense>
  );
}
