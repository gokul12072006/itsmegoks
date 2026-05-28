import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/itsmegoks",
  assetPrefix: "/itsmegoks/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
