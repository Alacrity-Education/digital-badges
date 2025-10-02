import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(process.env.S3_URL + "/**")],
  },
};

export default nextConfig;
