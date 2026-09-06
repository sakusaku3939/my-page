import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import index from "./index.module.css";
import SnsList from "@/components/molecule/SnsList/SnsList";
import { PostsList } from "@/components/organism/PostsList/PostsList";
import NoColorLink from "@/components/atom/NoColorLink/NoColorLink";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu, Menu } from "@/components/molecule/Menu/Menu";
import { BackgroundGradientWrapper } from "@/components/atom/BackgroundGradientWrapper/BackgroundGradientWrapper";

const TITLE_TEXT = "Aokiti";
const LETTER_DELAY_MS = 55;

const Index = () => {
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // 前のタイムアウトをクリア
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (newCount === 5) {
      // 5回クリックされたら/xに遷移
      router.push("/x");
      setClickCount(0);
    } else {
      // 2秒後にカウントをリセット
      timeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);
    }
  };

  return (
    <>
      <Head>
        <title>Aokiti | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundGradientWrapper>
        <span className={index.menuVisibility}><Menu /></span>
        <span className={index.hamburgerVisibility}><HamburgerMenu /></span>
        <section className={index.header}>
          <div className={index.title}>
            <button type="button" className={index.titleButton} onClick={handleTitleClick} aria-label={TITLE_TEXT}>
              {Array.from(TITLE_TEXT, (letter, position) => (
                <span
                  key={position}
                  className={index.titleLetter}
                  style={{ animationDelay: `${position * LETTER_DELAY_MS}ms` }}
                  aria-hidden="true"
                >
                  {letter}
                </span>
              ))}
            </button>
          </div>
          <div className={index.subtitle}>
            <span>Keio SFC B4</span>
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
      </BackgroundGradientWrapper>
    </>
  );
};

export default Index;
