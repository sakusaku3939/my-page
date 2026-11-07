---
title: Even G2 Live Comment
tag: Even G2, スマートグラス, TypeScript
overview: YouTubeライブ配信のコメントをスマートグラスに表示するアプリ
date: 2026.5.5
---

YouTubeライブ配信のコメントを、スマートグラスのEven G2にリアルタイムで表示するアプリです。
イベントを現地で観戦しているときに、配信側のコメントもスマホを見ずに追えるようにしたくて作りました。

<div style="display: flex; gap: 3px; align-items: flex-start;">
  <div style="flex: 1 1 0; min-width: 0;"><video src="/posts/even-g2-live-comment/demo.mp4" style="display: block; width: 100%;" controls autoplay muted></video></div>
  <div style="flex: 0.5192 1 0; min-width: 0;"><img src="/posts/even-g2-live-comment/youtube-chat.png"></div>
</div>

# br-24px

▼ 購入したEven G2
# img-480px /posts/even-g2-live-comment/even-g2.png


# 使い方
スマホのEven Hubアプリから本アプリを開き、ライブ配信のURLを入力して開始すると、グラスに直近のコメントが流れます。
YouTube Data APIのキーは不要で、インストール後すぐに使えます。

ストア審査を通過し、現在もEven Hubストアで公開しています。
# img-400px /posts/even-g2-live-comment/even-hub.jpg
# br-24px

なおEven Hub向けアプリは、スマホのWebView上で動くWebアプリとして開発し、グラスとはEven Hubアプリ経由のBLEで通信しています。

公式からシミュレーターは用意されていますが、シミュレーターだけで開発しているとグラス自体のメモリ不足で落ちる問題に気付けないため、実機で動作確認しながら開発する必要があったのが苦労した点です。

# リンク
- Even Hub  
  https://evenhub.evenrealities.com/landing?package_id=com.github.sakusaku3939.livecomment
