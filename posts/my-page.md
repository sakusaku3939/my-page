---
title: My Page
tag: TypeScript, Next.js, Vercel
overview: 自分用のオリジナルWebサイト
date: 2023.6.4
---

自分用のオリジナルプロフィールサイトです。Next.js + Vercel の構成で制作しました。
ポートフォリオページは、Markdownを使用した自作CMSを作成しました。カテゴリー別にフィルター検索が可能です。
https://sakusaku3939.com/

![](/public/posts/my-page/screenshot1.png)

![](/public/posts/my-page/screenshot2.png)

![](/public/posts/my-page/screenshot3.png)


# 技術面など
Next.jsのビルド時にレンダリングを行い、ページを静的ファイルとして描画して生成する、SSG（静的サイト生成）を使用することで、高速なページを作成しました。 ポートフォリオ用の記事は全てMarkdownファイルでGitHub上に管理しています。
画像の横並びやiframeなどの対応していないタグは、h1タグのパーサーをカスタマイズすることで、疑似的に実現しています。

# リンク
- 完成サイト  
  https://sakusaku3939.com/  
  https://sakusaku3939.com/posts
- GitHub  
  https://github.com/sakusaku3939/my-page


# 使用技術
言語 ・・・ TypeScript, HTML, CSS
フレームワーク、ライブラリ ・・・ Next.js, react-markdown, remark-gfm
バックエンド ・・・ Vercel