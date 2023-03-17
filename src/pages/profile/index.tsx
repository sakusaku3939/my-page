import Head from "next/head";
import index from "@/pages/profile/Profile.module.css";
import SnsList from "@/components/molecule/SnsList/SnsList";
import { Qualification, QualificationItem } from "@/components/organism/Qualification/Qualification";
import PostsList from "@/components/organism/PostsList/PostsList";
import { Timeline, TimeLineItem, TimeLineLink } from "@/components/organism/Timeline/Timeline";
import { faGraduationCap, faBriefcase, faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
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
          <div className={index.subtitle}>B1 / Web, Android</div>
          <SnsList />
        </section>
        <section className={index.section}>
          <PostsList />

          <h1 className={index.h1}>経歴</h1>
          <Timeline>
            <TimeLineItem date="2019.4 ~" icon={faGraduationCap} title="東京都立新宿山吹高校（定時制） 情報科" />
            <TimeLineItem date="2019.8 ~" icon={faBriefcase} title="ロボコンチーム  BWW 所属">
              高1〜高3の間に世界最大級のロボコン FRC（FIRST Robotics
              Competition）に出場するチーム「BWW」に設立メンバーとして活動しました。ソフトウェアや公式Webサイト作成、ブログやTwitter、YouTubeなどでの広報活動を行いました。
              <TimeLineLink
                description="公式Webサイト"
                href="https://bww8231.fuji3.info/"
              />
              <TimeLineLink
                description="YouTube"
                href="https://www.youtube.com/@BWW8231"
              />
            </TimeLineItem>
            <TimeLineItem date="2021.10" icon={faTrophy} title="アプリ甲子園2021  第3位・技術賞">
              アプリ甲子園2021にて、プレゼン原稿表示アプリ「Presc」を発表しました。第3位と技術賞を頂きました。
              <TimeLineLink
                description="「プレゼンで時間オーバー」解決するアプリを高校生が開発｜ 高校生新聞オンライン"
                href="https://www.koukouseishinbun.jp/articles/-/8347"
              />
              <TimeLineLink
                description="発表動画"
                href="https://youtu.be/JblLFCS-Eqw"
              />
            </TimeLineItem>
            <TimeLineItem date="2022.8" icon={faTrophy} title="全国専門学科情報科研究協議会  優秀賞">
              専門学科 情報科の設置校が集まって年に1度開催する研究協議会にて、プレゼン原稿表示アプリ「Presc」を発表しました。生徒表彰にて優秀賞を頂きました。
              <br />
            </TimeLineItem>
            <TimeLineItem date="2023.1 ~" icon={faBriefcase} title="株式会社Wandarlust  Locket開発">
              位置情報共有アプリ「Locket」のフロントエンド（Flutter）チームに約2ヶ月間所属しました。主にチャット機能の開発に携わりました。
              <br />
            </TimeLineItem>
            <TimeLineItem date="2023.4 ~" icon={faGraduationCap} title="慶應義塾大学  環境情報学部" />
          </Timeline>

          <h1 className={index.h1}>取得資格</h1>
          <Qualification>
            <QualificationItem title="基本情報技術者試験" period="2022年春期" institution="経済産業省" />
            <QualificationItem title="ITパスポート試験" period="2020年秋期" institution="経済産業省" />
          </Qualification>
        </section>
      </main>
    </>
  );
}
