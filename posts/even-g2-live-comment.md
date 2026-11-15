---
title: Even G2 Live Comment
tag: Even G2, スマートグラス, TypeScript
overview: YouTubeライブ配信のコメントをスマートグラスに表示するアプリ
date: 2026.5.5
home_order: 3
---
YouTubeライブ配信のコメントを、スマートグラスの「Even G2」にリアルタイムで表示するアプリです。
現地でゲームやスポーツイベントを観戦していると、配信のコメント欄で盛り上がっている様子が気になっても、スマホを見ると目の前の試合やステージから目を離すことになります。そこで、現地の臨場感を味わいながら配信の盛り上がりも同時に楽しめるように、このアプリを開発しました。

本アプリはEven Hubストアで公開しています。

<div style="display: flex; gap: 3px; align-items: flex-start;">
  <div style="flex: 1 1 0; min-width: 0;"><video src="/posts/even-g2-live-comment/demo.mp4" style="display: block; width: 100%;" controls autoplay muted></video></div>
  <div style="flex: 0.5192 1 0; min-width: 0;"><img src="/posts/even-g2-live-comment/youtube-chat.png"></div>
</div>

# br-24px

▼ Even G2
# img-480px /posts/even-g2-live-comment/even-g2.png


# 使い方と内部の仕様
スマホのEven Hubアプリから本アプリを開き、ライブ配信のURLを入力して開始すると、グラスに最新のコメントが流れます。
YouTube Data APIのキーを用意する必要はなく、インストール後すぐに使えます。

# img-400px /posts/even-g2-live-comment/even-hub.png
# br-24px

本アプリは、スマホのWebView上で動くWebアプリとして開発していて、グラスとはEven Hubアプリを経由してBLEで通信しています。

ちなみに、公式からシミュレーターは用意されていますが、シミュレーターだけで開発しているとグラス自体のメモリ不足で落ちる問題に気付けないため、現バージョンのスマートグラスアプリ開発は実機で動作確認しながら開発する必要がありそうです。

# x-post 2051594756988579980 600

# リンク
- Even Hub  
  https://evenhub.evenrealities.com/landing?package_id=com.github.sakusaku3939.livecomment
