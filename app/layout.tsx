"use client";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth/authProvider";
import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "./mdxComponents";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <MDXProvider components={useMDXComponents}>
        <html lang="en">
          <body className={montserrat.className}>{children}</body>
        </html>
      </MDXProvider>
    </AuthProvider>
  );
}
