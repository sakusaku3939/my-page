import { isCategoryPath } from "../components/organism/SkillSelector/selection";

export type Skill = {
  name: string;
  category_path: string[];
  description: string;
  version: string;
  archive: string;
  manifest_url: string;
  sha256: string;
  size: number;
  files: string[];
  has_scripts: boolean;
  license: string | null;
  license_file: boolean;
  source_url: string | null;
};

// 上流CLIが配置と更新を管理するスキル。インストーラーが command を実行して導入する。
export type ExternalSkill = {
  name: string;
  category_path: string[];
  description: string;
  command: string;
  source_url: string;
};

export type SkillManifest = {
  releaseTag: string;
  skills: Skill[];
  externalSkills: ExternalSkill[];
};

const DISTRIBUTION_BASE_URL = "https://sakusaku3939.github.io/agent-skills";
const RELEASE_BASE_URL = "https://github.com/sakusaku3939/agent-skills/releases/download";
const REPOSITORY = "sakusaku3939/agent-skills";
const RELEASE_TAG_PATTERN = /^skills-[0-9a-f]{40}$/;
const ARCHIVE_PATTERN = /^[A-Za-z0-9._-]+\.tar\.gz$/;
const SKILL_NAME_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
const EXTERNAL_COMMAND_PATTERN = /^[a-z0-9][a-z0-9._-]*(?: [A-Za-z0-9._=,/-]+)*$/;

const isDistributionUrl = (value: unknown): value is string =>
  typeof value === "string" && value.startsWith(`${DISTRIBUTION_BASE_URL}/`);

const isHttpsUrl = (value: unknown): value is string => {
  if (typeof value !== "string") return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

const isSkill = (value: unknown): value is Skill => {
  if (typeof value !== "object" || value === null) return false;
  const skill = value as Record<string, unknown>;
  return (
    typeof skill.name === "string" &&
    isCategoryPath(skill.category_path) &&
    typeof skill.description === "string" &&
    typeof skill.version === "string" &&
    typeof skill.archive === "string" &&
    ARCHIVE_PATTERN.test(skill.archive) &&
    isDistributionUrl(skill.manifest_url) &&
    typeof skill.sha256 === "string" &&
    typeof skill.size === "number" &&
    Array.isArray(skill.files) &&
    skill.files.every((file) => typeof file === "string") &&
    typeof skill.has_scripts === "boolean" &&
    (skill.license === null || typeof skill.license === "string") &&
    typeof skill.license_file === "boolean" &&
    (skill.source_url === null || isHttpsUrl(skill.source_url))
  );
};

const isExternalSkill = (value: unknown): value is ExternalSkill => {
  if (typeof value !== "object" || value === null) return false;
  const skill = value as Record<string, unknown>;
  return (
    typeof skill.name === "string" &&
    SKILL_NAME_PATTERN.test(skill.name) &&
    isCategoryPath(skill.category_path) &&
    typeof skill.description === "string" &&
    typeof skill.command === "string" &&
    EXTERNAL_COMMAND_PATTERN.test(skill.command) &&
    isHttpsUrl(skill.source_url)
  );
};

export const isExternal = (skill: Skill | ExternalSkill): skill is ExternalSkill => "command" in skill;

export const parseSkillManifest = (value: unknown): SkillManifest | null => {
  if (typeof value !== "object" || value === null) return null;
  const manifest = value as Record<string, unknown>;
  if (
    manifest.repository !== REPOSITORY ||
    typeof manifest.release_tag !== "string" ||
    !RELEASE_TAG_PATTERN.test(manifest.release_tag) ||
    !Array.isArray(manifest.skills) ||
    !manifest.skills.every(isSkill) ||
    !Array.isArray(manifest.external_skills) ||
    !manifest.external_skills.every(isExternalSkill)
  ) {
    return null;
  }
  return {
    releaseTag: manifest.release_tag,
    skills: manifest.skills,
    externalSkills: manifest.external_skills,
  };
};

export const buildArchiveUrl = (releaseTag: string, archive: string) =>
  `${RELEASE_BASE_URL}/${encodeURIComponent(releaseTag)}/${encodeURIComponent(archive)}`;
