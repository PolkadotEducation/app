import { type InjectedPolkadotAccount } from "polkadot-api/pjs-signer";

export const sign = async (acc: InjectedPolkadotAccount, payload: string) => {
  return acc.polkadotSigner.signBytes(Buffer.from(payload));
};
