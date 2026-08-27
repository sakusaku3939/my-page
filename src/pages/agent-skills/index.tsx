import fs from "fs";
import path from "path";
import Head from "next/head";
import { GetStaticProps } from "next";
import common from "@/styles/common.module.css";
import index from "./index.module.css";
import HamburgerMenu from "@/components/molecule/HamburgerMenu/HamburgerMenu";
import { FooterMenu } from "@/components/molecule/Menu/Menu";
import { BackgroundWrapper } from "@/components/atom/BackgroundWrapper/BackgroundWrapper";

type Skill = {
  name: string;
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

type Manifest = {
  base_url: string;
  source: { repo?: string; commit?: string };
  skills: Skill[];
};

type Props = {
  baseUrl: string;
  skills: Skill[];
};

const MANIFEST_PATH = path.join(process.cwd(), "public", "agent-skills", "manifest.json");
const FALLBACK_BASE_URL = "https://sakusaku3939.com/agent-skills";

export const getStaticProps: GetStaticProps<Props> = async () => {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return { props: { baseUrl: FALLBACK_BASE_URL, skills: [] } };
  }
  const manifest: Manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  return { props: { baseUrl: manifest.base_url, skills: manifest.skills } };
};

const formatSize = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

const Index = ({ baseUrl, skills }: Props) => {
  const installerUrl = `${baseUrl}/install.sh`;

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
          <pre className={index.pre}>
            <code>
              {`curl -fsSL ${installerUrl} -o install.sh\nsh install.sh <スキル名>`}
            </code>
          </pre>
          <p className={index.note}>
            配布中のスキル一覧は <code className={index.code}>sh install.sh --list</code>、
            インストール済みスキルの更新有無は{" "}
            <code className={index.code}>sh install.sh --check</code> で確認できます。
            自動更新はしません。更新の適用は{" "}
            <code className={index.code}>sh install.sh --update &lt;スキル名&gt;</code> で明示的に行います。
          </p>

          <h2 className={common.h2}>インストーラの動作</h2>
          <ul className={index.list}>
            <li>sudo は不要です。<code className={index.code}>eval</code> は使いません。トークンも要りません。</li>
            <li>
              ダウンロードしたアーカイブを、下の一覧に載っている SHA-256 と突き合わせてから展開します。
            </li>
            <li>
              展開する前にアーカイブの全エントリを検査し、絶対パス・
              <code className={index.code}>..</code>・シンボリックリンクを含むものは拒否します。
            </li>
            <li>既定では既存のスキルを上書きしません。スキル同梱のスクリプトも実行しません。</li>
          </ul>

          <h2 className={common.h2}>配布中のスキル</h2>

          {skills.length === 0 ? (
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

                  <pre className={index.pre}>
                    <code>{`sh install.sh --manifest ${skill.manifest_url} ${skill.name}`}</code>
                  </pre>

                  <dl className={index.meta}>
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

          <h2 className={common.h2}>手動で検証する場合</h2>
          <p className={index.note}>
            インストーラを使わずに確認するときは、上のアーカイブ URL を直接取得して、
            表示されている SHA-256 と一致することを確かめてください。
            アーカイブ URL はバージョンごとに固定で、内容が変わることはありません。
          </p>
          <pre className={index.pre}>
            <code>{"curl -fsSL <アーカイブ URL> -o skill.tar.gz\nshasum -a 256 skill.tar.gz"}</code>
          </pre>
        </section>

        <FooterMenu />
      </BackgroundWrapper>
    </>
  );
};

export default Index;
