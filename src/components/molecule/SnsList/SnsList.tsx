import sns from "@/components/molecule/SnsList/SnsList.module.css";
import { siGithub, siQiita, siSpeakerdeck } from "simple-icons";
import { ReactNode } from "react";

const SnsList = () => {
  return (
    <>
      <div className={sns.list}>
        <SnsButton title={"GitHub"} style={sns.github} href={"https://github.com/sakusaku3939"}>
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d={siGithub.path} />
          </svg>
        </SnsButton>
        <SnsButton title={"Qiita"} style={sns.qiita} href={"https://qiita.com/sakusaku3939"}>
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d={siQiita.path} />
          </svg>
        </SnsButton>
        <SnsButton title={"Speaker Deck"} style={sns.speakerDeck} href={"https://speakerdeck.com/sakusaku3939"}>
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d={siSpeakerdeck.path} />
          </svg>
        </SnsButton>
      </div>
    </>
  );
};

type SnsButtonProps = {
  title: string
  style: string
  href: string
  children?: ReactNode
};

const SnsButton = ({ title, style, href, children }: SnsButtonProps) => {
  return (
    <div className={`${sns.button} ${style}`}>
      <a title={title} href={href} target="_blank">{children}</a>
    </div>
  );
};

export default SnsList;