export type RankingType = {
  type: string;
  lastUpdated: Date;
  ranking: RankedUser[];
};

export type RankedUser = {
  userId: string;
  name: string;
  picture?: string;
  xp: number;
};
