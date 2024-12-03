"use client";

import { getCertificateById } from "@/api/certificateService";
import { CertificateType } from "@/types/certificateTypes";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import CertificateRenderer from "@/components/ui/certificateRenderer";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { getAppBaseUrl } from "@/helpers/environment";

const ProfileCertificatePage = () => {
  const searchParams = useSearchParams();
  const [certificate, setCertificate] = useState<CertificateType>();
  const [certificateImage, setCertificateImage] = useState<string | null>(null);
  const t = useTranslations("profile");

  const [baseUrl, setBaseUrl] = useState<string>("");

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

  const isMobileDevice = () => {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  };

  const shareCertificate = async () => {
    if (certificateImage) {
      const blob = await (await fetch(certificateImage)).blob();
      const file = new File([blob], `${certificate?._id}.png`, {
        type: "image/png",
      });

      if (navigator.share) {
        await navigator.share({
          title: t("certificates"),
          text: t("shareText", { courseTitle: certificate.courseTitle }),
          files: [file],
        });
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${baseUrl}/certificates/${certificate._id}`);
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
              {isMobileDevice() ? (
                <Button variant="outline" onClick={shareCertificate}>
                  {t("shareCertificate")}
                </Button>
              ) : (
                <Button variant="outline" onClick={copyToClipboard}>
                  {t("copyCertificateUrl")}
                </Button>
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
