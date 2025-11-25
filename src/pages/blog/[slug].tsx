import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
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

  return (
    <>
      <Head>
        <title>{article ? `${article.title} | Aokiti Blog` : "Aokiti | Blog"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundTriangleWrapper>
        <HamburgerMenu />
        
        {/* ヘッダーセクション */}
        <header className={styles.blogHeader}>
          <h1 className={styles.blogTitle}>雑記などいろいろブログ</h1>
        </header>

        {/* 記事詳細セクション */}
        <div className={styles.wrapper}>
          <article className={styles.articleContent}>
            {/* エラー時 */}
            {error && <div className={styles.error}>{error}</div>}

            {/* ロード中 */}
            {!loaded && !error && (
              <div className={styles.loading}>読み込み中...</div>
            )}

            {/* 記事コンテンツ */}
            {loaded && !error && article && (
              <>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <time className={styles.articleDate}>{formattedDate}</time>
                <div 
                  className={styles.articleBody}
                  dangerouslySetInnerHTML={{ __html: article.body }}
                />
              </>
            )}
          </article>
        </div>

        <FooterMenu />
      </BackgroundTriangleWrapper>
    </>
  );
};

export default BlogDetail;
