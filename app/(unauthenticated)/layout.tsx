import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Polkadot Education",
};

export default function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex flex-col min-h-screen items-center bg-white">
        <div className="flex justify-center min-h-screen max-w-7xl w-full">{children}</div>
      </div>
    </main>
  );
}
