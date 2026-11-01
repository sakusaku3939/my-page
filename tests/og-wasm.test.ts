import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";
import { prepareOGWasm } from "../scripts/prepare-og-wasm.mjs";

const require = createRequire(import.meta.url);
const ogPackage = require.resolve("@vercel/og/package.json");
const satoriPackage = createRequire(ogPackage).resolve("satori/package.json");
const hbPackage = createRequire(satoriPackage).resolve("harfbuzzjs/package.json");
const hbWasm = path.join(path.dirname(hbPackage), "hb.wasm");

function fixture(t: TestContext) {
  const root = mkdtempSync(path.join(os.tmpdir(), "og-wasm-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const og = path.join(root, "node_modules/@vercel/og");
  const satori = path.join(root, "node_modules/satori");
  const hb = path.join(root, "node_modules/harfbuzzjs");
  for (const dir of [path.join(og, "dist"), satori, hb]) mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(og, "package.json"), JSON.stringify({ version: "1.0.3", dependencies: { satori: "0.33.5" } }));
  writeFileSync(path.join(satori, "package.json"), JSON.stringify({ version: "0.33.5", dependencies: { harfbuzzjs: "0.10.0" } }));
  writeFileSync(path.join(hb, "package.json"), JSON.stringify({ version: "0.10.0" }));
  copyFileSync(hbWasm, path.join(hb, "hb.wasm"));
  return { ogPackage: path.join(og, "package.json"), destination: path.join(og, "dist/hb.wasm"), source: path.join(hb, "hb.wasm") };
}

test("OG's bundled HarfBuzz loader matches the installed WASM producer", () => {
  const map = JSON.parse(readFileSync(path.join(path.dirname(ogPackage), "dist/index.node.js.map"), "utf8"));
  const index = map.sources.findIndex((source: string) => source.endsWith("/harfbuzzjs/hb.js"));
  assert.notEqual(index, -1);
  assert.equal(map.sourcesContent[index], readFileSync(path.join(path.dirname(hbPackage), "hb.js"), "utf8"));
});

test("WASM preparation copies the matching asset and is idempotent", t => {
  const f = fixture(t);
  assert.equal(prepareOGWasm(f.ogPackage), f.destination);
  assert.deepEqual(readFileSync(f.destination), readFileSync(f.source));
  const before = statSync(f.destination);
  prepareOGWasm(f.ogPackage);
  assert.equal(statSync(f.destination).mtimeMs, before.mtimeMs);
  assert.equal(statSync(f.destination).ino, before.ino);
});

test("WASM preparation rejects unsupported versions, missing/corrupt sources and never overwrites", t => {
  const f = fixture(t);
  const originalPackage = readFileSync(f.ogPackage);
  writeFileSync(f.ogPackage, JSON.stringify({ version: "1.0.4" }));
  assert.throws(() => prepareOGWasm(f.ogPackage), /Recheck/);
  assert.equal(existsSync(f.destination), false);
  writeFileSync(f.ogPackage, originalPackage);
  writeFileSync(f.destination, "do not overwrite");
  assert.throws(() => prepareOGWasm(f.ogPackage), /refusing to overwrite/);
  assert.equal(readFileSync(f.destination, "utf8"), "do not overwrite");
  rmSync(f.destination);
  writeFileSync(f.source, "not the expected WASM");
  assert.throws(() => prepareOGWasm(f.ogPackage), /checksum/);
  rmSync(f.source);
  assert.throws(() => prepareOGWasm(f.ogPackage), /ENOENT/);
  assert.equal(existsSync(f.destination), false);
});

test("prepared OG package imports and renders a real PNG in Node", () => {
  prepareOGWasm();
  const result = spawnSync(process.execPath, ["--import", "tsx", "-e", `
    const assert = require('node:assert/strict');
    const { ImageResponse } = require('@vercel/og');
    const React = require('react');
    (async () => {
    const image = new ImageResponse(React.createElement('div', {style: {display: 'flex'}}, 'Open Graph'), {width: 1200, height: 630});
    const png = Buffer.from(await image.arrayBuffer());
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `], { encoding: "utf8", timeout: 30_000 });
  assert.equal(result.status, 0, result.stderr || String(result.error));
});

test("OG generation exits unsuccessfully when an image cannot be written", t => {
  prepareOGWasm();
  const root = mkdtempSync(path.join(os.tmpdir(), "og-generation-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(path.join(root, "blog-posts"));
  writeFileSync(path.join(root, "blog-posts/test.md"), "---\ntitle: Test\n---\nBody\n");
  mkdirSync(path.join(root, "public/images"), { recursive: true });
  copyFileSync("public/images/blog-header.jpg", path.join(root, "public/images/blog-header.jpg"));
  // A directory at the intended PNG filename makes writing fail deterministically.
  mkdirSync(path.join(root, "public/__generated__/og/blog/test.png"), { recursive: true });
  const result = spawnSync(process.execPath, ["--import", require.resolve("tsx"), path.resolve("scripts/generate-og-images.ts")], {
    cwd: root,
    env: { ...process.env, TSX_TSCONFIG_PATH: path.resolve("tsconfig.json") },
    encoding: "utf8",
    timeout: 30_000,
  });
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /OG image generation failed for: test/);
  assert.doesNotMatch(result.stdout, /OG image generation complete!/);
});
