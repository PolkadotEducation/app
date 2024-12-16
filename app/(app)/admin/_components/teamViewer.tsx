"use client";

import { useState } from "react";
import { CloudUpload } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { TeamInfo } from "@/types/teamTypes";
import { createTeam, deleteTeam } from "@/api/teamService";

interface TeamViewerProps {
  id?: string;
  owner?: string;
  name?: string;
  description?: string;
  picture?: string;
  changeTab: (_v: string) => void;
}

const TeamViewerPage = ({ id, owner, name, description, picture, changeTab }: TeamViewerProps) => {
  const { state } = useAuth();
  const { isLoading } = state;
  const [selectedPicture, setSelectedPicture] = useState<string | undefined | null>(picture || "");
  const [inputName, setInputName] = useState<string | undefined>(name || "");
  const [inputEmail, setInputEmail] = useState<string | undefined>(owner || "");
  const [inputDescriptioin, setInputDescriptioin] = useState<string | undefined>(description || "");
  const [error, setError] = useState<string>("");
  const [createMessage, setCreateMessage] = useState<string>("");
  const t = useTranslations("admin");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

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
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, targetSize, targetSize);
            const aspectRatio = Math.min(targetSize / img.width, targetSize / img.height);
            const newWidth = img.width * aspectRatio;
            const newHeight = img.height * aspectRatio;
            const offsetX = (targetSize - newWidth) / 2;
            const offsetY = (targetSize - newHeight) / 2;
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

  const handleUpdate = async () => {
    setCreateMessage("");
    setError("");
    try {
      if (inputEmail && inputName) {
        const newTeam: TeamInfo = {
          id: "",
          owner: inputEmail,
          name: inputName,
          description: inputDescriptioin || "",
          picture: selectedPicture || "",
        };
        await createTeam(newTeam);
        setCreateMessage("Team Created.");
        changeTab("teams");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.message) setError(error.message);
      else setError("Server Error.");
    }
  };

  const handleDelete = async () => {
    setError("");
    try {
      if (id) {
        await deleteTeam(id);
        setCreateMessage("Team Deleted.");
        router.push("/admin");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.message) setError(error.message);
      else setError("Server Error.");
    }
  };

  return (
    <div className="max-w-7xl w-full">
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
          <InputFloatingLabel
            type="email"
            id="emailInput"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            label={t("teamOwnerEmailPlaceholder")}
            additionalStyles="mb-4"
          />
          <InputFloatingLabel
            type="text"
            id="nameInput"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            label={t("teamNamePlaceholder")}
            additionalStyles="mb-4"
          />
          <InputFloatingLabel
            type="text"
            id="descriptionInput"
            value={inputDescriptioin}
            onChange={(e) => setInputDescriptioin(e.target.value)}
            label={t("teamDescriptionPlaceholder")}
            additionalStyles="mb-4"
          />
        </div>
        <div className="flex w-full justify-center pt-[10px] xl:pt-6 border-t border-gray-300">
          <div className="flex">
            {id ? (
              <Button variant="outline" className="mr-4" onClick={handleDelete}>
                {t("delete")}
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div className="flex">
            <Button variant="outline" className="mr-4" onClick={() => router.push("/admin")}>
              {t("cancel")}
            </Button>
            <Button onClick={handleUpdate}>{id ? t("save") : t("create")}</Button>
          </div>
        </div>
        {error && <div className="text-sm font-bold text-red-500">{error}</div>}
        {createMessage && <div className="text-sm font-bold text-green-500">{createMessage}</div>}
      </div>
    </div>
  );
};

export default TeamViewerPage;
