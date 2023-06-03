---
title: 生徒証バーコード
tag: Android / iOS, Cordova, JavaScript
overview: 学校の伝言システムで使用できる生徒証バーコード表示アプリ
date: 2022.2.28
---

学校に設置されている伝言システムで先生からの伝言を確認するために、生徒証についているバーコードをスマホアプリ化しました。
「縦向き」「横向き」に切り替えたり、サイズを自由に変更することが可能です。

生徒証のバーコード登録は「カメラ読み取り」「生徒番号の入力」の2つの方式に対応しています。

![](/public/posts/yamabuki-barcode/poster.png)

▼ 学校に設置されている伝言システム
![](/public/posts/yamabuki-barcode/message-system.jpg)


# 使用技術
言語 ・・・ JavaScript
フレームワーク、ライブラリ ・・・ Cordova (Monaca), Onsen UI, JsBarcode, PhoneGap BarcodeScanner
ツール ・・・ Monaca Cloud IDE