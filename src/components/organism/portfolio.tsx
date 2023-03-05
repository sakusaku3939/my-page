import portfolio from "@/styles/portfolio.module.css";
import common from "@/styles/common.module.css";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";

const Portfolio = () => {
  return <>
    <div className={portfolio.wrapper}>
      <Splide options={{
        type: "loop",
        focus: "center",
        autoWidth: true
      }}>
        <SplideSlide>
          <Post date="2021.1.1"
                imageUrl=""
                title="test1"
                tag={["test", "test2"]}
                overview="aaaaa" />
        </SplideSlide>
        <SplideSlide>
          <Post date="2021.1.1"
                imageUrl=""
                title="test2"
                tag={["test", "test2"]}
                overview="bbbbb" />
        </SplideSlide>
        <SplideSlide>
          <Post date="2021.1.1"
                imageUrl=""
                title="test3"
                tag={["test", "test2"]}
                overview="ccccc" />
        </SplideSlide>
        <SplideSlide>
          <Post date="2021.1.1"
                imageUrl=""
                title="test4"
                tag={["test", "test2"]}
                overview="ddddd" />
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

export default Portfolio;