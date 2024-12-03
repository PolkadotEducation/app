"use client";

import { getUserCompletedCourses } from "@/api/progressService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { progress } from "@/public/assets/images";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/useUser";
import { generateCertificate, getCertificates } from "@/api/certificateService";
import { CertificateType } from "@/types/certificateTypes";
import { useCourse } from "@/hooks/useCourse";

interface Params {
  id: string;
}

const CourseCompletedPage = ({ params }: { params: Params }) => {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const t = useTranslations("course");
  const [certificates, setCertificates] = useState<CertificateType[]>([]);
  const { fetchCourses } = useCourse();

  const { userLoading, user } = useUser();

  const getCompletedCourses = async () => {
    const completedCourses = await getUserCompletedCourses();
    if (!completedCourses.find((i) => i.courseId === id)) router.back();
    setLoading(false);
  };

  const getUserCertificates = async () => {
    const certificates = await getCertificates({ userId: user?.id });
    setCertificates(certificates);
  };

  useEffect(() => {
    if (!userLoading && user) {
      fetchCourses();
      getCompletedCourses();
      getUserCertificates();
    }
  }, [userLoading]);

  const certificateAlreadyGenerated = certificates.some((c) => c.courseId === id);

  if (loading)
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );

  const handleCertificateClick = async () => {
    const certificateAlreadyGenerated = certificates.find((i) => i.courseId === id);
    let certificateId = certificateAlreadyGenerated?._id;
    if (!certificateId) {
      const generatedCertificate = await generateCertificate(id);
      certificateId = generatedCertificate._id;
    }
    router.push(`/profile/certificates?id=${certificateId}`);
  };

  return (
    <main className="max-w-7xl w-full pt-4">
      <div className="bg-card py-6 xl:py-10 px-4 flex flex-col xl:flex-row xl:justify-evenly items-center">
        <div className="w-full max-w-[395px]">
          <Image
            src={progress}
            alt="Progress banner"
            layout="responsive"
            width={395}
            height={395}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full max-w-[517px] mt-6 xl:mt-0 gap-y-6 text-center items-center">
          <h5 className="whitespace-pre-line">{t("congratulations")}</h5>
          <p>{t("message")}</p>
          <Button className="w-fit" onClick={() => handleCertificateClick()}>
            {certificateAlreadyGenerated ? t("seeCertificate") : t("generateCertificate")}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CourseCompletedPage;
