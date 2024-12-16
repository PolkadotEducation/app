import { ServerAxiosError, serverDelete, serverGet, serverPost, serverPut } from "./actions/api";
import { TEAMS } from "./constants";
import { TeamInfo } from "@/types/teamTypes";

export const createTeam = async (team: TeamInfo): Promise<TeamInfo> => {
  const r = await serverPost<TeamInfo>(TEAMS, { ...team });
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as TeamInfo;
};

export const getAllTeams = async (): Promise<TeamInfo[]> => {
  const r = await serverGet<TeamInfo[]>(TEAMS);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as TeamInfo[];
};

export const getTeam = async (teamId: string): Promise<TeamInfo> => {
  const r = await serverGet<TeamInfo>(`${TEAMS}?teamId=${teamId}`);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return r as TeamInfo;
};

export const updateTeam = async (data: TeamInfo): Promise<Boolean> => {
  const r = await serverPut<Boolean>(TEAMS, data);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return true;
};

export const deleteTeam = async (teamId: string): Promise<Boolean> => {
  const r = await serverDelete<Boolean>(`${TEAMS}/${teamId}`);
  if ((r as ServerAxiosError).error) throw (r as ServerAxiosError).error;
  return true;
};
