import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import posts from "@/pages/posts/Posts.module.css";
import common from "@/styles/common.module.css";
import remarkGfm from "remark-gfm";
import CustomTagParser from "@/components/atom/CustomTagParser/CustomTagParser";
import Head from "next/head";
import Link from "next/link";

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
          <ReactMarkdown rehypePlugins={[remarkGfm, rehypeRaw]} components={{ h1: CustomTagParser }}>
            {content}
          </ReactMarkdown>
        </div>
      </main>
      <aside>
        <div className={`${posts.card} ${posts.category}`}>
          <h1>すべてのカテゴリー</h1>
          <ul className={common.tag}>
            <li> Android / iOS</li>
            <li> Flutter</li>
            <li> Dart</li>
            <li> アプリ甲子園</li>
          </ul>
        </div>
      </aside>
    </div>
  </>;
};

export async function getStaticProps() {
  const data = await fetchPostData();
  return {
    props: data
  };
}

const fetchPostData = async () => {
  const res = await fetch("http://localhost:3000/api/post");
  const data: PostData = await res.json();
  // data.content = data.content.replaceAll(/\n/g, "\n\n");
  return data;
};

export default Posts;