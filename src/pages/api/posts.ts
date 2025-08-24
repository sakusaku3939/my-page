import type { NextApiRequest, NextApiResponse } from "next";
import { getAllCategories, getPostOverview } from "@/model/PostServer";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { filter } = req.query;
    const categories = getAllCategories();
    const posts = getPostOverview(filter as string | string[] | undefined);
    const sortedPinnedPosts = posts.sort((a, b) => (a.pinned && !b.pinned ? -1 : 1));

    res.status(200).json({
      categories,
      overviews: sortedPinnedPosts
    });
  } catch (e: any) {
    console.error("API /api/posts error:", e?.stack || e?.message || e);
    res.status(500).json({ error: "Failed to load posts" });
  }
}
