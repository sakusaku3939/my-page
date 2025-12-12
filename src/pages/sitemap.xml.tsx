import { GetServerSideProps } from "next";
import { getAllBlogSlugs } from "@/model/BlogServer";

const Sitemap = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = "https://sakusaku3939.com";

  const blogPages = ["/blog"];

  // ブログ記事のURL
  const blogSlugs = getAllBlogSlugs();
  const blogUrls = blogSlugs.map(({ params }) => `/blog/${params.slug}`);

  // ブログ関連URLのみを結合
  const allUrls = [...blogPages, ...blogUrls];

  // サイトマップXMLを生成
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
    .map((url) => {
      return `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === "/blog" ? "1.0" : "0.9"}</priority>
  </url>`;
    })
    .join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

export default Sitemap;