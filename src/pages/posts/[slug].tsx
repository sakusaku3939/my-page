import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import posts from "@/styles/posts.module.css";
import common from "@/styles/common.module.css";
import mdStyle from "@/styles/markdown.module.css";
import remarkGfm from "remark-gfm";
import { CustomTagParser, ImageTagParser } from "@/model/CustomTagParser";
import Head from "next/head";
import Link from "next/link";
import Category from "@/components/molecule/Category/Category";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { renderTags } from "@/model/PostClient";


type PostData = {
  overview: any,
  markdownBody: string,
  categories: { [tag: string]: number }[],
}

const Posts = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [overview, setOverview] = useState<any | null>(null);
  const [markdownBody, setMarkdownBody] = useState<string>("");
  const [categories, setCategories] = useState<{ [tag: string]: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    if (!slug || typeof slug !== "string") return;

    const controller = new AbortController();

    async function load(slug: string) {
      try {
        setError(null);
        const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`, { signal: controller.signal });
        if (!res.ok) {
          console.error(`HTTP ${res.status}`);
        }
        const json: PostData = await res.json();
        setOverview(json.overview);
        setMarkdownBody(json.markdownBody);
        setCategories(json.categories ?? []);
      } catch (e: any) {
        if (e.name !== "AbortError") {
          console.error(e);
          setError("データの取得に失敗しました。");
        }
      }
    }

    load(slug);
    return () => controller.abort();
  }, [router.isReady, slug]);

  return <>
    <Head>
      <title>{`${overview?.title ?? ""} | Aokiti`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={posts.wrapper}>
      {!overview && <PlaceholderPostDetail />}
      {overview && <main className={posts.main}>
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
          {error && <div>{error}</div>}
          {!error && (
            <ReactMarkdown
              className={mdStyle.markdown}
              rehypePlugins={[remarkGfm, rehypeRaw]}
              components={{
                h1: CustomTagParser,
                img: ImageTagParser
              }}>
              {markdownBody}
            </ReactMarkdown>
          )}
        </div>
      </main>}
      <Category categories={categories} />
    </div>
  </>;
};

const PlaceholderPostDetail = () => {
  return (
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
  );
};

export default Posts;
