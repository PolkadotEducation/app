"use client";

import { WalletSelect } from "@talismn/connect-components";
import { WalletAccount } from "@talismn/connect-wallets";

import { Button } from "./button";
import { useEffect, useState } from "react";
import { connectInjectedExtension } from "polkadot-api/pjs-signer";
import { getBalance, sign } from "@/api/web3";
import { startFromWorker } from "polkadot-api/smoldot/from-worker";
import { getSmProvider } from "polkadot-api/sm-provider";
import { createClient, PolkadotClient } from "polkadot-api";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const WEB3_ACTIVE = false;

const Web3Wallet = () => {
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount>();
  const [signature, setSignature] = useState<Uint8Array>();
  const [balance, setBalance] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [client, setClient] = useState<PolkadotClient>();

  const router = useRouter();
  const { loginWithWallet, clearAuthError } = useAuth();

  const showAccountNameOrAddr = async () => {
    if (isSigning) return "Signing...";
    const addBalance = balance ? ` | ${balance}` : "";
    if (selectedAccount) {
      if (selectedAccount.name) return `${selectedAccount.name}${addBalance}`;
      return `${selectedAccount.address.slice(0, 5)}...${selectedAccount.address.slice(-5)}${addBalance}`;
    }
  };

  const signToLogin = async (walletAccount: WalletAccount) => {
    setIsSigning(true);
    const injected = await connectInjectedExtension(walletAccount.wallet?.extensionName || "polkadot-js");
    const acc = injected.getAccounts().find((a) => a.address === walletAccount.address);
    if (acc) {
      const s = await sign(acc, `${acc.address}@PolkadotEducation`);
      setSignature(s);
      if (WEB3_ACTIVE && client) {
        const b = await getBalance(client, acc);
        setBalance(b);
      }
    }
    setIsSigning(false);
  };

  useEffect(() => {
    if (WEB3_ACTIVE && !client) {
      const smoldot = startFromWorker(new Worker(new URL("polkadot-api/smoldot/worker", import.meta.url)));
      const smoldotRelayChain = import("polkadot-api/chains/polkadot").then(({ chainSpec }) =>
        smoldot.addChain({ chainSpec }),
      );
      const jsonRpcProvider = getSmProvider(smoldotRelayChain);
      const polkadotClient = createClient(jsonRpcProvider);
      setClient(polkadotClient);
    }
    clearAuthError();
    if (selectedAccount && !isSigning && signature) {
      (async () => {
        const success = await loginWithWallet({
          address: selectedAccount.address,
          name: selectedAccount.name,
          signature,
        });
        if (success) router.push("/");
      })();
    }
  }, [isSigning, router, client]);

  return (
    <WalletSelect
      dappName={"Polkadot Education"}
      triggerComponent={
        <Button className="w-full mb-4 xl:mb-6 m-2" type="button" disabled={isSigning}>
          {selectedAccount ? showAccountNameOrAddr() : "Sign in with Wallet"}
        </Button>
      }
      showAccountsList={true}
      onAccountSelected={async (acc: WalletAccount) => {
        setSelectedAccount(acc);
        setSignature(undefined);
        setBalance("");
        await signToLogin(acc);
      }}
    />
  );
};

export default Web3Wallet;
