import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co", // This is the standard ImgBB domain
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.imgbb.com", // Covers other potential ImgBB subdomains
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
