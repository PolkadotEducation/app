"use client";
import { usePathname } from "next/navigation";
import { authBgImage, signUp, forgotPassword, resetPassword } from "@/public/assets/images";
import Image from "next/image";

const UnauthenticatedBgImage = () => {
  const pathname = usePathname();

  const backgroundImage = pathname.startsWith("/login")
    ? authBgImage
    : pathname.startsWith("/sign-up")
      ? signUp
      : pathname.startsWith("/reset-password")
        ? resetPassword
        : pathname.startsWith("/forgot-password")
          ? forgotPassword
          : authBgImage;

  return (
    <Image
      src={backgroundImage}
      alt="Auth Image"
      fill
      className="object-cover"
      sizes="50vw"
      placeholder="blur"
      data-cy="image-login"
    />
  );
};

export default UnauthenticatedBgImage;
