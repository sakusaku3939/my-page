---
title: Presc
tag: Android / iOS, Flutter, Dart, アプリ甲子園
overview: 音声認識により、どこまで読んだかが分かるプレゼンテーション用原稿表示アプリ
date: 2021.10.25
---

音声認識により話した分だけ自動でスクロールしてくれる、プレゼンテーション用の原稿表示アプリです。
人前で話すことになって、原稿を用意したのに緊張で頭が真っ白になり「どこまで読んだっけ？」「次はどこを読むんだっけ？」と迷子になる事を防いでくれます。

また、プレゼンを開始してからの経過時間や、声量をリアルタイムで視覚化してくれ、プレゼンの練習や発表を手助けしてくれます。

<video src="/posts/presc/app-video.mp4" controls autoplay muted></video>

再生画面では、音声認識により原稿を自動でスクロールしてくれ、どこまで読んだかが一目で分かります。 また、書式の向き（縦書き、横書き）や文字の色、フォントサイズなど自由にカスタマイズ可能です。

編集画面は、基本的なメモ帳の機能（追加・編集・検索・削除）に加え、作った原稿にタグを付けて整理することができます。


# 発表資料
# @speaker-deck c632239a5a8d4dcbafa33e1e3dfcab9d


# ダウンロード
# @br1
# @row-link /posts/presc/app-store.png:apps.apple.com/jp/app/presc/id1599599891 /posts/presc/google-play.png:play.google.com/store/apps/details?id=com.sakusaku3939.presc


# 受賞歴
## アプリ甲子園
2021年度のアプリ甲子園にて、3位と技術賞をいただきました。

- 2021年入賞作品の紹介記事 - PR TIMES
  https://prtimes.jp/main/html/rd/p/000000124.000019771.html

- アプリ甲子園 発表アーカイブ - YouTube
  https://youtu.be/JblLFCS-Eqw

## 全国専門学科情報科研究協議会
専門学科「情報科」の設置高校が集まって年に1度開催する、研究協議会の生徒表彰にて優秀賞を頂きました。


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
![](/public/posts/presc/vertical-slide.png)


# リンク
- 「プレゼンで時間オーバー」解決するアプリを高校生が開発 - 高校生新聞オンライン
  - 高校生新聞オンライン
    https://www.koukouseishinbun.jp/articles/-/8347

  - Yahooニュース（現在は削除）
    https://news.yahoo.co.jp/articles/ef4c1e6e6dc0843e9473f593b7eefe8369e5e29b

- GitHub
  https://github.com/sakusaku3939/Presc


# 使用技術
言語 ・・・ Dart
フレームワーク ・・・ Flutter
主要ライブラリ ・・・ speech_to_text(音声認識), provider(MVVMフレームワーク), sqflite(データベース)
ツール ・・・ DeployGate, Adobe XD