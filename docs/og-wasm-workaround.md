# Temporary OG WASM packaging workaround

`@vercel/og@1.0.3` includes the HarfBuzz loader but does not publish its
`dist/hb.wasm` asset. This fails on import under Node 22, before Next builds.
Upstream report: https://github.com/vercel/satori/issues/801

`prebuild` runs `scripts/prepare-og-wasm.mjs` before importing OG. It copies the
already installed `harfbuzzjs@0.10.0/hb.wasm` from OG's own Satori dependency
chain; it never downloads a binary, changes dependency versions, or rewrites JS.

The workaround is deliberately restricted to:

- `@vercel/og@1.0.3` → `satori@0.33.5` → `harfbuzzjs@0.10.0`
- SHA-256 `d2ab975172d6103e7624e8f7f03fea2316eca6fe562e1b80fc7f7058b283a6d0`

The published OG source map's `harfbuzzjs/hb.js` is byte-identical to the loader
installed with that WASM. Regression tests verify this and actual PNG rendering.
The npm lockfile verifies package integrity during `npm ci`. Preparation rejects
unknown versions, absent/changed source bytes and any differing destination;
repeated runs preserve an existing matching file.

**Remove this workaround, its prebuild hook and its workaround-specific tests
when an upstream OG release publishes and loads the correct asset.** Recheck a
clean Node 22 install/build and all five blog OG images before removing it. Do
not merely broaden the version allowlist. Pinning OG to 1.0.1 is not equivalent:
it embeds Satori 0.29.0, even if a newer Satori is installed separately.

Separate OG reliability changes in `generate-og-images.ts` use the same
checked-in `public/images/blog-header.jpg` (still rendered at 32×32) rather than
fetching the production URL, and make partial generation failures exit nonzero.
The image design and 1200×630 output dimensions are unchanged.

## Verification

Run `npm ci`, `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`
with Node 22. Tests cover the loader provenance, idempotence, version/checksum
rejection, overwrite protection, actual PNG rendering and failure exit status.
The standalone generator relies on the prebuild preparation; run `npm run
prebuild` rather than invoking it directly after a fresh install.
