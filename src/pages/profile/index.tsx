import index from "@/styles/index.module.css";
import Head from "next/head";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { Timeline, TimeLineItem, TimeLineLink } from "@/components/organism/Timeline/Timeline";
import { faBriefcase, faChalkboardTeacher, faGraduationCap, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Qualification, QualificationItem } from "@/components/organism/Qualification/Qualification";
import NoColorLink from "@/components/atom/NoColorLink/NoColorLink";

const Index = () => {
  return (
    <>
      <Head>
        <title>Aokiti | Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HamburgerMenu />
      <h1 className={index.profileTitle}>プロフィール</h1>

      <section className={index.section}>
        <h1 className={index.h1}>経歴</h1>
        <Timeline>
          <TimeLineItem date="2019.4 ~" icon={faGraduationCap} title="東京都立新宿山吹高校（定時制） 情報科" />
          <TimeLineItem date="2019.8 ~" icon={faBriefcase} title="FRCロボコンチーム BWW">
            高1〜高3に世界最大級のロボコン FRC（FIRST Robotics
            Competition）のチーム「BWW」に初期メンバーとして活動しました。ロボットのプログラミングや公式Webサイト作成、YouTube動画編集、Twitter、ブログなどでの広報活動を行いました。
            <TimeLineLink
              description="公式Webサイト"
              href="https://bww8231.fuji3.info/"
            />
            <TimeLineLink
              description="YouTube"
              href="https://www.youtube.com/@BWW8231"
            />
          </TimeLineItem>
          <TimeLineItem date="2023.1 ~" icon={faBriefcase} title="株式会社Wanderlust Locket開発">
            位置情報共有アプリ「Locket」のフロントエンド（Flutter）チームに約2ヶ月間所属しました。主にチャット機能、プロフィール画面等の開発にフルタイムで携わりました。
          </TimeLineItem>
          <TimeLineItem date="2023.4 ~" icon={faGraduationCap} title="慶應義塾大学 環境情報学部（SFC）" />
          <TimeLineItem date="2023.4 ~" icon={faGraduationCap} title="RG d-hacks 中澤・大越研究室" open={true}>
            慶應義塾大学 村井合同研究会（RG）の d-hacks（中澤・大越研究室）で深層学習やCVに関する研究を行っています。
            <TimeLineLink
              description="RG"
              href="https://rg.sfc.keio.ac.jp/ja"
            />
          </TimeLineItem>
        </Timeline>

        <h1 className={index.h1}>受賞 ・ 研究発表</h1>
        <Timeline>
          <TimeLineItem date="2021.10" icon={faTrophy} title="アプリ甲子園2021 第3位・技術賞">
            アプリ甲子園2021にて、<NoColorLink href="/posts/presc"
                                         title="プレゼン原稿表示アプリ「Presc」" /> を発表しました。1次・2次選考を通過し、決勝大会で第3位と技術賞を頂きました。
            <TimeLineLink
              description="「プレゼンで時間オーバー」解決するアプリを高校生が開発｜ 高校生新聞オンライン"
              href="https://www.koukouseishinbun.jp/articles/-/8347"
            />
          </TimeLineItem>
          <TimeLineItem date="2022.8" icon={faTrophy} title="全国専門学科情報科研究協議会 優秀賞">
            高校の情報科設置校が集まって年に1度開催する研究協議会にて、<NoColorLink href="/posts/presc"
                                                                         title="Presc" /> を発表しました。生徒表彰にて優秀賞を頂きました。
            <br />
          </TimeLineItem>
          <TimeLineItem date="2024.5" icon={faChalkboardTeacher}
                        title="第82回 情報処理学会 ユビキタスコンピューティングシステム研究会（UBI）">
            学部2年時に、研究テーマ「一般物体検出とLSTMを用いた画像に基づく屋内位置推定」について、UBI研究会にて発表しました。（Full-paper, 国内,
            査読無し）
            <TimeLineLink
              description="id.nii.ac.jp/1001/00233750/"
              href="https://ipsj.ixsq.nii.ac.jp/ej/?action=pages_view_main&active_action=repository_view_main_item_detail&item_id=233864&item_no=1&page_id=13&block_id=8"
            />
            <TimeLineLink
              description="第82回研究会 | IPSJ SIGUBI"
              href="https://sigubi.ipsj.or.jp/seminar82/"
            />
          </TimeLineItem>
        </Timeline>

        <h1 className={index.h1}>資格</h1>
        <Qualification>
          <QualificationItem title="基本情報技術者試験" period="2022年春期" institution="経済産業省" />
          <QualificationItem title="ITパスポート試験" period="2020年秋期" institution="経済産業省" />
        </Qualification>
      </section>
    </>
  );
};

export default Index;