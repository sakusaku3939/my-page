import index from "@/styles/index.module.css";
import { getAllCategories, getPostOverview, Overview } from "@/model/PostApi";
import { Post } from "@/components/organism/PostsList/PostsList";
import Category from "@/components/molecule/Category/Category";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import MobileCategory from "@/components/molecule/MobileCategory/MobileCategory";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";

type Props = {
  filter: string | string[],
  categories: { [tag: string]: number }[],
  overviews: Overview[],
}

const Index = ({ filter, categories, overviews }: Props) => {
  return (
    <>
      <Head>
        <title>Aokiti | Posts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HamburgerMenu />
      <h1 className={index.postTitle}>制作物<span>{filter?.length ? `「${filter}」 の記事` : ""}</span></h1>
      <div className={index.mobileCategory}>
        <MobileCategory categories={categories} />
      </div>
      <div className={index.wrapper}>
        <section className={index.postsList}>
          {overviews.map((post: Overview, key: number) => (
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

export async function getServerSideProps(context: GetServerSidePropsContext<{ slug: string }>) {
  const { filter } = context.query;
  const categories = getAllCategories();
  const posts = getPostOverview(filter);
  const sortedPinnedPosts = posts.sort((a, b) => a.pinned && !b.pinned ? -1 : 1);
  return {
    props: {
      filter: filter ?? "",
      categories: categories,
      overviews: sortedPinnedPosts
    }
  };
}

export default Index;