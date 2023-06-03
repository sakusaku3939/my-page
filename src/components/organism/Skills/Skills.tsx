import skills from "@/components/organism/Skills/Skills.module.css";
import { ReactNode } from "react";
import Image from "next/image";
import { handleTagClick } from "@/model/PostApi";
import { useRouter } from "next/router";

type SkillProps = {
  children?: ReactNode
};

const Skills = ({ children }: SkillProps) => {
  return (
    <>
      <div className={skills.main}>
        {children}
      </div>
    </>
  );
};

const SkillsItemWrapper = ({ children }: SkillProps) => {
  return (
    <>
      <div className={skills.wrapper}>
        {children}
      </div>
    </>
  );
};

const SkillsSubItemWrapper = ({ children }: SkillProps) => {
  return (
    <>
      <div className={`${skills.wrapper} ${skills.sub}`}>
        {children}
      </div>
    </>
  );
};

type SkillItemProps = {
  title: string,
  children?: ReactNode
};

const SkillsItem = ({ title, children }: SkillItemProps) => {
  const router = useRouter();
  return (
    <>
      <div className={`${skills.card}`}>
        <div className={skills.title} onClick={(e) => handleTagClick(e, router, title)}>
          <Image src={`/language-icon/${title}.png`} alt={title} width={16} height={16}
                 style={{ objectFit: "contain" }} />
          <span>{title}</span>
        </div>
        <div className={skills.content}>{children}</div>
      </div>
    </>
  );
};

export { Skills, SkillsItemWrapper, SkillsSubItemWrapper, SkillsItem };