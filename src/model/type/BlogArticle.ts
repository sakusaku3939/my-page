export type BlogArticle = {
  slug: string;
  title: string;
  date: string;
  body: string;
  hasThumbnail: boolean;
}

export type BlogArticleWithSummary = BlogArticle & {
  summary: string;
}

export type BlogArticleSource = "blog" | "zenn" | "qiita";

/**
 * /blog の一覧に表示する、掲載元をまたいだ共通の記事形式
 */
export type BlogListArticle = {
  id: string;
  source: BlogArticleSource;
  title: string;
  date: string;
  summary: string;
  url: string;
  thumbnailUrl?: string;
}
