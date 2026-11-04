import { siClaude, siGooglegemini, siOpenai } from "simple-icons";
import type { SimpleIcon } from "simple-icons";

export type AiModelRelease = {
  date: string;
  name: string;
  logo: SimpleIcon;
  // ブランドカラーが暗くダークモードで見えないロゴは、文字色に合わせる
  useBrandColor: boolean;
};

const openai = { logo: siOpenai, useBrandColor: false };
const claude = { logo: siClaude, useBrandColor: true };
const gemini = { logo: siGooglegemini, useBrandColor: true };

// 作品一覧の年表に載せる、公開時点で最先端の性能だったモデルの公開日（各社の発表日）
export const AI_MODEL_RELEASES: AiModelRelease[] = [
  { date: "2023.3.14", name: "GPT-4", ...openai },
  { date: "2024.3.4", name: "Claude 3 Opus", ...claude },
  { date: "2024.9.12", name: "OpenAI o1", ...openai },
  { date: "2025.8.7", name: "GPT-5", ...openai },
  { date: "2025.11.18", name: "Gemini 3 Pro", ...gemini },
  { date: "2026.6.9", name: "Claude Fable 5", ...claude },
  { date: "2026.9.22", name: "Claude Opus 5.5", ...claude }
];

export function dateValue(date: string): number {
  const [year, month, day] = date.split(".").map(Number);
  return year * 10000 + month * 100 + day;
}
