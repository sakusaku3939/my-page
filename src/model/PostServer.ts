import "server-only";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import type { Overview } from "@/model/type/Overview";

const postsDirectory = path.join(process.cwd(), "posts/");

export function getPostData(filename: string) {
  const fullPath = path.join(postsDirectory, filename);
  return fs.readFileSync(fullPath, "utf8");
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        // ファイル名のみを取得してslugに返却
        slug: fileName.replace(/\.md$/, "")
      }
    };
  });
}

export function getPostOverview(filter: string | string[] | undefined) {
  const fileNames = fs.readdirSync(postsDirectory);
  let overviews: Overview[] = [];
  for (let name of fileNames) {
    // overviewにslugパラメータを追加
    const overview = matter(getPostData(name)).data;
    overview.slug = name.replace(/\.md$/, "");

    // フィルターがある場合は合致するものだけリストに格納
    if (filter !== undefined && typeof filter === "string") {
      const tags = overview.tag.split(", ");
      const doIncludeTag = tags.filter((tag: string) => doMatchTag(tag, filter));
      if (doIncludeTag.length) {
        overviews.push((overview as Overview));
      }
    } else {
      overviews.push((overview as Overview));
    }
  }
  // 新しい日付順でソートして返却
  return overviews.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1);
}

export function getAllCategories() {
  const fileNames = fs.readdirSync(postsDirectory);

  // すべての投稿からタグを取得して1次元化する
  let tags = [];
  for (let name of fileNames) {
    const overview = matter(getPostData(name)).data;
    tags.push(overview.tag.split(", "));
  }
  const flatTags = tags.flat(2);

  // 同じタグをまとめたオブジェクト配列を作成
  let categories: { [tag: string]: number }[] = [];
  for (let tag of flatTags) {
    const count = flatTags.filter(e => doMatchTag(e, tag)).length;
    const tagIndex = categories.findIndex(e => e.tag === tag);
    if (tagIndex === -1) {
      categories.push({ tag: tag, count: count });
    }
  }
  categories.sort((a, b) => a.count < b.count ? 1 : -1);

  return categories;
}

function doMatchTag(tag: string, filter: string) {
  return tag === filter || tag.split(" ").includes(filter);
}
