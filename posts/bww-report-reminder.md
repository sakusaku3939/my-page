---
title: 活動報告リマインダー
tag: Google Apps Script, Slack, BWW, bot
overview: 活動日に活動報告を忘れないよう通知してくれるSlackボット
date: 2020.12.26
---

ロボコンチームの活動日に毎回行う活動報告を忘れてしまうことが多かったため、TimeTreeから活動日の日程を取得し、参加者からランダムで一人選んでSlackから通知するシステムを作りました。
![](/public/posts/bww-report-reminder/output.gif)

今回、リマインダー機能を追加するために、Google Apps Script（GAS）を採用しました。
活動日の取得にはTimeTree APIを使用しました。

# スクリーンショット
![](/public/posts/bww-report-reminder/screenshots.png)

# 使用技術
言語 ・・・ Google Apps Script（GAS）
フレームワーク、ライブラリ ・・・ TimeTree API
ツール ・・・ Slack, TimeTree