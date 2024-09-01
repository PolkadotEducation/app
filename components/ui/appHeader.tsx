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

const AppHeader = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { state, signOut } = useAuth();

  useEffect(() => {
    if (state.userToken && state.userInfo) {
      setEmail(state.userInfo.email);
      setName(state.userInfo.name);
      setIsAdmin(state.userInfo.isAdmin);
    }
  }, [Object.keys(state.userInfo || {}).length]);

  return (
    <div className="w-full flex justify-center bg-[#E6007A]">
      <div className="w-full max-w-[1440px] h-16 flex justify-between px-6 items-center">
        <Logo width={199} height={19} pathToRedirect="/" theme="dark" />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="cursor-pointer">
              <div className="hidden xl:flex">
                <div className="w-12 h-12 mr-[14px] rounded-full bg-[#321D47] flex items-center justify-center">
                  <p className="unbound-font text-white font-bold text-xl">{(name || "").charAt(0)}</p>
                </div>
                <Image unoptimized src={chevronDown} height={8} alt="Chevron Down" />
              </div>
              <Image unoptimized src={hamburgerMenu} height={24} alt="Chevron Down" className="block xl:hidden" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex items-center">
                <div className="w-12 h-12 mr-[14px] rounded-full bg-[#321D47] flex items-center justify-center">
                  <p className="unbound-font text-white font-bold text-xl">{(name || "").charAt(0)}</p>
                </div>
                <div className="flex flex-col w-[150px]">
                  <p className="truncate">{name}</p>
                  <p className="font-normal text-xs truncate">{email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isAdmin && (
              <DropdownMenuItem>
                <Link href="/backoffice">Backoffice</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AppHeader;
