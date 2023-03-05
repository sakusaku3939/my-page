import type { NextApiRequest, NextApiResponse } from "next";
import path from 'path'
import fs from 'fs'

type PostData = {
  content: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostData>
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const fullPath = path.join(process.cwd(), 'src/posts/presc/index.md')
  const content = fs.readFileSync(fullPath, 'utf8')

  res.status(200).json({
    content: content
  });
}
