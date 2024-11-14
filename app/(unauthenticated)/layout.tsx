import "../globals.css";
import { authBgImage } from "@/public/assets/images";
import Image from "next/image";
import AnimatedPage from "@/components/ui/animatedPage";
import Logo from "@/components/ui/logo";

export default function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <div className="w-full xl:w-1/2 flex items-center justify-center px-2 bg-card">
        <div className="flex flex-col max-w-[425px] w-full h-full relative pt-6 xl:pt-0">
          <div className="xl:absolute xl:top-6 xl:left-0 scale-100 xl:scale-90 2xl:scale-100 transform-origin-top-center">
            <Logo width={208} height={60} pathToRedirect="/login" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <AnimatedPage>{children}</AnimatedPage>
          </div>
        </div>
      </div>
      <div className="relative hidden xl:block xl:w-1/2">
        <Image
          src={authBgImage}
          alt="Auth Image"
          fill
          className="object-cover"
          sizes="50vw"
          placeholder="blur"
          data-cy="image-login"
        />
      </div>
    </div>
  );
}
