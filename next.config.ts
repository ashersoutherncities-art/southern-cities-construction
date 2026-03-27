import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/southern-cities-construction',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
