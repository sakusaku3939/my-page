import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "node:crypto";
import { parseSupportSubmission } from "../../lib/supportForm";

const RECIPIENT = "sakusaku3939.777@gmail.com";
const WINDOW_MS = 10 * 60 * 1000;
// A supplementary instance-local limit. Turnstile is the primary bot protection.
const attempts = new Map<string, { count: number; expires: number }>();

function allowSubmission(email: string): boolean {
  const now = Date.now();
  attempts.forEach((bucket, key) => { if (bucket.expires <= now) attempts.delete(key); });
  const key = createHash("sha256").update(email.toLowerCase()).digest("hex");
  const bucket = attempts.get(key);
  if (bucket) {
    if (bucket.count >= 3) return false;
    bucket.count++;
  } else {
    if (attempts.size >= 2000) return false;
    attempts.set(key, { count: 1, expires: now + WINDOW_MS });
  }
  return true;
}

export const config = { api: { bodyParser: { sizeLimit: "24kb" } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "POSTで送信してください。" });
  }
  const { SUPPORT_ORIGIN, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_EMAIL_API_TOKEN, TURNSTILE_SECRET_KEY } = process.env;
  let origin: URL;
  try {
    if (!SUPPORT_ORIGIN || !CLOUDFLARE_ACCOUNT_ID || !/^[a-f0-9]{32}$/i.test(CLOUDFLARE_ACCOUNT_ID) ||
        !CLOUDFLARE_EMAIL_API_TOKEN || !TURNSTILE_SECRET_KEY) throw new Error("Missing support configuration");
    origin = new URL(SUPPORT_ORIGIN);
    if (origin.origin !== SUPPORT_ORIGIN || !["https:", "http:"].includes(origin.protocol)) throw new Error("Invalid support origin");
  } catch {
    return res.status(503).json({ error: "現在、お問い合わせの受付を休止しています。時間をおいて再度お試しください。" });
  }
  if (req.headers.origin !== origin.origin) return res.status(403).json({ error: "サポートページから送信してください。" });
  if (req.headers["content-type"]?.split(";")[0].trim() !== "application/json") {
    return res.status(415).json({ error: "送信形式が正しくありません。" });
  }
  const submission = parseSupportSubmission(req.body);
  if (!submission) return res.status(400).json({ error: "入力内容を確認してください。本文は5,000文字以内で入力できます。" });
  if (submission.website) return res.status(400).json({ error: "送信できませんでした。ページを再読み込みしてお試しください。" });

  try {
    const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: submission.token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!verificationResponse.ok) throw new Error("Turnstile unavailable");
    const verification = await verificationResponse.json();
    if (verification.success !== true || verification.hostname !== origin.hostname || verification.action !== "support") {
      return res.status(400).json({ error: "認証を確認できませんでした。もう一度認証して送信してください。" });
    }
    if (!allowSubmission(submission.email)) {
      res.setHeader("Retry-After", "600");
      return res.status(429).json({ error: "送信回数が多いため、10分ほどお待ちください。" });
    }
    const emailResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/email/sending/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${CLOUDFLARE_EMAIL_API_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        to: [RECIPIENT],
        from: "support@sakusaku3939.com",
        reply_to: submission.email,
        subject: `[Support] ${submission.app ? `${submission.app} / ` : ""}${submission.category}`,
        text: `対象アプリ・サービス: ${submission.app || "未記入"}\n種別: ${submission.category}\n返信先: ${submission.email}\n\n${submission.message}`,
      }),
      signal: AbortSignal.timeout(12000),
    });
    const result = await emailResponse.json();
    const accepted = result.result?.delivered?.includes(RECIPIENT) || result.result?.queued?.includes(RECIPIENT);
    if (!emailResponse.ok || result.success !== true || !accepted ||
        result.result?.permanent_bounces?.includes(RECIPIENT) || result.result?.suppressed_recipients?.includes(RECIPIENT)) {
      // Do not log addresses, message bodies, credentials or provider responses.
      console.error("Support notification rejected", { status: emailResponse.status });
      return res.status(502).json({ error: "通知を送信できませんでした。時間をおいて再度お試しください。" });
    }
    return res.status(200).json({ success: true });
  } catch {
    console.error("Support notification request failed");
    return res.status(502).json({ error: "送信結果を確認できませんでした。時間をおいて再度お試しください。" });
  }
}
