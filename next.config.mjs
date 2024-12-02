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
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  },
};

const withMDX = createMDX({});
const withNextIntl = createNextIntlPlugin();

export default withMDX(withNextIntl(nextConfig));
