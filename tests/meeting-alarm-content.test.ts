import assert from "node:assert/strict";
import test from "node:test";
import { introductionContent, privacyContent, fetchMeetingAlarmSource } from "../src/lib/meetingAlarmContent";

test("introduction preserves source content and makes privacy link local", () => {
  const content = introductionContent('<title>ミーティングアラーム</title><meta name="description" content="説明"><main><h1>紹介</h1><a href="privacy.html">ポリシー</a><a href="https://github.com/sakusaku3939/meeting-alarm-app">ソースコード</a><a href="https://docs.google.com/forms/test">問い合わせ</a></main>');
  assert.equal(content.title, "ミーティングアラーム");
  assert.equal(content.description, "説明");
  assert.ok(content.html.includes('href="/meeting-alarm/privacy"'));
  assert.ok(content.html.includes('href="https://docs.google.com/forms/test"'));
  assert.ok(!content.html.includes('href="https://github.com/sakusaku3939/meeting-alarm-app"'));
  assert.throws(() => introductionContent("<main>Incomplete source</main>"));
});

test("policy preserves the published body without maintaining a second renderer", () => {
  const body = '<h1>プライバシーポリシー</h1><h2>1. 情報</h2><p>&lt;script&gt; &amp; &quot;text&quot;<br><a href="https://example.com/?a=1&amp;b=2">リンク</a></p>';
  const content = privacyContent(`<title>ミーティングアラーム プライバシーポリシー</title><main>${body}</main>`);
  assert.equal(content.html, body);
  assert.throws(() => privacyContent(""));
  assert.throws(() => privacyContent("<title>ミーティングアラーム</title><main>紹介</main>"));
});

test("source failure is propagated so regeneration cannot replace a valid page with empty content", async (context) => {
  context.mock.method(globalThis, "fetch", async () => new Response("unavailable", { status: 503 }));
  await assert.rejects(fetchMeetingAlarmSource("index.html"), /HTTP 503/);
});
