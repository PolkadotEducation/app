"use client";

import { deleteChallengeById, getChallengesSummary } from "@/api/challengeService";
import { ChallengeSummary } from "@/types/challengeTypes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { DataTable } from "./_components/dataTable";
import { COLUMNS } from "./_components/columns";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { DeleteEntityModal } from "@/components/ui/deleteEntityModal";

const ChallengesPage = () => {
  const t = useTranslations("backoffice");
  const [challenges, setChallenges] = useState<ChallengeSummary[]>([]);
  const { toast } = useToast();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [triggeredRowId, setTriggeredRowId] = useState<string | undefined>();
  const { user } = useUser();

  // @TODO: Get teamId from selector
  const selectedTeamId = user?.teams?.length ? user?.teams[0].id : "";

  const getChallenges = async () => {
    const response = await getChallengesSummary();
    const sortedChallenges = response.sort((a, b) => {
      if (!a.updatedAt) return 1;
      if (!b.updatedAt) return -1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    setChallenges(sortedChallenges);
  };

  const deleteChallenge = async (id: string) => {
    const response = await deleteChallengeById(selectedTeamId, id);
    if (response) {
      await getChallenges();
      toast({
        title: t("entityDeletedSuccess"),
        variant: "default",
      });
      return;
    }
    toast({
      title: t("entityDeleteError"),
      variant: "destructive",
    });
  };

  useEffect(() => {
    getChallenges();
  }, []);

  return (
    <main className="max-w-7xl w-full pb-10">
      <h4 className="xl:mb-10 mb-6">{t("challengeLibrary")}</h4>
      <div className="p-6 bg-card rounded-[3px] flex flex-col">
        <DataTable
          columns={COLUMNS({
            deleteHandler: (id: string) => {
              setDeleteModalOpen(true);
              setTriggeredRowId(id);
            },
          })}
          data={challenges}
          updateData={getChallenges}
        />
      </div>
      <DeleteEntityModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        entityName={challenges.find((challenge) => challenge._id === triggeredRowId)?.question || ""}
        onSubmit={async () => {
          if (triggeredRowId) {
            await deleteChallenge(triggeredRowId);
            setDeleteModalOpen(false);
          }
        }}
        variant="challenge"
      />
    </main>
  );
};

export default ChallengesPage;
