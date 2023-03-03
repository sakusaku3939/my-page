import timeline from "@/styles/timeline.module.css";
import { ReactNode } from "react";
import Link from "next/link";

const Timeline = () => {
  return (
    <>
      <ul className={timeline.list}>
        <TimeLineItem date="2019.4 ~" title="東京都立新宿山吹高校（定時制） 情報科" />
        <TimeLineItem date="2019.8 ~" title="ロボコンチーム   BWW 所属">
          高1〜高3の間にFRC（FIRST Robotics
          Competition）のチーム「BWW」に設立メンバーとして活動しました。ソフトウェアや公式Webサイト作成、ブログやTwitter、YouTubeなどでの広報活動を行いました。<br />
        </TimeLineItem>
        <TimeLineItem date="2021.10" title="アプリ甲子園   第3位・技術賞">
          アプリ甲子園2021にて、プレゼン原稿表示アプリ「Presc」を発表しました。3位と技術賞を頂きました。<br />
          <br />
          <TimeLineLink
            description="「プレゼンで時間オーバー」解決するアプリを高校生が開発｜ 高校生新聞オンライン"
            href="https://www.koukouseishinbun.jp/articles/-/8347"
          />
        </TimeLineItem>
        <TimeLineItem date="2022.8" title="全国専門学科情報科研究協議会   優秀賞">
          専門学科「情報科」の設置校が集まって年に1度開催する研究協議会にて、プレゼン原稿表示アプリ「Presc」を発表しました。生徒表彰にて優秀賞を頂きました。<br />
        </TimeLineItem>
        <TimeLineItem date="2023.1 ~" title="株式会社Wandarlust   Locket 開発">
          位置情報共有アプリ「Locket」のフロントエンド（Flutter）チームに約2ヶ月間所属しました。チャット機能の開発をメインで携わりました。<br />
        </TimeLineItem>
        <TimeLineItem date="2023.4 ~" title="慶應義塾大学   環境情報学部" />
      </ul>
    </>
  );
};

type TimeLineItemProps = {
  date: string
  title: string
  children?: ReactNode
};

const TimeLineItem = ({ date, title, children }: TimeLineItemProps) => {
  return <>
    <li>
      <div className={timeline.titleWrapper}>
        <div className={timeline.date}>{date}</div>
        <div className={timeline.title}>{title}</div>
      </div>
      {children && <div className={timeline.content}>{children}</div>}
    </li>
  </>;
};

type TimeLineLinkProps = {
  description: string
  href: string
};

const TimeLineLink = ({ description, href }: TimeLineLinkProps) => {
  return <>
    <div className={timeline.link}>
      <span>▼</span>{description}<br />
      <Link href={href}>{href}</Link>
    </div>
  </>;
};

export default Timeline;