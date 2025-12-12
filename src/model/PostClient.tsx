import { NextRouter } from "next/router";
import { MouseEvent } from "react";

export function renderTags(router: NextRouter, tags: string[]) {
  return tags.map((value: string, key: number) => (
    <li onClick={(e) => handleTagClick(e, router, value)} key={key}>{value}</li>
  ));
}

export function renderCountTags(router: NextRouter, categories: { [tag: string]: number }[]) {
  return categories.map((category: any, key) => {
    const handleClick = (e: MouseEvent) => handleTagClick(e, router, category.tag);
    return (
      <li onClick={handleClick} key={key}>{category.tag} ({category.count})</li>
    );
  });
}

export function handleTagClick(e: MouseEvent, router: NextRouter, tag: string) {
  e.preventDefault();
  return router.push({
    pathname: "/posts",
    query: { filter: tag }
  });
}
