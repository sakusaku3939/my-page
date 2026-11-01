import { createHash } from "node:crypto";
import { constants, copyFileSync, existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const wasmSha256 = "d2ab975172d6103e7624e8f7f03fea2316eca6fe562e1b80fc7f7058b283a6d0";
const readPackage = file => JSON.parse(readFileSync(file, "utf8"));
const sha256 = file => createHash("sha256").update(readFileSync(file)).digest("hex");

// Temporary packaging workaround: @vercel/og 1.0.3 bundles harfbuzzjs 0.10.0's
// loader but omits hb.wasm. Use ONLY its installed, lockfile-verified dependency.
// Remove this script and its prebuild hook when an upstream release ships the
// matching asset. Do not extend the version allowlist without rechecking the ABI.
// https://github.com/vercel/satori/issues/801
export function prepareOGWasm(ogPackagePath = require.resolve("@vercel/og/package.json")) {
  const og = readPackage(ogPackagePath);
  const satoriPackagePath = createRequire(ogPackagePath).resolve("satori/package.json");
  const satori = readPackage(satoriPackagePath);
  const hbPackagePath = createRequire(satoriPackagePath).resolve("harfbuzzjs/package.json");
  const hb = readPackage(hbPackagePath);
  if (og.version !== "1.0.3" || og.dependencies?.satori !== "0.33.5" ||
      satori.version !== "0.33.5" || satori.dependencies?.harfbuzzjs !== "0.10.0" ||
      hb.version !== "0.10.0") {
    throw new Error("Recheck the OG WASM workaround for these dependency versions before building.");
  }

  const source = path.join(path.dirname(hbPackagePath), "hb.wasm");
  const destination = path.join(path.dirname(ogPackagePath), "dist", "hb.wasm");
  if (sha256(source) !== wasmSha256) {
    throw new Error("Unexpected harfbuzzjs WASM checksum; refusing to prepare OG assets.");
  }
  if (existsSync(destination)) {
    if (sha256(destination) !== wasmSha256) {
      throw new Error("Existing OG hb.wasm differs; refusing to overwrite it.");
    }
    return destination;
  }
  copyFileSync(source, destination, constants.COPYFILE_EXCL);
  return destination;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  prepareOGWasm();
}
