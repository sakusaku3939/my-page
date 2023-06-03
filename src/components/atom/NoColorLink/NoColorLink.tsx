import noColor from "@/components/atom/NoColorLink/NoColorLink.module.css";

type Props = {
  href: string,
  title: string,
}

const NoColorLink = ({ href, title }: Props) => {
  return <>
    <a href={href} target="_blank" className={noColor.link}>{title}</a>
  </>;
};
export default NoColorLink;