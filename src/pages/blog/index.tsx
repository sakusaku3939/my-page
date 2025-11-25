import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import commonStyles from "@/styles/blog-common.module.css";
import styles from "./index.module.css";
import type { BlogArticleWithSummary } from "@/model/type/BlogArticle";
import { formatDate } from "@/model/BlogServer";
import BackgroundTriangleWrapper from "@/components/atom/BackgroundTriangleWrapper/BackgroundTriangleWrapper";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";

const BlogIndex = () => {
  const [articles, setArticles] = useState<BlogArticleWithSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoaded(false);
      setError(null);

      try {
        const res = await fetch("/api/blog", {
          signal: controller.signal
        });

        if (!res.ok) {
          console.error(`HTTP error. status: ${res.status}`);
          setError("データの取得に失敗しました。");
          setLoaded(true);
          return;
        }

        const json = await res.json();
        setArticles(json.articles ?? []);
      } catch (e: any) {
        if (e.name !== "AbortError") {
          console.error(e);
          setError("データの取得に失敗しました。");
        }
      }

      setLoaded(true);
    })();

    return () => controller.abort();
  }, []);

  return (
    <>
      <Head>
        <title>Aokiti | Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
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
      </Head>
      <BackgroundTriangleWrapper>
        <HamburgerMenu />
        
        {/* ヘッダーセクション */}
        <header className={commonStyles.blogHeader}>
          <h1 className={commonStyles.blogTitle}>雑記などいろいろブログ</h1>
        </header>

        {/* 記事一覧セクション */}
        <div className={commonStyles.wrapper}>
          <section className={styles.articlesList}>
            {/* エラー時 */}
            {error && <div className={commonStyles.error}>{error}</div>}

            {/* ロード中 */}
            {!loaded && !error && (
              <div className={commonStyles.loading}>読み込み中...</div>
            )}

            {/* 記事一覧 */}
            {loaded && !error && articles.length === 0 && (
              <div className={styles.noArticles}>記事がありません</div>
            )}

            {loaded && !error && articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </section>
        </div>

        <FooterMenu />
      </BackgroundTriangleWrapper>
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
            <img 
              src={thumbnailUrl} 
              alt={article.title}
              className={styles.thumbnail}
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

export default BlogIndex;
