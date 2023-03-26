import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import posts from "@/styles/posts.module.css";
import common from "@/styles/common.module.css";
import remarkGfm from "remark-gfm";
import { CustomTagParser, ImageTagParser } from "@/model/CustomTagParser";
import Head from "next/head";
import Link from "next/link";
import { getPostData, getAllPostIds } from "@/model/PostApi";

type PostData = {
  content: string
}

const Posts = ({ content }: PostData) => {
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
            <li>Presc</li>
          </ol>
        </nav>
        <div className={`${posts.card} ${posts.post}`}>
          <ReactMarkdown rehypePlugins={[remarkGfm, rehypeRaw]} components={{ h1: CustomTagParser, img: ImageTagParser }}>
            {content}
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

export async function getStaticProps() {
  const data = getPostData("presc");
  return {
    props: { content: data }
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
}

export default Posts;