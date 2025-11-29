import path from "path";
import fs from "fs";
import matter from "gray-matter";
import type { BlogArticle, BlogArticleWithSummary } from "@/model/type/BlogArticle";

const blogPostsDirectory = path.join(process.cwd(), "blog-posts/");

/**
 * 概要を生成する関数
 * 本文から最初の3行を抽出
 * 「...」はCSSで表示するため、ここでは追加しない
 */
export function generateSummary(body: string): string {
  // コードブロックを除去（```で囲まれた部分）
  let plainText = body.replace(/```[\s\S]*?```/g, '');
  
  // HTMLタグを除去
  plainText = plainText.replace(/<[^>]*>/g, '');
  
  // マークダウン記法を除去
  plainText = plainText
    .replace(/^#{1,6}\s+/gm, '')  // 見出し記号
    .replace(/\*\*(.+?)\*\*/g, '$1')  // 太字
    .replace(/\*(.+?)\*/g, '$1')  // イタリック
    .replace(/~~(.+?)~~/g, '$1')  // 取り消し線
    .replace(/`(.+?)`/g, '$1')  // インラインコード
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')  // リンク
    .replace(/!\[.*?\]\(.+?\)/g, '')  // 画像
    .replace(/^[-*+]\s+/gm, '')  // リスト記号
    .replace(/^\d+\.\s+/gm, '')  // 番号付きリスト
    .replace(/^>\s+/gm, '');  // 引用
  
  // 改行で分割して空行を除去
  const lines = plainText.split('\n').filter(line => line.trim() !== '');
  
  // 最初の3行を取得
  const firstThree = lines.slice(0, 3).join('\n');
  
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
  
  // サムネイルディレクトリの存在チェックを一度だけ行う
  const blogPublicDir = path.join(process.cwd(), "public", "blog");
  const thumbnailSlugs = new Set<string>();
  
  if (fs.existsSync(blogPublicDir)) {
    const blogDirs = fs.readdirSync(blogPublicDir);
    for (const dir of blogDirs) {
      const thumbnailPath = path.join(blogPublicDir, dir, "thumbnail.jpg");
      if (fs.existsSync(thumbnailPath)) {
        thumbnailSlugs.add(dir);
      }
    }
  }
  
  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) {
      continue;
    }
    
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(blogPostsDirectory, fileName);
    
    try {
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      
      const summary = generateSummary(content);
      
      articles.push({
        slug,
        title: data.title || "",
        date: data.date || "",
        body: content,
        hasThumbnail: thumbnailSlugs.has(slug),
        summary
      });
    } catch (e) {
      console.error(`Error reading blog post ${fileName}:`, e);
      continue;
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

/**
 * 前後の記事を取得
 */
export function getAdjacentArticles(currentSlug: string): {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
} {
  const allArticles = getAllBlogArticles();
  const currentIndex = allArticles.findIndex(article => article.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  // 日付降順なので、prevは次のインデックス（古い記事）、nextは前のインデックス（新しい記事）
  const prev = currentIndex < allArticles.length - 1 
    ? { slug: allArticles[currentIndex + 1].slug, title: allArticles[currentIndex + 1].title }
    : null;
  
  const next = currentIndex > 0
    ? { slug: allArticles[currentIndex - 1].slug, title: allArticles[currentIndex - 1].title }
    : null;
  
  return { prev, next };
}
