import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth/authProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <AuthProvider>
      <html lang={locale}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <body className={montserrat.className}>{children}</body>
        </NextIntlClientProvider>
      </html>
    </AuthProvider>
  );
}
