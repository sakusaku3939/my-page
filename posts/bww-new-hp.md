---
title: BWW New HP
tag: HTML / CSS / JavaScript, BWW
overview: 高1~高3の間に参加していたFRCロボコンチーム「BWW」の公式ホームページ
date: 2020.10.15
---

高1~高3の間に所属していたFRCロボコンチームの新ホームページをHTML, CSS, JavaScriptを使用して1から制作しました。
https://frcbww.github.io/Website/

![](/public/posts/bww-new-hp/home.png)
# br-4px
![](/public/posts/bww-new-hp/frc.png)


# 技術面
ホスティングサービスには表示速度や維持費の観点から静的サイトであるGitHub Pagesを採用し、HTML, CSS, JavaScriptのみを直接使用して制作しました。

ページ速度改善のために、画像の遅延読み込みやWebP画像の切り替え処理実装といった対策を行いました。 画像の遅延読み込みには標準実装のObserver APIを使用し、独自実装によって外部との通信量を抑えました。
# row /posts/bww-new-hp/speed1.png /posts/bww-new-hp/speed2.png
# br-16px

デザインはプロトタイピングツールのAdobe XDを使用して作成しました。
![](/public/posts/bww-new-hp/mockup.png)


# おまけ
ホームページで使われている2つの動画を制作しました。PowerDirectorとFilmoraで編集しています。

# youtube j4t0hAsJ-mU
# youtube hfJ194l3SEw

# リンク
- 完成サイト  
https://frcbww.github.io/Website/
- GitHub  
https://github.com/frcbww/Website


# 使用技術
言語 ・・・ HTML, CSS, JavaScript
フレームワーク、ライブラリ ・・・ Anime.js, Modernizr
ツール ・・・ GitHub Pages, Adobe XD