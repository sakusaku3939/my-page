// Agent Skills の配布ページとその配布物にだけ適用するセキュリティヘッダ。
// スキルのアーカイブとインストーラを配る経路なので、この配下だけ個別に固める。
// _app.tsx が全ページで Google Fonts と gtag を読み込むため、その2つは許可する。
const agentSkillsCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://www.google-analytics.com https://*.googletagmanager.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'"
].join("; ");

const agentSkillsHeaders = [
  { key: "Content-Security-Policy", value: agentSkillsCsp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
];

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
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/zenn/image/upload/**"
      },
      {
        protocol: "https",
        hostname: "qiita-user-contents.imgix.net",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "cdn.qiita.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "qiita-image-store.s3.ap-northeast-1.amazonaws.com",
        pathname: "/**"
      }
    ]
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
  },
  async headers() {
    return [
      { source: "/agent-skills", headers: agentSkillsHeaders },
      { source: "/agent-skills/:path*", headers: agentSkillsHeaders }
    ];
  }
};

module.exports = nextConfig;
