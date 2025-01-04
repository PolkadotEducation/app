export type MintSpecs = {
  collectionId: number;
  itemId: number;
  owner: string;
  deadline: number;
};

export type CertificateType = {
  _id?: string;
  courseId: string;
  courseTitle: string;
  userId: string;
  userName: string;
  courseDuration?: number;
  mintSpecs?: MintSpecs;
};

export type MintSignature = {
  signature: string;
};
