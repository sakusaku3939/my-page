---
title: 生徒証バーコード
tag: Android / iOS, Cordova, JavaScript
overview: 学校の伝言システムで使用できる生徒証バーコード表示アプリ
date: 2022.2.28
---

学校に設置されている伝言システム(図1) で先生からの伝言を確認したいときに、生徒証を毎回取り出すのが手間だったため、 生徒証についているバーコードをスマホアプリ化しました。
バーコード登録は「カメラ読み取り」「生徒番号の入力」の両方に対応しており、次回からはスキップできます。

バーコードは「縦向き」「横向き」に切り替えることが可能で、表示サイズも自由に変更可能です。

![](/public/posts/yamabuki-barcode/poster.png)

▼ 学校に設置されている伝言システム(図1)
![](/public/posts/yamabuki-barcode/message-system.jpg)


# 使用技術
言語 ・・・ JavaScript
フレームワーク、ライブラリ ・・・ Cordova (Monaca), Onsen UI, JsBarcode, PhoneGap BarcodeScanner
ツール ・・・ Monaca Cloud IDE