const SOURCE_ROOT = "https://sakusaku3939.github.io/meeting-alarm-app/";

export const MEETING_ALARM_REVALIDATE_SECONDS = 3600;

export interface MeetingAlarmContent {
  title: string;
  description: string;
  html: string;
}

export async function fetchMeetingAlarmSource(path: "index.html" | "privacy.html"): Promise<string> {
  const response = await fetch(`${SOURCE_ROOT}${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    throw new Error(`MeetingAlarm source fetch failed: HTTP ${response.status}`);
  }
  const text = await response.text();
  if (!text.trim()) throw new Error("MeetingAlarm source is empty");
  return text;
}

function publishedContent(source: string): { title: string; html: string } {
  const title = source.match(/<title>([^<]+)<\/title>/i)?.[1];
  const main = source.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!title || !main?.trim()) throw new Error("Invalid MeetingAlarm published HTML");
  return { title, html: main };
}

export function introductionContent(source: string): MeetingAlarmContent {
  const content = publishedContent(source);
  const description = source.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
  if (!description) throw new Error("Invalid MeetingAlarm introduction HTML");
  return {
    ...content,
    description,
    html: content.html
      .replace(/href=(["'])privacy\.html\1/g, 'href="/meeting-alarm/privacy"')
      .replace(/<a\b[^>]*href=(["'])https:\/\/github\.com\/sakusaku3939\/meeting-alarm-app\1[^>]*>[\s\S]*?<\/a>/gi, ""),
  };
}

export function privacyContent(source: string): MeetingAlarmContent {
  const content = publishedContent(source);
  if (content.title !== "ミーティングアラーム プライバシーポリシー") {
    throw new Error("Invalid MeetingAlarm privacy policy HTML");
  }
  return {
    ...content,
    description: "ミーティングアラームにおける利用者情報の取扱いについて。",
  };
}
