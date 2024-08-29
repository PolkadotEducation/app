import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth/authProvider";
import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "./mdxComponents";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <AuthProvider>
      <MDXProvider components={useMDXComponents}>
        <html lang={locale}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <body className={montserrat.className}>{children}</body>
          </NextIntlClientProvider>
        </html>
      </MDXProvider>
    </AuthProvider>
  );
}
