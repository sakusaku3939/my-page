---
title: OSS版 DeepL翻訳アプリ
tag: Android, Kotlin, OSS
overview: 非公式のDeepL翻訳サードパーティアプリ開発とOSSプロジェクト運営
date: 2020.8.1
pinned: true
---

2020年の当時、DeepL公式のAndroidアプリが無く、わざわざブラウザからアクセスする必要がありました。そこで、WebViewとJavaScriptを使用して、シンプルなDeepL翻訳サードパーティアプリを開発しました。

アプリをOSS化したところ大きな反響があり、2025年1月時点で <a href="https://github.com/sakusaku3939/DeepLAndroid/issues?q=is%3Aissue+is%3Aclosed" target="_blank">68個の解決済みIssues</a> と <a href="https://github.com/sakusaku3939/DeepLAndroid/pulls?q=is%3Apr+is%3Aclosed" target="_blank">48個のPull requests</a> がマージされました。
アプリ自体の言語は英語・日本語に加え、コントリビューターにより計11ヶ国語に対応しています。

また、OSS専用アプリストアのF-Droidにリリースを行い、現在も公開されています。
https://github.com/sakusaku3939/DeepLAndroid

![](/public/posts/deepl-android/screenshot.png)

# 機能一覧
WebViewを使用し、必要な要素以外はJavaScriptで隠すことでネイティブアプリ風にしています。 単純な仕組みのためAPIを使用することなく、ユーザー登録や追加の設定無しでアプリを利用することができます。

| 翻訳画面のみをWebViewで表示                                | 選択メニューからDeepLアプリを起動                               | 設定画面 (ダークモードへの切り替え)                                 |
|--------------------------------------------------|---------------------------------------------------|-----------------------------------------------------|
| ![](/public/posts/deepl-android/main-screen.png) | ![](/public/posts/deepl-android/context-menu.gif) | ![](/public/posts/deepl-android/setting-screen.png) |

# リンク
- リリース版 (F-Droid)  
https://f-droid.org/packages/com.example.deeplviewer
- リリース版 (GitHub)  
https://github.com/sakusaku3939/DeepLAndroid/releases
- GitHub  
https://github.com/sakusaku3939/DeepLAndroid

# GitHub
- 選択メニューからDeepLアプリを起動
  - Pull Requests: [#25](https://github.com/sakusaku3939/DeepLAndroid/pull/25), [#40](https://github.com/sakusaku3939/DeepLAndroid/pull/40), [#57](https://github.com/sakusaku3939/DeepLAndroid/pull/57), [#62](https://github.com/sakusaku3939/DeepLAndroid/issues/62), [#67](https://github.com/sakusaku3939/DeepLAndroid/pull/67)
  - 議論・バグ修正: [#1](https://github.com/sakusaku3939/DeepLAndroid/issues/1), [#5](https://github.com/sakusaku3939/DeepLAndroid/issues/5), [#6](https://github.com/sakusaku3939/DeepLAndroid/issues/6), [#24](https://github.com/sakusaku3939/DeepLAndroid/issues/24), [#51](https://github.com/sakusaku3939/DeepLAndroid/issues/51), [#59](https://github.com/sakusaku3939/DeepLAndroid/issues/59), [#60](https://github.com/sakusaku3939/DeepLAndroid/issues/60), [#62](https://github.com/sakusaku3939/DeepLAndroid/issues/62), [#64](https://github.com/sakusaku3939/DeepLAndroid/issues/60), [#69](https://github.com/sakusaku3939/DeepLAndroid/issues/69)
# br-16px

- 設定画面・ダークモードへの切り替え
  - Pull Requests: [#28](https://github.com/sakusaku3939/DeepLAndroid/pull/28), [#30](https://github.com/sakusaku3939/DeepLAndroid/pull/30), [#37](https://github.com/sakusaku3939/DeepLAndroid/pull/37)
  - 議論・バグ修正: [#17](https://github.com/sakusaku3939/DeepLAndroid/issues/17), [#33](https://github.com/sakusaku3939/DeepLAndroid/issues/33), [#34](https://github.com/sakusaku3939/DeepLAndroid/issues/34), [#38](https://github.com/sakusaku3939/DeepLAndroid/issues/38), [#55](https://github.com/sakusaku3939/DeepLAndroid/issues/55), [#99](https://github.com/sakusaku3939/DeepLAndroid/issues/99)
# br-16px

- JavaScript関連
  - Pull Requests: [#2](https://github.com/sakusaku3939/DeepLAndroid/pull/2), [#35](https://github.com/sakusaku3939/DeepLAndroid/pull/35), [#36](https://github.com/sakusaku3939/DeepLAndroid/pull/36)
  - 議論・バグ修正: [#19](https://github.com/sakusaku3939/DeepLAndroid/issues/19), [#23](https://github.com/sakusaku3939/DeepLAndroid/issues/23), [#77](https://github.com/sakusaku3939/DeepLAndroid/issues/77), [#80](https://github.com/sakusaku3939/DeepLAndroid/issues/80), [#90](https://github.com/sakusaku3939/DeepLAndroid/issues/90), [#96](https://github.com/sakusaku3939/DeepLAndroid/issues/96), [#104](https://github.com/sakusaku3939/DeepLAndroid/issues/104), [#111](https://github.com/sakusaku3939/DeepLAndroid/issues/111)

# 使用技術
言語 ・・・ Kotlin, JavaScript
フレームワーク、ライブラリ ・・・ WebView
