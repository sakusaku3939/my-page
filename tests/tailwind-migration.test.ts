import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

async function compileStyles(filename: string) {
  const result = await postcss([tailwindcss()]).process(readFileSync(filename, "utf8"), {
    from: path.resolve(filename),
  });
  assert.doesNotMatch(result.css, /@(apply|reference|tailwind)\b/);
  return result.css;
}

test("Tailwind v4 compiles global styles while retaining the existing font and link colors", async () => {
  const css = await compileStyles("src/styles/globals.css");
  for (const color of ["#2563eb", "#93c5fd", "#6b21a8", "#a855f7"]) {
    assert.ok(css.includes(color), color);
  }
  assert.match(css, /--font-sans:\s*ui-sans-serif, system-ui, sans-serif/);
  assert.match(css, /:visited/);
  assert.match(css, /prefers-color-scheme:\s*dark/);
  assert.match(css, /--background-color/);
});

test("CSS Modules can apply Tailwind utilities through reference-only theme imports", async () => {
  for (const filename of [
    "src/components/atom/NoColorLink/NoColorLink.module.css",
    "src/components/molecule/HamburgerMenu/HamburgerMenu.module.css",
  ]) {
    const css = await compileStyles(filename);
    assert.match(css, /color:\s*var\(--color-black(?:,\s*#000)?\)/);
    assert.match(css, /color:\s*var\(--color-white(?:,\s*#fff)?\)/);
    assert.match(css, /:visited/);
    assert.doesNotMatch(css, /@font-face|box-sizing:\s*border-box/);
  }
});

test("universal spacing reset stays in the base layer so utilities can override it", () => {
  const css = postcss.parse(readFileSync("src/styles/globals.css", "utf8"));
  css.walkRules("*", rule => {
    const layer = rule.parent;
    assert.equal(layer?.type, "atrule");
    assert.equal((layer as postcss.AtRule).name, "layer");
    assert.equal((layer as postcss.AtRule).params, "base");
  });
});
