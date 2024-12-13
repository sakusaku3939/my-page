/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true
  },
  i18n: {
    locales: ["ja"],
    defaultLocale: "ja"
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/db/3643832.3661836",
        destination: "/db/yololstm.pdf"
      }
    ];
  }
};

module.exports = nextConfig;
