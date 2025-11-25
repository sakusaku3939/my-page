import "server-only";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import type { BlogArticle, BlogArticleWithSummary } from "@/model/type/BlogArticle";

const blogPostsDirectory = path.join(process.cwd(), "blog-posts/");

/**
 * 概要を生成する関数
 * 本文から最初の3文を抽出し、必要に応じて「...」を追加
 * 最大文字数を超える場合は切り詰める
 */
export function generateSummary(body: string, maxLength: number = 200): string {
  // HTMLタグを除去（bodyがHTMLの場合）
  const plainText = body.replace(/<[^>]*>/g, '');
  
  // 文の区切りで分割（。、！、？で終わる）
  const sentences = plainText.match(/[^。！？]+[。！？]/g) || [];
  
  // 最初の3文を取得
  const firstThree = sentences.slice(0, 3).join('');
  
  // 3文より多い場合は「...」を追加
  const needsEllipsis = sentences.length > 3;
  let summary = needsEllipsis ? firstThree + '...' : firstThree;
  
  // 最大文字数を超える場合は切り詰め
  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength - 3) + '...';
  }
  
  return summary;
}

/**
 * 日付をフォーマットする関数
 * ISO形式から YYYY.MM.DD 形式に変換
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

/**
 * ブログ記事ファイルの内容を取得
 */
export function getBlogPostData(filename: string): string {
  const fullPath = path.join(blogPostsDirectory, filename);
  return fs.readFileSync(fullPath, "utf8");
}

/**
 * すべてのブログ記事のslugを取得
 */
export function getAllBlogSlugs() {
  if (!fs.existsSync(blogPostsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(blogPostsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, "")
        }
      };
    });
}

/**
 * 特定のslugのブログ記事を取得
 */
export function getBlogArticleBySlug(slug: string): BlogArticle | null {
  if (!fs.existsSync(blogPostsDirectory)) {
    return null;
  }
  
  const fileName = `${slug}.md`;
  const fullPath = path.join(blogPostsDirectory, fileName);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    body: content,
    thumbnailUrl: data.thumbnailUrl
  };
}

/**
 * すべてのブログ記事を取得（概要付き、日付降順）
 */
export function getAllBlogArticles(): BlogArticleWithSummary[] {
  if (!fs.existsSync(blogPostsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(blogPostsDirectory);
  const articles: BlogArticleWithSummary[] = [];
  
  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) {
      continue;
    }
    
    const slug = fileName.replace(/\.md$/, "");
    const article = getBlogArticleBySlug(slug);
    
    if (article) {
      const summary = generateSummary(article.body);
      articles.push({
        ...article,
        summary
      });
    }
  }
  
  // 日付の降順（新しい順）でソート
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
