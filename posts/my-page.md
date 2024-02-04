---
title: my-page
tag: TypeScript, Next.js, Vercel
overview: Markdownを用いたブログ記事管理、自分用のプロフィールサイト
date: 2023.6.4
---

自分用のオリジナルプロフィールサイトをNext.js + Vercelを使用して構築しました。
記事管理ページには、Markdownを利用したカスタムCMSが組み込まれており、カテゴリー別のフィルタリング検索が可能です。
https://sakusaku3939.com/

![](/public/posts/my-page/screenshot1.png)
# @br-4px
![](/public/posts/my-page/screenshot2.png)

# 技術面など
記事のコンテンツはMarkdown形式で記述され、GitHubを通じて管理されています。標準的なMarkdownでは対応していない、画像の横並び表示やiframe埋め込みなどの機能は、h1タグのパーサーをカスタマイズすることで実現しています。
ページ描画には、Next.jsの静的サイト生成（SSG）の技術を使用しました。ビルド時にページが描画されることで、高速な静的ファイルとして提供されています。

![](/public/posts/my-page/screenshot3.png)

# リンク
- 完成サイト  
  https://sakusaku3939.com/  
  https://sakusaku3939.com/profile  
  https://sakusaku3939.com/posts
- GitHub  
  https://github.com/sakusaku3939/my-page


# 使用技術
言語 ・・・ TypeScript
フレームワーク、ライブラリ ・・・ Next.js, react-markdown, remark-gfm
バックエンド ・・・ Vercel