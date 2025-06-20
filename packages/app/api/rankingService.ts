import { RankingType } from "@/types/rankingTypes";
import { ServerAxiosError, serverGet } from "./actions/api";
import { RANKING } from "./constants";

export const getRanking = async (type: string): Promise<RankingType> => {
  const response = await serverGet<RankingType>(`${RANKING}?type=${type}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as RankingType;
};
