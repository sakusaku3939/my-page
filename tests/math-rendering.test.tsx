import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const require = createRequire(import.meta.url);
const renderMarkdown = (content: string) => renderToStaticMarkup(
  <ReactMarkdown
    remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
    rehypePlugins={[rehypeRaw, rehypeKatex]}
  >{content}</ReactMarkdown>
);

test("every math renderer resolves the same KaTeX package as its bundled stylesheet", () => {
  const katexPath = require.resolve("katex");
  for (const dependency of ["rehype-katex", "micromark-extension-math"]) {
    const dependencyRequire = createRequire(require.resolve(dependency));
    assert.equal(dependencyRequire.resolve("katex"), katexPath, dependency);
  }
  const cssPath = require.resolve("katex/dist/katex.min.css");
  const css = readFileSync(cssPath, "utf8");
  assert.match(css, /\.katex-base/);
  const fontUrls = Array.from(css.matchAll(/url\(([^)]+)\)/g));
  assert.ok(fontUrls.length > 0);
  for (const [, fontUrl] of fontUrls) {
    assert.ok(existsSync(path.resolve(path.dirname(cssPath), fontUrl.replace(/["']/g, ""))), fontUrl);
  }
});

test("inline and display math render with the updated KaTeX classes", () => {
  const html = renderMarkdown("Inline $x^2$\n\n$$\n\\frac{1}{2} + \\sqrt{x}\n$$");
  assert.match(html, /class="katex"/);
  assert.match(html, /class="katex-display"/);
  assert.match(html, /katex-base/);
  assert.match(html, /<math/);
  assert.doesNotMatch(html, /katex-error/);
});

test("all published blog articles render without KaTeX parse errors", () => {
  for (const filename of readdirSync("blog-posts").filter(name => name.endsWith(".md"))) {
    const { content } = matter(readFileSync(path.join("blog-posts", filename), "utf8"));
    assert.doesNotMatch(renderMarkdown(content), /katex-error/, filename);
  }
});

test("blog math styles target global renderer classes", () => {
  const css = readFileSync("src/pages/blog/[slug].module.css", "utf8");
  assert.match(css, /:global\(\.katex-display\)/);
  assert.match(css, /:global\(\.katex\)/);
  assert.doesNotMatch(css, /\.articleBody \.katex/);
  assert.match(readFileSync("src/pages/_app.tsx", "utf8"), /import "katex\/dist\/katex.min.css"/);
  assert.doesNotMatch(readFileSync("src/pages/blog/[slug].tsx", "utf8"), /cdn\.jsdelivr\.net\/npm\/katex/);
});
