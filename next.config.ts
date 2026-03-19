import type { NextConfig } from "next";
// @ts-expect-error - No type definitions available for anchor-pki
import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({ enabledEnv: "development" });

const nextConfig: NextConfig = {
  allowedDevOrigins: ["momtaz-host.lcl.host", "momtaz-host.localhost"],
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

export default withAutoCert(nextConfig);
