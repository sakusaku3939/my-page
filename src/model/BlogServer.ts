import path from "path";
import fs from "fs";
import matter from "gray-matter";
import type { BlogArticle, BlogArticleWithSummary } from "@/model/type/BlogArticle";

const blogPostsDirectory = path.join(process.cwd(), "blog-posts/");

/**
 * 概要を生成する関数
 * 本文から最初の3文を抽出
 * 「...」はCSSで表示するため、ここでは追加しない
 */
export function generateSummary(body: string): string {
  // HTMLタグを除去（bodyがHTMLの場合）
  const plainText = body.replace(/<[^>]*>/g, '');
  
  // 文の区切りで分割（。、！、？で終わる）
  const sentences = plainText.match(/[^。！？]+[。！？]/g) || [];
  
  // 最初の3文を取得
  const firstThree = sentences.slice(0, 3).join('');
  
  return firstThree;
}

/**
 * 日付をフォーマットする関数
 * YYYY.M.D 形式から YYYY.MM.DD 形式に変換
 */
export function formatDate(dateStr: string): string {
  // YYYY.M.D 形式をパース
  const parts = dateStr.split('.');
  if (parts.length === 3) {
    const year = parts[0];
    const month = parts[1].padStart(2, '0');
    const day = parts[2].padStart(2, '0');
    return `${year}.${month}.${day}`;
  }
  
  // フォールバック: Date オブジェクトでパース
  const date = new Date(dateStr);
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
 * サムネイル画像が存在するかチェック
 */
function checkThumbnailExists(slug: string): boolean {
  const thumbnailPath = path.join(process.cwd(), "public", "blog", slug, "thumbnail.jpg");
  return fs.existsSync(thumbnailPath);
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
    hasThumbnail: checkThumbnailExists(slug)
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
  // YYYY.M.D 形式をパースしてソート
  return articles.sort((a, b) => {
    const parseDate = (dateStr: string): Date => {
      const parts = dateStr.split('.');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      }
      return new Date(dateStr);
    };
    
    return parseDate(b.date).getTime() - parseDate(a.date).getTime();
  });
}
