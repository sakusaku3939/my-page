import sns from "@/components/molecule/SnsList/SnsList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faSpeakerDeck } from "@fortawesome/free-brands-svg-icons";
import { ReactNode } from "react";

const SnsList = () => {
  return (
    <>
      <div className={sns.list}>
        <SnsButton title={"GitHub"} style={sns.github} href={"https://github.com/sakusaku3939"}>
          <FontAwesomeIcon icon={faGithub} />
        </SnsButton>
        <SnsButton title={"Qiita"} style={sns.qiita} href={"https://qiita.com/sakusaku3939"}>
          <svg className={sns.qiitaSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"
               preserveAspectRatio="none">
            <g>
              <path
                d="M222.77,227.36C206.59,244.62,184.6,250.29,158,253c-53.89,5.44-100.57-18.62-106.22-78.75a117.62,117.62,0,0,1,14.75-69.77L59.84,78.2c-1.07-4.56,3.13-8.9,7.58-7.82L90.49,76A90.6,90.6,0,0,1,139.1,55.5a89.09,89.09,0,0,1,44.64,7l21.68-13.12a6.41,6.41,0,0,1,9.64,5.21l1.25,30.93h0c16.68,17.6,28,41.64,30.6,68.95,1.45,15.42-.15,27.22-4.24,38.47-1.91,5.27-2.49,9.72,1,14.13,3.34,4.26,8.64,12.53,14.56,11.15,8.88-2.08,18.39-1.53,24.27,2.14A150.16,150.16,0,1,0,258.12,254a35.42,35.42,0,0,1-14.33-5.68C234.86,242.33,226.93,236.7,222.77,227.36Z" />
              <path
                d="M208.92,117.38l14-1.71-.2-2.53-14.37,1.76c-.62-1.81-1.31-3.59-2.08-5.32l15.83-5-.5-3.17-16.84,5.83c-11.29-23.68-35.71-38.06-63.36-35.26A65,65,0,0,0,85.24,120l-16.47-2.49-.18,3.24,16.22,1.75a49.84,49.84,0,0,0-1.08,4.91l-14.14,1.13.12,2.53L83.5,130a51.14,51.14,0,0,0-.41,5.7l-12.6,5.15.62,3.13,12-5.62c0,1.68.1,2.57.25,4.26,3.34,35.46,33,42.48,68.35,38.9s63.15-16.4,59.81-51.86c-.16-1.7-.4-2.59-.69-4.24l13,2.82.3-2.86-13.63-2.59A48.79,48.79,0,0,0,208.92,117.38Z" />
            </g>
          </svg>
        </SnsButton>
        <SnsButton title={"Speaker Deck"} style={sns.speakerDeck} href={"https://speakerdeck.com/sakusaku3939"}>
          <FontAwesomeIcon icon={faSpeakerDeck} />
        </SnsButton>
        <SnsButton title={"LinkedIn"} style={sns.linkedIn} href={"https://www.linkedin.com/in/yuki-aoki/"}>
          <div className={sns.linkedInBackground} />
          <FontAwesomeIcon icon={faLinkedin} />
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