"use client";

import { createChallenge } from "@/api/challengeService";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { ChallengeFormData } from "../_components/challengeUtils";
import { ChallengeForm } from "../_components/challengeForm";

function CreateChallengePage() {
  const { user } = useUser();
  const t = useTranslations("backoffice");
  const { toast } = useToast();
  const router = useRouter();

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
      const response = await createChallenge(selectedTeamId, challengeData);
      if (response) {
        router.push("/backoffice/challenges");
      } else {
        toast({
          title: t("challengeCreationFailure"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating challenge:", error);
      toast({
        title: t("challengeCreationFailure"),
        variant: "destructive",
      });
    }
  };

  return <ChallengeForm onSubmit={handleSubmit} />;
}

export default CreateChallengePage;
