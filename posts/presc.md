---
title: Presc
tag: Android / iOS, Flutter, Dart, アプリ甲子園
overview: 音声認識により、どこまで読んだかが分かるプレゼンテーション用原稿表示アプリ
date: 2021.10.25
pinned: true
---

音声認識により話した分だけ自動でスクロールしてくれる、プレゼンテーション用の原稿表示アプリです。
人前で話すことになって、原稿を用意したのに緊張で頭が真っ白になり「どこまで読んだっけ？」「次はどこを読むんだっけ？」と迷子になる事を防いでくれます。

また、プレゼンを開始してからの経過時間や、声量をリアルタイムで視覚化してくれ、プレゼンの練習や発表を手助けしてくれます。

<video src="/posts/presc/app-video.mp4" controls autoplay muted></video>

再生画面では、音声認識により原稿を自動でスクロールしてくれ、どこまで読んだかが一目で分かります。 また、書式の向き（縦書き、横書き）や文字の色、フォントサイズなど自由にカスタマイズ可能です。

編集画面は、基本的なメモ帳の機能（追加・編集・検索・削除）に加え、作った原稿にタグを付けて整理することができます。


# 発表資料
# speaker-deck c632239a5a8d4dcbafa33e1e3dfcab9d


# ダウンロード
# br-8px
# row-link /posts/presc/app-store.png:apps.apple.com/jp/app/presc/id1599599891 /posts/presc/google-play.png:play.google.com/store/apps/details?id=com.sakusaku3939.presc


# 受賞歴
- ## アプリ甲子園
  高校3年の時に出場した2021年度アプリ甲子園にて、1次・2次選考を通過し、決勝大会で第3位と技術賞を頂きました。
  - 発表アーカイブ - アプリ甲子園2021 No.5 プレゼン原稿表示アプリ「Presc」  
    https://youtu.be/JblLFCS-Eqw

# br-8px
# two-row 54.4 /posts/presc/kosien1.png /posts/presc/kosien2.png

- ## 全国専門学科情報科研究協議会
  高校の専門学科「情報科」設置校が集まって年に1度開催する研究協議会にて発表を行い、生徒表彰で優秀賞を頂きました。

# 技術面など
アプリの開発はFlutterを採用しました。
iOS・Androidの両端末に気軽にテスト配布できるように、DeployGateを利用しました。 Github Actionsを使用し、masterブランチにPull Requestを送ることで自動配布ができます。
![](/public/posts/presc/architecture-slide.png)

## 音声認識における工夫
音声認識によって得られた文章と実際の文章との一致判定は、形態素解析アルゴリズムを利用しています。
また、Yahoo! JAPANが公開している ルビ振りWeb API を利用して文章をそれぞれひらがなに変換することで、音声認識の自動変換ミスなどによる認識漏れが起こらなくなるように改善しました。
![](/public/posts/presc/separate-slide.png)

## 原稿の縦書き
Flutterは縦書き文字の描画に対応していないため、今回日本語の縦書きアルゴリズムを完全自作しました。
TextPainterを使用して1文字ずつ描画する方法と、Wrapウィジェットを活用する方法を考案し、現在のバージョンでは後者のアルゴリズムが使われています。

- Flutterで日本語の縦書きを実現する② - Aokiti
  https://qiita.com/sakusaku3939/items/9433f3fcfdad86cc264e

- TextPainterで描画する方法（旧）
  https://qiita.com/sakusaku3939/items/64d453f4cf4be875aa67

![](/public/posts/presc/vertical-slide.png)


# リンク
- 「プレゼンで時間オーバー」解決するアプリを高校生が開発
  - Yahooニュース（現在削除済み）
    https://news.yahoo.co.jp/articles/ef4c1e6e6dc0843e9473f593b7eefe8369e5e29b

  - 高校生新聞オンライン
    https://www.koukouseishinbun.jp/articles/-/8347

- GitHub
  https://github.com/sakusaku3939/Presc


# 使用技術
言語 ・・・ Dart
フレームワーク、ライブラリ ・・・ Flutter, speech_to_text, provider, sqflite
ツール ・・・ DeployGate, Adobe XD