# Scoped OG fflate security override

`@vercel/og@1.0.3` depends on `satori@0.33.5`, which pins `fflate@0.7.3`.
The OG-scoped override installs `fflate@0.7.5` for this dependency tree,
including `@shuding/opentype.js`, without downgrading OG or changing other trees.
0.7.5 fixes [CVE-2026-45820 / GHSA-px8p-9vwx-vf98](https://github.com/advisories/GHSA-px8p-9vwx-vf98),
an infinite loop while parsing malformed ZIP64 archives in `unzipSync`.

Stay on the 0.7 API: Satori 0.33.5 passes a preallocated output buffer to
`inflateSync`. fflate 0.8 changes that argument to options; the upstream
[WOFF compatibility fix](https://github.com/vercel/satori/pull/825) is not in
OG's embedded Satori. Do not downgrade OG to 1.0.1 either: it embeds Satori
0.29.0, before the [SVG escaping fix in 0.33.5](https://github.com/vercel/satori/security/advisories/GHSA-wx4j-mvgx-mqwp).

## Bundled code and exposure

An npm override does **not** rebuild OG's published JavaScript. Its node and
edge bundles remain unchanged and retain fflate 0.7.3-derived `inflateSync`.
Inspection of both bundles and their source-map mappings found that the
vulnerable `unzipSync` / `z64e` functions were tree-shaken out. The maps contain
the original library sources, which are not executable bundle code.

This app imports OG only in its build-time image generator, using checked-in
blog metadata and an image to produce static PNGs. No public ZIP input path
into this code was found. This is a finding for the current app and bundle,
not a claim that every embedded dependency was upgraded or all risks removed.
An absent local npm audit finding does not establish GitHub alert closure.

The regression tests verify installed resolution and the 0.7 output-buffer
API, not replacement of the embedded bundle. Keep the existing HarfBuzz WASM
workaround. Reassess this override and bundled-code assumptions when upgrading
OG/Satori; remove the override once the parent supports patched fflate and
clean install, tests, lint, type checking, build and OG rendering pass.
