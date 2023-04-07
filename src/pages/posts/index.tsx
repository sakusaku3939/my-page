import index from "@/styles/index.module.css";
import { getAllCategories, getAllPostOverview } from "@/model/PostApi";
import { Post } from "@/components/organism/PostsList/PostsList";
import Category from "@/components/molecule/Category/Category";

type Props = {
  categories: { [tag: string]: number }[],
  overviews: { [p: string]: any }[],
}

const Index = ({ categories, overviews }: Props) => {
  return (
    <>
      <h1 className={index.postTitle}>記事一覧</h1>
      <div className={index.wrapper}>
        <section className={index.postsList}>
          {overviews.map((post: any) =>
            <>
              <Post date={post.date}
                    imageUrl={post.thumbnail ?? `/posts/${post.slug}/thumbnail.jpg`}
                    href={`/posts/${post.slug}`}
                    title={post.title}
                    tag={post.tag.split(", ")}
                    overview={post.overview} />
            </>
          )}
          <div className={index.postDummy} />
          <div className={index.postDummy} />
        </section>
        <div className={index.category}>
          <Category categories={categories}/>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const categories = getAllCategories();
  const posts = getAllPostOverview();
  return {
    props: {
      categories: categories,
      overviews: posts
    }
  };
}

export default Index;