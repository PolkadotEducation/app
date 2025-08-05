"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import * as Popover from "@radix-ui/react-popover";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Search, ChevronDown, X } from "lucide-react";
import { getChallengesSummary } from "@/api/challengeService";
import { ChallengeSummary, ChallengeType } from "@/types/challengeTypes";

interface ChallengeSelectorProps {
  value?: ChallengeType;
  onChange: (_value: string) => void;
  error?: string;
  language?: string;
}

const DIFFICULTY_TAGS = ["easy", "medium", "hard"] as const;
type DifficultyTag = (typeof DIFFICULTY_TAGS)[number];

export function ChallengeSelector({ value, onChange, error, language }: ChallengeSelectorProps) {
  const [challenges, setChallenges] = useState<ChallengeSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("backoffice");

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

  useEffect(() => {
    if (language) {
      fetchChallenges();
    }
  }, [language]);

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const matchesText = challenge.question.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        difficultyFilter.length === 0 || difficultyFilter.includes(challenge.difficulty as DifficultyTag);
      return matchesText && matchesDifficulty;
    });
  }, [challenges, searchTerm, difficultyFilter]);

  const selectedChallenge = challenges.find((challenge) => challenge._id === value?._id);

  const clearFilters = () => {
    setSearchTerm("");
    setDifficultyFilter([]);
  };

  const totalFilters = (searchTerm ? 1 : 0) + difficultyFilter.length;

  if (!language) {
    return (
      <div className="flex flex-col">
        <p className="text-xs mb-2">{t("selectChallenge")}</p>
        <div className="text-sm text-muted-foreground p-3 border rounded-md">{t("selectLanguageFirst")}</div>
        {error && <p className="text-red-500 mt-1 mb-5 form-error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <p className="text-xs mb-2">{t("selectChallenge")}</p>

      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-150 hover:border-gray-400"
            data-testid="challenge-select"
          >
            <span className="text-gray-700 truncate">
              {selectedChallenge ? selectedChallenge.question : "Select a challenge"}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="z-10 w-[var(--radix-popover-trigger-width)] max-w-md mt-2 bg-white border border-gray-200 rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95"
            sideOffset={5}
          >
            <div className="flex flex-col p-4 space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("searchChallenge")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Difficulty Filters */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Filter by difficulty</h3>
                <ToggleGroup.Root
                  type="multiple"
                  value={difficultyFilter}
                  onValueChange={(tags) => setDifficultyFilter(tags as DifficultyTag[])}
                  className="flex flex-wrap gap-2"
                >
                  {DIFFICULTY_TAGS.map((difficulty) => (
                    <ToggleGroup.Item
                      key={difficulty}
                      value={difficulty}
                      className="px-3 py-1 text-sm border rounded-full transition-colors duration-150 data-[state=on]:bg-indigo-600 data-[state=on]:text-white data-[state=on]:border-indigo-600 hover:bg-gray-100 data-[state=on]:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      data-testid={`difficulty-filter-${difficulty}`}
                    >
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </ToggleGroup.Item>
                  ))}
                </ToggleGroup.Root>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  disabled={totalFilters === 0}
                  className="flex items-center px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <X className="h-4 w-4 mr-1.5" />
                  Clear Filters
                </button>
                <span className="text-sm text-gray-500">
                  {loading
                    ? "Loading..."
                    : `${filteredChallenges.length} challenge${filteredChallenges.length !== 1 ? "s" : ""} found`}
                </span>
              </div>
            </div>

            {/* Results List */}
            <div className="border-t border-gray-200 max-h-60 overflow-y-auto">
              {loading ? (
                <div className="text-center text-gray-500 p-6">
                  <p className="font-semibold">Loading challenges...</p>
                </div>
              ) : filteredChallenges.length === 0 ? (
                <div className="text-center text-gray-500 p-6">
                  <p className="font-semibold">No challenges found</p>
                  <p className="text-sm">
                    {searchTerm || difficultyFilter.length > 0 ? t("noChallengesFound") : "No challenges available"}
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredChallenges.map((challenge) => (
                    <button
                      key={challenge._id}
                      onClick={() => {
                        onChange(challenge._id);
                        setIsOpen(false);
                      }}
                      className="w-full p-3 rounded-md hover:bg-gray-50 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
                      data-testid={`challenge-option-${challenge._id}`}
                    >
                      <div className="flex flex-col space-y-2">
                        <p className="font-medium text-gray-800 text-sm leading-tight">{challenge.question}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 capitalize">{challenge.difficulty}</span>
                          <span className="text-xs text-gray-500">{challenge.language}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {error && <p className="text-red-500 mt-1 mb-5 form-error">{error}</p>}
    </div>
  );
}
