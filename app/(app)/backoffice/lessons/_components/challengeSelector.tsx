"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import * as Popover from "@radix-ui/react-popover";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Search, ChevronDown, X } from "lucide-react";
import { getBackofficeChallenges } from "@/api/challengeService";
import { ChallengeType } from "@/types/challengeTypes";

interface ChallengeSelectorProps {
  value?: ChallengeType;
  onChange: (_value: ChallengeType) => void;
  error?: string;
  language?: string;
}

const DIFFICULTY_TAGS = ["easy", "medium", "hard"] as const;
type DifficultyTag = (typeof DIFFICULTY_TAGS)[number];

export function ChallengeSelector({ value, onChange, error, language }: ChallengeSelectorProps) {
  const [challenges, setChallenges] = useState<ChallengeType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("backoffice");

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const challenges = await getBackofficeChallenges(language);
      setChallenges(challenges);
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
            className="flex items-center justify-between w-full px-4 py-2 text-left bg-background border border-input rounded-lg shadow-sm focus:outline-none transition-all duration-150 hover:border-ring/50"
            data-testid="challenge-select"
          >
            <span className="text-foreground truncate">
              {selectedChallenge ? selectedChallenge.question : "Select a challenge"}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="z-10 w-[var(--radix-popover-trigger-width)] max-w-md mt-2 bg-background border border-border rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95"
            sideOffset={5}
          >
            <div className="flex flex-col p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("searchChallenge")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Filter by difficulty</h3>
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
                      className="px-3 py-1 text-sm border border-input rounded-full transition-colors duration-150 data-[state=on]:bg-green-500 data-[state=on]:text-white data-[state=on]:border-green-500 hover:bg-accent hover:text-accent-foreground data-[state=on]:hover:bg-green-600 focus:outline-none"
                      data-testid={`difficulty-filter-${difficulty}`}
                    >
                      {difficulty}
                    </ToggleGroup.Item>
                  ))}
                </ToggleGroup.Root>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <button
                  onClick={clearFilters}
                  disabled={totalFilters === 0}
                  className="flex items-center px-3 py-1 text-sm text-muted-foreground bg-accent rounded-md hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <X className="h-4 w-4 mr-1.5" />
                  Clear Filters
                </button>
                <span className="text-sm text-muted-foreground">
                  {loading
                    ? "Loading..."
                    : `${filteredChallenges.length} challenge${filteredChallenges.length !== 1 ? "s" : ""} found`}
                </span>
              </div>
            </div>

            {/* Results List */}
            <div className="border-t border-border max-h-60 overflow-y-auto">
              {loading ? (
                <div className="text-center text-muted-foreground p-6">
                  <p className="font-semibold">Loading challenges...</p>
                </div>
              ) : filteredChallenges.length === 0 ? (
                <div className="text-center text-muted-foreground p-6">
                  <p className="font-semibold">{t("noChallengesFound")}</p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredChallenges.map((challenge) => (
                    <button
                      key={challenge._id}
                      onClick={() => {
                        onChange(challenge);
                        setIsOpen(false);
                      }}
                      className="w-full p-3 rounded-md hover:bg-accent text-left transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
                      data-testid={`challenge-option-${challenge._id}`}
                    >
                      <div className="flex flex-col space-y-2">
                        <p className="font-medium text-foreground text-sm leading-tight">{challenge.question}</p>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">{challenge.difficulty}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Popover.Arrow className="fill-background" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {error && <p className="text-red-500 mt-1 mb-5 form-error">{error}</p>}
    </div>
  );
}
