import postList from "@/components/organism/PostsList/PostsList.module.css";
import common from "@/styles/common.module.css";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";

const PostsList = () => {
  return <>
    <div className={postList.wrapper}>
      <Splide options={{
        type: "loop",
        focus: "center",
        autoWidth: true
      }}>
        <SplideSlide>
          <div className={postList.card}>
            <Post date="2021.10.25"
                  imageUrl="/posts/presc/thumbnail.jpg"
                  href="https://portfolio.sakusaku3939.com/?posts=presc"
                  title="Presc"
                  tag={["Android / iOS", "Flutter", "Dart"]}
                  overview="音声認識により、どこまで読んだかが分かるプレゼンテーション用原稿表示アプリ" />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={postList.card}>
            <Post date="2021.2.18"
                  imageUrl="/posts/tkg-beacon/thumbnail.jpg"
                  href="https://portfolio.sakusaku3939.com/?posts=tkg-beacon"
                  title="TKG Beacon"
                  tag={["Android", "Kotlin", "AltBeacon", "Firebase"]}
                  overview="ビーコンを利用した、生徒と先生の位置情報共有Androidアプリ" />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={postList.card}>
            <Post date="2021.1.1"
                  imageUrl="/posts/deepl-android/thumbnail.jpg"
                  href="https://portfolio.sakusaku3939.com/?posts=android-deepl"
                  title="非公式版 DeepL翻訳アプリ"
                  tag={["Android", "Kotlin", "OSS"]}
                  overview="DeepL翻訳のクライアントアプリが欲しかったために作った非公式Androidアプリ" />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={postList.card}>
            <Post date="2022.3.14"
                  imageUrl="/posts/like-button/thumbnail.jpg"
                  href="https://portfolio.sakusaku3939.com/?posts=like-button"
                  title="いいねボタン"
                  tag={["HTML / CSS / JavaScript", "Vue.js", "Firebase"]}
                  overview="プレゼン発表中にリアルタイムで「いいね！」が送れるシステム" />
          </div>
        </SplideSlide>
      </Splide>
    </div>
    <div className={postList.button}>
      <Link className={postList.reset} href="https://portfolio.sakusaku3939.com">もっと見る</Link>
    </div>
  </>;
};

type PostProps = {
  date: string
  imageUrl: string
  href: string
  title: string
  tag: string[]
  overview: string
};

const Post = ({ date, imageUrl, href, title, tag, overview }: PostProps) => {
  return <>
    <Link className={postList.reset} href={href}>
      <div className={postList.skin}>
        <div className={postList.date}>{date}</div>
        <div className={postList.image} style={{ backgroundImage: `url(${imageUrl})` }} />
        <div className={postList.textBox}>
          <div className={postList.title}>{title}</div>
          <ul className={`${common.tag} ${postList.tag}`}>
            {tag.map((value: string, key: number) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
          <div className={postList.overview}>{overview}</div>
        </div>
      </div>
    </Link>
  </>;
};

export { PostsList, Post };