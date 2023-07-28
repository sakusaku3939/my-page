import Head from "next/head";
import index from "@/styles/index.module.css";
import SnsList from "@/components/molecule/SnsList/SnsList";
import { Qualification, QualificationItem } from "@/components/organism/Qualification/Qualification";
import { PostsList } from "@/components/organism/PostsList/PostsList";
import { Timeline, TimeLineItem, TimeLineLink } from "@/components/organism/Timeline/Timeline";
import { faGraduationCap, faBriefcase, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Skills, SkillsItem, SkillsItemWrapper, SkillsSubItemWrapper } from "@/components/organism/Skills/Skills";
import { GetServerSidePropsContext } from "next";
import NoColorLink from "@/components/atom/NoColorLink/NoColorLink";

const Index = () => {
  return (
    <>
      <Head>
        <title>Aokiti | Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
            <h2 className={index.h2}>メイン言語</h2>
            <SkillsItemWrapper>
              <SkillsItem title="JavaScript">
                主にサーバー用途やAPIで使用。Node.js、チャットボット、Vue.jsなど
              </SkillsItem>
              <SkillsItem title="Dart">
                実務の経験あり。Flutterを用いたモバイルアプリ開発など
              </SkillsItem>
              <SkillsItem title="Kotlin">
                過去にOSSを公開。Androidのネイティブアプリ開発など
              </SkillsItem>
              <SkillsItem title="Python">
                主に研究で使用。PyTorchの深層学習モデル、ゲーム開発など
              </SkillsItem>
            </SkillsItemWrapper>

            <h2 className={index.h2}>サブ言語</h2>
            <SkillsSubItemWrapper>
              <SkillsItem title="TypeScript">
                Next.jsを用いた自作CMS、Discordボット作成など
              </SkillsItem>
              <SkillsItem title="Java">
                基本情報技術者の午後で選択。ロボットのプログラム、技術本の勉強など
              </SkillsItem>
              <SkillsItem title="PHP">
                Webアプリ開発、Apacheサーバーなど
              </SkillsItem>
              <SkillsItem title="C">
                高校のプログラムの授業で使用
              </SkillsItem>
              <SkillsItem title="Go">
                ブロックチェーン、分散ストレージの勉強など
              </SkillsItem>
            </SkillsSubItemWrapper>
          </Skills>

          <h1 className={index.h1} />
          <Timeline>
            <TimeLineItem date="2019.4 ~" icon={faGraduationCap} title="東京都立新宿山吹高校（定時制） 情報科" />
            <TimeLineItem date="2019.8 ~" icon={faBriefcase} title="ロボコンチーム  BWW所属">
              高1〜高3に世界最大級のロボコン FRC（FIRST Robotics
              Competition）のチーム「BWW」に創業メンバーとして活動しました。ロボットのプログラミングや公式Webサイト作成、YouTube動画編集、Twitter、ブログなどでの広報活動を行いました。
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
              アプリ甲子園2021にて、プレゼン原稿表示アプリ「Presc」を発表しました。1次・2次選考を通過し、決勝大会で第3位と技術賞を頂きました。
              <TimeLineLink
                description="発表動画"
                href="https://youtu.be/JblLFCS-Eqw"
              />
              <TimeLineLink
                description="「プレゼンで時間オーバー」解決するアプリを高校生が開発｜ 高校生新聞オンライン"
                href="https://www.koukouseishinbun.jp/articles/-/8347"
              />
            </TimeLineItem>
            <TimeLineItem date="2022.8" icon={faTrophy} title="全国専門学科情報科研究協議会  優秀賞">
              高校の情報科設置校が集まって年に1度開催する研究協議会にて、プレゼン原稿表示アプリ「Presc」を発表しました。生徒表彰にて優秀賞を頂きました。
              <br />
            </TimeLineItem>
            <TimeLineItem date="2023.1 ~" icon={faBriefcase} title="株式会社Wanderlust  Locket開発">
              位置情報共有アプリ「Locket」のフロントエンド（Flutter）チームに約2ヶ月間所属しました。主にチャット機能、プロフィール画面等の開発に携わりました。
              <br />
            </TimeLineItem>
            <TimeLineItem date="2023.4 ~" icon={faGraduationCap} title="慶應義塾大学  環境情報学部（SFC）" />
          </Timeline>

          <h1 className={index.h1} />
          <Qualification>
            <QualificationItem title="基本情報技術者試験" period="2022年春期" institution="経済産業省" />
            <QualificationItem title="ITパスポート試験" period="2020年秋期" institution="経済産業省" />
          </Qualification>
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