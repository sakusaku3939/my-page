import noColor from "@/components/atom/NoColorLink/NoColorLink.module.css";
import Link from "next/link";

type Props = {
  href: string,
  title: string,
  target?: string,
}

const NoColorLink = ({ href, title, target = "" }: Props) => {
  return <>
    <Link href={href} target={target} className={noColor.link}>{title}</Link>
  </>;
};
export default NoColorLink;