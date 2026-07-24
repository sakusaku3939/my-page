import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { XMLParser } from "fast-xml-parser";
import type { BlogArticle, BlogArticleWithSummary, BlogListArticle } from "@/model/type/BlogArticle";
import { generateSummary } from "@/utils/dateUtils";

const blogPostsDirectory = path.join(process.cwd(), "blog-posts/");

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

type ZennFeedItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  enclosure?: {
    "@_url"?: string;
  };
};

type QiitaItem = {
  id: string;
  title: string;
  url: string;
  created_at: string;
  body: string;
};

const ZENN_FEED_URL = "https://zenn.dev/aokiti/feed?all=1";
const QIITA_ITEMS_URL =
  "https://qiita.com/api/v2/users/sakusaku3939/items";

function toArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function decodeHtmlAttribute(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#(?:x27|39);/gi, "'")
    .replace(/&#(?:x2f|47);/gi, "/");
}

function extractOgImage(html: string): string | undefined {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];

  for (const metaTag of metaTags) {
    if (!/\bproperty=["']og:image(?::secure_url)?["']/i.test(metaTag)) {
      continue;
    }

    const content = metaTag.match(/\bcontent=["']([^"']+)["']/i)?.[1];
    if (content) {
      return decodeHtmlAttribute(content);
    }
  }

  return undefined;
}

async function getQiitaThumbnail(url: string): Promise<string | undefined> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/html",
        "User-Agent": "sakusaku3939.com"
      },
      signal: AbortSignal.timeout(10_000)
    });

    if (!response.ok) {
      return undefined;
    }

    return extractOgImage(await response.text());
  } catch {
    return undefined;
  }
}

async function getZennArticles(): Promise<BlogListArticle[]> {
  const response = await fetch(ZENN_FEED_URL, {
    headers: {
      Accept: "application/rss+xml, application/xml;q=0.9"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Zenn feed: ${response.status}`);
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    processEntities: true
  });
  const feed = parser.parse(await response.text()) as {
    rss?: {
      channel?: {
        item?: ZennFeedItem | ZennFeedItem[];
      };
    };
  };

  return toArray(feed.rss?.channel?.item)
    .filter(
      (item): item is Required<Pick<ZennFeedItem, "title" | "link" | "pubDate">> &
        ZennFeedItem =>
        Boolean(
          item.title &&
          item.link?.includes("/articles/") &&
          item.pubDate
        )
    )
    .map((item) => ({
      id: `zenn-${item.link.split("/").pop()}`,
      source: "zenn",
      title: item.title,
      date: item.pubDate,
      summary: generateSummary(item.description ?? ""),
      url: item.link,
      ...(item.enclosure?.["@_url"]
        ? { thumbnailUrl: item.enclosure["@_url"] }
        : {})
    }));
}

async function getQiitaArticles(): Promise<BlogListArticle[]> {
  const articles: BlogListArticle[] = [];
  const perPage = 100;

  for (let page = 1; page <= 100; page++) {
    const response = await fetch(
      `${QIITA_ITEMS_URL}?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "sakusaku3939.com"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Qiita articles: ${response.status}`);
    }

    const items = (await response.json()) as QiitaItem[];
    // 記事ページへの負荷を抑えるため、OG画像は少数ずつ並列取得する
    for (let offset = 0; offset < items.length; offset += 5) {
      const batch = items.slice(offset, offset + 5);
      const thumbnailUrls = await Promise.all(
        batch.map((item) => getQiitaThumbnail(item.url))
      );

      articles.push(
        ...batch.map((item, index) => ({
          id: `qiita-${item.id}`,
          source: "qiita" as const,
          title: item.title,
          date: item.created_at,
          summary: generateSummary(item.body),
          url: item.url,
          ...(thumbnailUrls[index]
            ? { thumbnailUrl: thumbnailUrls[index] }
            : {})
        }))
      );
    }

    if (items.length < perPage) {
      break;
    }
  }

  return articles;
}

/**
 * ローカルブログ、Zenn、Qiitaの記事を統合して日付降順で返す
 */
export async function getAllBlogListArticles(): Promise<BlogListArticle[]> {
  const localArticles: BlogListArticle[] = getAllBlogArticles().map(
    (article) => ({
      id: `blog-${article.slug}`,
      source: "blog",
      title: article.title,
      date: article.date,
      summary: article.summary,
      url: `/blog/${article.slug}`,
      ...(article.hasThumbnail
        ? { thumbnailUrl: `/blog/${article.slug}/thumbnail.jpg` }
        : {})
    })
  );

  const [zennArticles, qiitaArticles] = await Promise.all([
    getZennArticles(),
    getQiitaArticles()
  ]);

  return [...localArticles, ...zennArticles, ...qiitaArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
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
