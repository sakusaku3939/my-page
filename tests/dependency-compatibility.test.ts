import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";
import matter from "gray-matter";

const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("@next/eslint-plugin-next"));
const { globSync } = nextRequire("fast-glob");
const { getRootDirs } = nextRequire("./utils/get-root-dirs.js");
const yamlRequire = createRequire(createRequire(require.resolve("gray-matter" )).resolve("js-yaml"));
const yaml = yamlRequire("./");
const yamlCli = path.join(path.dirname(yamlRequire.resolve("./package.json")), "bin/js-yaml.js");

function fixture(t: TestContext) {
  const root = mkdtempSync(path.join(os.tmpdir(), "next-root-glob-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const dir of ["apps/site/src", "apps/admin/src", "apps/.hidden", "nested/sub/project", "dir with spaces", "packages/lib"]) {
    mkdirSync(path.join(root, dir), { recursive: true });
  }
  writeFileSync(path.join(root, "apps/file.txt"), "not a directory");
  return root;
}

const normalized = (root: string, values: string[]) => values.map(value => path.resolve(root, value)).sort();

test("Next's replacement is limited to the directory-glob API it actually uses", () => {
  assert.match(nextRequire.resolve("fast-glob"), /tools[/\\]next-root-glob[/\\]index\.cjs$/);
  assert.deepEqual(Object.keys(nextRequire("fast-glob")), ["globSync"]);
  assert.throws(() => globSync("apps/*"), /only supports/);
  assert.throws(() => globSync(["apps/*"], { onlyDirectories: true }), /only supports/);
  assert.throws(() => globSync("apps/*", { onlyDirectories: true, onlyFiles: true }), /only supports/);
});

test("directory root globs preserve fast-glob's resolved roots", t => {
  const root = fixture(t);
  const cases: [string, string[]][] = [
    ["apps/*", ["apps/admin", "apps/site"]],
    ["apps/**", ["apps/admin", "apps/admin/src", "apps/site", "apps/site/src"]],
    ["apps/**/", ["apps/admin", "apps/admin/src", "apps/site", "apps/site/src"]],
    ["apps/*/", ["apps/admin", "apps/site"]],
    ["apps/site", ["apps/site"]],
    ["./apps/site/", ["apps/site"]],
    ["dir with spaces", ["dir with spaces"]],
    ["missing/*", []],
    ["apps/.hidden", ["apps/.hidden"]],
    [".", ["."]],
    ["./", ["."]],
  ];
  for (const [pattern, expected] of cases) {
    for (const input of [pattern, path.join(root, pattern)]) {
      assert.deepEqual(normalized(root, globSync(input, { cwd: root, onlyDirectories: true })), normalized(root, expected), input);
    }
  }
});

test("advanced root globs fail explicitly rather than silently weakening Next lint", () => {
  for (const pattern of ["apps/{site,admin}", "a{b}/*", "apps/{1..3..2}", "apps/!(admin)", "!(apps)", "apps/*/**", "apps/**/.hidden", "apps/**/.*", "nested/**/project", "apps/*/../site", "apps/[ab]*"]) {
    assert.throws(() => globSync(pattern, { onlyDirectories: true }), /Unsupported Next rootDir glob/, pattern);
  }
});

test("directory symlinks are included and traversed like Next's previous resolver", t => {
  const root = fixture(t);
  symlinkSync(path.join(root, "apps/site"), path.join(root, "linked"), "dir");
  symlinkSync(path.join(root, "apps/admin"), path.join(root, "apps/linkadmin"), "dir");
  for (const pattern of ["apps/./*", "apps/site/../*", path.join(root, "apps") + "/./*"]) {
    assert.deepEqual(normalized(root, globSync(pattern, { cwd: root, onlyDirectories: true })), normalized(root, ["apps/admin", "apps/linkadmin", "apps/site"]), pattern);
  }
  assert.deepEqual(normalized(root, globSync("linked", { cwd: root, onlyDirectories: true })), [path.join(root, "linked")]);
  assert.deepEqual(normalized(root, globSync("linked/*", { cwd: root, onlyDirectories: true })), [path.join(root, "linked/src")]);
  assert.deepEqual(normalized(root, globSync("*", { cwd: root, onlyDirectories: true })), normalized(root, ["apps", "nested", "dir with spaces", "packages", "linked"]));
});

test("the installed Next plugin resolves default, literal, glob and array rootDir settings", t => {
  const root = fixture(t);
  assert.deepEqual(getRootDirs({ cwd: root, settings: {} }), [root]);
  for (const rootDir of [path.join(root, "apps/*"), [path.join(root, "apps/site"), path.join(root, "apps/admin"), null]]) {
    assert.deepEqual(normalized(root, getRootDirs({ cwd: root, settings: { next: { rootDir } } })), normalized(root, ["apps/admin", "apps/site"]));
  }
});

test("Next still flags plain anchors to pages discovered through a rootDir glob", t => {
  const root = fixture(t);
  mkdirSync(path.join(root, "apps/site/pages"), { recursive: true });
  writeFileSync(path.join(root, "apps/site/pages/about.tsx"), "export default function About() { return null; }");
  const { Linter } = require("eslint");
  const messages = new Linter().verify('const element = <a href="/about/">About</a>;', {
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { "@next/next": require("@next/eslint-plugin-next") },
    settings: { next: { rootDir: path.join(root, "apps/*") } },
    rules: { "@next/next/no-html-link-for-pages": "error" },
  });
  assert.equal(messages.length, 1);
  assert.equal(messages[0].ruleId, "@next/next/no-html-link-for-pages");
});

test("the installed dependency graph removes both vulnerable dependency chains", () => {
  assert.equal(yamlRequire("argparse/package.json").version, "2.0.1");
  const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
  for (const dependency of ["braces", "micromatch", "sprintf-js"]) {
    assert.ok(!Object.keys(lock.packages).some(name => name.endsWith(`/node_modules/${dependency}`) || name === `node_modules/${dependency}`), dependency);
  }
});

test("gray-matter keeps YAML metadata, safe parsing, content and stringify behavior", () => {
  const input = "---\ntitle: テスト\ndate: 2026-10-17\ntags: [one, two]\npublished: true\n---\n# Body\n\n$x^2$\n";
  const parsed = matter(input);
  assert.equal(parsed.data.title, "テスト");
  assert.deepEqual(parsed.data.tags, ["one", "two"]);
  assert.equal(parsed.data.published, true);
  assert.equal(parsed.data.date.toISOString(), "2026-10-17T00:00:00.000Z");
  assert.equal(parsed.content, "# Body\n\n$x^2$\n");
  assert.deepEqual(matter(matter.stringify(parsed.content, parsed.data)).data, parsed.data);
  assert.throws(() => matter("---\nx: !!js/function >\n  function () { return 1; }\n---\n"));
  for (const dir of ["posts", "blog-posts"]) {
    for (const filename of readdirSync(dir).filter(name => name.endsWith(".md"))) {
      const source = readFileSync(path.join(dir, filename), "utf8");
      const article = matter(source);
      assert.equal(typeof article.data.title, "string", filename);
      assert.equal(typeof article.content, "string", filename);
      assert.deepEqual(matter(matter.stringify(article.content, article.data)).data, article.data, filename);
    }
  }
});

test("legacy js-yaml CLI retains help, conversion and failure exit codes with argparse 2", t => {
  const run = (args: string[], input = "") => spawnSync(process.execPath, [yamlCli, ...args], { input, encoding: "utf8", timeout: 10_000 });
  assert.equal(run(["--help"]).status, 0);
  // Argparse 2 has a legacy --version formatting defect; the site never uses
  // this nested CLI. Keep its successful exit explicit rather than claiming
  // byte-for-byte CLI compatibility (see the adapter README).
  assert.equal(run(["--version"]).status, 0);
  const json = run([], "name: test\ncount: 2\n");
  assert.equal(json.status, 0);
  assert.deepEqual(JSON.parse(json.stdout), { name: "test", count: 2 });
  const dumped = run([], '{"name":"test","count":2}');
  assert.equal(dumped.status, 0);
  assert.deepEqual(yaml.safeLoad(dumped.stdout), { name: "test", count: 2 });
  assert.equal(run(["-j"], "name: test\n").status, 0);
  assert.equal(run(["-c"], "name: [broken\n").status, 1);
  assert.equal(run(["-t"], "name: [broken\n").status, 1);
  const root = fixture(t);
  assert.equal(run([path.join(root, "missing.yaml")]).status, 2);
  assert.equal(run(["--unknown-option"]).status, 2);
});
