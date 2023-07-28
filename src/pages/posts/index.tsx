import index from "@/styles/index.module.css";
import { getAllCategories, getPostOverview } from "@/model/PostApi";
import { Post } from "@/components/organism/PostsList/PostsList";
import Category from "@/components/molecule/Category/Category";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import MobileCategory from "@/components/molecule/MobileCategory/MobileCategory";

type Props = {
  filter: string | string[],
  categories: { [tag: string]: number }[],
  overviews: { [p: string]: any }[],
}

const Index = ({ filter, categories, overviews }: Props) => {
  return (
    <>
      <Head>
        <title>Aokiti | Posts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={index.postTitle}>Aokiti の制作物<span>{filter?.length ? `「${filter}」 の記事` : ""}</span></h1>
      <div className={index.mobileCategory}>
        <MobileCategory categories={categories} />
      </div>
      <div className={index.wrapper}>
        <section className={index.postsList}>
          {overviews.map((post: any, key: number) => (
            <Post key={key}
                  date={post.date}
                  imageUrl={post.thumbnail ?? `/posts/${post.slug}/thumbnail.jpg`}
                  href={`/posts/${post.slug}`}
                  title={post.title}
                  tag={post.tag.split(", ")}
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
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext<{ slug: string }>) {
  const { filter } = context.query;
  const categories = getAllCategories();
  const posts = getPostOverview(filter);
  return {
    props: {
      filter: filter ?? "",
      categories: categories,
      overviews: posts
    }
  };
}

export default Index;