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
import polkadot from "@/public/assets/icons/polkadot.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const WEB3_ACTIVE = false;
const DAPP_NAME = "Polkadot Education";

const Web3Wallet = () => {
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount | undefined>();
  const [signature, setSignature] = useState<Uint8Array | undefined>();
  const [balance, setBalance] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [client, setClient] = useState<PolkadotClient | undefined>();
  const t = useTranslations("components");

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
    return t("loginPolkadot");
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
    const injected = await connectInjectedExtension(acc.wallet?.extensionName || "polkadot-js", DAPP_NAME);
    const foundAccount = injected.getAccounts().find((a) => a.address === acc.address);
    if (foundAccount) {
      const signedMessage = await sign(foundAccount, `${foundAccount.address}@PolkadotEducation`);
      setSignature(signedMessage);
    }
    setIsSigning(false);
  }, []);

  const TriggerButton = useMemo(() => {
    return (
      <Button
        className="w-full bg-transparent hover:bg-transparent hover:opacity-70 text-text-secondary
        hover:text-text-secondary border-border-gray border-[1px]"
        type="button"
        disabled={isSigning}
        variant={"ghost"}
        data-cy="button-login-web3"
      >
        <Image src={polkadot} width={20} height={20} className="mr-2" alt="Google Icon" data-cy="image-login-google" />
        {displayAccountInfo}
      </Button>
    );
  }, [isSigning, displayAccountInfo]);

  return (
    <WalletSelect
      dappName={DAPP_NAME}
      triggerComponent={TriggerButton}
      showAccountsList={true}
      onAccountSelected={handleAccountSelected}
    />
  );
};

export default Web3Wallet;
