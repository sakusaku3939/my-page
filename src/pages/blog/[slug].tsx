import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import commonStyles from "@/styles/blog-common.module.css";
import styles from "./[slug].module.css";
import type { BlogArticle } from "@/model/type/BlogArticle";
import { formatDate } from "@/model/BlogServer";
import BackgroundTriangleWrapper from "@/components/atom/BackgroundTriangleWrapper/BackgroundTriangleWrapper";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";

const BlogDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!slug || typeof slug !== "string") {
      return;
    }

    const controller = new AbortController();

    (async () => {
      setLoaded(false);
      setError(null);

      try {
        const res = await fetch(`/api/blog/${slug}`, {
          signal: controller.signal
        });

        if (!res.ok) {
          if (res.status === 404) {
            setError("記事が見つかりませんでした。");
          } else {
            console.error(`HTTP error. status: ${res.status}`);
            setError("データの取得に失敗しました。");
          }
          setLoaded(true);
          return;
        }

        const json = await res.json();
        setArticle(json.article ?? null);
      } catch (e: any) {
        if (e.name !== "AbortError") {
          console.error(e);
          setError("データの取得に失敗しました。");
        }
      }

      setLoaded(true);
    })();

    return () => controller.abort();
  }, [slug]);

  const formattedDate = article ? formatDate(article.date) : "";

  const ogImageUrl = article 
    ? `/api/blog/og/${slug}?title=${encodeURIComponent(article.title)}`
    : '/images/blog-header.jpg';

  return (
    <>
      <Head>
        <title>{article ? `${article.title} | aokiti blog` : "Aokiti | Blog"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* OGP Meta Tags */}
        <meta property="og:title" content={article ? article.title : "aokiti blog"} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://aokiti.com/blog/${slug}`} />
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
        <HamburgerMenu />
        
        {/* ヘッダーセクション */}
        <header className={commonStyles.blogHeader}>
          <h1 className={commonStyles.blogTitle}>雑記などいろいろブログ</h1>
        </header>

        {/* 記事詳細セクション */}
        <div className={commonStyles.wrapper}>
          <article className={styles.articleContent}>
            {/* エラー時 */}
            {error && <div className={commonStyles.error}>{error}</div>}

            {/* ロード中 */}
            {!loaded && !error && (
              <div className={commonStyles.loading}>読み込み中...</div>
            )}

            {/* 記事コンテンツ */}
            {loaded && !error && article && (
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

export default BlogDetail;
