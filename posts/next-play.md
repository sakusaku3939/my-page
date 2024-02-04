---
title: NextPlay
tag: Ruby, Ruby on Rails, JavaScript, WebRTC
overview: WebRTCでゲーム配信やコメントができるSNS
date: 2024.1.19
---

SNSの機能に加えて、プレイ中のゲームの配信やコメントができるゲーマー向けSNSです。
スクリプト言語プログラミング 2023年秋学期の最終課題で作成しました。

アプリケーションはRuby on Rails、ゲーム画面の配信はWebRTCとWebSocketを使用しました。

<video src="/posts/next-play/demo-video.mp4" controls autoplay muted></video>

開発の背景としては、既存のゲーム用交流サービス（例: Discord, Twitch）は、ゲームの配信や交流が可能ですが、コミュニティが閉鎖的になりがちで、新たな繋がりを作ることが困難です。また、TwitterなどのSNSは、広い交流を行うことができる側面、深い繋がりに適していないことが挙げられます。

本サイトでは、ゲーム配信やSNS機能に加えて、配信中に送ったコメントが自動でタイムラインにも投稿されます。これによって、コメントを伝って他のフォロワーも配信を知ることができ、新しい繋がりを作れる仕組みになっています。

![](/public/posts/next-play/streamer1.png)
# @br-4px

# @row /posts/next-play/viewer1.png /posts/next-play/viewer2.png
# @br-16px

ユーザーが配信を開始する場合は、テキスト入力フォームの下にある「▼配信を開始する」ボタンをクリックして、①サムネイル画像をアップロードし、②配信の枠をクリックしてWebRTCの画面共有を行うことで、配信が可能です。

![](/public/posts/next-play/streamer2.png)

# 技術面
WebRTC (Web Real-Time Communications) は、仲介を必要とせずにP2Pでリアルタイムにブラウザ間で映像・音声や任意のデータの送受信を実現できる技術です。内部にはUDPプロトコルが使用されています。P2Pで双方向通信を行うために、相手のIPアドレスの情報が必要になるため、事前に仲介としてシグナリングサーバーを用いてIPアドレスや証明書のフィンガープリント情報をSDPと呼ばれるプロトコルで交換して、次にICEプロトコル<sup>\*1</sup> によって端末同士のNAT越えを行います。
# @br-16px

<sup>\*1</sup> ICEプロトコルを使用したNAT越えは、STUNサーバーとTURNサーバーが一般的に使用されます。STUNサーバーは受け取ったIPアドレスをそのままクライアントに返す仕組みで、ユーザー自身のIPアドレスを通信相手に伝えることが可能です。

![](/public/posts/next-play/webrtc-sequence.png)
# @br-32px

本アプリケーションでは、Ruby on Railsの「Action Cable」を使用して、WebSocketを用いたシグナリングサーバーを自作しました。また、WebRTCのAPIを使用して、SDPの交換とICEプロトコルによる通信経路の確保、映像・音声の送受信を行うコードをJavaScriptで作成しました。
STUNサーバーはGoogleが提供する <code>stun.l.google.com:19302</code> を使用しました。


# リンク
- GitHub  
  https://github.com/sakusaku3939/NextPlay


# 使用技術
言語 ・・・ Ruby, JavaScript
フレームワーク、ライブラリ ・・・ Ruby on Rails,  Action Cable,  devise（ユーザー認証）
ツール ・・・ Docker,  Figma