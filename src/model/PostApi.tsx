import path from "path";
import fs from "fs";

const postsDirectory = path.join(process.cwd(), "_posts/");

export function getPostData(name: string) {
  const fullPath = path.join(postsDirectory, `${name}.md`);
  return fs.readFileSync(fullPath, "utf8");
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}