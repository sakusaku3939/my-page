import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import common from "@/styles/common.module.css";
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
import type { GetStaticProps, GetStaticPaths } from "next";
import { useEffect, useState } from "react";
import index from "./index.module.css";
import { PlaceholderPost } from "@/components/organism/PostsList/PostsList";
import MobileCategory from "@/components/molecule/MobileCategory/MobileCategory";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";
import BackgroundTriangleWrapper from "@/components/atom/BackgroundTriangleWrapper/BackgroundTriangleWrapper";

type PostData = {
  overview: any;
  markdownBody: string;
  categories: { [tag: string]: number }[];
}

const Posts = ({ overview, markdownBody, categories }: PostData) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      // /postsに戻る時だけローディング表示
      if (url === '/posts' || url.startsWith('/posts?')) {
        setIsNavigating(true);
      }
    };
    const handleComplete = () => setIsNavigating(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  if (isNavigating) {
    return <PlaceholderPostList categories={categories} />;
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
            <div className={posts.title}>{overview?.title ?? ""}</div>
            <ul className={`${common.tag} ${posts.tag}`}>
              {overview ? renderTags(router, String(overview.tag ?? "").split(", ")) : null}
            </ul>
            <ReactMarkdown
              className={mdStyle.markdown}
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



const PlaceholderPostList = ({ categories }: { categories: PostData['categories'] }) => {
  return (
    <>
      <Head>
        <title>Aokiti | Posts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundTriangleWrapper>
        <HamburgerMenu />
        <h1 className={index.postTitle}>個人開発 ・ 制作物など</h1>
        <div className={index.mobileCategory}>
          <MobileCategory categories={categories} />
        </div>
        <div className={index.wrapper}>
          <section className={index.postsList}>
            {Array(6).fill(0).map((_, i) => <PlaceholderPost key={i} />)}
            <div className={index.postDummy} />
            <div className={index.postDummy} />
            <div className={index.postDummy} />
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

  return {
    props: {
      overview: singleDocument.data,
      markdownBody: singleDocument.content,
      categories
    }
  };
};

export default Posts;
