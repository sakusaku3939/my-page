---
title: AI秘書
tag: AIエージェント, Claude Code, Codex, Slack
overview: Slackから呼び出して開発や研究を任せられる自作AIエージェント
date: 2026.4.6
---

Slack で bot にメンションすると、AIエージェントが作業してスレッドに返信する個人用のAI秘書を作りました。
アプリのバグ調査や実装、研究の実験などを、チャンネルごとに専用skillを持つエージェントに、スマホからもPCからも依頼できます。

![](/public/posts/ai-secretary/slack-channels.png)
# br-24px


# 仕組み
Slack のメンションは AWS Lambda で受け取って署名を検証し、SQS に積みます。キューは自宅の Mac mini 上の worker が読み取り、Claude Code または Codex を起動して結果をスレッドに返す仕組みです。

![](/public/posts/ai-secretary/slack-thread.png)
# br-24px

技術関連の作業や研究、スライド作成など、さまざまな用途に対応する60以上のSkills（SKILL.md）をGitHubで一元管理しています。
Slackチャンネルごとに使用するSkillsと作業リポジトリを設定ファイルで指定し、用途に応じて切り替わる仕様になっています。

また、必要なSkillsをローカルPCの所定のディレクトリ（`.claude/skills/`、`.agents/skills/`）にダウンロードして配置できるため、GitHubリポジトリでSkillsを一元管理し、複数のPCで共通のSkillsを利用できます。


# 研究の自動化
仮説を立てるところから考察をまとめるところまでを自動で回しています。

各仮説と実験は GitHub の Issue と PR で管理し、PR に付けるラベルでステートマシン風に状態を表します。
ラベルが付くと GitHub Actions が呼び出され、Slackメッセージとして自分自身をメンションして次の作業内容を送ることでSKillsが発火し、自動で次のフローに進みます。

1日の流れは次のようになっています。

- 毎朝9時に、最新の論文と過去の実験記録から仮説を立てて Issue を作る（17時と23時にも、考察済みの実験から次の改善案を作る）
- AI が実装して PR を作成し、`training-queued` を付けて学習待ちにする
- 研究室の GPUサーバーが空いたら学習を開始（GPU 4枚を2組に分け、2つの PR まで同時に実行）
- 失敗したらエラー内容から AI が修正し、キューに戻す
- 学習が終わったら追加の検証を行い、考察を PR にまとめて `analyzed` を付ける
# br-24px

# two-row 45.1 /posts/ai-secretary/research-slack.jpg /posts/ai-secretary/research-issue.jpg
# br-4px
# two-row 68.03 /posts/ai-secretary/research-prs.jpg /posts/ai-secretary/research-review.jpg
# br-24px

2026年4月から11月までの成果は以下のとおりです。

- PR： 約1,200件（うち実験の PR は約820件）
- 考察まで終わった実験： 約430件
- 研究タスクの目標精度を 72.06% → 81.29% まで改善
# br-8px

仮説が外れた実験も考察としてドキュメントに残すため、次の仮説を立てるときの材料になっています。

この実験結果の一部は、[Ref-YOLO-World](https://github.com/sakusaku3939/Ref-YOLO-World/) として国際会議 WACV 2027（採択率: 33.7%）に論文が採択されました。

# モデルに依存しないAIエージェント
Claude Code と Codex CLI は、出力形式やセッション継続の方法がそれぞれ異なります。そこで AI エージェント本体がこの違いに依存しないよう、LLMアダプタという層で各 CLI の出力を共通のイベントに変換しました。使う LLM は一言で切り替えられます。

![](/public/posts/ai-secretary/llm-adapter.png)
# br-24px

アーキテクチャ設計とテスト戦略についての詳細は、Zenn の記事「[特定モデルに依存しないAIエージェントの設計: Clean Architectureとテスト戦略](https://zenn.dev/aokiti/articles/00cd9eb7afd400)」にまとめています。


# リンク
- 特定モデルに依存しないAIエージェントの設計: Clean Architectureとテスト戦略 - Zenn  
  https://zenn.dev/aokiti/articles/00cd9eb7afd400
