import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  // Keep server-side packages external (don't bundle them)
  serverExternalPackages: [
    'nodejs-dna',
    'strong-soap',
    'strong-globalize',
    'globalize',
    'cldr',
    'cldrjs',
  ],
  turbopack: {},
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
