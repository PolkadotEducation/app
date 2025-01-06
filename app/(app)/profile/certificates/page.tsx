"use client";

import { getCertificateById, mintCertificate } from "@/api/certificateService";
import { CertificateType } from "@/types/certificateTypes";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import CertificateRenderer from "@/components/ui/certificateRenderer";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { getAppBaseUrl } from "@/helpers/environment";

import Web3Wallet from "@/components/ui/web3Wallet";
import { MultiSignature } from "@polkadot-api/descriptors";
import { useAuth } from "@/hooks/useAuth";
import { connectInjectedExtension } from "polkadot-api/pjs-signer";
import { DAPP_NAME, getPolkadotInterface, stringToHex } from "@/helpers/web3";

import { fromHex } from "@polkadot-api/utils";
import { Binary, FixedSizeBinary } from "polkadot-api";

const ProfileCertificatePage = () => {
  const searchParams = useSearchParams();
  const [certificate, setCertificate] = useState<CertificateType>();
  const [certificateImage, setCertificateImage] = useState<string | null>(null);
  const [isSharingSupported, setIsSharingSupported] = useState(false);
  const [isClipboardSupported, setIsClipboardSupported] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const t = useTranslations("profile");

  const [baseUrl, setBaseUrl] = useState<string>("");
  const { state } = useAuth();

  const getCertificate = async (certificateId: string) => {
    const certificate = await getCertificateById(certificateId);
    setCertificate(certificate);
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) getCertificate(id);
    if (!baseUrl) {
      (async () => {
        const baseUrlFromServer = await getAppBaseUrl();
        setBaseUrl(baseUrlFromServer);
      })();
    }

    if (typeof navigator.share === "function") {
      setIsSharingSupported(true);
    } else {
      setIsSharingSupported(false);
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      setIsClipboardSupported(true);
    } else {
      setIsClipboardSupported(false);
    }
  }, [searchParams]);

  if (!certificate) {
    return <></>;
  }

  const downloadAsPDF = () => {
    if (certificateImage) {
      const pdf = new jsPDF("landscape", "pt", "a4");
      const pdfWidth = 842;
      const pdfHeight = 595;
      pdf.addImage(certificateImage, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${certificate?._id}.pdf`);
    }
  };

  const mint = async () => {
    if (isMinting) return;
    setIsMinting(true);
    if (certificate && certificate?._id && state.web3Acc?.wallet) {
      const { polkadotClient, polkadotApi } = getPolkadotInterface();

      const blockInfo = await polkadotClient.getFinalizedBlock();

      const collectionId = certificate.mintSpecs?.collectionId;
      const itemId = certificate.mintSpecs?.itemId;

      const itemData = await polkadotApi.query.Nfts.Item.getValue(collectionId, itemId);
      // Alredy minted
      if (itemData?.owner) {
        setMinted(true);
        return;
      }

      const deadline = blockInfo.number + 1_000;
      const certificateName = "PolkadotEducation - Certificate";
      const { signature } = await mintCertificate(certificateName, certificate._id, deadline);
      const mint_data = {
        collection: collectionId,
        item: itemId,
        attributes: [
          [new Binary(fromHex(stringToHex(certificateName))), new Binary(fromHex(stringToHex(certificate._id)))],
        ],
        metadata: new Binary(fromHex("0x")),
        only_account: undefined,
        deadline,
        mint_price: undefined,
      };
      const sig = new FixedSizeBinary(fromHex(signature));

      const mint = polkadotApi.tx.Nfts.mint_pre_signed({
        mint_data,
        signature: MultiSignature.Sr25519(sig),
        signer: certificate.mintSpecs?.owner,
      });

      const callData = await mint.getEncodedData();
      const tx = await polkadotApi.txFromCallData(callData);
      const injected = await connectInjectedExtension(state.web3Acc.wallet?.extensionName || "polkadot-js", DAPP_NAME);
      const foundAccount = injected.getAccounts().find((a) => a.address === state.web3Acc?.address);
      if (foundAccount) {
        try {
          const payload = await tx?.sign(foundAccount.polkadotSigner);
          polkadotClient.submitAndWatch(payload).subscribe({
            error: console.error,
            complete() {
              polkadotClient.destroy();
              setIsMinting(false);
            },
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error(`[ERROR] ${error}`);
        }
      }
    }
    setIsMinting(false);
  };

  const shareCertificate = async () => {
    if (certificateImage) {
      const blob = await (await fetch(certificateImage)).blob();
      const file = new File([blob], `${certificate?._id}.png`, {
        type: blob.type,
      });

      await navigator.share({
        title: t("certificates"),
        text: t("shareText", { courseTitle: certificate.courseTitle }),
        files: [file],
      });
    }
  };

  const copyToClipboard = () => {
    if (isClipboardSupported) {
      navigator.clipboard.writeText(`${baseUrl}/certificates/${certificate._id}`);
    }
  };

  return (
    <main className="max-w-7xl w-full pb-6">
      <h4 className="xl:mb-6 mb-4">{t("certificates")}</h4>
      <div className="mt-6 xl:bg-card rounded-sm flex flex-col items-center py-6">
        <CertificateRenderer certificate={certificate} onImageReady={(image) => setCertificateImage(image)} />
        {certificateImage && (
          <>
            <div className="mt-8 flex xl:flex-row flex-col justify-start w-full max-w-[842px] gap-5">
              <Button onClick={downloadAsPDF}>{t("downloadCertificate")}</Button>
              {isSharingSupported && (
                <Button variant="outline" onClick={shareCertificate}>
                  {t("shareCertificate")}
                </Button>
              )}
              {isClipboardSupported && (
                <Button variant="outline" onClick={copyToClipboard}>
                  {t("copyCertificateUrl")}
                </Button>
              )}
              {state.web3Acc ? (
                <Button onClick={mint} disabled={isMinting}>
                  {minted ? t("minted") : isMinting ? t("minting") : t("mintCertificate")}
                </Button>
              ) : (
                <Web3Wallet buttonLabel="Connect" skipSign={true} />
              )}
            </div>
            <div className="mt-8 flex flex-col w-full max-w-[842px] gap-4">
              <h6 className="text-lg font-medium">{t("publicCertificateUrl")}</h6>
              <a
                className="text-primary underline hover:text-primary-dark transition-colors break-all"
                href={`${baseUrl}/certificates/${certificate._id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${baseUrl}/certificates/${certificate._id}`}
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default function ProfileCertificate() {
  return (
    <Suspense>
      <ProfileCertificatePage />
    </Suspense>
  );
}
