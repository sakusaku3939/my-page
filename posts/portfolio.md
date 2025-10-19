---
title: 旧Portfolio
tag: HTML / CSS / JavaScript, PHP, Google Cloud
overview: 自分用のオリジナルポートフォリオサイト
date: 2020.7.6
---

HTML,CSS,PHPで作った自作CMSに、メールフォームを実装した個人ポートフォリオサイトです。
ReactやVueといったフレームワークを使用せず、JavaScriptのHistory APIを利用してページ遷移を伴わないSPAを自作しました。

PHP側では、`posts/`ディレクトリ内の各HTMLファイルを走査し、タイトル・概要・タグ・画像パスなどのメタ情報を抽出してJSON化しています。
このJSONデータをJavaScript側に渡すことで、記事データを動的に読み込めるようにしています。

![](/public/posts/portfolio/screenshot1.png)

# br-4px

![](/public/posts/portfolio/screenshot2.png)

# リンク

- 完成サイト（現在停止中）  
  https://portfolio.sakusaku3939.com
- GitHub  
  https://github.com/sakusaku3939/Portfolio

# 使用技術

言語 ・・・ HTML, CSS, JavaScript, PHP
フレームワーク、ライブラリ ・・・ jQuery, SweetAlert, PACE, PHPMailer
バックエンド ・・・ Google Cloud Platform（2022年にHerokuから移行）