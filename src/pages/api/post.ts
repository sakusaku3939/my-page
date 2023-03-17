import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

type Param = {
  name?: string
  tag?: string
}

type PostResponse = {
  content: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const param = req.query as Param;

  if (param.name !== undefined) {
    const fullPath = path.join(process.cwd(), `src/posts/${param.name}.md`);
    const content = fs.readFileSync(fullPath, "utf8");

    res.status(200).json({
      content: content
    });
  } else {
    res.status(200).json({
      content: ""
    });
  }
}
