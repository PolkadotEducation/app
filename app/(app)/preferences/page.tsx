"use client";

import { Button } from "@/components/ui/button";
import Separator from "@/components/ui/separator";
import { useUser } from "@/hooks/useUser";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { LOCALE_FEATURES, LOCALE_LANGUAGES } from "@/components/constants";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { setUserLocale } from "@/api/actions/userLocale";
import { UserInfo } from "@/types/userTypes";
import { LocaleLanguage } from "@/types/languageTypes";
import { updateProfile } from "@/api/profileService";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PreferencesPage = () => {
  const t = useTranslations("preferences");
  const [isEdditing, setIsEdditing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, loadUserProfile } = useUser();
  const [, startTransition] = useTransition();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const getLanguageIcon = () => {
    if (user?.language) {
      return LOCALE_FEATURES[user?.language].icon;
    }
  };

  const getLanguageTitle = () => {
    if (user?.language) {
      return LOCALE_FEATURES[user?.language].title;
    }
  };

  const getUserLocale = () => {
    if (user?.language) {
      return LOCALE_FEATURES[user?.language].locale;
    }
    return "en";
  };

  const handleLocaleChange = async (locale: "en" | "es" | "pt") => {
    if (user) {
      const updateUser: UserInfo = {
        ...user,
        language: LOCALE_LANGUAGES[locale] as LocaleLanguage,
      };
      await updateProfile(user.id, updateUser);
      await loadUserProfile();
      startTransition(() => {
        setUserLocale(locale);
      });
      setIsDrawerOpen(false);
      setIsEdditing(false);
    }
  };

  return (
    <main className="max-w-7xl w-full">
      <h4 className="xl:mb-6 mb-4">{t("title")}</h4>
      <div className="mt-6 bg-card rounded-[8px] p-6 xl:py-10 xl:px-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h6>{t("language")}</h6>
            {user?.language && !isEdditing && (
              <div className="flex mt-3">
                <Image src={getLanguageIcon() || ""} alt={user.language} width={24} height={24} className="mr-2" />
                {<p className="text-body1">{getLanguageTitle()}</p>}
              </div>
            )}
          </div>
          {!isEdditing && (
            <Button
              variant="link"
              className="text-primary hidden md:block"
              onClick={() => {
                setSelectedOption(getUserLocale());
                setIsEdditing(true);
              }}
            >
              {t("edit")}
            </Button>
          )}
          {/* Mobile variant to open a drawer */}
          <Button variant="link" className="text-primary blcok md:hidden" onClick={() => setIsDrawerOpen(true)}>
            {t("edit")}
          </Button>
        </div>
        {user?.language && isEdditing && (
          <div className="flex mt-3 flex-col w-full">
            <Select
              value={selectedOption || ""}
              onValueChange={(value) => {
                setSelectedOption(value);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(LOCALE_FEATURES).map((l) => {
                    return (
                      <SelectItem value={l.locale} key={l.locale}>
                        <div className="flex">
                          <Image src={l.icon || ""} alt={l.title} width={24} height={24} className="mr-2" />
                          {<p className="text-body1">{l.title}</p>}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex mt-3 gap-x-4 justify-end">
              <Button variant="outline" onClick={() => setIsEdditing(false)}>
                {t("cancel")}
              </Button>
              <Button onClick={() => handleLocaleChange(selectedOption as "en" | "es" | "pt")}>{t("save")}</Button>
            </div>
          </div>
        )}
        <Separator marginY="my-6" />
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("language")}</DrawerTitle>
            <DrawerDescription>{t("selectLanguage")}</DrawerDescription>
          </DrawerHeader>
          <Separator />
          <div className="p-4 flex flex-col gap-y-4">
            {Object.values(LOCALE_FEATURES).map((l) => {
              return (
                <div
                  className={`${getUserLocale() === l.locale ? "border-primary" : "border-border-gray"} border-2 rounded-[8px] py-2 px-4`}
                  onClick={() => handleLocaleChange(l.locale)}
                  key={l.locale}
                >
                  <div className="flex">
                    <Image src={l.icon || ""} alt={l.title} width={24} height={24} className="mr-2" />
                    {<p className="text-body1">{l.title}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
};

export default PreferencesPage;
