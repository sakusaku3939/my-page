import index from "./index.module.css";
import type { Overview } from "@/model/type/Overview";
import { PlaceholderPost, Post } from "@/components/organism/PostsList/PostsList";
import Category from "@/components/molecule/Category/Category";
import Head from "next/head";
import MobileCategory from "@/components/molecule/MobileCategory/MobileCategory";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BackgroundTriangleWrapper from "@/components/atom/BackgroundTriangleWrapper/BackgroundTriangleWrapper";

type Props = {
  filter: string | string[],
  categories: { [tag: string]: number }[],
  overviews: Overview[],
}

let cachedData: { filterText: string, categories: any[]; overviews: any[] } | null = null;

const Index = () => {
  const router = useRouter();
  const q = router.query.filter;
  const filterText = Array.isArray(q) ? q.join(", ") : (q ?? "");

  const [categories, setCategories] = useState<Props["categories"]>((cachedData?.categories ?? []));
  const [overviews, setOverviews] = useState<Props["overviews"]>((cachedData?.overviews ?? []));
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(cachedData !== null);

  useEffect(() => {
    if (!router.isReady) return;
    if (cachedData?.filterText === filterText) {
      // キャッシュが有効なら再取得しない
      return;
    }

    const controller = new AbortController();

    (async () => {
      setLoaded(false);
      setError(null);
      setOverviews([]);

      try {
        const res = await fetch(`/api/posts${filterText ? `?filter=${encodeURIComponent(filterText)}` : ""}`, {
          signal: controller.signal
        });

        if (!res.ok) {
          console.error(`HTTP error. status: ${res.status}`);
          setError("データの取得に失敗しました。");
        }
        const json = await res.json();

        setCategories(json.categories ?? []);
        setOverviews(json.overviews ?? []);

        cachedData = {
          filterText,
          categories: json.categories ?? [],
          overviews: json.overviews ?? []
        };
      } catch (e: any) {
        if (e.name !== "AbortError") {
          console.error(e);
          setError("データの取得に失敗しました。");
        }
      }

      setLoaded(true);
    })();

    return () => controller.abort();
  }, [filterText, router.isReady]);

  return (
    <>
      <Head>
        <title>Aokiti | Posts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundTriangleWrapper />
      <HamburgerMenu />
      <h1 className={index.postTitle}>制作物一覧<span>{filterText?.length ? `「${filterText}」 の記事` : ""}</span></h1>
      <div className={index.mobileCategory}>
        <MobileCategory categories={categories} />
      </div>
      <div className={index.wrapper}>
        <section className={index.postsList}>
          {/* エラー時 */}
          {error && <div>{error}</div>}

          {/* ロード中のプレースホルダー */}
          {!loaded && !error && Array(6).fill(0).map((_, i) => <PlaceholderPost key={i} />)}

          {/* 投稿一覧 */}
          {!error && overviews.map((post: Overview, key: number) => (
            <Post key={key}
                  date={post.date}
                  imageUrl={post.thumbnail ?? `/posts/${post.slug}/thumbnail.jpg`}
                  href={`/posts/${post.slug}`}
                  title={post.title}
                  tag={post.tag.split(", ")}
                  pinned={post.pinned}
                  overview={post.overview} />
          ))}
          <div className={index.postDummy} />
          <div className={index.postDummy} />
          <div className={index.postDummy} />
        </section>
        <div className={index.category}>
          <Category categories={categories} />
        </div>
      </div>
      <FooterMenu />
    </>
  );
};

export default Index;
