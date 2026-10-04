import assert from "node:assert/strict";
import test from "node:test";
import { buildArchiveUrl, parseSkillManifest } from "../src/model/SkillManifest";

const validSkill = {
  name: "sample-skill",
  category_path: ["開発", "サンプル"],
  description: "サンプルスキル",
  version: "0123456789abcdef0123456789abcdef01234567",
  archive: "sample-skill-0123456789ab-deadbeefdeadbeef.tar.gz",
  manifest_url: "https://sakusaku3939.github.io/agent-skills/manifests/sample.json",
  sha256: "a".repeat(64),
  size: 1024,
  files: ["SKILL.md"],
  has_scripts: false,
  license: null,
  license_file: false,
  source_url: null,
};

test("current private-release manifest schema is accepted", () => {
  const manifest = parseSkillManifest({
    repository: "sakusaku3939/agent-skills",
    release_tag: "skills-0123456789abcdef0123456789abcdef01234567",
    skills: [validSkill],
  });

  assert.deepEqual(manifest, {
    releaseTag: "skills-0123456789abcdef0123456789abcdef01234567",
    skills: [validSkill],
  });
});

test("obsolete public archive URL schema is rejected", () => {
  const { archive: _archive, ...obsoleteSkill } = validSkill;
  assert.equal(parseSkillManifest({
    repository: "sakusaku3939/agent-skills",
    release_tag: "skills-0123456789abcdef0123456789abcdef01234567",
    skills: [{ ...obsoleteSkill, url: "https://sakusaku3939.github.io/agent-skills/sample.tar.gz" }],
  }), null);
});

test("archive link targets the authenticated private release", () => {
  assert.equal(
    buildArchiveUrl(
      "skills-0123456789abcdef0123456789abcdef01234567",
      "sample-skill-0123456789ab-deadbeefdeadbeef.tar.gz",
    ),
    "https://github.com/sakusaku3939/agent-skills/releases/download/skills-0123456789abcdef0123456789abcdef01234567/sample-skill-0123456789ab-deadbeefdeadbeef.tar.gz",
  );
});
