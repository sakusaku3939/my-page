---
title: ボイスチャンネル移動bot
tag: TypeScript, Discord, bot
overview: 複数のユーザーを指定してボイスチャンネルを移動できるDiscordボット
date: 2023.1.25
---

ユーザーを指定してボイスチャンネルを移動することができるDiscordボットです。
複数ユーザーやチャンネルごとの移動にも対応しています。
[→ Discordに追加する](https://discord.com/api/oauth2/authorize?client_id=1044007415680598068&permissions=2164262912&scope=bot%20applications.commands)

![](/public/posts/discord-vc/video.gif)
# br-16px

bot用サーバーにはGlitchを使用しました。スリープ回避のためにGoogle App Scriptによって定期実行を行っています。

# リンク
- GitHub  
  https://github.com/sakusaku3939/discord-vc-bot


# 使用技術
言語 ・・・ TypeScript
フレームワーク、ライブラリ ・・・ Discord.js
バックエンド ・・・ Glitch, Google App Script