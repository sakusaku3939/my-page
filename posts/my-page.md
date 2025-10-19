---
title: プロフィールサイト
tag: TypeScript, Next.js, Vercel
overview: Markdownを用いた自作CMS、自分用のプロフィールサイト
date: 2023.6.4
---

自分用のオリジナルプロフィールサイトをNext.js + Vercelを使用して構築しました。
記事管理ページには、Markdownを利用したカスタムCMSが組み込まれており、カテゴリー別のフィルタリング検索が可能です。

![](/public/posts/my-page/screenshot1.png)
# br-4px
![](/public/posts/my-page/screenshot2.png)

# 技術面など
記事のコンテンツはMarkdown形式で記述され、GitHubを通じて管理されています。標準的なMarkdownでは対応していない、画像の横並び表示やiframe埋め込みなどの機能は、h1タグのパーサーをカスタマイズすることで実現しています。

![](/public/posts/my-page/screenshot3.png)
# br-24px

投稿一覧はインメモリキャッシュを採用し、初回の表示以降は高速に表示されるように最適化しています。
また、サムネイル画像や記事内の画像は、ビルド時に低解像度のブラー画像を生成しておき、読み込み完了後に高解像度の画像へ切り替える仕組みを導入しています。

文字やコンテンツにはプレースホルダーを表示することで、読み込み時UXの向上を図っています。

![](/public/posts/my-page/screenshot4.png)
# br-24px


# リンク
- 完成サイト  
  https://sakusaku3939.com/
- GitHub  
  https://github.com/sakusaku3939/my-page


# 使用技術
言語 ・・・ TypeScript
フレームワーク、ライブラリ ・・・ Next.js, react-markdown, remark-gfm
バックエンド ・・・ Vercel