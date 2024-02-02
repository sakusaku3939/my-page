---
title: NextPlay
tag: Ruby, Ruby on Rails, WebRTC
overview: WebRTCでゲーム配信やコメントができるSNS
date: 2024.1.19
---

SNSの機能に加えて、プレイ中のゲームの配信やコメントができるゲーマー向けSNSです。
スクリプト言語プログラミング 2023年秋学期の最終課題で作成しました。

アプリケーションはRuby on Rails、ゲーム画面の配信はWebRTCとWebSocketを使用しました。

<video src="/posts/next-play/demo-video.mp4" controls autoplay muted></video>

既存のライブ配信サービスやSNSと違って、ゲーム配信中に送ったコメントが、自動でタイムラインにも投稿されます。これによって、コメントを伝って他のフォロワーも配信を知ることができ、新しい繋がりを作れる仕組みになっています。

# @row /posts/next-play/viewer1.png /posts/next-play/viewer2.png
<br>

配信を開始する場合は、テキスト入力フォームの下にある「▼配信を開始する」ボタンをクリックして、①サムネイル画像をアップロードし、②配信の枠をクリックしてWebRTCの画面共有を行うことで、配信が可能です。

![](/public/posts/next-play/streamer.png)

# リンク
- 完成サイト  
https://bww8231.fuji3.info
- GitHub  
https://github.com/frcbww/Website


# 使用技術
言語 ・・・ HTML, CSS, JavaScript
フレームワーク、ライブラリ ・・・ Anime.js, Modernizr
ツール ・・・ GitHub Pages, Adobe XD