import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import posts from "@/styles/posts.module.css";
import common from "@/styles/common.module.css";
import remarkGfm from "remark-gfm";
import { CustomTagParser, ImageTagParser } from "@/model/CustomTagParser";
import Head from "next/head";
import Link from "next/link";
import { getPostData, getAllPostSlugs } from "@/model/PostApi";
import matter from "gray-matter";
import { GetStaticPropsContext } from "next";

type PostData = {
  front: any,
  markdownBody: string,
}

const Posts = ({ front, markdownBody }: PostData) => {
  return <>
    <Head>
      <title>Posts | Aokiti</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={posts.wrapper}>
      <main>
        <nav>
          <ol className={posts.breadcrumb}>
            <li><Link href="">ホーム</Link></li>
            <li>{front.title}</li>
          </ol>
        </nav>
        <div className={`${posts.card} ${posts.post}`}>
          <div className={posts.title}>{front.title}</div>
          <ul className={`${common.tag} ${posts.tag}`}>
            {
              front.tag.split(", ").map((value: string, key: number) => (
                <li key={key}>{value}</li>
              ))
            }
          </ul>
          <ReactMarkdown rehypePlugins={[remarkGfm, rehypeRaw]} components={{
            h1: CustomTagParser,
            img: ImageTagParser
          }}>
            {markdownBody}
          </ReactMarkdown>
        </div>
      </main>
      <aside>
        <div className={`${posts.card} ${posts.category}`}>
          <h1>すべてのカテゴリー</h1>
          <ul className={common.tag}>
            <li>Android / iOS (3)</li>
            <li>Flutter (2)</li>
            <li>Dart (2)</li>
            <li>アプリ甲子園 (1)</li>
          </ul>
        </div>
      </aside>
    </div>
  </>;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const rawSlug = context.params?.slug ?? "";
  const slug = typeof rawSlug === "string" ? rawSlug : rawSlug[0];
  const data = getPostData(slug);
  const singleDocument = matter(data);
  return {
    props: {
      front: singleDocument.data,
      markdownBody: singleDocument.content
    }
  };
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false
  };
}

export default Posts;