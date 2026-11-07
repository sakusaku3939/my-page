import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import common from "@/styles/common.module.css";
import markdownLists from "@/styles/markdown-lists.module.css";
import posts from "./posts.module.css";
import mdStyle from "./markdown.module.css";
import remarkGfm from "remark-gfm";
import { CustomTagParser, ImageTagParser } from "@/model/CustomTagParser";
import Head from "next/head";
import Link from "next/link";
import Category from "@/components/molecule/Category/Category";
import { useRouter } from "next/router";
import { renderTags } from "@/model/PostClient";
import { getAllCategories, getPostData, getPostOverview } from "@/model/PostServer";
import matter from "gray-matter";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import index from "./index.module.css";
import { PlaceholderPost } from "@/components/organism/PostsList/PostsList";
import MobileCategory from "@/components/molecule/MobileCategory/MobileCategory";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { CodeXml } from "lucide-react";
import { FooterMenu } from "@/components/molecule/Menu/Menu";
import { BackgroundWrapper } from "@/components/atom/BackgroundWrapper/BackgroundWrapper";

type ListLayout = {
  pinnedCount: number;
  yearCounts: number[];
}

type PostData = {
  overview: any;
  markdownBody: string;
  categories: { [tag: string]: number }[];
  listLayout: ListLayout;
}

const Posts = ({ overview, markdownBody, categories, listLayout }: PostData) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      // /postsに戻る時だけローディング表示
      if (url === "/posts" || url.startsWith("/posts?")) {
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
    return <PlaceholderPostList categories={categories} listLayout={listLayout} />;
  }

  return (
    <>
      <Head>
        <title>{`${overview?.title ?? ""} | Aokiti`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={posts.wrapper}>
        <main className={posts.main}>
          <nav>
            <ol className={posts.breadcrumb}>
              <li><Link href="/posts">ホーム</Link></li>
              <li>{overview?.title ?? ""}</li>
            </ol>
          </nav>
          <div className={`${common.shadow} ${posts.post}`}>
            <div className={posts.header}>
              <div className={posts.title}>{overview?.title ?? ""}</div>
              {overview?.date && <time className={posts.date}>{overview.date}</time>}
            </div>
            <ul className={`${common.tag} ${posts.tag}`}>
              {overview ? renderTags(router, String(overview.tag ?? "").split(", ")) : null}
            </ul>
            <ReactMarkdown
              className={`${mdStyle.markdown} ${markdownLists.lists}`}
              rehypePlugins={[remarkGfm, rehypeRaw]}
              components={{
                h1: CustomTagParser,
                img: ImageTagParser
              }}>
              {markdownBody}
            </ReactMarkdown>
          </div>
        </main>
        <Category categories={categories} />
      </div>
    </>
  );
};


const PlaceholderPostList = ({ categories, listLayout }: Pick<PostData, "categories" | "listLayout">) => {
  return (
    <>
      <Head>
        <title>Aokiti | Posts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundWrapper>
        <HamburgerMenu />
        <h1 className={common.pageTitle}>
          <CodeXml size={36} />
          個人開発 ・ 制作物など
        </h1>
        <div className={index.mobileCategory}>
          <MobileCategory categories={categories} />
        </div>
        <div className={index.wrapper}>
          <section className={index.postsList}>
            {listLayout.pinnedCount > 0 && (
              <div className={index.yearGroup}>
                {Array.from({ length: listLayout.pinnedCount }, (_, i) => (
                  <div key={`pinned-${i}`} className={index.postCard}>
                    <PlaceholderPost />
                  </div>
                ))}
              </div>
            )}
            {listLayout.yearCounts.map((count, yearIndex) => (
              <div key={`year-${yearIndex}`} className={index.yearGroup}>
                <h2 className={index.yearTitle}>
                  <div className={index.yearTitlePlaceholder}>&nbsp;</div>
                </h2>
                {Array.from({ length: count }, (_, i) => (
                  <div key={`year-${yearIndex}-${i}`} className={index.postCard}>
                    <PlaceholderPost />
                  </div>
                ))}
              </div>
            ))}
          </section>
          <div className={index.category}>
            <Category categories={categories} />
          </div>
        </div>
        <FooterMenu />
      </BackgroundWrapper>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPostOverview(undefined);
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<PostData> = async ({ params }) => {
  const slug = params?.slug as string;
  const raw = getPostData(`${slug}.md`);
  const singleDocument = matter(raw);
  const categories = getAllCategories();
  const overviews = getPostOverview(undefined);
  const yearCounts: { [year: string]: number } = {};
  overviews.forEach(post => {
    const year = new Date(post.date).getFullYear().toString();
    yearCounts[year] = (yearCounts[year] ?? 0) + 1;
  });

  return {
    props: {
      overview: singleDocument.data,
      markdownBody: singleDocument.content,
      categories,
      listLayout: {
        pinnedCount: overviews.filter(post => post.pinned).length,
        yearCounts: Object.entries(yearCounts)
          .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
          .map(([, count]) => count)
      }
    }
  };
};

export default Posts;
