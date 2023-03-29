import index from "@/styles/index.module.css";
import posts from "@/styles/posts.module.css";
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
      <div className={index.wrapper}>
        <section className={index.postsList}>
          <Post date="2021.10.25"
                imageUrl="/posts/presc/thumbnail.jpg"
                href="https://portfolio.sakusaku3939.com/?posts=presc"
                title="Presc"
                tag={["Android / iOS", "Flutter", "Dart"]}
                overview="音声認識により、どこまで読んだかが分かるプレゼンテーション用原稿表示アプリ" />
          <Post date="2021.2.18"
                imageUrl="/posts/tkg-beacon/thumbnail.jpg"
                href="https://portfolio.sakusaku3939.com/?posts=tkg-beacon"
                title="TKG Beacon"
                tag={["Android", "Kotlin", "AltBeacon", "Firebase"]}
                overview="ビーコンを利用した、生徒と先生の位置情報共有Androidアプリ" />
          <Post date="2022.3.14"
                imageUrl="/posts/like-button/thumbnail.jpg"
                href="https://portfolio.sakusaku3939.com/?posts=like-button"
                title="いいねボタン"
                tag={["HTML / CSS / JavaScript", "Vue.js", "Firebase"]}
                overview="プレゼン発表中にリアルタイムで「いいね！」が送れるシステム" />
          <div className={index.postDummy} />
          <div className={index.postDummy} />
        </section>
        <div className={index.category}>
          <Category />
        </div>
      </div>
      {/*{overviews.map((overview: any) =>*/}
      {/*  <>*/}
      {/*    <div>{overview.title}</div>*/}
      {/*  </>*/}
      {/*)}*/}
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