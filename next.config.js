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
      },
      {
        source: "/db/2024f-term-resume.pdf",
        destination: "/db/2024f-term-resume.pdf"
      }
    ];
  }
};

module.exports = nextConfig;
