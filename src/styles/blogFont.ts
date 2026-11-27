import { Noto_Sans_JP } from "next/font/google";

// ブログの和文フォント。日本語グリフは unicode-range で必要な分だけ読み込まれる
export const blogFont = Noto_Sans_JP({ subsets: ["latin"] });
