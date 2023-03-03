import timeline from "@/styles/timeline.module.css";
import { ReactNode } from "react";

const Timeline = () => {
  return (
    <>
      <ul className={timeline.list}>
        <TimeLineItem date="2019.4 ~" title="東京都立新宿山吹高校（定時制） 情報科" />
        <TimeLineItem date="2019.8 ~" title="FRCロボコンチーム「BWW」所属">
          高1〜高3の間にFRC（FIRST Robotics
          Competition）のチーム「BWW」に設立メンバーとして活動しました。ソフトウェアや公式Webサイト作成、ブログやTwitter、YouTubeなどでの広報活動を行いました。<br />
          <br />
          ▼国際ロボコン「FRC」とは？ - BWW<br />
          https://bww8231.fuji3.info/about-frc/
        </TimeLineItem>
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

export default Timeline;