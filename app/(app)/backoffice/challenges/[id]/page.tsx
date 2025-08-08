"use client";

import { useEffect, useState } from "react";
import { getChallengeById, updateChallengeById } from "@/api/challengeService";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/useToast";
import { ChallengeType } from "@/types/challengeTypes";
import Loading from "@/components/ui/loading";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { ChallengeFormData } from "../_components/challengeUtils";
import { ChallengeForm } from "../_components/challengeForm";

function EditChallengePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [originalChallenge, setOriginalChallenge] = useState<ChallengeType | null>();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const t = useTranslations("backoffice");
  const { toast } = useToast();
  const router = useRouter();

  const getChallengeData = async () => {
    try {
      const challenge = await getChallengeById(id);
      setOriginalChallenge(challenge);
    } catch (error) {
      console.error("Error fetching challenge data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getChallengeData();
    }
  }, [id]);

  // @TODO: Get teamId from selector
  const selectedTeamId = user?.teams?.length ? user?.teams[0].id : "";

  const handleSubmit = async (data: ChallengeFormData) => {
    const challengeData = {
      teamId: selectedTeamId,
      question: data.question,
      choices: data.choices,
      correctChoice: data.correctChoice,
      difficulty: data.difficulty,
      language: data.language,
    };

    try {
      const response = await updateChallengeById(selectedTeamId, id, challengeData);
      if (response) {
        router.push("/backoffice/challenges");
      } else {
        toast({
          title: t("challengeUpdateFailure"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating challenge:", error);
      toast({
        title: t("challengeUpdateFailure"),
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  }

  if (!originalChallenge) {
    return <div>{t("errorLoadingChallenge")}</div>;
  }

  return <ChallengeForm challenge={originalChallenge} onSubmit={handleSubmit} />;
}

export default EditChallengePage;
