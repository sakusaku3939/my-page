import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import path from "node:path";
import { deflateRawSync } from "node:zlib";

const require = createRequire(import.meta.url);
const ogRequire = createRequire(require.resolve("@vercel/og/package.json"));
const satoriRequire = createRequire(ogRequire.resolve("satori/package.json"));
const opentypeRequire = createRequire(satoriRequire.resolve("@shuding/opentype.js"));

test("OG's installed fflate dependencies use the scoped 0.7.5 security patch", () => {
  const manifest = JSON.parse(readFileSync("package.json", "utf8"));
  assert.deepEqual(manifest.overrides["@vercel/og"], { fflate: "0.7.5" });
  assert.equal(manifest.overrides.fflate, undefined);
  for (const dependencyRequire of [satoriRequire, opentypeRequire]) {
    // fflate 0.7 does not export its package.json; resolve from its lib entry.
    const entry = dependencyRequire.resolve("fflate");
    const metadata = JSON.parse(readFileSync(path.join(path.dirname(entry), "../package.json"), "utf8"));
    assert.equal(metadata.name, "fflate");
    assert.equal(metadata.version, "0.7.5");
  }
});

test("patched fflate preserves Satori's preallocated WOFF inflate API", () => {
  const { inflateSync } = satoriRequire("fflate");
  const input = Buffer.from("WOFF table compatibility fixture ".repeat(128));
  const output = new Uint8Array(input.length);
  const result = inflateSync(deflateRawSync(input), output);
  assert.deepEqual(Buffer.from(output), input);
  assert.deepEqual(Buffer.from(result), input);
});
