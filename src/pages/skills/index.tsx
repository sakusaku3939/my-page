import index from "@/styles/index.module.css";
import Head from "next/head";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";
import { Skills, SkillsItem, SkillsItemWrapper, SkillsSubItemWrapper } from "@/components/organism/Skills/Skills";

const Index = () => {
  return (
    <>
      <Head>
        <title>Aokiti | Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HamburgerMenu />
      <h1 className={index.profileTitle}>スキル</h1>

      <section className={index.section}>
        <Skills>
          <h2 className={index.h2}>メイン言語（多分使える）</h2>
          <SkillsItemWrapper>
            <SkillsItem title="Dart">
              最も実務経験あり。Flutterを用いたモバイルアプリ開発など
            </SkillsItem>
            <SkillsItem title="Python">
              主に研究で使用。PyTorchによる深層学習、OpenCVなど
            </SkillsItem>
            <SkillsItem title="JavaScript">
              サーバー用途やAPI開発、フロント周りで使用。Node.js、Vue.jsなど
            </SkillsItem>
            <SkillsItem title="TypeScript">
              Next.jsを用いた自作CMS、Discordボット作成など
            </SkillsItem>
            <SkillsItem title="Kotlin">
              OSSのアプリを運用。Androidアプリの開発など
            </SkillsItem>
          </SkillsItemWrapper>

          <h2 className={index.h2}>サブ言語（ほとんど使ってない）</h2>
          <SkillsSubItemWrapper>
            <SkillsItem title="Java">
              FRCロボコンのプログラム開発、Androidアプリなど
            </SkillsItem>
            <SkillsItem title="PHP">
              Webアプリ作成、Apacheなど
            </SkillsItem>
            <SkillsItem title="Ruby">
              RailsとWebRTCを用いたWebアプリを作成
            </SkillsItem>
            <SkillsItem title="C">
              高校のプログラミングの授業で使用
            </SkillsItem>
            <SkillsItem title="Go">
              IPFS、ブロックチェーン周りの勉強など
            </SkillsItem>
            <SkillsItem title="Scala">
              動画配信システムのサーバーサイド開発
            </SkillsItem>
            <SkillsItem title="C#">
              簡単なWindowsフォームアプリの作成
            </SkillsItem>
          </SkillsSubItemWrapper>
        </Skills>
      </section>

      <FooterMenu />
    </>
  );
};

export default Index;