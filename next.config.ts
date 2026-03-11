import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.DOMAIN!,
      },
      {
        protocol: "https",
        hostname: process.env.DOMAIN!,
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // {
      //   protocol: "https",
      //   host: "res.cloudinary.com",
      // },x
    ],
  },
};

export default nextConfig;
