import assert from "node:assert/strict";
import test from "node:test";
import type { NextApiRequest, NextApiResponse } from "next";
import handler from "../src/pages/api/support";
import { parseSupportSubmission } from "../src/lib/supportForm";

const body = { app: "Meeting Alarm", email: "user@example.com", category: "不具合の報告", message: "アラームが鳴りません。", website: "", token: "verified-token" };

test("support input rejects header injection, invalid categories and oversized content", () => {
  assert.ok(parseSupportSubmission(body));
  assert.ok(parseSupportSubmission({ ...body, app: "" }));
  for (const invalid of [null, [], { ...body, email: "a@example.com\r\nBcc: bad@example.com" }, { ...body, app: "a\nb" }, { ...body, category: "bad" }, { ...body, message: "a".repeat(5001) }, { ...body, token: "" }, { ...body, app: 12 }]) {
    assert.equal(parseSupportSubmission(invalid), null);
  }
});

test("support API security, delivery and error handling", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };
  process.env.SUPPORT_ORIGIN = "https://sakusaku3939.com";
  process.env.CLOUDFLARE_ACCOUNT_ID = "a".repeat(32);
  process.env.CLOUDFLARE_EMAIL_API_TOKEN = "test-only";
  process.env.TURNSTILE_SECRET_KEY = "test-only";
  t.after(() => { globalThis.fetch = originalFetch; process.env = originalEnv; });

  let requests: { url: string; body: Record<string, unknown> }[] = [];
  let verification = { success: true, hostname: "sakusaku3939.com", action: "support" };
  let delivery: Record<string, unknown> = { delivered: ["sakusaku3939.777@gmail.com"], queued: [], permanent_bounces: [] };
  globalThis.fetch = (async (url, options) => {
    requests.push({ url: String(url), body: JSON.parse(String(options?.body)) });
    return new Response(JSON.stringify(String(url).includes("siteverify") ? verification : { success: true, result: delivery }), { status: 200 });
  }) as typeof fetch;

  async function request(overrides: Record<string, unknown> = {}, headers: Record<string, string> = {}, method = "POST") {
    let status = 0;
    let result: Record<string, unknown> = {};
    const responseHeaders: Record<string, unknown> = {};
    const res = {
      setHeader(key: string, value: unknown) { responseHeaders[key] = value; return this; },
      status(value: number) { status = value; return this; },
      json(value: Record<string, unknown>) { result = value; return this; },
    };
    await handler({ method, headers: { origin: "https://sakusaku3939.com", "content-type": "application/json", ...headers }, body: { ...body, ...overrides } } as NextApiRequest, res as unknown as NextApiResponse);
    return { status, result, headers: responseHeaders };
  }

  assert.equal((await request({}, {}, "GET")).status, 405);
  assert.equal((await request({}, { origin: "https://evil.example" })).status, 403);
  assert.equal((await request({}, { "content-type": "text/plain" })).status, 415);
  assert.equal((await request({ website: "https://spam.example" })).status, 400);
  assert.equal((await request({ message: "" })).status, 400);
  assert.equal(requests.length, 0);
  verification = { ...verification, success: false };
  assert.equal((await request()).status, 400);
  assert.equal(requests.length, 1);
  verification = { success: true, hostname: "evil.example", action: "support" };
  assert.equal((await request()).status, 400);
  verification = { success: true, hostname: "sakusaku3939.com", action: "login" };
  assert.equal((await request()).status, 400);
  verification = { success: true, hostname: "sakusaku3939.com", action: "support" };
  requests = [];
  assert.equal((await request({ to: "attacker@example.com" })).status, 200);
  assert.equal(requests.length, 2);
  assert.deepEqual(requests[1].body.to, ["sakusaku3939.777@gmail.com"]);
  assert.equal(requests[1].body.reply_to, body.email);
  assert.equal(requests[1].body.from, "support@sakusaku3939.com");
  assert.ok(String(requests[1].body.text).includes(body.message));
  delivery = { delivered: [], queued: ["sakusaku3939.777@gmail.com"] };
  assert.equal((await request({ app: "" })).status, 200);
  assert.equal(requests.at(-1)?.body.subject, "[Support] 不具合の報告");
  assert.ok(String(requests.at(-1)?.body.text).includes("対象アプリ・サービス: 未記入"));
  assert.equal((await request()).status, 200);
  const limited = await request();
  assert.equal(limited.status, 429);
  assert.equal(limited.headers["Retry-After"], "600");
  delivery = { delivered: [], queued: [], permanent_bounces: ["sakusaku3939.777@gmail.com"] };
  assert.equal((await request({ email: "bounce@example.com" })).status, 502);
  delivery = { delivered: [], queued: [], suppressed_recipients: ["sakusaku3939.777@gmail.com"] };
  assert.equal((await request({ email: "suppressed@example.com" })).status, 502);
  globalThis.fetch = (async () => { throw new Error("network failure"); }) as typeof fetch;
  assert.equal((await request({ email: "offline@example.com" })).status, 502);
  delete process.env.TURNSTILE_SECRET_KEY;
  assert.equal((await request()).status, 503);
});
