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
記事はMarkdown形式のファイルベースで管理されています。標準的なMarkdownでは対応していない、画像の横並び表示やiframe埋め込みなどの機能は、一部のタグのパース処理をカスタマイズすることで実現しています。

![](/public/posts/my-page/screenshot3.png)
# br-24px

制作物ページとブログは、SSG（Static Site Generation）を使用してビルド時に静的HTMLを生成し、表示を高速化しています。
また、制作物ページのサムネイル画像や記事内の画像は、ビルド時に低解像度のブラー画像を自動生成し、読み込み完了後に高解像度の画像へ切り替える仕組みを導入しています。

ページ遷移を検知したら、遷移先の画面のプレースホルダーを即座に表示することで、画面が瞬時に切り替わったように見せ、遷移の待ち時間を感じさせないUXを実現しています。

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