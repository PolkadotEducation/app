"use client";

import { useEffect, useState } from "react";
import { CloudUpload } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { deleteProfile, updateProfile } from "@/api/profileService";
import { UserInfo } from "@/types/userTypes";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

const EditProfilePage = () => {
  const { signOut, state } = useAuth();
  const { user, loadUserProfile } = useUser();
  const { isLoading } = state;
  const { picture, name, email } = user || {};
  const [selectedPicture, setSelectedPicture] = useState<string | undefined | null>(null);
  const [inputName, setInputName] = useState<string | undefined>("");
  const [inputEmail, setInputEmail] = useState<string | undefined>("");
  const [error, setError] = useState<string>("");
  const [updateMessage, setUpdateMessage] = useState<string>("");
  const t = useTranslations("profile");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      setSelectedPicture(picture);
      setInputName(name);
      setInputEmail(email);
      setError("");
    }
  }, [isLoading, user]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img: HTMLImageElement = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const targetSize = 96;
          const canvas = document.createElement("canvas");
          canvas.width = targetSize;
          canvas.height = targetSize;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const aspectRatio = Math.min(targetSize / img.width, targetSize / img.height);
            const newWidth = img.width * aspectRatio;
            const newHeight = img.height * aspectRatio;
            const offsetX = (targetSize - newWidth) / 2;
            const offsetY = (targetSize - newHeight) / 2;
            ctx.clearRect(0, 0, targetSize, targetSize);
            ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
          }
          const resizedDataUrl = canvas.toDataURL(file.type);
          setSelectedPicture(resizedDataUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef?.current) fileInputRef.current.click();
  };

  const handleDelete = async () => {
    setError("");
    try {
      if (user) {
        await deleteProfile(user?.id);
        signOut();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.message) setError(error.message);
      else setError("Server Error.");
    }
  };

  const handleUpdate = async () => {
    setUpdateMessage("");
    setError("");
    try {
      if (user) {
        const updateUser: UserInfo = {
          ...user,
          name: inputName || user.name,
          email: inputEmail || user.email,
          picture: selectedPicture || user.picture,
        };
        await updateProfile(user?.id, updateUser);
        await loadUserProfile();
        setUpdateMessage("Profile Updated.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.message) setError(error.message);
      else setError("Server Error.");
    }
  };

  return (
    <main className="max-w-7xl w-full">
      <h4 className="xl:mb-6 mb-4">{t("editProfile")}</h4>
      <div
        className="flex flex-col items-center px-6 pt-6 xl:pb-[41px]
        pb-[13px] rounded-[8px] border-border-gray border-[1px] bg-card"
      >
        {!isLoading ? (
          <label htmlFor="image-upload" className="relative cursor-pointer group">
            {selectedPicture ? (
              <div className="w-40 h-40 xl:w-80 xl:h-80 rounded-full overflow-hidden">
                <img
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
            <input
              id="image-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="flex flex-col items-center">
            <Skeleton className="w-40 h-40 xl:w-80 xl:h-80 rounded-full" />
          </div>
        )}
        <Button className="mt-4 md:hidden" variant="outline" onClick={handleButtonClick}>
          {t("editProfilePicture")}
        </Button>
        <div
          className="flex flex-col mt-4 xl:mt-6 gap-y-4 xl:gap-y-6 max-w-[524px]
          w-full mb-6"
        >
          <Input value={inputName} onChange={(e) => setInputName(e.target.value)} />
          <Input value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
        </div>
        <div className="flex w-full pt-[10px] xl:pt-6 border-t border-gray-300 justify-between">
          <div className="flex">
            <Button variant="outline" onClick={handleDelete}>
              {t("delete")}
            </Button>
          </div>
          <div className="flex">
            <Button variant="outline" className="mr-4" onClick={() => router.back()}>
              {t("cancel")}
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={inputEmail === user?.email && inputName === user?.name && selectedPicture === user?.picture}
            >
              {t("save")}
            </Button>
          </div>
        </div>
        {error && <div className="text-sm font-bold text-red-500">{error}</div>}
        {updateMessage && <div className="text-sm font-bold text-green-500">{updateMessage}</div>}
      </div>
    </main>
  );
};

export default EditProfilePage;
