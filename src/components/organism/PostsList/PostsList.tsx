import postList from "@/components/organism/PostsList/PostsList.module.css";
import common from "@/styles/common.module.css";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";
import Image from "next/image";
import { renderTags } from "@/model/PostClient";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import blurMap from "@/__generated__/blur-image-map";

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
            <Post date="2025.2.10"
                  imageUrl="/posts/530-app/thumbnail.jpg"
                  href="/posts/530-app"
                  title="ごみ量可視化アプリ"
                  tag={["Android / iOS", "Flutter", "廃棄物資源循環学会"]}
                  overview="自宅のゴミ排出量の可視化、ごみ収集車の到着予定時間を表示できる実証実験アプリ" />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={postList.card}>
            <Post date="2024.6.7"
                  imageUrl="/posts/yolo-lstm/thumbnail.jpg"
                  href="/posts/yolo-lstm"
                  title="YoloLSTM"
                  tag={["機械学習", "ACM MobiSys", "IPSJ UBI", " Flutter"]}
                  overview="一般物体検出と深層学習技術を活用した、自己位置推定モデルの研究" />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={postList.card}>
            <Post date="2021.1.1"
                  imageUrl="/posts/deepl-android/thumbnail.jpg"
                  href="/posts/deepl-android"
                  title="OSS版 DeepL翻訳アプリ"
                  tag={["Android", "Kotlin", "OSS"]}
                  overview="非公式のDeepL翻訳サードパーティアプリ開発とOSSプロジェクト運営" />
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
      </Splide>
    </div>
    <div className={postList.button}>
      <Link className={postList.reset} href="/posts">もっと見る<FontAwesomeIcon className={postList.rightArrow}
                                                                                icon={faArrowRight} /></Link>
    </div>
  </>;
};

type PostProps = {
  date: string
  imageUrl: string
  href: string
  title: string
  tag: string[]
  pinned?: boolean,
  overview: string
};

const Post = ({ date, imageUrl, href, title, tag, pinned, overview }: PostProps) => {
  const router = useRouter();
  const blur = (blurMap as Record<string, string>)[imageUrl];

  return <>
    <Link className={postList.reset} href={href}>
      <div className={postList.skin}>
        <div className={postList.date}>{date}</div>

        <div className={postList.imageWrapper}>
          <Image
            src={imageUrl}
            {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
            alt={title}
            fill
            sizes="100%"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        {pinned && <FontAwesomeIcon className={postList.pin} icon={faStar} />}

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