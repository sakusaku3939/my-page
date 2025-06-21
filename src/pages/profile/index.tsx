import index from "@/styles/index.module.css";
import Head from "next/head";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { Timeline, TimeLineItem, TimeLineLink } from "@/components/organism/Timeline/Timeline";
import { faBriefcase, faChalkboardTeacher, faGraduationCap, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Qualification, QualificationItem } from "@/components/organism/Qualification/Qualification";
import { FooterMenu } from "@/components/molecule/Menu/Menu";
import TimelineImage from "@/components/molecule/TimelineImage/TimelineImage";

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
          <TimeLineItem date="2019.4 - 2023.3" icon={faGraduationCap} title="東京都立新宿山吹高校 情報科" />
          <TimeLineItem date="2019.8 - 2022.3" icon={faBriefcase} title="FRCロボコンチーム BWW" open={false}>
            高1〜高3に世界級のロボコン FRC（FIRST Robotics
            Competition）のチーム「BWW」に初期メンバーとして活動しました。Javaによるロボット制御のプログラミングを担当したほか、公式Webサイトの制作、YouTube動画編集、ブログなどでの広報活動を行いました。
            <TimeLineLink
              description="公式Webサイト"
              href="https://bww8231.fuji3.info/"
            />
            <TimeLineLink
              description="YouTube"
              href="https://www.youtube.com/@BWW8231"
            />
          </TimeLineItem>
          <TimeLineItem date="2023.1 - 2023.3" icon={faBriefcase} title="株式会社Wanderlust Flutterエンジニア"
                        open={false}>
            フロントエンドチームで、位置情報共有アプリ「Locket」の0→1開発（Flutter）にフルタイム相当の時間で従事しました。チャット機能やプロフィール画面などの新規機能開発やUX改善に取り組み、開発速度と品質の両立を重視したスクラム開発を経験しました。
            <TimelineImage
              title="Locket | 位置情報共有アプリ"
              period="2023年1月 - 2023年3月"
              imageUrl="/timeline/locket.png"
              showModal={true}
            />
          </TimeLineItem>
          <TimeLineItem date="2024.8 - 2024.12" icon={faBriefcase} title="Gather Inc. モバイルエンジニア" open={false}>
            お出かけ先を提案してくれるAI 「GatherGo」のAndroid・iOSアプリ（Flutter）の0→1開発に従事しました。技術総括のもとアーキテクチャの選定から携わり、Clean
            Architecture + Riverpodによるチケット駆動開発を経験しました。マップ画面やチャットなどUIの実装、キャッシュ戦略含むコア部分の開発など、ゼロベースから幅広い実装を担いました。
            <TimelineImage
              title="GatherGo | お出かけ先レコメンドAI"
              period="2024年8月 - 2024年12月"
              imageUrl="/timeline/gathergo.png"
              showModal={true}
            />
          </TimeLineItem>
          <TimeLineItem date="2023.4 - 現在" icon={faGraduationCap} title="慶應義塾大学 環境情報学部（SFC）" />
          <TimeLineItem date="2023.4 - 現在" icon={faGraduationCap} title="村井合同研究会 d-hacks" open={true}>
            村井合同研究会（RG）の中澤・大越研究室 d-hacks研究グループに所属し、深層学習やCVに関する研究に取り組んでいます。
            <TimeLineLink
              description="d-hacks"
              href="https://d-hacks.jn.sfc.keio.ac.jp/"
            />
          </TimeLineItem>
        </Timeline>

        <h1 className={index.h1}>受賞歴</h1>
        <Timeline>
          <TimeLineItem date="2021.10" icon={faTrophy} title="アプリ甲子園2021 第3位・技術賞" open={true}>
            アプリ甲子園2021にて、プレゼン原稿表示アプリ「Presc」 を発表しました。1次・2次選考を通過し、決勝大会で第3位と技術賞を頂きました。
            <TimeLineLink
              description="プレゼン原稿表示アプリ「Presc」"
              href="/posts/presc"
              target=""
            />
            <TimeLineLink
              description="「プレゼンで時間オーバー」解決するアプリを高校生が開発｜ 高校生新聞オンライン"
              href="https://www.koukouseishinbun.jp/articles/-/8347"
            />
          </TimeLineItem>
          <TimeLineItem date="2022.8" icon={faTrophy} title="全国専門学科情報科研究協議会 優秀賞">
            高校の情報科設置校が集まって年に1度開催する研究協議会にて、Prescを発表しました。生徒表彰にて優秀賞を頂きました。
          </TimeLineItem>
          <TimeLineItem date="2025.3" icon={faTrophy} title="廃棄物資源循環学会 優秀ポスター賞">
            廃棄物資源循環学会にて「細粒度ゴミ排出量データを活用した市民向けゴミ収集可視化アプリケーションの開発」の発表を行い、優秀ポスター賞を頂きました。
            <TimeLineLink
              description="青木勇樹さん(環2)が令和6年度 廃棄物資源循環学会関東支部 講演会・研究発表会で「優秀ポスター賞」を受賞 | 慶應義塾大学 湘南藤沢キャンパス（SFC）"
              href="https://www.sfc.keio.ac.jp/news/025657.html"
            />
          </TimeLineItem>
        </Timeline>

        <h1 className={index.h1}>研究発表</h1>
        <Timeline>
          <TimeLineItem date="2024.5" icon={faChalkboardTeacher}
                        title="第82回 情報処理学会 ユビキタスコンピューティングシステム研究会（UBI）" open={false}>
            研究テーマ 「一般物体検出とLSTMを用いた画像に基づく屋内位置推定」 について、情報処理学会の
            UBI82研究会にて発表しました。（Full-paper, 国内, 査読無し）
            <TimeLineLink
              description="id.nii.ac.jp/1001/00233750/"
              href="https://ipsj.ixsq.nii.ac.jp/records/233864"
            />
            <TimeLineLink
              description="【発表】 学部2年 青木君が研究内容を情報処理学会第82回UBI研究会で発表しました – “一般物体検出とLSTMを用いた画像に基づく屋内位置推定” | Nakazawa and Okoshi Lab."
              href="https://www.jn.sfc.keio.ac.jp/%e3%80%90%e7%99%ba%e8%a1%a8%e3%80%91%e5%ad%a6%e9%83%a82%e5%b9%b4-%e9%9d%92%e6%9c%a8%e5%90%9b%e3%81%8c%e7%a0%94%e7%a9%b6%e5%86%85%e5%ae%b9%e3%82%92%e6%83%85%e5%a0%b1%e5%87%a6%e7%90%86%e5%ad%a6%e4%bc%9a/?utm_campaign=shareaholic&utm_medium=copy_link&utm_source=bookmark"
            />
          </TimeLineItem>
          <TimeLineItem date="2024.6" icon={faChalkboardTeacher}
                        title="ACM MobiSys'24 Demo" open={true}>
            国際会議 MobiSys 2024 の Poster/Demo セッションにて「Demo: Image-based Indoor
            Localization using Object Detection and LSTM」を発表しました。（Demo, 国際, 査読あり）
            <TimeLineLink
              description="doi.org/10.1145/3643832.3661836"
              href="https://doi.org/10.1145/3643832.3661836"
            />
          </TimeLineItem>
        </Timeline>

        <h1 className={index.h1}>資格</h1>
        <Qualification>
          <QualificationItem title="基本情報技術者試験" period="2022年春期" institution="経済産業省" />
          <QualificationItem title="ITパスポート試験" period="2020年秋期" institution="経済産業省" />
        </Qualification>
      </section>

      <FooterMenu />
    </>
  );
};

export default Index;