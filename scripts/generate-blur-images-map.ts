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
    entries = await fs.readdir(postsDir, { withFileTypes: true }) as any[];
  } catch (e) {
    console.error(`public/posts が見つかりません: ${postsDir}`);
    process.exit(1);
  }

  for (const ent of entries) {
    if (!ent.isDirectory()) continue;

    const rel = `/posts/${ent.name}/thumbnail.jpg`;
    const abs = path.join(postsDir, ent.name, "thumbnail.jpg");

    const exists = await fileExists(abs);
    if (!exists) continue;

    try {
      const buf = await sharp(abs)
        .rotate()              // EXIF の向きを考慮
        .resize(24)            // 低解像度（16〜32）
        .jpeg({ quality: 40 }) // 軽量化
        .toBuffer();

      blurMap[rel] = `data:image/jpeg;base64,${buf.toString("base64")}`;
      console.log(`ok  ${rel}`);
    } catch (err) {
      console.warn(`fail ${rel}`, err);
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
