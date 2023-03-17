import portfolio from "@/components/organism/PostsList/PostsList.module.css";
import common from "@/styles/common.module.css";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";

const PostsList = () => {
  return <>
    <div className={portfolio.wrapper}>
      <Post date="2021.1.1"
            imageUrl=""
            title="test1"
            tag={["test", "test2"]}
            overview="aaaaa" />
      <Post date="2021.1.1"
            imageUrl=""
            title="test2"
            tag={["test", "test2"]}
            overview="bbbbb" />
      <Post date="2021.1.1"
            imageUrl=""
            title="test3"
            tag={["test", "test2"]}
            overview="ccccc" />
      <Post date="2021.1.1"
            imageUrl=""
            title="test4"
            tag={["test", "test2"]}
            overview="ddddd" />
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
      <div className={portfolio.image}>{imageUrl}</div>
      <div className={portfolio.textBox}>
        <div className={portfolio.title}>{title}</div>
        <ul className={common.tag}>
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