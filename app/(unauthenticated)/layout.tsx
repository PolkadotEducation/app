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
      <div className="flex w-full xl:w-1/2 justify-center bg-card">
        <div className="flex flex-col h-dvh max-w-[450px] min-w-[340px] px-5">
          <div className="flex p-[5vh] mx-auto">
            <Logo pathToRedirect="/login" />
          </div>
          <div className="flex flex-1 items-center mx-auto">
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
