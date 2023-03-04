import Head from "next/head";
import { Noto_Sans_JP } from "next/font/google";
import styles from "@/styles/index.module.css";
import SnsList from "@/components/molecule/sns-list";
import Timeline from "@/components/organism/timeline";
import Qualification from "@/components/organism/qualification";
import Portfolio from "@/components/organism/portfolio";

const font = Noto_Sans_JP({ weight: ["300", "500", "700"], subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Profile | Aokiti</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={font.className}>
        <section className={styles.header}>
          <div className={styles.title}>Aokiti</div>
          <div className={styles.subtitle}>Keio Univ(SFC) B1 / Web, Android</div>
          <SnsList />
        </section>
        <section className={styles.main}>
          <h1 className={styles.h1}>制作物</h1>
          <Portfolio />
          <h1 className={styles.h1}>経歴</h1>
          <Timeline />
          <h1 className={styles.h1}>取得資格</h1>
          <Qualification />
        </section>
      </main>
    </>
  );
}
