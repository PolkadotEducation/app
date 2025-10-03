"use client";

import { useEffect, useState } from "react";

type DailyChallenge = {
  _id?: string;
  question: string;
  choices: string[];
  difficulty: "easy" | "medium" | "hard";
  language: string;
};

export const useDailyChallenge = () => {
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);
  const [randomChallenges, setRandomChallenges] = useState<DailyChallenge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dailyRes, randomRes] = await Promise.all([
        fetch("/api/challenges/daily", { cache: "no-store" }),
        fetch("/api/challenges/random", { cache: "no-store" }),
      ]);
      const dailyData = (await dailyRes.json()) as { daily?: DailyChallenge; error?: { message: string } };
      const randomData = (await randomRes.json()) as { random?: DailyChallenge[]; error?: { message: string } };
      if (dailyData?.error) setError(dailyData.error.message);
      if (randomData?.error) setError(randomData.error.message);
      setDailyChallenge(dailyData?.daily || null);
      setRandomChallenges(randomData?.random || []);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (challengeId: string, choice: number) => {
    try {
      const res = await fetch("/api/challenges/daily/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, choice }),
      });
      const data = (await res.json()) as { points?: number; error?: { message: string } };
      if (data?.error) {
        setError(data.error.message);
        return { points: 0 };
      }

      return { points: data?.points || 0 };
    } catch (e) {
      setError((e as Error).message);
      return { points: 0 };
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return { dailyChallenge, randomChallenges, loading, error, refetch: fetchChallenges, submitAnswer };
};
