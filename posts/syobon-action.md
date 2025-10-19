---
title: しょぼんのアクション Python版
tag: Python, pygame, Excel
overview: ちくさん制作の「しょぼんのアクション」をPythonで１から作り直したもの
date: 2020.5.13
---

昔流行った鬼畜ゲーム「しょぼんのアクション」を１から作り直してリメイクしたものです。 1面で登場する敵・トラップ・ステージのみを再現しました。
Excelからのステージデータ読み取りに対応したため、簡単にステージの自作・改造が出来ます。

# row /posts/syobon-action/syobon1.jpg /posts/syobon-action/syobon2.jpg

# 良くなった点
60fps対応。
Excelからステージデータが読み取れるため、簡単にステージ改造・自作が出来る。
コードを追加・変更することで、簡単に様々な敵や要素を追加可能。

# row /posts/syobon-action/syobon3.jpg /posts/syobon-action/syobon4.jpg

# ステージの改造方法
resフォルダの中にあるステージデータ.xlsxのシート「1-1」を編集することでステージの改造・自作が出来ます。
またステージに要素を追加する場合、それぞれステージデータに割り振られている番号を各セルに記入することで追加出来ます。

![](/public/posts/syobon-action/syobon-making.gif)

# (2025.2.21) しょぼんのアクション強化学習
Python版しょぼんのアクションを強化学習で実行する環境を作成してみました。PPO (Proximal Policy Optimization)を用いて、しょぼんのアクションをクリアするエージェントを学習できます。

<video src="/posts/syobon-action/rl-early.mp4" controls autoplay muted></video>

↓ 一番うまくいったエピソード
<video src="/posts/syobon-action/rl-umee.mp4" controls autoplay muted></video>

2500エピソードほど学習させてみましたが、報酬設定かモデルの設計が良くないためかゴールまで辿り着くことはできませんでした。（もしうまく直せた方がいればプルリクお待ちしております）
![](/public/posts/syobon-action/rl-rewards.png)

# リンク
- リリース版DL  
  https://github.com/sakusaku3939/SyobonAction/releases
- GitHub  
  https://github.com/sakusaku3939/SyobonAction
- しょぼんのアクション強化学習 (PPOベース)  
  https://github.com/sakusaku3939/SyobonAction/tree/RL-PPO
- ちく制作しょぼんのアクション(原作)DL  
  http://chibicon.net/slink/j062101/

# 使用技術
言語 ・・・ Python
フレームワーク、ライブラリ ・・・ Pygame, Tkinter, xlrd, cx_Freeze, NumPy
ツール ・・・ Excel
