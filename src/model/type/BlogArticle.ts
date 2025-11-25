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
