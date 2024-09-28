import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth/authProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { MDXProviderClient } from "@/context/mdx/mdxProvider";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Polkadot Education",
  description: "Discover the Possibilities of Blockchain",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <AuthProvider>
      <html lang={locale}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <body className={montserrat.className}>
            <MDXProviderClient>{children}</MDXProviderClient>
            <Toaster />
          </body>
        </NextIntlClientProvider>
      </html>
    </AuthProvider>
  );
}
