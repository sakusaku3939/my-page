import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import posts from "@/styles/posts.module.css";
import common from "@/styles/common.module.css";
import remarkGfm from "remark-gfm";
import { CustomTagParser, ImageTagParser } from "@/model/CustomTagParser";
import Head from "next/head";
import Link from "next/link";
import { getPostData, getAllPostSlugs, getAllCategories } from "@/model/PostApi";
import matter from "gray-matter";
import { GetStaticPropsContext } from "next";
import Category from "@/components/molecule/Category/Category";

type PostData = {
  front: any,
  markdownBody: string,
  categories: { [tag: string]: number }[],
}

const Posts = ({ front, markdownBody, categories }: PostData) => {
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
            <li><Link href="/posts">ホーム</Link></li>
            <li>{front.title}</li>
          </ol>
        </nav>
        <div className={`${common.shadow} ${posts.post}`}>
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
      <Category tags={categories}/>
    </div>
  </>;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const rawSlug = context.params?.slug ?? "";
  const slug = typeof rawSlug === "string" ? rawSlug : rawSlug[0];
  const data = getPostData(slug);
  const singleDocument = matter(data);
  const categories = getAllCategories();

  return {
    props: {
      front: singleDocument.data,
      markdownBody: singleDocument.content,
      categories: categories
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