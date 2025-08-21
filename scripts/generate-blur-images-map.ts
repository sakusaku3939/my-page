import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

async function fileExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const root = process.cwd();
  const publicDir = path.join(root, "public");
  const postsDir = path.join(publicDir, "posts");

  const outDir = path.join(root, "src", "__generated__");
  const outTs = path.join(outDir, "blur-image-map.ts");

  const blurMap: Record<string, string> = {};

  let entries: any[] = [];
  try {
    entries = (await fs.readdir(postsDir, { withFileTypes: true })) as any[];
  } catch (e) {
    console.error(`public/posts が見つかりません: ${postsDir}`);
    process.exit(1);
  }

  console.log(`ブラー画像生成中...`);

  const imageExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

  for (const ent of entries) {
    if (!ent.isDirectory()) continue;

    let files: any[] = [];
    const postDir = path.join(postsDir, ent.name);
    try {
      files = (await fs.readdir(postDir, { withFileTypes: true })) as any[];
    } catch (e) {
      console.warn(`fail /posts/${ent.name}`, e);
      continue;
    }

    for (const f of files) {
      if (!f.isFile()) continue;

      const ext = path.extname(f.name).toLowerCase();
      if (!imageExt.has(ext)) continue;

      const rel = `/posts/${ent.name}/${f.name}`;
      const abs = path.join(postsDir, ent.name, f.name);

      const exists = await fileExists(abs);
      if (!exists) continue;

      try {
        const buf = await sharp(abs)
          .rotate()              // EXIF の向きを考慮
          .resize(24)            // 低解像度（16〜32）
          .jpeg({ quality: 40 }) // 軽量化（プレースホルダーは JPEG に統一）
          .toBuffer();

        blurMap[rel] = `data:image/jpeg;base64,${buf.toString("base64")}`;
      } catch (err) {
        console.warn(`fail ${rel}`, err);
      }
    }
  }

  await fs.mkdir(outDir, { recursive: true });

  const ts = `// 自動生成ファイル（scripts/generate-blur-images-map.ts により生成）\n/* eslint-disable */\nconst blurMap: Record<string, string> = ${JSON.stringify(
    blurMap,
    null,
    2
  )};\nexport default blurMap;\n`;

  await fs.writeFile(outTs, ts, "utf8");
  console.log(`write ${path.relative(root, outTs)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
