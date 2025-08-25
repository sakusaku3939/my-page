import type { NextApiRequest, NextApiResponse } from "next";
import { getPostData, getAllCategories } from "@/model/PostServer";
import matter from "gray-matter";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query;
    if (!slug || Array.isArray(slug)) {
      res.status(400).json({ error: "Invalid slug" });
      return;
    }

    const raw = getPostData(`${slug}.md`);
    const singleDocument = matter(raw);
    const categories = getAllCategories();

    res.status(200).json({
      overview: singleDocument.data,
      markdownBody: singleDocument.content,
      categories: categories
    });
  } catch (e: any) {
    console.error("API /api/posts/[slug] error:", e?.stack || e?.message || e);
    res.status(500).json({ error: "Failed to load post" });
  }
}
