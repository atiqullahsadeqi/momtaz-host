import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  serverExternalPackages: [
    'nodejs-dna',
    'strong-soap',
    'strong-globalize',
    'globalize',
    'cldr',
    'cldrjs',
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'nodejs-dna': false,
        'strong-soap': false,
        'strong-globalize': false,
        'cldr': false,
        'globalize': false,
      };
    }
    return config;
  },
};

export default nextConfig;
