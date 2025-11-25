export type BlogArticle = {
  slug: string;
  title: string;
  date: string;
  body: string;
  thumbnailUrl?: string;
}

export type BlogArticleWithSummary = BlogArticle & {
  summary: string;
}
