import Head from "next/head";
import index from "@/styles/index.module.css";
import SnsList from "@/components/molecule/SnsList/SnsList";
import { PostsList } from "@/components/organism/PostsList/PostsList";
import { Skills, SkillsItem, SkillsItemWrapper, SkillsSubItemWrapper } from "@/components/organism/Skills/Skills";
import { GetServerSidePropsContext } from "next";
import NoColorLink from "@/components/atom/NoColorLink/NoColorLink";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu, Menu } from "@/components/molecule/Menu/Menu";

const Index = () => {
  return (
    <>
      <Head>
        <title>Aokiti | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <span className={index.menuVisibility}><Menu /></span>
        <span className={index.hamburgerVisibility}><HamburgerMenu /></span>
        <section className={index.header}>
          <div className={index.title}>Aokiti</div>
          <div className={index.subtitle}>B2 / RG&nbsp;
            <NoColorLink href="https://d-hacks.jn.sfc.keio.ac.jp/" title="d-hacks" target="_blank" /> / Flutterが好き
          </div>
          <SnsList />
        </section>
        <section className={index.section}>
          <PostsList />

          <h1 className={index.h1}>スキル</h1>
          <Skills>
            <h2 className={index.h2}>メイン言語（多分使える）</h2>
            <SkillsItemWrapper>
              <SkillsItem title="Dart">
                実務の経験あり。Flutterを用いたモバイルアプリ開発など
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
                OSSのアプリを運営。Androidアプリの開発など
              </SkillsItem>
            </SkillsItemWrapper>

            <h2 className={index.h2}>サブ言語（ほとんど使ってない）</h2>
            <SkillsSubItemWrapper>
              <SkillsItem title="Java">
                ロボットのプログラム、技術本での勉強など
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
                ブロックチェーン、IPFSの勉強に使用
              </SkillsItem>
              <SkillsItem title="Scala">
                動画配信システムのメディアサーバー作成
              </SkillsItem>
              <SkillsItem title="C#">
                簡単なWindowsフォームアプリの作成
              </SkillsItem>
            </SkillsSubItemWrapper>
          </Skills>
        </section>

        <FooterMenu />
      </main>
    </>
  );
};

export const getServerSideProps = (
  context: GetServerSidePropsContext
) => {
  const queryParam = context.query.posts;
  if (queryParam !== undefined) {
    context.res.writeHead(
      302,
      { Location: `https://portfolio.sakusaku3939.com?posts=${queryParam}` }
    );
    context.res.end();
  }
  return { props: {} };
};

export default Index;