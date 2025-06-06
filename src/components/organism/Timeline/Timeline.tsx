import timeline from "@/components/organism/Timeline/Timeline.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";
import Link from "next/link";

type TimeLineProps = {
  children?: ReactNode
};

const Timeline = ({ children }: TimeLineProps) => {
  return (
    <>
      <ul className={timeline.list}>
        {children}
      </ul>
    </>
  );
};

type TimeLineItemProps = {
  date: string
  icon: IconDefinition
  title: string
  open?: boolean
  children?: ReactNode
};

const TimeLineItem = ({ date, icon, title, open = false, children }: TimeLineItemProps) => {
  // 日付の形式に応じたCSSクラスを生成
  const getDateType = (dateStr: string): 'single' | 'range' => {
    return dateStr.includes('~') ? 'range' : 'single';
  };
  const dateType = getDateType(date);
  const dateClassName = `${timeline.date} ${timeline[`date--${dateType}`]}`;

  return <>
    <li>
      <details className={timeline.accordion} open={open}>
        <summary>
          <div className={timeline.titleWrapper}>
            <div className={dateClassName}>{date}</div>
            <div className={timeline.title}>
              <FontAwesomeIcon className={timeline.icon} icon={icon} />
              <span>{title}</span>
            </div>
            {children && <div className={timeline.arrow} />}
          </div>
        </summary>
        {children && <div className={timeline.content}>{children}</div>}
      </details>
    </li>
  </>;
};

type TimeLineLinkProps = {
  description: string
  href: string,
  target?: string,
};

const TimeLineLink = ({ description, href, target = "_blank" }: TimeLineLinkProps) => {
  return <>
    <Link className={timeline.link} href={href} target={target}>
      <FontAwesomeIcon className={timeline.icon} icon={faUpRightFromSquare} />
      {"  " + description}
    </Link>
  </>;
};

export { Timeline, TimeLineItem, TimeLineLink };