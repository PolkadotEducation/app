"use client";

import { useAuth } from "@/hooks/useAuth";
import Logo from "./logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import Image from "next/image";
import chevronDown from "@/public/assets/icons/chevronDown.svg";
import hamburgerMenu from "@/public/assets/icons/hamburgerMenu.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const AppHeader = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [picture, setPicture] = useState<string | undefined>("");
  const { state, signOut } = useAuth();
  const t = useTranslations("components");

  useEffect(() => {
    if (state.userToken && state.userInfo) {
      setEmail(state.userInfo.email);
      setName(state.userInfo.name);
      setIsAdmin(state.userInfo.isAdmin);
      setPicture(state.userInfo.picture);
    }
  }, [Object.keys(state.userInfo || {}).length]);

  return (
    <div className="w-full flex justify-center bg-primary">
      <div className="w-full max-w-7xl h-16 flex justify-between px-6 items-center">
        <Logo width={199} height={19} pathToRedirect="/" theme="dark" />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="cursor-pointer">
              <div className="hidden xl:flex">
                {picture ? (
                  <div className="w-12 h-12 mr-[14px] rounded-full flex items-center justify-center">
                    <Image
                      unoptimized
                      src={picture}
                      width={48}
                      height={48}
                      alt="Profile Picture"
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 mr-[14px] rounded-full bg-[#321D47] flex items-center justify-center">
                    <p className="unbound-font text-white font-bold text-xl">{(name || "").charAt(0)}</p>
                  </div>
                )}
                <Image
                  unoptimized
                  src={chevronDown}
                  height={8}
                  alt="Chevron Down"
                  data-cy="button-header-menu-desktop"
                />
              </div>
              <Image
                unoptimized
                src={hamburgerMenu}
                height={24}
                alt="Chevron Down"
                className="block xl:hidden"
                data-cy="button-header-menu"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex items-center">
                {picture ? (
                  <div className="w-12 h-12 mr-[14px] rounded-full flex items-center justify-center">
                    <Image
                      unoptimized
                      src={picture}
                      width={48}
                      height={48}
                      alt="Profile Picture"
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 mr-[14px] rounded-full bg-[#321D47] flex items-center justify-center">
                    <p className="unbound-font text-white font-bold text-xl">{(name || "").charAt(0)}</p>
                  </div>
                )}
                <div className="flex flex-col w-[150px]">
                  <p className="truncate">{name}</p>
                  <p className="font-normal text-xs truncate">{email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer">{t("profile")}</DropdownMenuItem>
            </Link>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <Link href="/backoffice" data-cy="link-header-backoffice">
                  <DropdownMenuItem className="cursor-pointer">{t("backoffice")}</DropdownMenuItem>
                </Link>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
              {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AppHeader;
