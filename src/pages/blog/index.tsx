import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { GetStaticProps } from "next";
import { ExternalLink } from "lucide-react";
import commonStyles from "@/styles/blog-common.module.css";
import styles from "./index.module.css";
import type { BlogArticleSource, BlogListArticle } from "@/model/type/BlogArticle";
import { getAllBlogListArticles } from "@/model/BlogServer";
import { formatDate } from "@/utils/dateUtils";
import { BackgroundWrapper } from "@/components/atom/BackgroundWrapper/BackgroundWrapper";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";
import { useBlogHeaderScroll } from "@/hooks/useBlogHeaderScroll";

type BlogIndexProps = {
  articles: BlogListArticle[];
};

type ArticleFilter = "all" | BlogArticleSource;

const FILTERS: { value: ArticleFilter; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "blog", label: "ブログ" },
  { value: "zenn", label: "Zenn" },
  { value: "qiita", label: "Qiita" }
];

const SOURCE_LABELS: Record<BlogArticleSource, string> = {
  blog: "ブログ",
  zenn: "Zenn",
  qiita: "Qiita"
};

const BlogIndex = ({ articles }: BlogIndexProps) => {
  const isScrolledPastHeader = useBlogHeaderScroll();
  const [selectedFilter, setSelectedFilter] = useState<ArticleFilter>("all");
  const filteredArticles =
    selectedFilter === "all"
      ? articles
      : articles.filter((article) => article.source === selectedFilter);

  const getFilterCount = (filter: ArticleFilter) =>
    filter === "all"
      ? articles.length
      : articles.filter((article) => article.source === filter).length;

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
                "url": article.url.startsWith("http")
                  ? article.url
                  : `https://sakusaku3939.com${article.url}`,
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
        <HamburgerMenu lightMode={!isScrolledPastHeader} />

        {/* ヘッダーセクション */}
        <header className={`${commonStyles.blogHeader} ${styles.indexHeader}`}>
          <h1 className={commonStyles.pageTitle}>
            雑記などいろいろブログ
          </h1>
          <nav className={styles.filterTabs} aria-label="記事の掲載元で絞り込む">
            {FILTERS.map((filter) => {
              const isActive = selectedFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  className={`${styles.filterTab} ${isActive ? styles.filterTabActive : ""}`}
                  aria-pressed={isActive}
                  onClick={() => setSelectedFilter(filter.value)}
                >
                  <span>{filter.label}</span>
                  <span className={styles.filterCount}>
                    {getFilterCount(filter.value)}
                  </span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* 記事一覧セクション */}
        <div className={commonStyles.wrapper}>
          <main className={styles.blogContent}>
            <section
              className={styles.articlesList}
              aria-live="polite"
              aria-label={`${FILTERS.find((filter) => filter.value === selectedFilter)?.label}の記事`}
            >
            {filteredArticles.length === 0 ? (
              <div className={styles.noArticles}>記事がありません</div>
            ) : (
              filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            )}
            </section>
          </main>
        </div>

        <FooterMenu />
      </BackgroundWrapper>
    </>
  );
};

// 記事カードコンポーネント
type ArticleCardProps = {
  article: BlogListArticle;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const formattedDate = formatDate(article.date);
  const isExternal = article.source !== "blog";
  const card = (
    <article className={styles.articleCardInner}>
        {article.thumbnailUrl && (
          <div className={styles.thumbnailWrapper}>
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              width={300}
              height={200}
              className={styles.thumbnail}
              loading="lazy"
            />
          </div>
        )}

        <div className={article.thumbnailUrl ? styles.textContent : styles.textContentFull}>
          <div className={styles.articleMeta}>
            <span
              className={`${styles.sourceBadge} ${styles[`sourceBadge_${article.source}`]}`}
            >
              {SOURCE_LABELS[article.source]}
            </span>
            <time className={styles.articleDate}>{formattedDate}</time>
          </div>
          <h2 className={styles.articleTitle}>{article.title}</h2>
          <p
            className={`${styles.articleSummary} ${isExternal ? styles.articleSummaryExternal : ""}`}
          >
            {article.summary}
          </p>
          {isExternal && (
            <span className={styles.externalLinkLabel}>
              記事を読む
              <ExternalLink size={14} aria-hidden="true" />
            </span>
          )}
        </div>
    </article>
  );

  if (isExternal) {
    return (
      <a
        href={article.url}
        className={styles.articleCard}
        target="_blank"
        rel="noopener noreferrer"
      >
        {card}
      </a>
    );
  }

  return (
    <Link href={article.url} className={styles.articleCard}>
      {card}
    </Link>
  );
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const articles = await getAllBlogListArticles();

  return {
    props: {
      articles
    },
    revalidate: 3600 // 1時間ごとに再生成（ISR）
  };
};

export default BlogIndex;
