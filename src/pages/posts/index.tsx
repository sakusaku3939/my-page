import index from "./index.module.css";
import type { Overview } from "@/model/type/Overview";
import { Post } from "@/components/organism/PostsList/PostsList";
import Category from "@/components/molecule/Category/Category";
import Head from "next/head";
import MobileCategory from "@/components/molecule/MobileCategory/MobileCategory";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import BackgroundTriangleWrapper from "@/components/atom/BackgroundTriangleWrapper/BackgroundTriangleWrapper";
import { getAllCategories, getPostOverview } from "@/model/PostServer";
import type { GetStaticProps } from "next";
import common from "@/styles/common.module.css";
import posts from "./posts.module.css";
import Link from "next/link";

type Props = {
  categories: { [tag: string]: number }[];
  overviews: Overview[];
  groupedByYear: { [year: string]: Overview[] };
  pinnedPosts: Overview[];
}

const Index = ({
                 categories,
                 overviews,
                 groupedByYear: precomputedGroupedByYear,
                 pinnedPosts: precomputedPinnedPosts
               }: Props) => {
  const router = useRouter();
  const q = router.query.filter;
  const filterText = Array.isArray(q) ? q.join(", ") : (q ?? "");
  const [isNavigating, setIsNavigating] = useState(false);

  const normalizedFilterText = useMemo(() =>
    filterText.toLowerCase(), [filterText]
  );

  const filteredOverviews = useMemo(() => {
    if (!filterText) return overviews;
    return overviews.filter(post =>
      post.tag.toLowerCase().includes(normalizedFilterText)
    );
  }, [overviews, filterText, normalizedFilterText]);

  const pinnedPosts = useMemo(() => {
    if (!filterText) return precomputedPinnedPosts;
    return filteredOverviews.filter(post => post.pinned);
  }, [filteredOverviews, filterText, precomputedPinnedPosts]);

  const groupedByYear = useMemo(() => {
    if (!filterText) {
      // フィルターがない場合は事前計算された結果を使用
      return Object.entries(precomputedGroupedByYear).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
    }

    // フィルターがある場合のみ動的にグルーピング
    const groups: { [year: string]: Overview[] } = {};
    filteredOverviews.forEach(post => {
      const year = new Date(post.date).getFullYear().toString();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(post);
    });
    return Object.entries(groups).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
  }, [filteredOverviews, filterText, precomputedGroupedByYear]);

  useEffect(() => {
    const handleStart = (url: string) => {
      // /posts/[slug]パターンに遷移する時だけローディング表示
      if (url.startsWith("/posts/") && url !== "/posts") {
        setIsNavigating(true);
      }
    };
    const handleComplete = () => setIsNavigating(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  if (isNavigating) {
    return <PlaceholderPostDetail categories={categories} />;
  }

  return (
    <>
      <Head>
        <title>Aokiti | Posts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundTriangleWrapper>
        <HamburgerMenu />
        <h1 className={index.postTitle}>個人開発 ・
          制作物など<span>{filterText?.length ? `「${filterText}」 の記事` : ""}</span></h1>
        <div className={index.mobileCategory}>
          <MobileCategory categories={categories} />
        </div>
        <div className={index.wrapper}>
          <section className={index.postsList}>
            {pinnedPosts.length > 0 && (
              <div className={index.yearGroup}>
                {pinnedPosts.map((post: Overview, key: number) => (
                  <div className={index.postCard}>
                    <Post key={key}
                          date={post.date}
                          imageUrl={post.thumbnail ?? `/posts/${post.slug}/thumbnail.jpg`}
                          href={`/posts/${post.slug}`}
                          title={post.title}
                          tag={post.tagArray}
                          pinned={post.pinned}
                          overview={post.overview} />
                  </div>
                ))}
                <div className={index.postDummy} />
                <div className={index.postDummy} />
                <div className={index.postDummy} />
              </div>
            )}
            {groupedByYear.map(([year, posts]) => (
              <div key={year} className={index.yearGroup}>
                <h2 className={index.yearTitle}>{year}</h2>
                {posts.map((post: Overview, key: number) => (
                  <div className={index.postCard}>
                    <Post key={key}
                          date={post.date}
                          imageUrl={post.thumbnail ?? `/posts/${post.slug}/thumbnail.jpg`}
                          href={`/posts/${post.slug}`}
                          title={post.title}
                          tag={post.tagArray}
                          pinned={post.pinned}
                          overview={post.overview} />
                  </div>
                ))}
                <div className={index.postDummy} />
                <div className={index.postDummy} />
                <div className={index.postDummy} />
              </div>
            ))}
          </section>
          <div className={index.category}>
            <Category categories={categories} />
          </div>
        </div>
        <FooterMenu />
      </BackgroundTriangleWrapper>
    </>
  );
};

const PlaceholderPostDetail = ({ categories }: { categories: Props["categories"] }) => {
  return (
    <div className={posts.wrapper}>
      <div className={`${posts.main} ${posts.placeholder}`}>
        <nav>
          <ol className={posts.breadcrumb}>
            <li><Link href="/posts">ホーム</Link></li>
            <li>&nbsp;</li>
          </ol>
        </nav>
        <div className={`${common.shadow} ${posts.post}`}>
          <div className={posts.title}>
            <div className={posts.titlePlaceholder}>&nbsp;</div>
          </div>
          <ul className={`${common.tag} ${posts.tag}`}>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
          </ul>
          <div>
            {Array(30).fill(0).map((_, i) => (
              <div key={i} className={posts.overviewPlaceholder}>&nbsp;</div>
            ))}
          </div>
        </div>
      </div>
      <Category categories={categories} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const categories = getAllCategories();
  const posts = getPostOverview(undefined);
  const sortedPosts = posts.sort((a, b) => (a.pinned && !b.pinned ? -1 : 1));

  // ピン留め記事を事前計算
  const pinnedPosts = sortedPosts.filter(post => post.pinned);

  // 年度ごとのグルーピングを事前計算
  const groupedByYear: { [year: string]: Overview[] } = {};
  sortedPosts.forEach(post => {
    const year = new Date(post.date).getFullYear().toString();
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(post);
  });

  return {
    props: {
      categories,
      overviews: sortedPosts,
      groupedByYear,
      pinnedPosts
    }
  };
};

export default Index;
