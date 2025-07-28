import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth/authProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { MDXProviderClient } from "@/context/mdx/mdxProvider";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/theme/themeProvider";
import * as Sentry from "@sentry/nextjs";
import Head from "next/head";

const montserrat = Montserrat({ subsets: ["latin"] });

export function generateMetadata(): Metadata {
  return {
    title: "Polkadot Education",
    description: "Discover the Possibilities of Blockchain",
    other: {
      ...Sentry.getTraceData(),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <ThemeProvider>
      <AuthProvider>
        <html lang={locale}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <body className={montserrat.className}>
              <MDXProviderClient>{children}</MDXProviderClient>
              <Toaster />
            </body>
          </NextIntlClientProvider>
        </html>
      </AuthProvider>
    </ThemeProvider>
  );
}
