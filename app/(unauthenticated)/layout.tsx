import "../globals.css";
import AnimatedPage from "@/components/ui/animatedPage";
import Logo from "@/components/ui/logo";
import UnauthenticatedBgImage from "@/components/ui/unaunthenticatedBgImage";

export default function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <div className="w-full xl:w-1/2 flex items-center justify-center px-2 bg-card">
        <div className="flex flex-col max-w-[425px] w-full h-dvh pt-6 gap-4 md:gap-0 lg:gap-0">
          <div className="flex justify-center">
            <Logo pathToRedirect="/login" />
          </div>
          <div className="flex flex-1 items-center justify-center w-[360px] mx-auto">
            <AnimatedPage>{children}</AnimatedPage>
          </div>
        </div>
      </div>
      <div className="relative hidden xl:block xl:w-1/2">
        <UnauthenticatedBgImage />
      </div>
    </div>
  );
}
