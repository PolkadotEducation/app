import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    NEXT_PUBLIC_API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:4000",
    NEXT_PUBLIC_AUTH_TOKEN: process.env.NEXT_PUBLIC_AUTH_TOKEN || "localAuthCode",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  },
};

const withMDX = createMDX({});
const withNextIntl = createNextIntlPlugin();

export default withMDX(withNextIntl(nextConfig));
