"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import logo from "@/public/assets/icons/logo.svg";
import certificateBg from "@/public/assets/banners/certificateBg.svg";
import { CertificateType } from "@/types/certificateTypes";

const CertificateRenderer = ({
  certificate,
  onImageReady,
}: {
  certificate: CertificateType;
  onImageReady: (_image: string) => void;
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [certificateImage, setCertificateImage] = useState<string | null>(null);

  const generateCertificateImage = async () => {
    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current, {
          width: 842,
          height: 595,
          backgroundColor: null,
          scale: 1,
          useCORS: true,
          windowWidth: 842,
          windowHeight: 595,
        });
        const dataUrl = canvas.toDataURL("image/png");
        setCertificateImage(dataUrl);
        onImageReady(dataUrl);
      } catch (error) {
        console.error("Failed to generate certificate image:", error);
      }
    }
  };

  useEffect(() => {
    generateCertificateImage();
  }, []);

  if (certificateImage) {
    return (
      <img src={certificateImage} alt="Certificate" className="w-full max-w-[842px] aspect-[842/595] rounded-lg" />
    );
  }

  return (
    <div
      ref={certificateRef}
      className="relative w-[842px] aspect-[842/595] bg-cover bg-center rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${certificateBg.src})`,
      }}
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#1A1A1A] gap-y-5"
        data-cy="certificate"
      >
        <Image src={logo} alt="Logo" className="mb-6" />
        <h5 className="font-bold text-lg">Certificado de curso</h5>
        <h6 className="text-md font-medium">{certificate?.userName}</h6>
        <p className="text-sm">concluiu com sucesso o curso</p>
        <h6 className="text-md font-medium">"{certificate?.courseTitle}"</h6>
        {certificate?.courseDuration && (
          <p className="text-sm">Tempo estimado de aprendizado: {certificate.courseDuration} horas</p>
        )}
        <p>ID do certificado: {certificate?._id}</p>
      </div>
    </div>
  );
};

export default CertificateRenderer;
