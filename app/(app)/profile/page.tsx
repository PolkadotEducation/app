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
import { UserInfo } from "@/types/userTypes";

const ProfilePage = () => {
  const t = useTranslations("profile");
  const { userLoading } = useUser();
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([]);
  const [certificates, setCertificates] = useState<CertificateType[]>([]);
  const [progress, setProgress] = useState<XpAndLevel>({
    level: 0,
    xp: 0,
    xpToNextLevel: 0,
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

  const renderAchievements = (user: UserInfo | null) => {
    const userAchievements = [];
    const achievementsTracker = user?.achievementsTracker;
    if (achievementsTracker) {
      if (achievementsTracker.loginCounter >= 7) userAchievements.push(0);
      if (achievementsTracker.loginCounter >= 15) userAchievements.push(1);
      if (achievementsTracker.loginCounter >= 30) userAchievements.push(2);

      if (achievementsTracker.answerCounter >= 5) userAchievements.push(3);
      if (achievementsTracker.answerCounter >= 10) userAchievements.push(4);
      if (achievementsTracker.answerCounter >= 20) userAchievements.push(5);

      if (achievementsTracker.challengeCounter >= 5) userAchievements.push(6);
      if (achievementsTracker.challengeCounter >= 10) userAchievements.push(7);
      if (achievementsTracker.challengeCounter >= 20) userAchievements.push(8);

      if (achievementsTracker.finishOneCourse) userAchievements.push(9);
      if (achievementsTracker.finishOneCourseNoMistakes) userAchievements.push(10);

      if (achievementsTracker.profilePicture) userAchievements.push(11);

      // TODO: We need the image for this one
      // if (achievementsTracker.totalFocus) userAchievements.push(12);
    }
    return userAchievements;
  };

  const userAchievements = renderAchievements(user);

  return (
    <main className="max-w-7xl w-full">
      <h4 className="xl:mb-6 mb-4">{t("profile")}</h4>
      <ProfileCard {...progress} />
      <div className="mt-6">
        <Tabs defaultValue={"certificates"}>
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
            <div className="w-full mt-12 gap-6 grid grid-cols-3 justify-items-center">
              {achievements.map((achievement) => {
                const unlocked = userAchievements.includes(achievement.id);
                return (
                  <Achievement
                    key={achievement.id}
                    image={unlocked ? achievement.unlockedImage : achievement.lockedImage}
                    alt={t(`achievementsSpecs.${achievement.description}`)}
                    locked={!unlocked}
                    title={t(`achievementsSpecs.${achievement.title}`)}
                  />
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="certificates" className="xl:pt-4 pt-2">
            <h5>{t("certificates")}</h5>
            {completedCourses && completedCourses.length > 0 ? (
              completedCourses.map((i: CompletedCourse) => (
                <div className="pb-4 pr-4 w-full md:w-1/2 lg:w-1/3" key={i.courseId}>
                  <CourseCardPreview
                    banner={i.courseBanner}
                    title={i.courseTitle}
                    onClickAction={() => handleCertificateClick(i.courseId)}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">{t("noCertificates")}</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProfilePage;
