import Head from "next/head";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import commonStyles from "@/styles/blog-common.module.css";
import styles from "./[slug].module.css";
import type { BlogArticle } from "@/model/type/BlogArticle";
import { formatDate, getBlogArticleBySlug, getAllBlogSlugs } from "@/model/BlogServer";
import BackgroundTriangleWrapper from "@/components/atom/BackgroundTriangleWrapper/BackgroundTriangleWrapper";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import type { GetStaticProps, GetStaticPaths } from "next";

type BlogDetailProps = {
  article: BlogArticle | null;
};

const BlogDetail = ({ article }: BlogDetailProps) => {
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
      </Head>
      <BackgroundTriangleWrapper>
        <HamburgerMenu lightMode={true} />

        {/* ヘッダーセクション */}
        <header className={commonStyles.blogHeader}>
          <h1 className={commonStyles.blogTitle}>雑記などいろいろブログ</h1>
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

  return {
    props: {
      article
    }
  };
};

export default BlogDetail;
