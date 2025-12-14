import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import commonStyles from "@/styles/blog-common.module.css";
import styles from "./[slug].module.css";
import type { BlogArticle } from "@/model/type/BlogArticle";
import { getAdjacentArticles, getAllBlogSlugs, getBlogArticleBySlug } from "@/model/BlogServer";
import { formatDate } from "@/utils/dateUtils";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { BackgroundTriangleWrapper } from "@/components/atom/BackgroundTriangleWrapper/BackgroundTriangleWrapper";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

type BlogDetailProps = {
  article: BlogArticle | null;
  adjacentArticles: {
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
  };
};

const BlogDetail = ({ article, adjacentArticles }: BlogDetailProps) => {
  const router = useRouter();
  const formattedDate = article ? formatDate(article.date) : "";

  const baseUrl = "https://sakusaku3939.com";
  const ogImageUrl = article
    ? `${baseUrl}/__generated__/og/blog/${article.slug}.png`
    : `${baseUrl}/images/blog-header.jpg`;

  return (
    <>
      <Head>
        <title>{article ? `${article.title} | aokiti blog` : "Aokiti | Blog"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />

        {/* OGP Meta Tags */}
        <meta property="og:title" content={article ? article.title : "aokiti blog"} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/blog/${article?.slug || ""}`} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:site_name" content="aokiti blog" />
        <meta property="og:description" content="雑記などいろいろブログ" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article ? article.title : "aokiti blog"} />
        <meta name="twitter:description" content="雑記などいろいろブログ" />
        <meta name="twitter:image" content={ogImageUrl} />

        {/* 構造化データ */}
        {article && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": article.title,
                "url": `${baseUrl}/blog/${article.slug}`,
                "datePublished": article.date,
                "author": {
                  "@type": "Person",
                  "name": "Aokiti"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "aokiti blog"
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `${baseUrl}/blog/${article.slug}`
                }
              })
            }}
          />
        )}
      </Head>
      <BackgroundTriangleWrapper>
        <HamburgerMenu lightMode={true} />

        {/* ヘッダーセクション */}
        <header className={commonStyles.blogHeader}>
          <h1 className={commonStyles.pageTitle} onClick={() => router.push("/blog")}>
            雑記などいろいろブログ
          </h1>
        </header>

        {/* 記事詳細セクション */}
        <div className={commonStyles.wrapper}>
          <article className={styles.articleContent}>
            {/* 記事が見つからない場合 */}
            {!article && (
              <div className={commonStyles.error}>記事が見つかりませんでした。</div>
            )}

            {/* 記事コンテンツ */}
            {article && (
              <>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <time className={styles.articleDate}>{formattedDate}</time>
                <ReactMarkdown
                  className={styles.articleBody}
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {article.body}
                </ReactMarkdown>

                {/* 前後の記事ナビゲーション */}
                {(adjacentArticles.prev || adjacentArticles.next) && (
                  <nav className={styles.articleNav}>
                    {adjacentArticles.prev && (
                      <Link
                        href={`/blog/${adjacentArticles.prev.slug}`}
                        className={styles.navLink}
                      >
                        <span className={styles.navArrow}>←</span>
                        <div className={styles.navContent}>
                          <span className={styles.navLabel}>前の記事</span>
                          <span className={styles.navTitle}>{adjacentArticles.prev.title}</span>
                        </div>
                      </Link>
                    )}
                    {adjacentArticles.next && (
                      <Link
                        href={`/blog/${adjacentArticles.next.slug}`}
                        className={`${styles.navLink} ${styles.navLinkNext}`}
                      >
                        <div className={styles.navContent}>
                          <span className={styles.navLabel}>次の記事</span>
                          <span className={styles.navTitle}>{adjacentArticles.next.title}</span>
                        </div>
                        <span className={styles.navArrow}>→</span>
                      </Link>
                    )}
                  </nav>
                )}
              </>
            )}
          </article>
        </div>
      </BackgroundTriangleWrapper>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllBlogSlugs();

  return {
    paths: slugs,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<BlogDetailProps> = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true
    };
  }

  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return {
      notFound: true
    };
  }

  const adjacentArticles = getAdjacentArticles(slug);

  return {
    props: {
      article,
      adjacentArticles
    }
  };
};

export default BlogDetail;
