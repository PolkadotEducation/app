"use client";

import Breadcrumb from "@/components/ui/breadcrumb";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const BREADCRUMB_ROUTES = [
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "Edit Profile",
  },
];

const EditProfilePage = () => {
  const { state } = useAuth();
  const { userInfo, isLoading } = state;
  const { picture, name, email } = userInfo || {};
  const [selectedPicture, setSelectedPicture] = useState<string | undefined | null>(null);
  const [inputName, setInputName] = useState<string | undefined>("");
  const [inputEmail, setInputEmail] = useState<string | undefined>("");
  const t = useTranslations("profile");

  useEffect(() => {
    if (!isLoading) {
      setSelectedPicture(picture);
      setInputName(name);
      setInputEmail(email);
    }
  }, [isLoading]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="px-[20px] mt-4 xl:mt-8 max-w-[935px] w-full">
      <div className="mb-0 xl:mb-2">
        <Breadcrumb routes={BREADCRUMB_ROUTES} />
      </div>
      <h4 className="xl:mb-6 mb-4">{t("editProfile")}</h4>
      <div
        className="flex flex-col items-center px-6 pt-6 xl:pb-[41px]
        pb-[13px] rounded-[8px] border-border-gray border-[1px]"
      >
        {!isLoading ? (
          <label htmlFor="image-upload" className="relative cursor-pointer group">
            {selectedPicture ? (
              <div className="w-40 h-40 xl:w-80 xl:h-80 rounded-full overflow-hidden">
                <Image
                  unoptimized
                  src={selectedPicture}
                  alt="Selected Picture"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-0"
                />
              </div>
            ) : (
              <div
                className="w-40 h-40 xl:w-80 xl:h-80
                bg-primary rounded-full flex items-center justify-center"
              >
                <div className="flex flex-col items-center justify-center text-white">
                  <CloudUpload size={64} />
                  <span className="mt-2 font-semibold text-center unbound-font">{t("uploadImage")}</span>
                </div>
              </div>
            )}

            <div
              className="absolute inset-0 w-40 h-40 xl:w-80 xl:h-80 bg-primary rounded-full flex
              items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="flex flex-col items-center justify-center text-white">
                <CloudUpload size={64} />
                <span className="mt-2 font-semibold text-center unbound-font">{t("uploadImage")}</span>
              </div>
            </div>
            <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        ) : (
          <div className="flex flex-col items-center">
            <Skeleton className="w-40 h-40 xl:w-80 xl:h-80 rounded-full" />
          </div>
        )}
        <div
          className="flex flex-col mt-4 xl:mt-6 gap-y-4 xl:gap-y-6 max-w-[524px]
          w-full mb-6"
        >
          <Input value={inputName} onChange={(e) => setInputName(e.target.value)} />
          <Input value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
        </div>
        <div className="flex w-full justify-end pt-[10px] xl:pt-6 border-t-border-gray border-t-[1px]">
          <Button variant="outline" className="mr-4">
            {t("cancel")}
          </Button>
          <Button>{t("save")}</Button>
        </div>
      </div>
    </main>
  );
};

export default EditProfilePage;
