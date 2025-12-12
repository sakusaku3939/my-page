import common from "@/styles/common.module.css";
import Head from "next/head";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";
import { Skills, SkillsItem, SkillsItemWrapper, SkillsSubItemWrapper } from "@/components/organism/Skills/Skills";
import { BackgroundTriangleWrapper } from "@/components/atom/BackgroundTriangleWrapper/BackgroundTriangleWrapper";

const Index = () => {
  return (
    <>
      <Head>
        <title>Aokiti | Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundTriangleWrapper>
        <HamburgerMenu />
        <h1 className={common.profileTitle}>スキル</h1>

        <section className={common.section}>
          <Skills>
            <h2 className={common.h2}>メイン言語（多分使える）</h2>
            <SkillsItemWrapper>
              <SkillsItem title="Dart">
                実務経験あり。Flutterを用いたモバイルアプリ開発など
              </SkillsItem>
              <SkillsItem title="Python">
                主に研究で使用。PyTorchによる深層学習、MMDetなど
              </SkillsItem>
              <SkillsItem title="Kotlin">
                OSSのアプリを運用。Androidアプリの開発に使用
              </SkillsItem>
              <SkillsItem title="JavaScript">
                サーバー用途やAPI開発、フロント周りで使用。Node.js、Vue.jsなど
              </SkillsItem>
              <SkillsItem title="TypeScript">
                Next.jsを用いた自作CMS、Discordボット開発など
              </SkillsItem>
            </SkillsItemWrapper>

            <h2 className={common.h2}>サブ言語（ほとんど使ってない/軽く触った）</h2>
            <SkillsSubItemWrapper>
              <SkillsItem title="Java">
                ロボコンのプログラム開発、Androidアプリなど
              </SkillsItem>
              <SkillsItem title="PHP">
                Webアプリ作成、Apacheなど
              </SkillsItem>
              <SkillsItem title="Ruby">
                RailsとWebRTCを用いたWebアプリを開発
              </SkillsItem>
              <SkillsItem title="C/C++">
                大学の授業で使用。行列計算、MIPSアセンブリなど
              </SkillsItem>
              <SkillsItem title="Go">
                簡易的なシステムの開発
              </SkillsItem>
              <SkillsItem title="Scala">
                動画配信システムのサーバーサイド開発
              </SkillsItem>
              <SkillsItem title="C#">
                Windowsフォームアプリの開発
              </SkillsItem>
            </SkillsSubItemWrapper>
          </Skills>
        </section>

        <FooterMenu />
      </BackgroundTriangleWrapper>
    </>
  );
};

export default Index;