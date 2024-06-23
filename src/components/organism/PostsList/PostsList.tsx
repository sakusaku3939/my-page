import postList from "@/components/organism/PostsList/PostsList.module.css";
import common from "@/styles/common.module.css";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";
import { renderTags } from "@/model/PostApi";
import { useRouter } from "next/router";

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
                  href="/posts/presc"
                  title="Presc"
                  tag={["Android / iOS", "Flutter", "Dart", "アプリ甲子園"]}
                  overview="音声認識により、どこまで読んだかが分かるプレゼンテーション用原稿表示アプリ" />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={postList.card}>
            <Post date="2021.1.1"
                  imageUrl="/posts/deepl-android/thumbnail.jpg"
                  href="/posts/deepl-android"
                  title="OSS 非公式DeepL翻訳"
                  tag={["Android", "Kotlin", "OSS"]}
                  overview="WebViewとJavaScriptを使用した非公式Androidクライアントアプリ" />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={postList.card}>
            <Post date="2024.3.24"
                  imageUrl="/posts/mood-tune/thumbnail.jpg"
                  href="/posts/mood-tune"
                  title="MoodTune"
                  tag={["Python", "機械学習", "Next.js", "TypeScript"]}
                  overview="環境音からSpotifyの音楽を推薦してくれるAIアプリ" />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={postList.card}>
            <Post date="2022.3.14"
                  imageUrl="/posts/like-button/thumbnail.jpg"
                  href="/posts/like-button"
                  title="いいねボタン"
                  tag={["HTML / CSS / JavaScript", "Vue.js", "Firebase"]}
                  overview="プレゼン発表中にリアルタイムで「いいね！」が送れるシステム" />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={postList.card}>
            <Post date="2020.5.13"
                  imageUrl="/posts/syobon-action/thumbnail.jpg"
                  href="/posts/syobon-action"
                  title="しょぼんのアクション Python版"
                  tag={["Python", "pygame", "Excel"]}
                  overview="ちくさん制作の「しょぼんのアクション」をPythonで１から作り直したもの" />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={postList.card}>
            <Post date="2024.1.19"
                  imageUrl="/posts/next-play/thumbnail.jpg"
                  href="/posts/next-play"
                  title="NextPlay"
                  tag={["Ruby", "Ruby on Rails", "JavaScript", "WebRTC"]}
                  overview="WebRTCでゲーム配信やコメントができるゲーマーSNS" />
          </div>
        </SplideSlide>
      </Splide>
    </div>
    <div className={postList.button}>
      <Link className={postList.reset} href="/posts">もっと見る</Link>
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
  const router = useRouter();
  return <>
    <Link className={postList.reset} href={href}>
      <div className={postList.skin}>
        <div className={postList.date}>{date}</div>
        <div className={postList.image} style={{ backgroundImage: `url(${imageUrl})` }} />
        <div className={postList.textBox}>
          <div className={postList.title}>{title}</div>
          <ul className={`${common.tag} ${postList.tag}`}>
            {renderTags(router, tag)}
          </ul>
          <div className={postList.overview}>{overview}</div>
        </div>
      </div>
    </Link>
  </>;
};

export { PostsList, Post };