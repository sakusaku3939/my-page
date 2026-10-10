# ミーティングアラームの公開ページ

- 紹介: https://sakusaku3939.com/meeting-alarm
- プライバシーポリシー: https://sakusaku3939.com/meeting-alarm/privacy

原本は `sakusaku3939/meeting-alarm-app` の main ブランチにある `docs/index.html` と `app/src/main/res/raw/privacy_policy.txt`。アプリ側の `privacy-pages.yml` が原本から生成・公開した GitHub Pages の `index.html` と `privacy.html` を、このサイトのサーバーが取得する。アプリのリポジトリは非公開のため、認証不要で取得できる公開成果物を利用する。

本文は公開HTMLの `main` 要素を使う。紹介内のプライバシーポリシーへのリンクをこのサイトのURLに置き換え、一般の閲覧者が開けない非公開リポジトリへのリンクを除く。ポリシーの本文はそのまま表示する。このサイトに本文のコピーや別のポリシー生成処理は持たせない。GitHub PagesをテキストAPIに作り替える必要もない。

Next.jsのビルド時に取得して静的生成する。原本変更後は、まずアプリ側のGitHub Pages公開が成功する必要がある。公開後はISRを使い、最後の生成から1時間以上経過した後のアクセスをきっかけに再取得・再生成する。最初のアクセスには既存のページを返し、生成成功後のアクセスから更新される。定刻実行ではなく、更新から正確に1時間以内の反映を保証するものでもない。

再取得に失敗した場合は例外を返し、Next.jsが最後に生成したページを維持する。初回ビルドでは公開成果物を取得できなければビルドを失敗させる。ブラウザからGitHubへの取得やAPIキー、追加のデプロイ用シークレットは不要。

Google OAuthでは、公開後にホームページ・ポリシーのURLと承認済みドメイン `sakusaku3939.com` を登録し、所有確認済みのGoogleアカウントでブランド検証を行う。ホスティングにはISR対応のNext.js実行環境が必要（既存のVercel構成を利用）。

検証: `node --import tsx --test tests/meeting-alarm-content.test.ts`、`npx tsc --noEmit`、`npm run build`。
