import type { NextApiRequest, NextApiResponse } from "next";
import { getBlogArticleBySlug } from "@/model/BlogServer";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query;
    
    // slugのバリデーション
    if (!slug || Array.isArray(slug)) {
      res.status(400).json({ error: "Invalid slug" });
      return;
    }
    
    // slugのサニタイズ（英数字とハイフンのみ許可）
    if (!/^[a-zA-Z0-9-]+$/.test(slug)) {
      res.status(400).json({ error: "Invalid slug format" });
      return;
    }
    
    const article = getBlogArticleBySlug(slug);
    
    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    
    res.status(200).json({
      article
    });
  } catch (e: any) {
    console.error("API /api/blog/[slug] error:", e?.stack || e?.message || e);
    res.status(500).json({ error: "Failed to load blog article" });
  }
}
