import index from "@/styles/index.module.css";
import common from "@/styles/common.module.css";
import { getAllPostOverview } from "@/model/PostApi";
import { Post } from "@/components/organism/PostsList/PostsList";
import Category from "@/components/molecule/Category/Category";

type Props = {
  overviews: { [p: string]: any }[],
}

const Index = ({ overviews }: Props) => {
  return (
    <>
      <h1 className={index.postTitle}>記事一覧</h1>
      <ul className={`${common.tag} ${index.mobileCategory}`}>
        <li>Android / iOS (3)</li>
        <li>Flutter (2)</li>
        <li>Dart (2)</li>
        <li>アプリ甲子園 (1)</li>
      </ul>
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
          <Category />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllPostOverview();
  return {
    props: { overviews: posts }
  };
}

export default Index;