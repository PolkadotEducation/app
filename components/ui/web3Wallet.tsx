"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { WalletSelect } from "@talismn/connect-components";
import { WalletAccount } from "@talismn/connect-wallets";

import { Button } from "./button";
import { connectInjectedExtension } from "polkadot-api/pjs-signer";
import { sign } from "@/api/web3";
import { startFromWorker } from "polkadot-api/smoldot/from-worker";
import { getSmProvider } from "polkadot-api/sm-provider";
import { createClient, PolkadotClient } from "polkadot-api";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const WEB3_ACTIVE = false;

const Web3Wallet = () => {
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount | undefined>();
  const [signature, setSignature] = useState<Uint8Array | undefined>();
  const [balance, setBalance] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [client, setClient] = useState<PolkadotClient | undefined>();

  const router = useRouter();
  const { loginWithWallet, clearAuthError } = useAuth();

  const displayAccountInfo = useMemo(() => {
    if (isSigning) return "Signing...";
    if (selectedAccount) {
      const addBalance = balance ? ` | ${balance}` : "";
      return selectedAccount.name
        ? `${selectedAccount.name}${addBalance}`
        : `${selectedAccount.address.slice(0, 5)}...${selectedAccount.address.slice(-5)}${addBalance}`;
    }
    return "Sign in with Wallet";
  }, [isSigning, selectedAccount, balance]);

  useEffect(() => {
    if (WEB3_ACTIVE && !client) {
      (async () => {
        const smoldot = startFromWorker(new Worker(new URL("polkadot-api/smoldot/worker", import.meta.url)));
        const smoldotRelayChain = await import("polkadot-api/chains/polkadot").then(({ chainSpec }) =>
          smoldot.addChain({ chainSpec }),
        );
        const jsonRpcProvider = getSmProvider(smoldotRelayChain);
        const polkadotClient = createClient(jsonRpcProvider);
        setClient(polkadotClient);
      })();
    }
  }, [client]);

  useEffect(() => {
    clearAuthError();
  }, []);

  useEffect(() => {
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
  }, [isSigning, router, selectedAccount, signature]);

  const handleAccountSelected = useCallback(async (acc: WalletAccount) => {
    setIsSigning(true);
    setSelectedAccount(acc);
    setSignature(undefined);
    setBalance("");
    const injected = await connectInjectedExtension(acc.wallet?.extensionName || "polkadot-js");
    const foundAccount = injected.getAccounts().find((a) => a.address === acc.address);
    if (foundAccount) {
      const signedMessage = await sign(foundAccount, `${foundAccount.address}@PolkadotEducation`);
      setSignature(signedMessage);
    }
    setIsSigning(false);
  }, []);

  const TriggerButton = useMemo(() => {
    return (
      <Button className="w-full mb-4 xl:mb-6 m-2" type="button" disabled={isSigning}>
        {displayAccountInfo}
      </Button>
    );
  }, [isSigning, displayAccountInfo]);

  return (
    <WalletSelect
      dappName={"Polkadot Education"}
      triggerComponent={TriggerButton}
      showAccountsList={true}
      onAccountSelected={handleAccountSelected}
    />
  );
};

export default Web3Wallet;
