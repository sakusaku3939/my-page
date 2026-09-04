import Head from "next/head";
import { useEffect, useState } from "react";
import common from "@/styles/common.module.css";
import index from "./index.module.css";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";
import { BackgroundWrapper } from "@/components/atom/BackgroundWrapper/BackgroundWrapper";
import { SkillSelector } from "@/components/organism/SkillSelector/SkillSelector";
import { isCategoryPath, toggleSkillNames } from "@/components/organism/SkillSelector/selection";

type Skill = {
  name: string;
  category_path: string[];
  description: string;
  version: string;
  url: string;
  manifest_url: string;
  sha256: string;
  size: number;
  files: string[];
  has_scripts: boolean;
  license: string | null;
  license_file: boolean;
  source_url: string | null;
};

const DISTRIBUTION_BASE_URL = "https://sakusaku3939.github.io/agent-skills";
const MANIFEST_URL = `${DISTRIBUTION_BASE_URL}/manifest.json`;
const INSTALLER_URL = `${DISTRIBUTION_BASE_URL}/install.sh`;

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
    isDistributionUrl(skill.url) &&
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

const formatSize = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

const CommandBlock = ({ command, disabled = false }: { command: string; disabled?: boolean }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    if (disabled) return;
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch (error) {
      console.error("コマンドのコピーに失敗しました:", error);
    }
  };

  return (
    <div className={index.commandBlock}>
      <pre className={index.pre}>
        <code>{command}</code>
      </pre>
      <button type="button" className={index.copyButton} onClick={handleCopy} disabled={disabled}>
        {copied ? "コピーしました" : "コピー"}
      </button>
    </div>
  );
};

const Index = () => {
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadSkills = async () => {
      try {
        const response = await fetch(MANIFEST_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`manifest request failed: ${response.status}`);

        const manifest: unknown = await response.json();
        if (typeof manifest !== "object" || manifest === null) {
          throw new Error("invalid manifest");
        }
        const manifestSkills = (manifest as Record<string, unknown>).skills;
        if (!Array.isArray(manifestSkills) || !manifestSkills.every(isSkill)) {
          throw new Error("invalid manifest");
        }

        setSkills(manifestSkills);
        setSelected(manifestSkills.map((skill) => skill.name));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadFailed(true);
      }
    };

    void loadSkills();
    return () => controller.abort();
  }, []);

  const allSelected = skills !== null && skills.length > 0 && selected.length === skills.length;

  const toggleSkills = (names: string[]) => {
    setSelected((current) => toggleSkillNames(current, names));
  };

  const toggleAll = () => {
    setSelected(allSelected ? [] : (skills ?? []).map((skill) => skill.name));
  };

  // 通常インストールは全件が既定。manifest の並び順で、未選択の項目だけを除外する。
  const excludedSkills =
    skills
      ?.filter((skill) => !selected.includes(skill.name))
      .map((skill) => skill.name)
      ?? [];
  const hasInstallTargets = skills === null || skills.length === 0 || selected.length > 0;
  const installOptions = excludedSkills.map((name) => ` --exclude ${name}`).join("");
  const installCommand = hasInstallTargets
    ? `curl -fsSL ${INSTALLER_URL} -o install.sh\nsh install.sh${installOptions}`
    : "インストール対象のスキルを選択してください";

  return (
    <>
      <Head>
        <title>Aokiti | Agent Skills</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="ローカルの Claude Code / Codex にインストールできる Agent Skills の配布ページ"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundWrapper>
        <HamburgerMenu />
        <h1 className={common.pageTitle}>Agent Skills</h1>

        <section className={common.section}>
          <p className={index.lead}>
            ローカルの Claude Code / Codex で使える Agent Skills を配布しています。
            インストーラは <code className={index.code}>~/.claude/skills/</code> と{" "}
            <code className={index.code}>~/.agents/skills/</code> にスキルを配置します。
          </p>

          <h2 className={common.h2}>インストール</h2>
          <CommandBlock command={installCommand} disabled={!hasInstallTargets} />

          {skills !== null && skills.length > 0 && (
            <div className={index.selector}>
              <div className={index.selectorHeader}>
                <span>インストールするスキル（外した項目だけ除外）</span>
                <button type="button" className={index.selectorToggle} onClick={toggleAll}>
                  {allSelected ? "すべて外す" : "すべて選択"}
                </button>
              </div>
              <SkillSelector skills={skills} selected={selected} onToggle={toggleSkills} />
            </div>
          )}

          <h2 className={common.h2}>CLI</h2>
          <dl className={index.cliReference}>
            <div>
              <dt><code>sh install.sh</code></dt>
              <dd>配布中の全スキルをインストール</dd>
            </div>
            <div>
              <dt><code>sh install.sh --exclude &lt;スキル名&gt;</code></dt>
              <dd>指定したスキルを除外してインストール</dd>
            </div>
            <div>
              <dt><code>sh install.sh --list</code></dt>
              <dd>配布中のスキルを表示</dd>
            </div>
            <div>
              <dt><code>sh install.sh --check</code></dt>
              <dd>インストール済みスキルの更新を確認</dd>
            </div>
            <div>
              <dt><code>sh install.sh --update &lt;スキル名&gt;</code></dt>
              <dd>指定したスキルを更新</dd>
            </div>
          </dl>

          <h2 className={common.h2}>配布中のスキル</h2>

          {loadFailed ? (
            <p className={index.note}>
              配布データを読み込めませんでした。{" "}
              <a href={DISTRIBUTION_BASE_URL} rel="noopener noreferrer" target="_blank">
                配布データページ
              </a>
              から確認してください。
            </p>
          ) : skills === null ? (
            <p className={index.note}>配布データを読み込んでいます。</p>
          ) : skills.length === 0 ? (
            <p className={index.note}>まだ配布中のスキルはありません。</p>
          ) : (
            <div className={index.skillList}>
              {skills.map((skill) => (
                <article key={skill.name} className={index.skill}>
                  <header className={index.skillHeader}>
                    <h3 className={index.skillName}>{skill.name}</h3>
                    <span className={index.version}>{skill.version}</span>
                  </header>

                  <p className={index.description}>{skill.description}</p>

                  <CommandBlock
                    command={`sh install.sh --manifest ${skill.manifest_url} ${skill.name}`}
                  />

                  <dl className={index.meta}>
                    <div>
                      <dt>カテゴリ</dt>
                      <dd>{skill.category_path.join(" → ")}</dd>
                    </div>
                    <div>
                      <dt>ファイル</dt>
                      <dd>{skill.files.join(", ")}</dd>
                    </div>
                    <div>
                      <dt>サイズ</dt>
                      <dd>{formatSize(skill.size)}</dd>
                    </div>
                    <div>
                      <dt>同梱スクリプト</dt>
                      <dd>{skill.has_scripts ? "あり" : "なし"}</dd>
                    </div>
                    {skill.license && (
                      <div>
                        <dt>ライセンス</dt>
                        <dd>
                          {skill.license}
                          {skill.license_file && "（LICENSE 同梱）"}
                        </dd>
                      </div>
                    )}
                    {skill.source_url && (
                      <div>
                        <dt>参照元</dt>
                        <dd>
                          <a href={skill.source_url} rel="noopener noreferrer" target="_blank">
                            {skill.source_url}
                          </a>
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt>アーカイブ</dt>
                      <dd>
                        <a href={skill.url}>{skill.url}</a>
                      </dd>
                    </div>
                    <div>
                      <dt>SHA-256</dt>
                      <dd className={index.hash}>{skill.sha256}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          )}
        </section>

        <FooterMenu />
      </BackgroundWrapper>
    </>
  );
};

export default Index;
