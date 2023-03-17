import timeline from "@/components/organism/Timeline/Timeline.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
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
  title: string
  children?: ReactNode
};

const TimeLineItem = ({ date, title, children }: TimeLineItemProps) => {
  return <>
    <li>
      <details className={timeline.accordion}>
        <summary>
          <div className={timeline.titleWrapper}>
            <div className={timeline.date}>{date}</div>
            <div className={timeline.title}>{title}</div>
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
  href: string
};

const TimeLineLink = ({ description, href }: TimeLineLinkProps) => {
  return <>
    <Link className={timeline.link} href={href} target="_blank">
      <span><FontAwesomeIcon icon={faUpRightFromSquare} /></span>
      {"  " + description}
    </Link>
  </>;
};

export { Timeline, TimeLineItem, TimeLineLink };