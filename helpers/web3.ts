import { createClient } from "polkadot-api";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat";

// TODO: Use our own endpoint here (from https://onfinality.io/ maybe), should be fetched from API
export const POLKADOT_WSS_API = process.env.POLKADOT_WSS_API || "wss://pas-rpc.stakeworld.io/assethub";
export const DAPP_NAME = "Polkadot Education";

export const getPolkadotInterface = () => {
  const polkadotClient = createClient(withPolkadotSdkCompat(getWsProvider(POLKADOT_WSS_API)));
  const polkadotApi = polkadotClient.getUnsafeApi();
  return { polkadotClient, polkadotApi };
};

export const stringToHex = (str: string): string => {
  return Array.from(str)
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
};
