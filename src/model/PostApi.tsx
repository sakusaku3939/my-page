import path from "path";
import fs from "fs";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "_posts/");

export function getPostData(name: string) {
  const fullPath = path.join(postsDirectory, `${name}.md`);
  return fs.readFileSync(fullPath, "utf8");
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, "")
      }
    };
  });
}

export function getAllPostOverview() {
  const fileNames = fs.readdirSync(postsDirectory);
  let overviews = [];
  for (let name of fileNames) {
    const fullPath = path.join(postsDirectory, name);
    const data = fs.readFileSync(fullPath, "utf8");
    const front = matter(data).data;

    front.slug = name.replace(/\.md$/, "");
    overviews.push(front);
  }
  return overviews.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1);
}

export function getAllCategories() {
  const fileNames = fs.readdirSync(postsDirectory);
  let tags = [];
  for (let name of fileNames) {
    const fullPath = path.join(postsDirectory, name);
    const data = fs.readFileSync(fullPath, "utf8");
    const front = matter(data).data;
    tags.push(front.tag.split(", "));
  }
  const flatTags = tags.flat(2);

  let categories: { [tag: string]: number }[] = [];
  for (let tag of flatTags) {
    const value = flatTags.filter(e => e === tag).length;
    categories.push({ tag: tag, count: value });
  }
  categories.sort((a, b) => a.count < b.count ? 1 : -1);

  return categories;
}