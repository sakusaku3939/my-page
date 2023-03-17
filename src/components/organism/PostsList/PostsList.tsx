import portfolio from "@/components/organism/PostsList/PostsList.module.css";
import common from "@/styles/common.module.css";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";

const PostsList = () => {
  return <>
    <div className={portfolio.wrapper}>
      <Splide options={{
        type: "loop",
        focus: "center",
        autoWidth: true
      }}>
        <SplideSlide>
          <Post date="2021.10.25"
                imageUrl="/posts/presc/thumbnail.jpg"
                title="Presc"
                tag={["Android / iOS", "Flutter", "Dart"]}
                overview="音声認識により、どこまで読んだかが分かるプレゼンテーション用原稿表示アプリ" />
        </SplideSlide>
        <SplideSlide>
          <Post date="2021.2.18"
                imageUrl="/posts/tkg-beacon/thumbnail.jpg"
                title="TKG Beacon"
                tag={["Android", "Kotlin", "AltBeacon", "Firebase"]}
                overview="ビーコンを利用した、生徒と先生の位置情報共有Androidアプリ" />
        </SplideSlide>
        <SplideSlide>
          <Post date="2021.1.1"
                imageUrl="/posts/deepl-android/thumbnail.jpg"
                title="非公式版 DeepL翻訳アプリ"
                tag={["Android", "Kotlin", "OSS"]}
                overview="DeepL翻訳のクライアントアプリが欲しかったために作った非公式Androidアプリ" />
        </SplideSlide>
        <SplideSlide>
          <Post date="2022.3.14"
                imageUrl="/posts/like-button/thumbnail.jpg"
                title="いいねボタン"
                tag={["HTML / CSS / JavaScript", "Vue.js", "Firebase"]}
                overview="プレゼン発表中にリアルタイムで「いいね！」が送れるシステム" />
        </SplideSlide>
      </Splide>
    </div>
    <div className={portfolio.button}>
      <Link href="">もっと見る</Link>
    </div>
  </>;
};

type PostProps = {
  date: string
  imageUrl: string
  title: string
  tag: string[]
  overview: string
};

const Post = ({ date, imageUrl, title, tag, overview }: PostProps) => {
  return <>
    <div className={`${portfolio.card} ${portfolio.skin}`}>
      <div className={portfolio.date}>{date}</div>
      <div className={portfolio.image} style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className={portfolio.textBox}>
        <div className={portfolio.title}>{title}</div>
        <ul className={`${common.tag} ${portfolio.tag}`}>
          {tag.map((value: string, key: number) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <div className={portfolio.overview}>{overview}</div>
      </div>
    </div>
  </>;
};

export default PostsList;