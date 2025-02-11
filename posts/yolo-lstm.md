---
title: YoloLSTM
tag: 機械学習, ACM MobiSys Demo, IPSJ UBI, Flutter
overview: 一般物体検出とLSTMを用いた画像に基づく屋内位置推定
date: 2024.6.7
---

一般物体検出とCNNおよびLSTMを組み合わせることで、物体の特徴や数に着目した自己位置推定モデルを構築しました。
大学の研究室で7800枚撮影したデータセットで実験を行った結果、提案手法は、同じ層数を持つ全体画像を入力としたCNNモデルと比較して、14.4%高い精度を達成することが明らかになりました。

![](/public/posts/yolo-lstm/system-overview.png)
# br-24px


# 背景と手法
近年、スマートフォンが普及する中で、GPSを主軸としたナビゲーションシステムが広く利用されています。 しかし、駅構内やビルなどの屋内では、GPSの精度が低下する問題があります。

先行研究として、CNNをベースとした手法が数多くありますが、画像全体から畳み込みを行うため、同じ物体が多く存在する室内環境において精度が低下しやすい課題が挙げられます。

そこで、本研究では一般物体検出のYOLOv8を用いて検出した物体をクロップし、それに対してCNNを用いて特徴抽出を行うことで、物体単位での特徴を考慮できる位置推定モデルを提案しました。また、画像によって写る物体の数が変わるため、LSTMによって各物体の特徴を統合することで実現しています。

# speaker-deck 54863c6a6d0343a48265cef2a8b9c02d


# 発表
2024年5月に情報処理学会 第82回UBI研究会にて口頭発表を行いました。(左下は屋久島で名物の亀の手)

- [【発表】 学部2年 青木君が研究内容を情報処理学会第82回UBI研究会で発表しました – “一般物体検出とLSTMを用いた画像に基づく屋内位置推定” | Nakazawa and Okoshi Lab.](https://www.jn.sfc.keio.ac.jp/%e3%80%90%e7%99%ba%e8%a1%a8%e3%80%91%e5%ad%a6%e9%83%a82%e5%b9%b4-%e9%9d%92%e6%9c%a8%e5%90%9b%e3%81%8c%e7%a0%94%e7%a9%b6%e5%86%85%e5%ae%b9%e3%82%92%e6%83%85%e5%a0%b1%e5%87%a6%e7%90%86%e5%ad%a6%e4%bc%9a/?utm_campaign=shareaholic&utm_medium=copy_link&utm_source=bookmark)
- 論文URL： [id.nii.ac.jp/1001/00233750/](http://id.nii.ac.jp/1001/00233750/)
# br-24px

# three-row 21.91 /posts/yolo-lstm/ubi1.jpg /posts/yolo-lstm/ubi2.jpg /posts/yolo-lstm/ubi3.jpg
# br-32px

また、翌月の6月に国際会議 ACM MobiSys'24 のDemo sessionにおいて、デモ発表を行いました。
Demo sessionでは、本研究のモデルを用いて写真から研究室の屋内位置を推定してマップに表示するFlutterアプリケーション開発を行い、ポスター英語発表と併せて動かしました。

- 論文URL： [doi.org/10.1145/3643832.3661836](https://dl.acm.org/doi/10.1145/3643832.3661836)
# br-24px

# three-row 21.91 /posts/yolo-lstm/mobisys1.jpg /posts/yolo-lstm/mobisys2.jpg /posts/yolo-lstm/mobisys3.jpg
# br-24px

<video src="/posts/yolo-lstm/demo-video.mp4" width=300 controls autoplay muted></video>


# リンク
- 論文 (Open Access版)  
  https://sakusaku3939.com/db/3643832.3661836
- 論文コード (GitHub)  
  https://github.com/sakusaku3939/YoloLSTM
- デモアプリ (GitHub)  
  https://github.com/sakusaku3939/localization-app

# 使用技術
言語 ・・・ Python, (Dart)
フレームワーク、ライブラリ ・・・ PyTorch, YOLOv8, (Flutter)
