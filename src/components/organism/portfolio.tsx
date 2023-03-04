import portfolio from "@/styles/portfolio.module.css";
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
          <div className={`${portfolio.card} ${portfolio.skin}`}>
            <div className={portfolio.date}>2021.1.1</div>
            <div className={portfolio.image}></div>
            <div className={portfolio.textBox}>
              <div className={portfolio.title}>test</div>
              <ul className={portfolio.tag}>
                <li>test</li>
                <li>test2</li>
              </ul>
              <div className={portfolio.overview}>aaaaaa</div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={`${portfolio.card} ${portfolio.skin}`}>
            <div className={portfolio.date}>2021.1.1</div>
            <div className={portfolio.image}></div>
            <div className={portfolio.textBox}>
              <div className={portfolio.title}>test</div>
              <ul className={portfolio.tag}>
                <li>test</li>
                <li>test2</li>
              </ul>
              <div className={portfolio.overview}>bbbbbb</div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={`${portfolio.card} ${portfolio.skin}`}>
            <div className={portfolio.date}>2021.1.1</div>
            <div className={portfolio.image}></div>
            <div className={portfolio.textBox}>
              <div className={portfolio.title}>test</div>
              <ul className={portfolio.tag}>
                <li>test</li>
                <li>test2</li>
              </ul>
              <div className={portfolio.overview}>cccccc</div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={`${portfolio.card} ${portfolio.skin}`}>
            <div className={portfolio.date}>2021.1.1</div>
            <div className={portfolio.image}></div>
            <div className={portfolio.textBox}>
              <div className={portfolio.title}>test</div>
              <ul className={portfolio.tag}>
                <li>test</li>
                <li>test2</li>
              </ul>
              <div className={portfolio.overview}>cccccc</div>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>
    <div className={portfolio.button}>
      <Link href="">もっと見る</Link>
    </div>
  </>;
};

export default Portfolio;