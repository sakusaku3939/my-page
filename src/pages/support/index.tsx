import Head from "next/head";
import Script from "next/script";
import { MessageCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { SUPPORT_CATEGORIES } from "@/lib/supportForm";
import styles from "./support.module.css";
import common from "@/styles/common.module.css";
import { BackgroundWrapper } from "@/components/atom/BackgroundWrapper/BackgroundWrapper";

type Turnstile = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: Turnstile } }

export default function SupportPage() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const submitting = useRef(false);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [challengeError, setChallengeError] = useState("");
  const [scriptReady, setScriptReady] = useState(false);

  const renderChallenge = useCallback(() => {
    if (!siteKey || !container.current || !window.turnstile || widget.current !== null) return;
    widget.current = window.turnstile.render(container.current, {
      sitekey: siteKey, action: "support", language: "ja", size: "flexible", theme: "auto",
      callback: (value: string) => { setToken(value); setChallengeError(""); },
      "expired-callback": () => { setToken(""); },
      "error-callback": () => { setToken(""); setChallengeError("認証を読み込めませんでした。通信環境を確認し、ページを再読み込みしてください。"); },
    });
  }, [siteKey]);

  useEffect(() => {
    if (scriptReady) renderChallenge();
    return () => {
      if (widget.current !== null && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, [renderChallenge, scriptReady]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !token) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const body = Object.fromEntries(["app", "email", "category", "message", "website"].map((key) => [key, String(values.get(key) ?? "")]));
    submitting.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/support", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, token }), signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.error || "送信できませんでした。時間をおいてお試しください。");
      setSent(true);
      form.reset();
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" && cause.name !== "SyntaxError" && cause.name !== "TypeError"
        ? cause.message : "送信結果を確認できませんでした。入力内容を残したまま、時間をおいて再度お試しください。");
    } finally {
      submitting.current = false;
      setBusy(false);
      setToken("");
      if (widget.current !== null) window.turnstile?.reset(widget.current);
    }
  }

  return (
    <>
      <Head>
        <title>お問い合わせ | sakusaku3939</title>
        <meta name="description" content="sakusaku3939へのお問い合わせフォームです。" />
        <link rel="canonical" href="https://sakusaku3939.com/support" />
      </Head>
      {siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setScriptReady(true)} onError={() => setChallengeError("認証を読み込めませんでした。通信環境を確認し、ページを再読み込みしてください。")} />}
      <BackgroundWrapper>
        <h1 className={common.pageTitle}>
          <MessageCircle width={36} height={36} aria-hidden="true" />
          <span>お問い合わせ</span>
        </h1>
        <main className={`${common.section} ${styles.page}`}>
        <div role="status" aria-live="polite">
          {sent && <div className={styles.success}><h2>お問い合わせを受け付けました</h2><button type="button" onClick={() => setSent(false)}>別のお問い合わせを送る</button></div>}
        </div>
        <form onSubmit={submit} hidden={sent} aria-busy={busy}>
          <fieldset disabled={busy || !siteKey} className={styles.fields}>
            <div className={styles.field}><label htmlFor="email">返信先メールアドレス <span>必須</span></label><input id="email" name="email" type="email" required maxLength={254} autoComplete="email" /></div>
            <div className={styles.field}><label htmlFor="category">種別 <span>必須</span></label><select id="category" name="category" required defaultValue=""><option value="" disabled>種別を選択してください</option>{SUPPORT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></div>
            <div className={styles.field}><label htmlFor="message">内容 <span>必須</span></label><textarea id="message" name="message" required maxLength={5000} rows={8} /></div>
            <div className={styles.field}><label htmlFor="app">関連するアプリ・サービス <span className={styles.optional}>任意</span></label><input id="app" name="app" maxLength={100} autoComplete="off" /></div>
            <div className={styles.trap} aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" maxLength={300} /></div>
          </fieldset>
          <div className={styles.challenge} ref={container} />
          <div role="alert">{!siteKey && <p className={styles.error}>現在、お問い合わせの受付を休止しています。時間をおいて再度お試しください。</p>}{challengeError && <p className={styles.error}>{challengeError}</p>}{error && <p className={styles.error}>{error}</p>}</div>
          <p className={styles.hint}>{siteKey && !token && !challengeError ? "認証が完了すると送信できます。" : ""}</p>
          <button className={styles.submit} type="submit" disabled={busy || !token || !siteKey}>{busy ? "送信しています…" : "送信"}</button>
          <noscript><p className={styles.error}>お問い合わせの送信にはJavaScriptを有効にしてください。</p></noscript>
        </form>
        </main>
      </BackgroundWrapper>
    </>
  );
}
