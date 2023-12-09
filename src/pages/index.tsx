import Head from "next/head";
import index from "@/styles/index.module.css";
import SnsList from "@/components/molecule/SnsList/SnsList";
import { PostsList } from "@/components/organism/PostsList/PostsList";
import { Skills, SkillsItem, SkillsItemWrapper, SkillsSubItemWrapper } from "@/components/organism/Skills/Skills";
import { GetServerSidePropsContext } from "next";
import NoColorLink from "@/components/atom/NoColorLink/NoColorLink";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { Menu } from "@/components/molecule/Menu/Menu";

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
          <div className={index.subtitle}>B1 / 中澤大越研&nbsp;
            <NoColorLink href="https://d-hacks.jn.sfc.keio.ac.jp/" title="d-hacks" />
            , <NoColorLink href="https://www.jn.sfc.keio.ac.jp/" title="sensys" />
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
              <SkillsItem title="JavaScript">
                サーバー用途やAPI開発で使用。Node.js、チャットボット、Vue.jsなど
              </SkillsItem>
              <SkillsItem title="Python">
                主に研究で使用。PyTorchを用いた深層学習、ゲーム作成など
              </SkillsItem>
              <SkillsItem title="Kotlin">
                過去にOSSを公開。Androidアプリの開発など
              </SkillsItem>
            </SkillsItemWrapper>

            <h2 className={index.h2}>サブ言語（あまり覚えてない）</h2>
            <SkillsSubItemWrapper>
              <SkillsItem title="TypeScript">
                Next.jsを用いた自作CMS、Discordボット作成など
              </SkillsItem>
              <SkillsItem title="Java">
                ロボットのプログラム、技術本での勉強など
              </SkillsItem>
              <SkillsItem title="PHP">
                Webアプリ開発、Apacheなど
              </SkillsItem>
              <SkillsItem title="C">
                高校のプログラミングの授業で使用
              </SkillsItem>
              <SkillsItem title="C#">
                簡単なWindowsフォームアプリの作成
              </SkillsItem>
              <SkillsItem title="Go">
                ブロックチェーン、分散ストレージの勉強で使用
              </SkillsItem>
              <SkillsItem title="Ruby">
                授業で使用。Railsを用いたWebサイトを作成
              </SkillsItem>
            </SkillsSubItemWrapper>
          </Skills>
        </section>
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