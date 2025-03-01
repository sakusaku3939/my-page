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