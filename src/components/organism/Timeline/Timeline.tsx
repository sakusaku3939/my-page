import timeline from "@/components/organism/Timeline/Timeline.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faUpRightFromSquare, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useState, useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(open);
  const contentRef = useRef<HTMLDivElement>(null);

  // 日付の形式に応じたCSSクラスを生成
  const getDateType = (dateStr: string): "single" | "range" => {
    return dateStr.includes("-") ? "range" : "single";
  };
  const dateType = getDateType(date);
  const dateClassName = `${timeline.date} ${timeline[`date--${dateType}`]}`;

  // アコーディオンメニューのアニメーション
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
      } else {
        contentRef.current.style.maxHeight = "0px";
      }
    }
  }, [isOpen]);

  return <>
    <li>
      <div className={timeline.card}>
        <div className={`${timeline.accordion} ${isOpen ? timeline.open : ""}`}>
          <div className={timeline.summary} onClick={handleToggle}>
            <div className={timeline.titleWrapper}>
              <div className={`${date} ${dateClassName}`}>{date}</div>
              <div className={timeline.title}>
                <FontAwesomeIcon className={timeline.icon} icon={icon} />
                <span>{title}</span>
              </div>
              {children && <div className={timeline.arrow}>
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  className={timeline.arrowIcon}
                />
              </div>}
            </div>
          </div>
          {children && (
            <div
              ref={contentRef}
              className={timeline.content}>
              <div className={timeline.contentInner}>
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
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