---
title: TKG Beacon
tag: Android, Kotlin, AltBeacon, Firebase
overview: ビーコンを利用した、生徒と先生の位置情報共有Androidアプリ
date: 2021.2.18
---

ビーコンを活用した、学校内の位置共有アプリ「TKG Beacon」です。教室一つ一つにビーコンを置き、そのビーコンのIDをアプリが取得することで、位置を把握する仕組みになっています。
学校に滞在する先生に用がある時に、どの教室にいるかが一目でわかります。

# @row /posts/tkg-beacon/video1.gif /posts/tkg-beacon/video2.gif /posts/tkg-beacon/video3.gif /posts/tkg-beacon/video4.gif

初回起動時はログイン画面とパーミッション確認があり、ログイン画面ではUXの向上などの観点から、パスワードレス認証であるマジックリンクを採用しました。
この認証方法では、登録されたメールアドレス宛に1回限り使えるログイン用の認証リンクを送り、それをクリックすることでログインできます。

# @row /posts/tkg-beacon/onbording1.gif /posts/tkg-beacon/onbording2.png /posts/tkg-beacon/onbording3.png /posts/tkg-beacon/onbording4.png


# 発表資料
# @speaker-deck 70cd51a1ddba4f40bfc002267c31fd31


# 技術面など
Androidアプリの開発にはKotlin、バックエンドはFirebaseを使用しました。
教室に設置したビーコン情報の検知には、AltBeaconライブラリを使用し、Appleが規格したBLE（Bluetooth Low Energy）のiBeaconのみに対応しました。

ビーコンには主に、Major（階数）とMiner（同一階のID）とUUID（教室名などと紐付け）の3つのデータを設定しており、フォアグラウンドで取得したデータを、定期的にRealtime Database上に送信することで、リアルタイムに位置情報を反映することができます。

![](/public/posts/tkg-beacon/beacon.png)

ユーザー情報やプロフィール画像は、FirestoreやCloud Storage内に保存しました。
また、Firebase Authenticationを使用して、SlackやMediumで採用されているメールリンク認証（パスワードレス認証）を実現しました。 メールアドレスを入力して、その受信ボックス宛に送られてきたURLをクリックすることで認証が完了します。

![](/public/posts/tkg-beacon/architecture.png)


# リンク
- リリース版（Android）
https://github.com/sakusaku3939/Beacon/releases

- GitHub
https://github.com/sakusaku3939/Beacon


# 使用技術
言語 ・・・ Kotlin
フレームワーク、ライブラリ ・・・ AltBeacon, Coil, uCrop
バックエンド ・・・ Firebase Auth, Realtime Database, Cloud Firestore, Cloud Storage
ツール ・・・ Adobe XD