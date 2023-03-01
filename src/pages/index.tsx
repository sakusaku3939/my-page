import Head from "next/head";
import { Noto_Sans_JP } from "next/font/google";
import styles from "@/styles/index.module.css";
import SnsList from "@/components/sns-list";

const font = Noto_Sans_JP({ weight: "500", subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Profile | Aokiti</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={font.className}>
        <h1 className={styles.title}>Aokiti</h1>
        <SnsList />
      </main>
    </>
  );
}
