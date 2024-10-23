"use client";

import { MDXProvider, useMDXComponents } from "@mdx-js/react";

export function MDXProviderClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MDXProvider components={useMDXComponents()}>{children}</MDXProvider>;
}
