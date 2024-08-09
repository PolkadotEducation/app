import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Polkadot Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen items-center bg-white">
          <div className="flex justify-center min-h-screen max-w-[1440px] w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
