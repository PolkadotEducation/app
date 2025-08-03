"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getChallengesSummary } from "@/api/challengeService";
import { ChallengeSummary, ChallengeType } from "@/types/challengeTypes";

interface ChallengeSelectorProps {
  value?: ChallengeType;
  onChange: (_value: string) => void;
  error?: string;
  language?: string;
}

export function ChallengeSelector({ value, onChange, error, language }: ChallengeSelectorProps) {
  const [challenges, setChallenges] = useState<ChallengeSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslations("backoffice");

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        const challengesSummary = await getChallengesSummary(language);
        setChallenges(challengesSummary);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    if (language) {
      fetchChallenges();
    }
  }, [language]);

  const filteredChallenges = challenges.filter((challenge) =>
    challenge.question.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedChallenge = challenges.find((challenge) => challenge._id === value?._id);

  return (
    <div className="flex flex-col">
      <p className="text-xs mb-2">{t("selectChallenge")}</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mb-2" data-testid="challenge-select">
          <SelectValue placeholder={loading ? "Loading challenges..." : "Select a challenge"}>
            {selectedChallenge ? selectedChallenge.question : undefined}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <Input
              placeholder={t("searchChallenge")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
          </div>
          {!language ? (
            <SelectItem value="no-language" disabled>
              {t("selectLanguageFirst")}
            </SelectItem>
          ) : filteredChallenges.length === 0 ? (
            <SelectItem value="no-challenges" disabled>
              {loading ? "Loading..." : t("noChallengesFound")}
            </SelectItem>
          ) : (
            filteredChallenges.map((challenge) => (
              <SelectItem value={challenge._id} key={challenge._id} data-testid={`challenge-option-${challenge._id}`}>
                <div className="flex flex-col">
                  <span className="font-medium">{challenge.question}</span>
                  <span className="text-sm text-muted-foreground">{challenge.difficulty}</span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 mt-1 mb-5 form-error">{error}</p>}
    </div>
  );
}
