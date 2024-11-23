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
        <div className="flex flex-col max-w-[425px] w-full h-full relative pt-6 xl:pt-0">
          <div className="xl:absolute xl:top-6 xl:left-0 scale-100 xl:scale-90 2xl:scale-100 transform-origin-top-center mb-4 h-short:scale-80">
            <Logo width={208} height={60} pathToRedirect="/login" />
          </div>
          <div className="flex flex-1 items-center justify-center">
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
