export const SUPPORT_CATEGORIES = ["質問", "相談・依頼", "不具合の報告", "意見・要望", "その他"] as const;

export type SupportSubmission = {
  app: string;
  email: string;
  category: string;
  message: string;
  website: string;
  token: string;
};

export function parseSupportSubmission(value: unknown): SupportSubmission | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  const limits = { app: 100, email: 254, category: 30, message: 5000, website: 300, token: 2048 };
  const fields: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof body[key] !== "string" || body[key].length > limit) return null;
    fields[key] = body[key].trim();
  }
  if (!fields.message || !fields.token ||
      !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email) ||
      !SUPPORT_CATEGORIES.some((category) => category === fields.category)) return null;
  if ([fields.app, fields.email].some((field) => /[\r\n\x00-\x1f\x7f]/.test(field))) return null;
  if (/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(fields.message)) return null;
  return fields as SupportSubmission;
}
