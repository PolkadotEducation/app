"use client";

import { useTranslations } from "next-intl";
import ProfileCard from "./_components/profileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/useUser";
import Loading from "@/components/ui/loading";
import { useEffect, useState } from "react";
import { getUserCompletedCourses, getUserXpAndLevel } from "@/api/progressService";
import { CompletedCourse, XpAndLevel } from "@/types/progressTypes";
import CourseCardPreview from "@/components/ui/courseCardPreview";
import { generateCertificate, getCertificates } from "@/api/certificateService";
import { CertificateType } from "@/types/certificateTypes";
import { useRouter } from "next/navigation";
import { Achievement } from "@/components/ui/achievement";
import { achievements } from "@/helpers/achievements";

const ProfilePage = () => {
  const [selectedTab, setselectedTab] = useState<string>("certificates");
  const t = useTranslations("profile");
  const { userLoading } = useUser();
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([]);
  const [certificates, setCertificates] = useState<CertificateType[]>([]);
  const [progress, setProgress] = useState<XpAndLevel>({
    level: 0,
    xp: 0,
    xpToNextLevel: 100,
  });
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

  const getUserProgress = async () => {
    const response = await getUserXpAndLevel();
    setProgress(response);
  };

  useEffect(() => {
    getCompletedCourses();
    getUserCertificates();
    getUserProgress();
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
      <ProfileCard {...progress} />
      <div className="mt-6">
        <Tabs defaultValue={selectedTab} onValueChange={(value) => setselectedTab(value)}>
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
          </TabsContent>
        </Tabs>
        <div className="flex flex-row flex-wrap w-full pt-6 gap-10 items-center justify-center">
          {selectedTab === "certificates"
            ? completedCourses &&
              completedCourses.map((i: CompletedCourse) => (
                <div className="pb-4 pr-4 w-full md:w-1/2 lg:w-1/3" key={i.courseId}>
                  <CourseCardPreview
                    banner="blackPink"
                    title={i.courseTitle}
                    onClickAction={() => handleCertificateClick(i.courseId)}
                  />
                </div>
              ))
            : achievements.map((achievement) => (
                <Achievement
                  key={achievement.id}
                  image={achievement.locked ? achievement.lockedImage : achievement.unlockedImage}
                  alt={achievement.description}
                  locked={achievement.locked}
                  title={achievement.title}
                />
              ))}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
