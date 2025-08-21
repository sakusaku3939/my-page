---
title: MoodTune
tag: Python, 機械学習, Next.js, TypeScript
overview: 環境音からSpotifyの音楽を推薦してくれるAIアプリ
date: 2024.3.24
pinned: true
---

ユーザーの周りの環境音に合わせて、Spotifyから最適な音楽を推薦してくれるAIアプリです。
気分を高めたり、リラックスさせたりするのに適した曲を 「環境音」 からAIが状況に応じて見つけ出してくれます。ユーザーは、通勤中、PCで作業中、旅行中、etc といった様々な環境において、自分の感情や活動にマッチした音楽体験を楽しむことができます。

# speaker-deck e73cc90d859a458189e3e55958039391
# br-4px

# 東京AI祭2024 ハッカソン
書類審査とセミファイナルを通過し、ファイナルデモデーで発表を行いました。
本プロダクトは中澤大越研の学部生メンバー4人で共同開発しました。（主に PL ・ フロントエンド ・ デザインを担当）
# row /posts/mood-tune/photo1.png /posts/mood-tune/photo2.png


# 技術
フロントエンドでは Next.js と Spotify Web API を用いて、Spotify のログイン機能や環境音の録音機能を実装しました。さらに Spotify Playback SDK を利用し、推薦された楽曲を再生できるようにしています。

バックエンドは FastAPI と scikit-learn を基盤として構築しました。今回構築したAIモデルで推定した Spotify 音楽パラメータをもとに、最も近い特徴を持つ楽曲IDを Spotify API で検索し、ユーザーに提示できるようにしています。
![](/public/posts/mood-tune/architecture.png)
# br-32px

AIモデルは、環境音から Spotify の音楽パラメータを推定できる仕組みを構築しました。 まず、事前学習済みの YAMNet を利用し、楽曲の波形データを 521 種類の音声イベント（例：雨音、ピアノ、ジャズ）の確率スコアベクトルに変換します。
その後、

- 入力データ： YAMNet から抽出した521種類の音声イベント特徴量
- 教師データ： Spotify API から取得できる音楽パラメータ（例: danceability、energy、valence）
# br-24px

を使って、ランダムフォレスト回帰モデルを訓練し、楽曲から音楽パラメータを予測するモデルを構築します。
この枠組みを応用することで、環境音から抽出した音声イベント特徴量を同じモデルに入力すれば、環境音に対しても Spotify の音楽パラメータを推定できるようになります。
![](/public/posts/mood-tune/model.jpg)

# デモ
<video width=300 src="/posts/mood-tune/video.mp4" controls></video>

# リンク
- 開発メンバー  
  [@odango-IT](https://github.com/odango-IT),  [@yusei399](https://github.com/yusei399),  [@hiyon](https://github.com/hiyon)
- GitHub  
  https://github.com/yusei399/CryptoAIHackathon  
  https://github.com/yusei399/CryptoAIHackathon_backend
- 東京AI祭  
  https://www.aisai.tokyo/

# 使用技術
言語 ・・・ TypeScript,  Python
フロントエンド ・・・ Next.js,  Spotify Web API,  Spotify Playback SDK
バックエンド ・・・ FastAPI,  scikit-learn,  YAMNet
ツール ・・・ Figma