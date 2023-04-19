---
title: TKG Beacon
tag: Android, Kotlin, AltBeacon, Firebase
overview: ビーコンを利用した、生徒と先生の位置情報共有Androidアプリ
date: 2021.2.18
---

ビーコンを活用した、学校内の位置共有アプリ「TKG Beacon」です。教室一つ一つにビーコンを置き、そのビーコンのIDをアプリが取得することで、位置を把握する仕組みになっています。
学校に滞在していて先生に用がある時に、どの教室にいるかが一目でわかります。



# 技術面など
Androidアプリの開発にはKotlin、バックエンドはFirebaseを使用しました。
教室に設置したビーコン情報の検知には、AltBeaconライブラリを使用し、Appleが規格したBLE（Bluetooth Low Energy）のiBeaconのみに対応しました。

ビーコンには主に、Major（階数）とMiner（同一階のID）とUUID（教室名などと紐付け）の3つのデータを設定しており、フォアグラウンドで取得したデータを、定期的にRealtime Database上に送信することで、リアルタイムに位置情報を反映することができます。
