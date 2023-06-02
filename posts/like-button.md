---
title: いいねボタン
tag: HTML / CSS / JavaScript, Vue.js, Firebase
overview: プレゼン発表中にリアルタイムで「いいね！」が送れるシステム
date: 2022.3.14
---

高校で一年に一回行われる「情報科発表会」で使用する、いいねボタン同期システムを開発しました。
発表について「いいね！」と思ったときにハートボタンを押すといいねが送れます。言葉で伝えたい時は、下の入力欄にコメントを入力して送信することで「コメントを送る」ことも可能です。

送ったいいねとコメントは全体のスクリーンにリアルタイムで表示され、発表の感想を会場内で共有することができます。

<video src="/posts/like-button/demo-video.mp4" controls autoplay muted></video>

管理者画面にログインすることで発表者の切り替え・追加・コメントの削除等を、リアルタイムに行うことができます。

# @row /posts/like-button/home-screenshot.jpg /posts/like-button/switch-screenshot.jpg
# @row /posts/like-button/add-screenshot.jpg /posts/like-button/view-comment-screenshot.jpg


# 技術面
フロントエンドはJavaScriptフレームワークのVue.js、バックエンドはFirebaseを採用しました。 
発表者の書き込み・切り替えにはFirestoreを使用し、ユーザーによるいいねやコメントといった書き込みが多い処理は、Realtime Databaseを使用することで無料枠の範囲に収めました。

いいねが送られた時のアニメーション再生はLottie-webを使用しました。

![](/public/posts/like-button/architecture.jpg)

コメントはNGワードによるフィルタリングを行い、加えて不適切なコメントは管理者画面で削除することが可能です。~(ただし一度流れ始めたコメントは非表示にできない)~


# 情報科発表会2022の様子
当日は最大20台の同時接続があり、3,967回のいいねと200個のコメントがスクリーンに流れました。

![](/public/posts/like-button/thumbnail.jpg)
![](/public/posts/like-button/comment-photo.jpg)


# リンク
- 完成サイト（いいね・コメントは反映されません）  
  https://yamabuki-like-button.web.app/
- GitHub  
  https://github.com/sakusaku3939/like-button


# 使用技術
言語 ・・・ HTML, CSS, JavaScript
フレームワーク、ライブラリ ・・・ Vue.js, Lottie, Firebase
ツール ・・・ Adobe XD