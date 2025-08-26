import skills from "@/components/organism/Skills/Skills.module.css";
import { ReactNode } from "react";
import Image from "next/image";
import { handleTagClick } from "@/model/PostClient";
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
  const name = title.replace("#", "sharp").replace("/", "slash");
  return (
    <>
      <div className={`${skills.card}`}>
        <div className={skills.title} onClick={(e) => handleTagClick(e, router, title)}>
          <div className={skills.iconWrapper}>
            <Image
              src={`/language-icon/${name}.png`}
              alt={title}
              fill
              priority={true}
              sizes="16px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <span>{title}</span>
        </div>
        <div className={skills.content}>{children}</div>
      </div>
    </>
  );
};

export { Skills, SkillsItemWrapper, SkillsSubItemWrapper, SkillsItem };