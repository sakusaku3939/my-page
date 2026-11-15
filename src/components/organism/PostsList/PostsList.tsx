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
import type { Overview } from "@/model/type/Overview";

const PostsList = ({ posts }: { posts: Overview[] }) => {
  return <>
    <div className={postList.wrapper}>
      <Splide options={{
        type: "loop",
        focus: "center",
        autoWidth: true
      }}>
        {posts.map(post => (
          <SplideSlide key={post.slug}>
            <div className={postList.card}>
              <Post date={post.date}
                    imageUrl={post.thumbnail ?? `/posts/${post.slug}/thumbnail.jpg`}
                    href={`/posts/${post.slug}`}
                    title={post.title}
                    tag={post.tagArray}
                    overview={post.overview} />
            </div>
          </SplideSlide>
        ))}
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

const PlaceholderPost = () => {
  return <>
    <div className={postList.placeholder}>
      <div className={`${postList.skin} ${postList.placeholder}`}>
        <div className={postList.imageWrapper}>
          <div className={postList.imagePlaceholder}>&nbsp;</div>
        </div>
        <div className={postList.textBox}>
          <div className={postList.title}>
            <div className={postList.titlePlaceholder}>&nbsp;</div>
          </div>
          <ul className={`${common.tag} ${postList.tag}`}>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
          </ul>
          <div className={postList.overview}>
            <div className={postList.overviewPlaceholder}>&nbsp;</div>
            <div className={postList.overviewPlaceholder}>&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export { PostsList, Post, PlaceholderPost };