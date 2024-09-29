import { PolkadotClient } from "polkadot-api";
import { dot } from "@/.papi/descriptors";
import { type InjectedPolkadotAccount } from "polkadot-api/pjs-signer";

const DECIMALS = 10;

export const getBalance = async (client: PolkadotClient, acc: InjectedPolkadotAccount): Promise<string> => {
  const api = client.getTypedApi(dot);
  const {
    data: { free },
  } = await api.query.System.Account.getValue(acc.address);
  const value = (free / BigInt(10 ** (DECIMALS - 2))).toString();
  const final = parseFloat((parseInt(value) / 100).toString());
  return final.toFixed(2);
};

export const sign = async (acc: InjectedPolkadotAccount, payload: string) => {
  return acc.polkadotSigner.signBytes(Buffer.from(payload));
};
