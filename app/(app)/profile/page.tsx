"use client";

import { useTranslations } from "next-intl";
import ProfileCard from "./_components/profileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/useUser";
import Loading from "@/components/ui/loading";
import { useEffect, useState } from "react";
import { getUserCompletedCourses } from "@/api/progressService";
import { CompletedCourse } from "@/types/progressTypes";
import CourseCardPreview from "@/components/ui/courseCardPreview";
import { generateCertificate, getCertificates } from "@/api/certificateService";
import { CertificateType } from "@/types/certificateTypes";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const t = useTranslations("profile");
  const { userLoading } = useUser();
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([]);
  const [certificates, setCertificates] = useState<CertificateType[]>([]);
  const { user } = useUser();
  const router = useRouter();

  if (userLoading) {
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  }

  const getCompletedCourses = async () => {
    const completedCourses = await getUserCompletedCourses();
    setCompletedCourses(completedCourses);
  };

  const getUserCertificates = async () => {
    const certificates = await getCertificates({ userId: user?.id });
    setCertificates(certificates);
  };

  useEffect(() => {
    getCompletedCourses();
    getUserCertificates();
  }, []);

  const handleCertificateClick = async (courseId: string) => {
    const certificateAlreadyGenerated = certificates.find((i) => i.courseId === courseId);
    let certificateId = certificateAlreadyGenerated?._id;
    if (!certificateId) {
      const generatedCertificate = await generateCertificate(courseId);
      certificateId = generatedCertificate._id;
    }
    router.push(`/profile/certificates?id=${certificateId}`);
  };

  return (
    <main className="max-w-7xl w-full">
      <h4 className="xl:mb-6 mb-4">{t("profile")}</h4>
      <ProfileCard />
      <div className="mt-6">
        <Tabs defaultValue="certificates">
          <TabsList className="w-fit">
            <TabsTrigger value="certificates">
              <span className="unbound-font text-sm font-medium">{t("certificates")}</span>
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <span className="unbound-font text-sm font-medium">{t("achievements")}</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="achievements" className="xl:pt-4 pt-2">
            <h5>{t("achievements")}</h5>
          </TabsContent>
          <TabsContent value="certificates" className="xl:pt-4 pt-2">
            <h5>{t("certificates")}</h5>
            <div className="flex flex-row flex-wrap w-full pt-6">
              {completedCourses &&
                completedCourses.map((i: CompletedCourse) => (
                  <div className="pb-4 pr-4 w-full md:w-1/2 lg:w-1/3" key={i.courseId}>
                    <CourseCardPreview
                      banner="blackPink"
                      title={i.courseTitle}
                      key={i.courseId}
                      onClickAction={() => handleCertificateClick(i.courseId)}
                    />
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProfilePage;
