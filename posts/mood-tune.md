---
title: MoodTune
tag: Python, 機械学習, Next.js, TypeScript
overview: 環境音からSpotifyの音楽を推薦してくれるAIアプリ
date: 2024.3.24
---

ユーザーの周りの環境音に合わせて、Spotifyから最適な音楽を推薦するWebアプリです。
気分を高めたり、リラックスさせたりするのに適した曲を、AIが状況に応じて見つけ出してくれます。これにより、ユーザーはどのような時でも、自分の感情や活動にマッチした音楽体験を楽しむことができます。

<video width=300 src="/posts/mood-tune/video.mp4" controls></video>


# 東京AI祭2024 ハッカソン
書類審査とセミファイナルを通過し、ファイナルデモデーで発表を行いました。
本プロダクトは中澤大越研の学部生メンバー4人で共同開発しました。（フロントエンド＆発表を担当）
# @speaker-deck e73cc90d859a458189e3e55958039391
# @br-4px
# @row /posts/mood-tune/photo1.png /posts/mood-tune/photo2.png


# 技術面
フロントエンドはNext.jsとSpotify Web APIを用いて、Spotifyのログインと環境音の録音機能を実装しました。また、Spotify Playback SDKを使用して、推薦される楽曲の再生を行っています。
バックエンドは、FastAPIとscikit-learnを使用しました。 AIモデルは、事前学習モデルのYAMNetを採用し、楽曲を521種類の音声イベントの特徴量に変換します。そして、ランダムフォレストを使用して、Spotify APIから取得した音楽パラメータ（danceability, energy, valence）を予測しています。

![](/public/posts/mood-tune/model.jpg)


# リンク
- 開発メンバー  
  [@odango-IT](https://github.com/odango-IT),  [@yusei399](https://github.com/yusei399),  [@hiyon](https://github.com/hiyon)
- GitHub  
  https://github.com/yusei399/CryptoAIHackathon  
  https://github.com/yusei399/CryptoAIHackathon_backend

# 使用技術
言語 ・・・ TypeScript,  Python
フロントエンド ・・・ Next.js,  Spotify Web API,  Spotify Playback SDK
バックエンド ・・・ FastAPI,  scikit-learn,  YAMNet
