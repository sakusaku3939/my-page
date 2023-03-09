import Head from "next/head";
import index from "@/pages/profile/Profile.module.css";
import SnsList from "@/components/molecule/SnsList/SnsList";
import Timeline from "@/components/organism/Timeline/Timeline";
import Qualification from "@/components/organism/Qualification/Qualification";
import PostsList from "@/components/organism/PostsList/PostsList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Profile | Aokiti</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className={index.header}>
          <div className={index.title}>Aokiti</div>
          <div className={index.subtitle}>Keio Univ(SFC) B1 / Web, Android</div>
          <SnsList />
        </section>
        <section className={index.main}>
          <h1 className={index.h1}>制作物</h1>
          <PostsList />
          <h1 className={index.h1}>経歴</h1>
          <Timeline />
          <h1 className={index.h1}>取得資格</h1>
          <Qualification />
        </section>
      </main>
    </>
  );
}
