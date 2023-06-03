---
title: COVID-19 bot
tag: JavaScript, Slack, bot
overview: 新型コロナウイルスに関する情報を取得してくれるSlackボット
date: 2020.7.13
---

昨今新型コロナウイルスが流行していることから、COVID-19に関する情報を取得してくれる対話式のチャットボットを作りました。ボットはチャットツールのSlackで動作させることが出来ます。
感染者数データは [COVID-19 Japan](https://www.stopcovid19.jp/) より拝借しました。

![](/public/posts/covid-19/output.gif)

# 使用方法
covid19 の後に続くコマンドを打つことで情報を取得出来ます。
現時点では全国の感染者数、都道府県別の感染者数の取得に対応しています。

```
covid19              - covid19の使用方法を表示
covid19 全国         - 全国の感染者数を表示
covid19 (都道府県名)  - 指定した都道府県の累計陽性者数を表示
```

# リンク
- GitHub  
  https://github.com/sakusaku3939/covid19

# 使用技術
フレームワーク、ライブラリ ・・・ Node.js, Hubot
ジェネレーター・・・Yeoman, generator-hubot
ツール ・・・ Slack, HerokuCLI, Vagrant, VirtualBox
