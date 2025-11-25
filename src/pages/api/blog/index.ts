import type { NextApiRequest, NextApiResponse } from "next";
import { getAllBlogArticles } from "@/model/BlogServer";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const articles = getAllBlogArticles();
    
    res.status(200).json({
      articles
    });
  } catch (e: any) {
    console.error("API /api/blog error:", e?.stack || e?.message || e);
    res.status(500).json({ error: "Failed to load blog articles" });
  }
}
