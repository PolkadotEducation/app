import { useTranslations } from "next-intl";
import ProfileCard from "./_components/profileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "My Profile",
};

const ProfilePage = () => {
  const t = useTranslations("profile");

  return (
    <main className="px-[20px] mt-10 xl:mt-16 max-w-[935px] w-full">
      <h4 className="xl:mb-6 mb-4">{t("profile")}</h4>
      <ProfileCard />
      <div className="mt-6">
        <Tabs defaultValue="achievements">
          <TabsList className="w-fit">
            <TabsTrigger value="achievements">
              <span className="unbound-font text-sm font-medium">{t("achievements")}</span>
            </TabsTrigger>
            <TabsTrigger value="certificates">
              <span className="unbound-font text-sm font-medium">{t("certificates")}</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="achievements" className="xl:pt-4 pt-2">
            <h5>{t("achievements")}</h5>
          </TabsContent>
          <TabsContent value="certificates" className="xl:pt-4 pt-2">
            <h5>{t("certificates")}</h5>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProfilePage;
