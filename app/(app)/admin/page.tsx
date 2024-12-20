"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/useUser";
import Loading from "@/components/ui/loading";
import { useEffect, useState } from "react";
import CourseCardPreview from "@/components/ui/courseCardPreview";
import { getAllTeams } from "@/api/teamService";
import { useRouter } from "next/navigation";
import { TeamInfo } from "@/types/teamTypes";
import TeamViewerPage from "./_components/teamViewer";

const ProfilePage = () => {
  const t = useTranslations("admin");
  const { userLoading } = useUser();
  const [tab, setTab] = useState("teams");
  const [teams, setTeams] = useState<TeamInfo[]>([]);
  const router = useRouter();

  if (userLoading) {
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  }

  const getTeams = async () => {
    const teams = await getAllTeams();
    setTeams(teams);
  };

  useEffect(() => {
    getTeams();
  }, [tab]);

  const handleTeamClick = async (teamId: string) => {
    router.push(`/admin/teams?id=${teamId}`);
  };

  const changeTab = (value: string) => {
    setTab(value);
  };

  return (
    <main className="max-w-7xl w-full">
      <h4 className="xl:mb-6 mb-4">{t("dashboard")}</h4>
      <div className="mt-6">
        <Tabs value={tab} onValueChange={changeTab}>
          <TabsList className="w-fit">
            <TabsTrigger value="teams">
              <span className="unbound-font text-sm font-medium">{t("teams")}</span>
            </TabsTrigger>
            <TabsTrigger value="create">
              <span className="unbound-font text-sm font-medium">{t("create")}</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="teams" className="xl:pt-4 pt-2">
            <h5>{t("teams")}</h5>
            <div className="flex flex-row flex-wrap w-full pt-6">
              {teams &&
                teams.map((i: TeamInfo) => (
                  <div className="pb-4 pr-4 w-full md:w-1/2 lg:w-1/3" key={i.id}>
                    {/* TODO: Reusing Course Card */}
                    <CourseCardPreview
                      banner="blackPink"
                      title={i.name}
                      key={i.id}
                      onClickAction={() => handleTeamClick(i.id)}
                    />
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="create" className="xl:pt-4 pt-2">
            <h5>{t("create")}</h5>
            <div className="flex flex-row flex-wrap w-full pt-6">
              <TeamViewerPage changeTab={changeTab} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProfilePage;
