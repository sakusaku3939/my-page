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
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  turbopack: {},
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
