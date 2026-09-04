import assert from "node:assert/strict";
import test from "node:test";
import { buildSkillCategories, isCategoryPath, toggleSkillNames } from "../src/components/organism/SkillSelector/selection";

test("unknown categories, variable depths and repeated labels form separate branches", () => {
  const tree = buildSkillCategories([
    { name: "a", category_path: ["開発", "Flutter", "テスト"] },
    { name: "b", category_path: ["開発", "Flutter"] },
    { name: "c", category_path: ["開発", "Even G2", "テスト"] },
    { name: "d", category_path: ["新カテゴリ", "任意", "さらに", "深い分類"] },
  ]);
  assert.deepEqual(tree[0].skillNames, ["a", "b", "c"]);
  assert.deepEqual(tree[0].children[0].skillNames, ["a", "b"]);
  assert.deepEqual(tree[0].children[0].skills.map((skill) => skill.name), ["b"]);
  assert.deepEqual(tree[0].children[1].children[0].skillNames, ["c"]);
  assert.deepEqual(tree[1].children[0].children[0].children[0].skillNames, ["d"]);
});

test("group toggles preserve other branches and selecting a mixed group never duplicates skills", () => {
  assert.deepEqual(toggleSkillNames(["a", "c"], ["a", "b"]), ["a", "c", "b"]);
  assert.deepEqual(toggleSkillNames(["a", "b", "c"], ["a", "b"]), ["c"]);
  assert.deepEqual(toggleSkillNames(["a", "b"], ["a"]), ["b"]);
  assert.deepEqual(toggleSkillNames([], ["a", "b"]), ["a", "b"]);
});

test("category paths must be nonempty arrays of nonblank trimmed names", () => {
  for (const invalid of [undefined, null, [], "Flutter", [""], [" "], [1], [" Flutter"]]) {
    assert.equal(isCategoryPath(invalid), false);
  }
  assert.equal(isCategoryPath(["開発", "Flutter"]), true);
});
