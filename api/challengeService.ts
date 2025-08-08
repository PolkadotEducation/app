import { ServerAxiosError, serverDelete, serverGet, serverPost, serverPut } from "./actions/api";
import { CHALLENGE, CHALLENGES_SUMMARY } from "./constants";
import { ChallengeResponse, ChallengeSummary, ChallengeType } from "@/types/challengeTypes";

export const createChallenge = async (teamId: string, challengeData: ChallengeType): Promise<ChallengeResponse> => {
  const response = await serverPost<ChallengeResponse>(`${CHALLENGE}/${teamId}`, challengeData);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ChallengeResponse;
};

export const getChallengeById = async (id: string): Promise<ChallengeType> => {
  const response = await serverGet<ChallengeType>(`${CHALLENGE}?challengeId=${id}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ChallengeType;
};

export const getChallengesSummary = async (language?: string): Promise<ChallengeSummary[]> => {
  const queryParam = language ? `?language=${language}` : "";
  const response = await serverGet<ChallengeSummary[]>(`${CHALLENGES_SUMMARY}${queryParam}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ChallengeSummary[];
};

export const deleteChallengeById = async (teamId: string, challengeId: string): Promise<Boolean> => {
  const response = await serverDelete<Boolean>(`${CHALLENGE}/${teamId}/${challengeId}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as Boolean;
};

export const updateChallengeById = async (
  teamId: string,
  challengeId: string,
  challengeData: ChallengeType,
): Promise<ChallengeResponse> => {
  const response = await serverPut<ChallengeResponse>(`${CHALLENGE}/${teamId}/${challengeId}`, challengeData);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ChallengeResponse;
};

export const getUserChallenges = async (): Promise<ChallengeType[]> => {
  const response = await serverGet<ChallengeType[]>("/challenges/user");
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ChallengeType[];
};

export const getBackofficeChallenges = async (language?: string): Promise<ChallengeType[]> => {
  const queryParam = language ? `?language=${language}` : "";
  const response = await serverGet<ChallengeType[]>(`/challenges/backoffice${queryParam}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as ChallengeType[];
};
