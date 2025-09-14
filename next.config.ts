import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // change if your Strapi or API runs on another port
        // pathname: '/uploads/**', // adjust to your image path
      },
    ],
  },
};

export default nextConfig;
