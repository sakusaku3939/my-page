import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { GetStaticProps } from "next";
import commonStyles from "@/styles/blog-common.module.css";
import styles from "./index.module.css";
import type { BlogArticleWithSummary } from "@/model/type/BlogArticle";
import { getAllBlogArticles } from "@/model/BlogServer";
import { formatDate } from "@/utils/dateUtils";
import { BackgroundWrapper } from "@/components/atom/BackgroundWrapper/BackgroundWrapper";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";

type BlogIndexProps = {
  articles: BlogArticleWithSummary[];
};

const BlogIndex = ({ articles }: BlogIndexProps) => {
  return (
    <>
      <Head>
        <title>Aokiti | Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />

        {/* OGP Meta Tags */}
        <meta property="og:title" content="aokiti blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sakusaku3939.com/blog" />
        <meta property="og:image" content="https://sakusaku3939.com/images/blog-header.jpg" />
        <meta property="og:site_name" content="aokiti blog" />
        <meta property="og:description" content="雑記などいろいろブログ" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="aokiti blog" />
        <meta name="twitter:description" content="雑記などいろいろブログ" />
        <meta name="twitter:image" content="https://sakusaku3939.com/images/blog-header.jpg" />

        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "aokiti blog",
              "description": "雑記などいろいろブログ",
              "url": "https://sakusaku3939.com/blog",
              "author": {
                "@type": "Person",
                "name": "Aokiti"
              },
              "blogPost": articles.map(article => ({
                "@type": "BlogPosting",
                "headline": article.title,
                "url": `https://sakusaku3939.com/blog/${article.slug}`,
                "datePublished": article.date,
                "author": {
                  "@type": "Person",
                  "name": "Aokiti"
                }
              }))
            })
          }}
        />
      </Head>
      <BackgroundWrapper>
        <HamburgerMenu lightMode={true} />

        {/* ヘッダーセクション */}
        <header className={commonStyles.blogHeader}>
          <h1 className={commonStyles.pageTitle}>
            雑記などいろいろブログ
          </h1>
        </header>

        {/* 記事一覧セクション */}
        <div className={commonStyles.wrapper}>
          <section className={styles.articlesList}>
            {articles.length === 0 ? (
              <div className={styles.noArticles}>記事がありません</div>
            ) : (
              articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))
            )}
          </section>
        </div>

        <FooterMenu />
      </BackgroundWrapper>
    </>
  );
};

// 記事カードコンポーネント
type ArticleCardProps = {
  article: BlogArticleWithSummary;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const formattedDate = formatDate(article.date);
  const thumbnailUrl = `/blog/${article.slug}/thumbnail.jpg`;

  return (
    <Link href={`/blog/${article.slug}`} className={styles.articleCard}>
      <article className={styles.articleCardInner}>
        {/* サムネイル（存在する場合のみ） */}
        {article.hasThumbnail && (
          <div className={styles.thumbnailWrapper}>
            <Image
              src={thumbnailUrl}
              alt={article.title}
              width={300}
              height={200}
              className={styles.thumbnail}
              loading="lazy"
            />
          </div>
        )}

        {/* テキストコンテンツ */}
        <div className={article.hasThumbnail ? styles.textContent : styles.textContentFull}>
          <h2 className={styles.articleTitle}>{article.title}</h2>
          <time className={styles.articleDate}>{formattedDate}</time>
          <p className={styles.articleSummary}>{article.summary}</p>
        </div>
      </article>
    </Link>
  );
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const articles = getAllBlogArticles();

  return {
    props: {
      articles
    },
    revalidate: 3600 // 1時間ごとに再生成（ISR）
  };
};

export default BlogIndex;
