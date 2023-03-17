import qualification from "@/components/organism/Qualification/Qualification.module.css";
import { ReactNode } from "react";

type QualificationProps = {
  children?: ReactNode
};

const Qualification = ({ children }: QualificationProps) => {
  return <>
    <ul className={qualification.list}>
      {children}
    </ul>
  </>;
};

type QualificationItemProps = {
  title: string
  period: string
  institution: string
};

const QualificationItem = ({ title, period, institution }: QualificationItemProps) => {
  return <>
    <li>
      <div className={qualification.titleWrapper}>
        <div className={qualification.subtitle}>{`${period}  ${institution}`}</div>
        <div className={qualification.title}>{title}</div>
      </div>
    </li>
  </>;
};

export { Qualification, QualificationItem };