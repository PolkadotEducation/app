"use client";

import { getCertificateById } from "@/api/certificateService";
import { CertificateType } from "@/types/certificateTypes";
import { useEffect, useState } from "react";
import CertificateRenderer from "@/components/ui/certificateRenderer";
import publicCertificateScreenBg from "@/public/assets/banners/publicCertificateScreenBg.svg";

interface Params {
  id: string;
}

const CertificatePage = ({ params }: { params: Params }) => {
  const [certificate, setCertificate] = useState<CertificateType>();
  const [, setCertificateImage] = useState<string | null>(null);

  const getCertificate = async (certificateId: string) => {
    const certificate = await getCertificateById(certificateId);
    setCertificate(certificate);
  };

  useEffect(() => {
    if (params.id) getCertificate(params.id);
  }, []);

  if (!certificate) {
    return <></>;
  }

  return (
    <main
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${publicCertificateScreenBg.src})`,
      }}
    >
      <CertificateRenderer certificate={certificate} onImageReady={(image) => setCertificateImage(image)} />
    </main>
  );
};

export default CertificatePage;
