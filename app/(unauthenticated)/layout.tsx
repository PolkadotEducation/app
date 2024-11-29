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
        <div className="flex flex-col max-w-[425px] w-full h-dvh pt-6">
          <div className="items-start">
            <Logo pathToRedirect="/login" />
          </div>
          <div className="flex flex-1 items-center">
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
