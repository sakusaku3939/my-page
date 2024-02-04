---
title: エヌエヌ動画
tag: JavaScript, Scala, Play Framework, FFmpeg
overview: ニコニコ動画風にコメントが流れる動画投稿サイト
date: 2021.3.20
---

N予備校の「ニコニコ動画再現 Webアプリ」を参考に制作したニコニコ動画風サイトです。 投稿画面、閲覧画面、トップ画面、投稿した動画の一覧画面等が実装されています。

![](/public/posts/nn-douga/screenshot1.png)

サーバーサイドはExpress.jsを使用し、セッション管理にはRedisを使用しました。
動画用メディアサーバーはScalaとPlay Frameworkで作成し、動画のストリーミングやエンコードにはFFmpegとMP4Boxを利用しました。

# スクリーンショット
![](/public/posts/nn-douga/screenshot2.png)
![](/public/posts/nn-douga/screenshot3.png)


# 使用技術
言語・・・Pug, CSS, JavaScript, Scala
フレームワーク、ライブラリ・・・Express.js, Play Framework, Akka, FFmpeg, MP4Box
データベース・・・MySQL, Redis
ツール・・・Git, Vagrant, VirtualBox