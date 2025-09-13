import Head from "next/head";
import index from "@/styles/index.module.css";
import SnsList from "@/components/molecule/SnsList/SnsList";
import { PostsList } from "@/components/organism/PostsList/PostsList";
import NoColorLink from "@/components/atom/NoColorLink/NoColorLink";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu, Menu } from "@/components/molecule/Menu/Menu";
import { BackgroundGradientWrapper } from "@/components/atom/BackgroundGradientWrapper/BackgroundGradientWrapper";

const Index = () => {
  return (
    <>
      <Head>
        <title>Aokiti | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundGradientWrapper>
        <div className={index.content}>
          <span className={index.menuVisibility}><Menu /></span>
          <span className={index.hamburgerVisibility}><HamburgerMenu /></span>
          <section className={index.header}>
            <div className={index.title}>Aokiti</div>
            <div className={index.subtitle}>
              <span>Keio SFC B3</span>
              <span>RG <NoColorLink href="https://d-hacks.jn.sfc.keio.ac.jp/" title="d-hacks"
                                    target="_blank" /></span>
              <span>アプリ開発, 深層学習</span>
            </div>
            <SnsList />
          </section>
          <section className={index.section}>
            <PostsList />
          </section>

          <FooterMenu />
        </div>
      </BackgroundGradientWrapper>
    </>
  );
};

export default Index;