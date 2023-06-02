---
title: BWW New HP
tag: HTML / CSS / JavaScript, Adobe XD, BWW
overview: ロボット大会チーム「BWW」の公式ホームページ
date: 2020.10.15
---

自分が所属しているロボコンチーム「BWW」の新ホームページを1から制作しました。
旧ホームページはGoogle Sitesと呼ばれるSaaSサービスを使用していましたが、モバイル時のデザイン崩れやSEO対策が出来ないこと、カスタマイズ性など欠点があったため作り直しました。
https://bww8231.fuji3.info

![](/public/posts/bww-new-hp/home.png)
![](/public/posts/bww-new-hp/frc.png)


# 技術面
ホスティングサービスには表示速度や維持費の観点から静的サイトであるGitHub Pagesを採用し、HTML, CSS, JavaScriptのみを使用して制作しました。

ページ速度改善のために、画像の遅延読み込みやWebP画像の切り替え処理実装といった対策を行いました。 画像の遅延読み込みには標準実装のObserver APIを使用し、独自実装によって外部との通信量を抑えました。
# @row /posts/bww-new-hp/speed1.png /posts/bww-new-hp/speed2.png
# @br3

デザインはプロトタイピングツールのAdobe XDを使用して作成しました。
![](/public/posts/bww-new-hp/mockup.png)


# その他
ホームページでも使われている2つの動画は自分が制作しました。

# @youtube j4t0hAsJ-mU
# @youtube hfJ194l3SEw

# リンク
- 完成サイト  
https://bww8231.fuji3.info
- GitHub  
https://github.com/frcbww/Website


# 使用技術
言語・・・HTML, CSS, JavaScript
フレームワーク、ライブラリ・・・Anime.js, Modernizr
ツール・・・GitHub Pages, Adobe XD